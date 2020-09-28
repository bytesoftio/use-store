import { UseStore } from "./types"
import { useEffect, useMemo, useState } from "react"
import { unwrapStore } from "./unwrapStore"

export const useStore: UseStore = <TState extends object>(initialState) => {
  const store = useMemo(() => unwrapStore<TState>(initialState), [])

  const [reference, setReference] = useState(0)

  useEffect(() => {
    return store.listen(() => setReference((previous) => previous + 1), false)
  }, [])

  return store
}
