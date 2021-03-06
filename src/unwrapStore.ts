import { isFunction } from "lodash"
import { StoreInitializer } from "./types"
import { createStore, ObservableStore, Store } from "@bytesoftio/store"

export const unwrapStore = <TValue extends object>(initialValue: StoreInitializer<TValue | ObservableStore<TValue>>): ObservableStore<TValue> => {
  let store = isFunction(initialValue) ? initialValue() : initialValue

  if ( ! (store instanceof Store)) {
    store = createStore(store) as ObservableStore<TValue>
  }

  return store
}
