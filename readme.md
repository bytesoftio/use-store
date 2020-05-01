# @bytesoftio/use-store

## Installation

`yarn add @bytesoftio/use-store` or `npm install @bytesoftio/use-store`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
  - [useStore](#usestore)
  - [useStoreMapped](#usestoremapped)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

This package provides a React integration for [@bytesoftio/store](https://github.com/bytesoftio/store).

### useStore

Use this helper to hook up a store inside a React component.

```tsx
import React from "react"
import { createStore } from "@bytesoftio/store"
import { useStore } from "@bytesoftio/use-store"

const globalStore = createStore({count: 0})

const Component = () => {
  // create a new store from initial state
  const [state, setState, addState, resetState] = useStore(() => ({count: 0}))
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

When consuming big stores, you might want to only use a subset of its data, to improve performance, or change the data structure to your likings. You can do this with a mapper.

 ```tsx
import React from "react"
import { createStore } from "@bytesoftio/store"
import { useStoreMapped } from "@bytesoftio/use-store"

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