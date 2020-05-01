import React from "react"
import { mount } from "enzyme"
import { useStoreMapped } from "./index"
import { createStore } from "@bytesoftio/store"

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
})