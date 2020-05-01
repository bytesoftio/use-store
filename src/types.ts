import { ObservableStore } from "@bytesoftio/store"

export type StoreInitializer<T> = T | (() => T)
export type StoreUpdater<S extends object> = (newState: S) => void
export type StoreReseter = () => void
export type StoreMapper<S extends object, SM extends object> = (state: S) => SM
export type StoreSpread<S extends object, SM extends object> = [SM, StoreUpdater<S>, StoreUpdater<Partial<S>>, StoreReseter]
export type UseStore = <S extends object, SM extends object = S>(initialState: StoreInitializer<S | ObservableStore<S>>) => StoreSpread<S, S>
export type UseStoreMapped = <S extends object, SM extends object = S>(initialState: StoreInitializer<S | ObservableStore<S>>, mapper: StoreMapper<S, SM>) => StoreSpread<S, SM>