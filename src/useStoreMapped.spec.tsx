import React from "react"
import { mount } from "enzyme"
import { useStoreMapped } from "./index"
import { createStore, ObservableStore } from "@bytesoftio/store"
import { act } from "react-dom/test-utils"

describe("useStoreMapped", () => {
  it("uses mapped store with initializer", () => {
    const store = createStore({ foo: "bar" })

    const Test = () => {
      const [state] = useStoreMapped(store, (state) => ({ bar: state.foo }))

      return (
        <h1>{ state.bar }</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("bar")
  })

  it("updates and resets state", () => {
    const sharedStore = createStore({ foo: "bar" })
    let renders = 0
    let receivedStore: ObservableStore<any>

    const Test = () => {
      renders++
      const [state, store] = useStoreMapped(sharedStore, (state) => ({ bar: state.foo }))
      receivedStore = store

      return (
        <h1>{ state.bar }</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("bar")
    expect(sharedStore.get()).toEqual({ foo: "bar" })
    expect(renders).toBe(1)

    act(() => receivedStore.set({ foo: "baz" }))

    expect(target().text()).toBe("baz")
    expect(sharedStore.get()).toEqual({ foo: "baz" })
    expect(renders).toBe(2)

    act(() => receivedStore.set({ foo: "baz", yolo: "swag" }))

    expect(target().text()).toBe("baz")
    expect(sharedStore.get()).toEqual({ foo: "baz", yolo: "swag" })
    expect(renders).toBe(2)

    act(() => receivedStore.add({ foo: "bar", ding: "dong" }))

    expect(target().text()).toBe("bar")
    expect(sharedStore.get()).toEqual({ foo: "bar", yolo: "swag", ding: "dong" })
    expect(renders).toBe(3)

    act(() => receivedStore.reset())

    expect(target().text()).toBe("bar")
    expect(sharedStore.get()).toEqual({ foo: "bar" })
    expect(renders).toBe(3)

    act(() => receivedStore.reset({ foo: "baz", yolo: "swag" }))

    expect(target().text()).toBe("baz")
    expect(sharedStore.get()).toEqual({ foo: "baz", yolo: "swag" })
    expect(renders).toBe(4)

    act(() => sharedStore.set({ foo: "bar" }))

    expect(target().text()).toBe("bar")
    expect(sharedStore.get()).toEqual({ foo: "bar" })
    expect(renders).toBe(5)

    act(() => sharedStore.set({ foo: "baz", yolo: "swag" } as any))

    expect(target().text()).toBe("baz")
    expect(sharedStore.get()).toEqual({ foo: "baz", yolo: "swag" })
    expect(renders).toBe(6)

    act(() => sharedStore.add({ foo: "bar", ding: "dong" } as any))

    expect(target().text()).toBe("bar")
    expect(sharedStore.get()).toEqual({ foo: "bar", yolo: "swag", ding: "dong" })
    expect(renders).toBe(7)

    act(() => sharedStore.reset())

    expect(target().text()).toBe("baz")
    expect(sharedStore.get()).toEqual({ foo: "baz", yolo: "swag" })
    expect(renders).toBe(8)

    act(() => sharedStore.reset({ foo: "baz", yolo: "swag" } as any))

    expect(target().text()).toBe("baz")
    expect(sharedStore.get()).toEqual({ foo: "baz", yolo: "swag" })
    expect(renders).toBe(8)
  })
})
