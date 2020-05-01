import { UseStore } from "./types"
import { StoreMapper } from "@bytesoftio/store"
import { useStoreMapped } from "./useStoreMapped"

export const useStore: UseStore = <S extends object>(initialState) => {
  const mapper: StoreMapper<S, S> = (state) => state

  return useStoreMapped(initialState, mapper)
}