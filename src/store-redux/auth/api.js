import axios from "axios";
import {setUsers} from "./actions";

export const fetchUsers = () => {
    return async (dispatch) => {
        const response = await axios.get('http://localhost:4000/users')
        dispatch(setUsers(response.data))

    }
}