import React from "react";
import {AppStateType} from "../Redux/Redux-store";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

export type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T> (Component: React.ComponentType<T>) {
        const RedirectComponent = (props: MapStateToPropsType) => {
                let {isAuth, ...restProps} = props;
                if(!isAuth) return <Redirect to={'/login'}/>
                return <Component {...restProps as T}/>
        }

   let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedRedirectComponent
}



