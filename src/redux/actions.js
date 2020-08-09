import { CLICK, ZERO } from "./types"

export function click() {
    return {
        type: CLICK
    }
}

export function zero() {
    return {
        type: ZERO
    }
}