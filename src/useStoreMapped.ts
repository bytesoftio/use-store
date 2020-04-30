import { HookStore, UseStoreMapped } from "./types"
import { unwrapStore } from "./unwrapStore"
import { useValue } from "@bytesoftio/use-value"

export const useStoreMapped: UseStoreMapped = <S extends object>(initialState, mapper) => {
  const [store] = useValue<HookStore<S>>(() => unwrapStore<S>(initialState))

  return store.useMapped(mapper)
}