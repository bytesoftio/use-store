import { ObservableStore } from "@bytesoftio/store"

export type StoreInitializer<TState> = TState | (() => TState)
export type UseStore = <TState extends object>(initialState: StoreInitializer<TState | ObservableStore<TState>>) => ObservableStore<TState>
