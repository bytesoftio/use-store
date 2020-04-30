import { HookStore, UseStore } from "./types"
import { unwrapStore } from "./unwrapStore"
import { useValue } from "@bytesoftio/use-value"

export const useStore: UseStore = <S extends object>(initialState) => {
  const [store] = useValue<HookStore<S>>(() => unwrapStore<S>(initialState))

  return store.use()
}