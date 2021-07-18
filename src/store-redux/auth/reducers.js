import {SIGN_IN, SIGN_OUT, SET_USERS, DELETE_FAVORITE_QUERY} from "./actions";


const initialState = {
    users: {},
    loggedUser: {
        login: '',
        password: '',
        id: ''
    },
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }

        case SIGN_IN:
            //проверить есть ли такой пользователь
            const index = state.users.findIndex(user => {
                return user.login === action.payload.login && user.password === action.payload.password
            })
            if (index === -1) {
                return {...state}
            } else {
                localStorage.token = state.users[index].token
                return {
                    ...state,
                    loggedUser: {
                        login: action.payload.login,
                        password: action.payload.password,
                        id: state.users[index].id,
                        favoriteQueries: state.users[index].favoriteQueries
                    },
                    isAuth: true
                }
            }
        case SIGN_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                loggedUser: {
                    login: '',
                    password: '',
                    id: ''
                },
                isAuth: false
            }
        case DELETE_FAVORITE_QUERY:
            const favoriteQueries = state.loggedUser.favoriteQueries
            debugger
            favoriteQueries.splice(action.payload.queryId,1)
            return {
                ...state,
                loggedUser: {
                    ...state.loggedUser,
                    favoriteQueries
                }
            }
        default:
            return state
    }
}