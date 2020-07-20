import { isFunction } from "lodash"
import { StoreInitializer } from "./types"
import { createStore, ObservableStore, Store } from "@bytesoftio/store"

export const unwrapStore = <TState extends object>(initialState: StoreInitializer<TState | ObservableStore<TState>>): ObservableStore<TState> => {
  let store = isFunction(initialState) ? initialState() : initialState

  if ( ! (store instanceof Store)) {
    store = createStore(store) as ObservableStore<TState>
  }

  return store
}
