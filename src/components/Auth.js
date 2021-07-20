import '../style/Auth.css'
import React, {useState} from "react";
import logo from './../assets/sibdev-logo.png'
import {Button, Input} from "antd";
import {useDispatch} from "react-redux";
import {signIn} from "../store-redux/auth/actions";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {Formik} from "formik";

export const Auth = () => {
    const dispatch = useDispatch()

    return (
        <Formik
                initialValues={{name: '', password: ''}}
        >
            {({values, handleChange, setFieldValue}) => (
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
                                value={values.name}
                                name="name"
                                onChange={handleChange('name')}
                            />
                        </div>
                        <div className='auth-form'>
                            <h1 className='auth-form__title'>Пароль</h1>
                            <Input.Password
                                className='auth-form__input'
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                autoComplete='new-password'
                                value={values.password}
                                name="password"
                                onChange={handleChange('password')}
                            />
                        </div>
                    </div>
                    <Button type="primary"
                            className='auth-button'
                            onClick={() => {
                                dispatch(signIn(values.name,values.password))
                                setFieldValue('password', '')
                            }}>Войти</Button>
                </div>
            )}
        </Formik>
    )
}