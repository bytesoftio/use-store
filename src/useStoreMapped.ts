import { UseStoreMapped } from "./types"
import { unwrapStore } from "./unwrapStore"
import { useEffect, useMemo, useState } from "react"

export const useStoreMapped: UseStoreMapped = <S extends object>(initialState, mapper) => {
  const store = useMemo(() => unwrapStore<S>(initialState), [])

  const [reference, setReference] = useState(0)

  useEffect(() => {
    return store.listen(() => setReference((previous) => previous + 1), false, mapper)
  }, [])

  const mappedState = mapper(store.get())
  const setState = (newState) => store.set(newState)
  const addState = (newState) => store.add(newState)
  const resetState = (initialState) => store.reset(initialState)

  return [
    mappedState,
    setState,
    addState,
    resetState,
  ]
}