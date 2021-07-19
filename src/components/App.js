import '../style/App.css'
import React, {useEffect} from "react";
import {Auth} from "./Auth";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {fetchUsers} from "../store-redux/auth/api";
import {checkUser} from "../store-redux/auth/actions";

function App() {
    const dispatch = useDispatch()
    useEffect( async () => {
        await dispatch(fetchUsers())
        dispatch(checkUser())
    },[dispatch])
      const isAuth = useSelector(state => state.auth.isAuth)
      const history = useHistory()
      if (isAuth) {
          history.push('/home')
      }
    return (
        <div>
            <div className='layout'>
                <Auth/>
            </div>
        </div>
    )
}

export default App;
