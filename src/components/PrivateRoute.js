import {Redirect, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../store-redux/auth/actions";


export const PrivateRoute = ({component: Component, ...props}) => {
    const users = useSelector(state => state.auth.users)
    useEffect(() => {
        debugger
        if (Object.keys(users).length !== 0) {
            setIsUserFetched(true)
        }
    }, [users])
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const [isUsersFetched, setIsUserFetched] = useState(false)
    /*return (
        <Route
            {...rest}
            render={() => {

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
    )*/
    if (isAuth) {
        return <Route {...props}>
            <Component/>
        </Route>
    }
    debugger
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
            return <Route {...props}>
                <Component/>
            </Route>
        }
    } else
        return <Redirect to='/'/>
}