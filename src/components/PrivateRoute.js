import {Redirect, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUser, signIn} from "../store-redux/auth/actions";


export const PrivateRoute = ({component: Component, ...rest}) => {
    useEffect(() => {
        if (Object.keys(users).length !== 0) {
            setIsUserFetched(true)
        }
    }, [])
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    console.log('isAuth',isAuth)
    const users = useSelector(state => state.auth.users)
    console.log('users',users)
    const [isUsersFetched, setIsUserFetched] = useState(false)
    debugger
    return (
        <Route
            {...rest}
            render={() => {
                debugger
                if (isAuth) {
                    return <Component/>
                }

                if (localStorage.token && !isAuth && isUsersFetched) {
                    const index = users.findIndex(user => {
                        return user.token === localStorage.token
                    })
                    if (index === -1) {
                        return <Redirect to='/'/>
                    } else {
                        dispatch(signIn(
                            users[index].login,
                            users[index].password,
                        ))
                        return <Component/>
                    }
                } else {
                    return <Redirect to='/'/>
                }
            }}
        />
    )
}