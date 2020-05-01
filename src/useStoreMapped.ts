import { UseStoreMapped } from "./types"
import { unwrapStore } from "./unwrapStore"
import { ObservableStore } from "@bytesoftio/store"
import { useEffect, useState } from "react"

export const useStoreMapped: UseStoreMapped = <S extends object>(initialState, mapper) => {
  const [store] = useState<ObservableStore<S>>(() => unwrapStore<S>(initialState))

  try {
    const [state, setState] = useState(store.get())

    useEffect(() => {
      // try to hook into a component, whenever the state changes outside of react, it needs to be updated inside
      // react too, this is basically what happens here, returns a clean up function to unsubscribe from the store
      // whenever the component un-mounts
      return store.listen((newState) => setState(newState as any), mapper, false)
    }, [])
  } catch (err) {
  }

  const mappedState = mapper(store.get())
  const setState = (newState) => store.set(newState)
  const addState = (newState) => store.add(newState)
  const resetState = () => store.reset()

  return [
    mappedState,
    setState,
    addState,
    resetState,
  ]
}