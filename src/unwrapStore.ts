import { Store } from "./Store"
import { createStore } from "./createStore"
import { HookStore } from "./types"
import { isFunction } from "lodash"
import { ValueInitializer } from "@bytesoftio/use-value"

export const unwrapStore = <S extends object>(initialState: ValueInitializer<S | HookStore<S>>): HookStore<S> => {
  let store = isFunction(initialState) ? initialState() : initialState

  if ( ! (store instanceof Store)) {
    store = createStore(store) as HookStore<S>
  }

  return store
}