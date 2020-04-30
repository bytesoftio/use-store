# @bytesoftio/use-store

## Installation

`yarn add @bytesoftio/use-store` or `npm install @bytesoftio/use-store`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [Usage](#usage)
  - [createStore](#createstore)
  - [HookStore](#hookstore)
  - [useStore](#usestore)
  - [useStoreMapped](#usestoremapped)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

Similar to the `@bytesoftio/use-value` package, this one is optimized for use with objects. It comes with
differs, mergers and can be used with a custom mapper / connector.

## Usage

### createStore

Creates a new instance of `HookStore` that can be used inside React, with hooks, as well as outside of the React world.

```ts
import { createStore } from "@bytesoftio/use-store"

// create a new store from initial state
const store1 = createStore({some: "data"})
// create a new store through an initializer / factory
const store2 = createStore(() => ({some: "data"}))
```

### HookStore

This object can be used inside React, with the `useStore` hook, as well as outside of React. It is a very simple, 
observable like object, and comes with many useful methods, necessary to be able to use it outside of React.

```tsx
import React from "react"
import { createStore } from "@bytesoftio/use-store"

const store = createStore({firstName: "John", lastName: "Doe"})

// get the underlying store value, read only
store.get()

// update all of the store data
store.set({firstName: "Steve", lastName: "Jobs"})

// update some of the store data
store.add({lastName: "Wozniak"})

// reset store back to initial state {firstName: "John", lastName: "Doe"}
store.reset()

// reset store state and change its initial value
store.reset({firstName: "James", lastName: "Bond"})

// listen to state changes outside of React
store.listen(state => console.log(state))

// use store similar to how you would use it in React
const [state, setState, addState, resetState] = store.use()

const Component = () => {
  const [state, setState, addState, resetState] = store.use()
  const changeName = () => setState({firstName: "Nikola", lastName: "Tesla"})

  return (
    <button onClick={changeName}>{state.firstName}</button>
  )
}
```

### useStore

For convenience, this helper can be used to hook up a store inside a
component, similar to `HookStore.use()`.

```tsx
import React from "react"
import { createStore, useStore } from "@bytesoftio/use-store"

const globalStore = createStore({count: 0})

const Component = () => {
  // create a new store from initial state
  const [state, setState, addState, resetState] = useStore(() => {count: 0})
  // create a new store through an initializer / factory function
  const [globalState, setGlobalState, addGlobalState, resetGlobalState] = useStore(globalStore) 
  
  const increment = () => addState({ count: state.count + 1 })
  const incrementGlobal = () => addGlobalState({ count: globalState.count + 1 })
 
  return (
    <div>
      <button onClick={increment}>local count: {state.count}</button>    
      <button onClick={incrementGlobal}>global count: {globalState.count}</button>    
    </div>
  )
} 
```

### useStoreMapped

When using big stores, you might want to only use a subset of its data, to improve performance, or change the
structure to your likings. You can do this with a mapper.

 ```tsx
import React from "react"
import { createStore, useStoreMapped } from "@bytesoftio/use-store"

const globalStore = createStore({firstName: "John", lastName: "Doe", otherData: "irrelevant"})

const Component = () => {
  const [state, setState, addState, resetState] = useStoreMapped(globalStore, (state) => {
    return {fullName: `${state.firstName} ${state.lastName}`}
  })

  return (
    <div>
      I will only rerender when <b>firstName</b> or <b>lastName</b> have changed. The name is: {state.fullName}
    </div>
  )
}
``` 