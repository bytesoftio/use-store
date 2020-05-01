import { isFunction } from "lodash"
import { StoreInitializer } from "./types"
import { createStore, ObservableStore, Store } from "@bytesoftio/store"

export const unwrapStore = <S extends object>(initialState: StoreInitializer<S | ObservableStore<S>>): ObservableStore<S> => {
  let store = isFunction(initialState) ? initialState() : initialState

  if ( ! (store instanceof Store)) {
    store = createStore(store) as ObservableStore<S>
  }

  return store
}