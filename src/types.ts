import { ObservableStore } from "@bytesoftio/store"

export type StoreInitializer<TState> = TState | (() => TState)
export type StoreUpdater<TState extends object> = (newState: TState) => void
export type StoreResetter = <TState extends object>(initialState?: TState) => void
export type StoreMapper<TState extends object, TStateMapped extends object> = (state: TState) => TStateMapped
export type StoreSpread<TState extends object, TStateMapped extends object> = [TStateMapped, StoreUpdater<TState>, StoreUpdater<Partial<TState>>, StoreResetter]
export type UseStore = <TState extends object, TStateMapped extends object = TState>(initialState: StoreInitializer<TState | ObservableStore<TState>>) => StoreSpread<TState, TState>
export type UseStoreMapped = <TState extends object, TStateMapped extends object = TState>(initialState: StoreInitializer<TState | ObservableStore<TState>>, mapper: StoreMapper<TState, TStateMapped>) => StoreSpread<TState, TStateMapped>
