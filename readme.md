# @bytesoftio/use-store

## Installation

`yarn add @bytesoftio/use-store` or `npm install @bytesoftio/use-store`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
  - [useStore](#usestore)

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
  // create a new store from initial state, returns a state object and 
  // the actual store that has been connected to React
  const store1 = useStore(() => ({count: 0}))

  // create a new store through an initializer / factory function
  const store2 = useStore(globalStore) 
  
  const increment = () => store1.set({ count: store1.count + 1 })
  const incrementGlobal = () => store2.set({ count: store2.count + 1 })
 
  return (
    <div>
      <button onClick={increment}>local count: {store1.get().count}</button>    
      <button onClick={incrementGlobal}>global count: {store2.get().count}</button>    
    </div>
  )
} 
```
