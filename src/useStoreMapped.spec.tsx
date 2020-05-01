import React from "react"
import { mount } from "enzyme"
import { useStoreMapped } from "./index"
import { createStore } from "@bytesoftio/store"
import { act } from "react-dom/test-utils"

describe("useStoreMapped", () => {
  it("uses mapped store with initializer", () => {
    const store = createStore({ foo: "bar" })

    const Test = () => {
      const [state] = useStoreMapped(store, (state) => ({ bar: state.foo }))

      return (
        <h1>{state.bar}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("bar")
  })

  it("updates and resets state", () => {
    const store = createStore({ foo: "bar" })
    let renders = 0
    let receivedSetState
    let receivedAddState
    let receivedResetState

    const Test = () => {
      renders++
      const [state, setState, addState, resetState] = useStoreMapped(store, (state) => ({ bar: state.foo }))
      receivedSetState = setState
      receivedAddState = addState
      receivedResetState = resetState

      return (
        <h1>{state.bar}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("bar")
    expect(store.get()).toEqual({foo: "bar"})
    expect(renders).toBe(1)

    act(() => receivedSetState({foo: "baz"}))

    expect(target().text()).toBe("baz")
    expect(store.get()).toEqual({foo: "baz"})
    expect(renders).toBe(2)

    act(() => receivedSetState({foo: "baz", yolo: "swag"}))

    expect(target().text()).toBe("baz")
    expect(store.get()).toEqual({foo: "baz", yolo: "swag"})
    expect(renders).toBe(2)

    act(() => receivedAddState({foo: "bar", ding: "dong"}))

    expect(target().text()).toBe("bar")
    expect(store.get()).toEqual({foo: "bar", yolo: "swag", ding: "dong"})
    expect(renders).toBe(3)

    act(() => receivedResetState())

    expect(target().text()).toBe("bar")
    expect(store.get()).toEqual({foo: "bar"})
    expect(renders).toBe(3)

    act(() => receivedResetState({foo: "baz", yolo: "swag"}))

    expect(target().text()).toBe("baz")
    expect(store.get()).toEqual({foo: "baz", yolo: "swag"})
    expect(renders).toBe(4)

    act(() => store.set({foo: "bar"}))

    expect(target().text()).toBe("bar")
    expect(store.get()).toEqual({foo: "bar"})
    expect(renders).toBe(5)

    act(() => store.set({foo: "baz", yolo: "swag"} as any))

    expect(target().text()).toBe("baz")
    expect(store.get()).toEqual({foo: "baz", yolo: "swag"})
    expect(renders).toBe(6)

    act(() => store.add({foo: "bar", ding: "dong"} as any))

    expect(target().text()).toBe("bar")
    expect(store.get()).toEqual({foo: "bar", yolo: "swag", ding: "dong"})
    expect(renders).toBe(7)

    act(() => store.reset())

    expect(target().text()).toBe("baz")
    expect(store.get()).toEqual({foo: "baz", yolo: "swag"})
    expect(renders).toBe(8)

    act(() => store.reset({foo: "baz", yolo: "swag"} as any))

    expect(target().text()).toBe("baz")
    expect(store.get()).toEqual({foo: "baz", yolo: "swag"})
    expect(renders).toBe(8)
  })
})