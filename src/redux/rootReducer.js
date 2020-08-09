import { CLICK, ZERO } from "./types"

const initialState = {
    counter: 0,
}


export const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case CLICK:
            return { ...state, counter: state.counter + 1 }
        case ZERO:
            return {...state, counter: 0}
        default:
            return state
    }
}