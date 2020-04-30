import { ValueInitializer } from "@bytesoftio/use-value"

export interface HookStore<S extends object> {
  state: S
  initialState: S

  get(): S
  set(newState: S): void
  add(newState: Partial<S>): void
  reset(initialState?: S): void

  listen(callback: StoreCallback<S>): void
  use(): StoreSpread<S, S>
  useMapped<SM extends object>(mapper: StoreMapper<S, SM>): StoreSpread<S, SM>
}

export type StoreCallback<S extends object> = (newState: S) => void
export type HookKind = "react" | "plain"
export type StoreUpdater<S extends object> = (newState: S) => void
export type StoreReseter = () => void
export type StoreMerger<S extends object> = (oldState: S, newState: Partial<S>) => S
export type StoreMapper<S extends object, SM extends object> = (state: S) => SM
export type StoreDiffer<S extends object> = (oldState: S, newState: S) => boolean
export type StoreSpread<S extends object, SM extends object> = [SM, StoreUpdater<S>, StoreUpdater<Partial<S>>, StoreReseter]
export type CreateStore = <S extends object>(initialState: S) => HookStore<S>
export type UseStore = <S extends object, SM extends object = S>(initialState: ValueInitializer<S | HookStore<S>>) => StoreSpread<S, S>
export type UseStoreMapped = <S extends object, SM extends object = S>(initialState: ValueInitializer<S | HookStore<S>>, mapper: StoreMapper<S, SM>) => StoreSpread<S, SM>