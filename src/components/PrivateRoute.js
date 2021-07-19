import {Redirect, Route} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

export function PrivateRoute({component: Component, ...props}) {
    const loggedIn = useSelector(state => state.auth.isAuth);

    if (!loggedIn) {
        return <Redirect to='/' />
    }
    return (
        <Route {...props}>
            <Component />
        </Route>
    );
}