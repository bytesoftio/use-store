import { isEqual } from "lodash"
import { StoreDiffer } from "./types"

export const defaultDiffer: StoreDiffer<any> = (oldState, newState) => ! isEqual(oldState, newState)