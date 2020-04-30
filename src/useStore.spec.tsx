import React from "react"
import { mount } from "enzyme"
import { createStore, useStore } from "./index"

describe("useStore", () => {
  it("uses store", async () => {
    const store = createStore({ foo: "bar" })

    const Test = () => {
      const [state] = useStore(store)

      return (
        <h1>{state.foo}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("bar")
  })

  it("uses store with initializer", () => {
    const initializer = () => createStore({ foo: "bar" })

    const Test = () => {
      const [state] = useStore(initializer)

      return (
        <h1>{state.foo}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("bar")
  })

  it("uses new store", () => {
    const initializer = { foo: "bar" }

    const Test = () => {
      const [state] = useStore(initializer)

      return (
        <h1>{state.foo}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("bar")
  })

  it("uses new store with initializer", () => {
    const initializer = () => ({ foo: "bar" })

    const Test = () => {
      const [state] = useStore(initializer)

      return (
        <h1>{state.foo}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("bar")
  })
})