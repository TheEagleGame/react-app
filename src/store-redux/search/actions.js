import axios from "axios";
export const TO_SEARCH = 'TO_SEARCH'
export const FETCH_VIDEO = 'FETCH_VIDEO'

export const search = (query) => ({
    type:TO_SEARCH,
    payload: query
})



export const fetchVideo = (data) => {
    return {
        type: FETCH_VIDEO,
        payload: data
    }
}

