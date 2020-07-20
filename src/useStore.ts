import { UseStore } from "./types"
import { StoreMapper } from "@bytesoftio/store"
import { useStoreMapped } from "./useStoreMapped"

export const useStore: UseStore = <TState extends object>(initialState) => {
  const mapper: StoreMapper<TState, TState> = (state) => state

  return useStoreMapped(initialState, mapper)
}
