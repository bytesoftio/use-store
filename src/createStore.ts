import { CreateStore } from "./types"
import { Store } from "./Store"

export const createStore: CreateStore = (initialState) => new Store(initialState)