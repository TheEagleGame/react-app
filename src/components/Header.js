import React, {useEffect, useState} from "react";
import '../style/Header.css'
import logo from './../assets/sibdev-logo.png'
import {useDispatch} from "react-redux";
import {signOut} from "../store-redux/auth/actions";
import {NavLink, useLocation} from "react-router-dom";



export const Header = () => {
    const dispatch = useDispatch()
    let location = useLocation()
    const { pathname } = location;
    console.log(pathname)
    const [sectionActive, setSectionActive] = useState('')
    useEffect(() => {
        if (pathname === '/home' || pathname === '/home/search') {
            setSectionActive('search')
        }
        if (pathname === '/home/favorite-queries') {
            setSectionActive('favorite-queries')
        }
    },[])
    debugger
    return (
        <div className='header'>
            <nav className='header-nav'>
                <img className='header-nav__logo' src={logo}/>
                <NavLink to='/home'>
                    <div className={`header-nav__text ${sectionActive === 'search' ? 'active' : ''}`}>Поиск</div>
                </NavLink>
                <NavLink to='/home/favorite-queries'>
                    <div className={`header-nav__text ${sectionActive === 'favorite-queries' ? 'active' : ''}`}>Избранное</div>
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