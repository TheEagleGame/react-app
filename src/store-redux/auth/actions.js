
export const SET_USERS = 'SET_USERS'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'

export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users
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


