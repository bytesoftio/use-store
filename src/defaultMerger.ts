import { isObjectLike } from "lodash"
import { StoreMerger } from "./types"

export const defaultMerger: StoreMerger<any> = (oldState, newState) => {
  if (isObjectLike(oldState) && isObjectLike(newState)) {
    return { ...oldState, ...newState }
  }

  return newState as any
}