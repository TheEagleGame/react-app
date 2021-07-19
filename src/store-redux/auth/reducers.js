import {SIGN_IN, SIGN_OUT, SET_USERS, DELETE_FAVORITE_QUERY, CHANGE_FAVORITE_QUERY, CHECK_USER} from "./actions";


const initialState = {
    users: {},
    loggedUser: {
        login: '',
        password: '',
        id: '',
        favoriteQueries: []
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
        case CHECK_USER:
            const indexOfUser = state.users.findIndex(user => user.token === localStorage.token)
            if (indexOfUser === -1) {
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    loggedUser: {
                        login: state.users[indexOfUser].login,
                        password: state.users[indexOfUser].password,
                        id: state.users[indexOfUser].id,
                        favoriteQueries: state.users[indexOfUser].favoriteQueries
                    },
                    isAuth: true
                }
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
            favoriteQueries.splice(action.payload.queryId, 1)
            return {
                ...state,
                loggedUser: {
                    ...state.loggedUser,
                    favoriteQueries
                }
            }
        case CHANGE_FAVORITE_QUERY:
            return {
                ...state,
                loggedUser: {
                    ...state.loggedUser,
                    favoriteQueries:
                        state.loggedUser.favoriteQueries.map(query => query.id !== action.payload.id
                            ? query
                            : {
                                queryName: action.payload.name,
                                queryString: action.payload.query,
                                queryResultCount: action.payload.count,
                                querySort: action.payload.sort,
                                id: action.payload.id
                            }
                        )
                }
            }
        default:
            return state
    }
}