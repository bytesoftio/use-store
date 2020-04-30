import React from "react"
import { mount } from "enzyme"
import { Store, useStore, useStoreMapped } from "./index"
import { act } from "react-dom/test-utils"

describe("Store", () => {
  it("creates store with initial state", () => {
    const store = new Store({ foo: "bar" })

    expect(store.get()).toEqual({ foo: "bar" })
  })

  it("returns a copy of state", () => {
    const obj = { foo: "bar", baz: { yolo: "swag" } }
    const store = new Store(obj)

    expect(store.get()).toEqual(obj)
    expect(store.get() === obj).toBe(false)
    expect(store.get().baz === obj.baz).toBe(false)
  })

  it("sets state", () => {
    const store = new Store({ foo: "bar" })

    store.set({ foo: "baz" })

    expect(store.get()).toEqual({ foo: "baz" })
  })

  it("adds state", () => {
    const store = new Store({ foo: "bar", yolo: "swag" })

    store.add({ yolo: "bar" })

    expect(store.get()).toEqual({ foo: "bar", yolo: "bar" })
  })

  it("resets state to initial state", () => {
    const store = new Store<any>({ foo: "bar" })
    store.add({ yolo: "swag" })

    expect(store.get()).toEqual({ foo: "bar", yolo: "swag" })

    store.reset()
    expect(store.get()).toEqual({ foo: "bar" })
  })

  it("resets state to new initial state", () => {
    const store = new Store<any>({ foo: "bar" })

    store.reset()

    expect(store.get()).toEqual({ foo: "bar" })

    store.add({ yolo: "swag" })
    store.reset({ bar: "baz" })

    expect(store.get()).toEqual({ bar: "baz" })

    store.add({ yolo: "swag" })
    store.reset()

    expect(store.get()).toEqual({ bar: "baz" })
  })

  it("does not mutate previous state", () => {
    const store = new Store({ foo: "bar", yolo: "swag" })
    const state1 = store.get()
    const state2 = store.get()

    store.add({ yolo: "bar" })
    expect(state1).toEqual({ foo: "bar", yolo: "swag" })
    expect(state2).toEqual({ foo: "bar", yolo: "swag" })

    store.set({ foo: "bar", yolo: "baz" })
    expect(store.get()).toEqual({ foo: "bar", yolo: "baz" })
    expect(state1).toEqual({ foo: "bar", yolo: "swag" })
    expect(state2).toEqual({ foo: "bar", yolo: "swag" })
  })

  it("listens", () => {
    const store = new Store({ foo: "bar" })
    const callback = jest.fn()

    store.listen(callback)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith({ foo: "bar" })

    store.set({ foo: "baz" })

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith({ foo: "baz" })
  })

  it("uses state in react", async () => {
    const store = new Store({ count: 0 })

    let renders = 0
    const Test = () => {
      renders++
      const [state] = useStore(store)

      return (
        <h1>{state.count}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("0")

    act(() => store.set({ count: 1 }))

    expect(renders).toBe(2)
    expect(target().text()).toBe("1")
  })

  it("uses mapped state in react", async () => {
    const store = new Store({ count1: 0, count2: 2 })

    let renders = 0
    const Test = () => {
      renders++
      const [state] = useStoreMapped(store, (state) => ({ count: state.count1 }))

      return (
        <h1>{state.count}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("0")

    act(() => store.add({ count1: 1 }))

    expect(renders).toBe(2)
    expect(target().text()).toBe("1")

    act(() => store.add({ count2: 1 }))

    expect(renders).toBe(2)
  })
})