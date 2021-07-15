import '../style/Auth.css'
import React, {useState} from "react";
import logo from './../assets/sibdev-logo.png'
import {Button, Input} from "antd";
import {useDispatch} from "react-redux";
import {signIn} from "../store-redux/auth/actions";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";

export const Auth = () => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='auth'>
            <div>
                <img src={logo} alt='logo_img'/>
                <h1 className='auth__title'> Вход </h1>
            </div>
            <div>
                <div className='auth-form'>
                    <h1 className='auth-form__title'>Логин</h1>
                    <Input
                        className='auth-form__input'
                        type='text'
                        autoComplete='new-password'
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>
                <div className='auth-form'>
                    <h1 className='auth-form__title'>Пароль</h1>
                    <Input.Password
                        className='auth-form__input'
                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        autoComplete='new-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <Button type="primary"
                    className='auth-button'
                    onClick={() => {
                        dispatch(signIn(login,password))
                        setPassword('')
                    }}>Войти</Button>
        </div>
    )
}