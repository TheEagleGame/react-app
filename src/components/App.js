import '../style/App.css'
import React, {useEffect} from "react";
import {Auth} from "./Auth";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../store-redux/auth/api";
import {checkUser} from "../store-redux/auth/actions";
import {Redirect} from "react-router-dom";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        async function initializeUser() {
            await dispatch(fetchUsers())
        }
        initializeUser()
            .then(() => dispatch(checkUser()))
    }, [dispatch])
    const isAuth = useSelector(state => state.auth.isAuth)
    return isAuth
        ? <Redirect to='/home'/>
        : <div>
            <div className='layout'>
                <Auth/>
            </div>
        </div>

}

export default App;
