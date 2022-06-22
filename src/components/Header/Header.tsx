import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean
    login: null | string
    logout: () => void
}

export function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <img
                src='https://www.vectorkhazana.com/assets/images/products/wolf-Head-5.jpg'
                alt="logo"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login}<button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}