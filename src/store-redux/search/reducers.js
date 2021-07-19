import {FETCH_VIDEO, TO_SEARCH} from "./actions";

const initialState = {
    query: {},
    video:[]
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case TO_SEARCH:
            console.log(action.payload)
            return {
                ...state,
                query: {
                    queryString: action.payload.queryString,
                    queryResultCount: action.payload.queryResultCount,
                    querySort: action.payload.querySort
                }
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