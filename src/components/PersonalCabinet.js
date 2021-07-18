import {Header} from "./Header";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import "../style/PersonalCabinet.css";
import {search} from "../store-redux/search/actions";
import {Input} from "antd";

const {Search} = Input

export const PersonalCabinet = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const history = useHistory()
    return(
        <div className='cabinet'>
        <Header/>
            <div className='search-container'>
                <h1 className='search-container__title'>Поиск видео</h1>
                <div className='search'>
                    <Search
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className='search__input'
                        placeholder="Что хотите посмотреть?"
                        enterButton="Найти"
                        size="large"
                        onSearch={() => {
                            dispatch(search(value))
                            setValue('')
                            history.push('home/search')}}
                    />
                </div>
            </div>
        </div>
    )
}