import React from "react";
import '../style/Header.css'
import logo from './../assets/sibdev-logo.png'
import {useDispatch} from "react-redux";
import {signOut} from "../store-redux/auth/actions";
import {NavLink} from "react-router-dom";

export const Header = () => {
    const dispatch = useDispatch()
    return (
        <div className='header'>
            <nav className='header-nav'>
                <img className='header-nav__logo' src={logo}/>
                <NavLink to='/home'>
                    <div className='header-nav__text'>Поиск</div>
                </NavLink>
                <NavLink to='/home/favorite'>
                    <div className='header-nav__text'>Избранное</div>
                </NavLink>
            </nav>
            <NavLink to='/'>
                <div className='header-nav__text' onClick={() => {
                    dispatch(signOut())
                }}> Выход
                </div>
            </NavLink>
        </div>
    )
}