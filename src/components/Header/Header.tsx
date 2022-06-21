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
                src='https://banner2.cleanpng.com/20180403/egw/kisspng-2017-tesla-model-x-tesla-motors-iphone-x-car-tesla-5ac30fbeb517f5.9739984715227329907418.jpg'
                alt="logo"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login}<button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}