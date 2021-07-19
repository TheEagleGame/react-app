
export const SET_USERS = 'SET_USERS'
export const CHECK_USER = 'CHECK_USER'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const DELETE_FAVORITE_QUERY = 'DELETE_FAVORITE_QUERY'
export const CHANGE_FAVORITE_QUERY = 'CHANGE_FAVORITE_QUERY'

export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users
})

export const checkUser = () => ({
    type: CHECK_USER
})

export const signIn = (login, password) => ({
    type: SIGN_IN,
    payload: {
        login,
        password
    }
})

export const signOut = () => ({
    type: SIGN_OUT
})

export const deleteFavoriteQuery = (id) => ({
    type: DELETE_FAVORITE_QUERY,
    payload: id
})

export const changeFavoriteQuery = (query, name, count, id, sort) => ({
    type:CHANGE_FAVORITE_QUERY,
    payload: {
        query,
        name,
        count,
        sort,
        id
    }
})

