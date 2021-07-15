import {FETCH_VIDEO, TO_SEARCH} from "./actions";

const initialState = {
    queryString: '',
    video:[]
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case TO_SEARCH:
            return {
                ...state,
                queryString: action.payload
            }
        case FETCH_VIDEO:
           return {
               ...state,
               video: action.payload
           }
        default:
            return state
    }
}