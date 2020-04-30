import { useEffect } from "react"
import { HookKind, HookStore, StoreCallback, StoreDiffer, StoreMapper, StoreMerger, StoreSpread } from "./types"
import { defaultMerger } from "./defaultMerger"
import { defaultDiffer } from "./defaultDiffer"
import { defaultMapper } from "./defaultMapper"
import { StoreListener } from "./StoreListener"
import { cloneDeep } from "lodash"
import { useValue } from "@bytesoftio/use-value"

export class Store<S extends object> implements HookStore<S> {
  initialState: S
  state: S
  merger: StoreMerger<S>
  differ: StoreDiffer<any>
  listeners: StoreListener<S, any>[]

  constructor(
    initialState: S,
    merger: StoreMerger<S> = defaultMerger,
    differ: StoreDiffer<S> = defaultDiffer,
  ) {
    this.initialState = { ...initialState }
    this.state = { ...this.initialState }
    this.differ = differ
    this.merger = merger
    this.listeners = []
  }

  get(): S {
    return cloneDeep(this.state)
  }

  set(newState: S) {
    const isDifferent = this.differ(this.state, newState)

    if (isDifferent) {
      this.state = newState
      this.notify()
    }
  }

  add(newState: Partial<S>) {
    const mergedNewState = this.merger(this.state, newState)

    this.set(mergedNewState)
  }

  reset(initialState?: S) {
    if (initialState) {
      this.initialState = { ...initialState }
    }

    this.set(this.initialState)
  }

  listen(callback: StoreCallback<S>): void {
    this.addListener(callback, defaultMapper, "plain")
  }

  use(): StoreSpread<S, S> {
    return this.useMapped(defaultMapper)
  }

  useMapped<SM extends object>(mapper: StoreMapper<S, SM>): StoreSpread<S, SM> {
    try {
      const [state, setState] = useValue(this.state)

      useEffect(() => {
        // try to hook into a component, whenever the state changes outside of react, it needs to be updated inside
        // react too, this is basically what happens here, returns a clean up function to unsubscribe from the store
        // whenever the component un-mounts
        return this.addListener((newState) => setState(newState as any), mapper, "react")
      }, [])
    } catch (err) {
    }

    return this.unpack(mapper)
  }

  protected unpack<SM extends object>(mapper: StoreMapper<S, SM> = defaultMapper): StoreSpread<S, SM> {
    const mappedState = mapper(this.state as any)

    return [
      mappedState,
      (newState) => this.set(newState),
      (newState) => this.add(newState),
      () => this.reset(),
    ]
  }

  protected addListener<SM extends object>(callback: StoreCallback<SM>, mapper: StoreMapper<S, SM> = defaultMapper, hookKind: HookKind = "react") {
    mapper = mapper ? mapper : defaultMapper

    const listener = new StoreListener<S, SM>(callback, this as any, mapper, this.differ)
    this.listeners.push(listener)

    if (hookKind === "plain") {
      listener.notify(this.state)
    }

    return () => {
      this.listeners = this.listeners.filter(item => item !== listener)
    }
  }

  protected notify() {
    this.listeners.forEach(listener => listener.notify(this.state as any))
  }
}