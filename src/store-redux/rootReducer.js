import {combineReducers} from "redux";
import {authReducer} from "./auth/reducers";
import {searchReducer} from "./search/reducers";


export let rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer
})