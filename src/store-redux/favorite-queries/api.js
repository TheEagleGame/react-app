import axios from "axios";
import {setUsers, signIn} from "../auth/actions";

export const addFavoriteQuery = (queryString, queryName, queryResultCount, querySort) => {
    debugger
    return async (dispatch, getState) => {
        const loggedUser = getState().auth.loggedUser
        await axios.patch(`http://localhost:3000/users/${loggedUser.id}`,
            {
                login: loggedUser.login,
                password: loggedUser.password,
                id: loggedUser.id,
                token: localStorage.token,
                favoriteQueries: [...loggedUser.favoriteQueries, {
                    queryString,
                    queryName,
                    queryResultCount,
                    querySort,
                    id: loggedUser.favoriteQueries.length // костыль
                }]
            })
        const response = await axios.get('http://localhost:4000/users')
        dispatch(setUsers(response.data))
        dispatch(signIn(loggedUser.login, loggedUser.password))
    }
}

export const updateFavoriteQuery = () => {
    return async (dispatch, getState) => {
        const loggedUser = getState().auth.loggedUser
        await axios.patch(`http://localhost:4000/users/${loggedUser.id}`,
            {
                login: loggedUser.login,
                password: loggedUser.password,
                id: loggedUser.id,
                token: localStorage.token,
                favoriteQueries: [...loggedUser.favoriteQueries]
            })
        const response = await axios.get('http://localhost:4000/users')
        dispatch(setUsers(response.data))
        dispatch(signIn(loggedUser.login, loggedUser.password))
    }
}
