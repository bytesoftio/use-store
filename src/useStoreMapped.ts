import { UseStoreMapped } from "./types"
import { unwrapStore } from "./unwrapStore"
import { useEffect, useMemo, useState } from "react"

export const useStoreMapped: UseStoreMapped = <TState extends object>(initialState, mapper) => {
  const store = useMemo(() => unwrapStore<TState>(initialState), [])

  const [reference, setReference] = useState(0)

  useEffect(() => {
    return store.listen(() => setReference((previous) => previous + 1), false, mapper)
  }, [])

  const mappedState = mapper(store.get())

  return [mappedState, store]
}
