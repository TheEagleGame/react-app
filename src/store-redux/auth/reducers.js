import {SIGN_IN, SIGN_OUT, SET_USERS} from "./actions";


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
        default:
            return state
    }
}