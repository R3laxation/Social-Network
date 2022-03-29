import {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../Redux/Redux-store";
import {connect} from "react-redux";

export type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T> (Component: ComponentType<T>) {
        const RedirecComponent = (props: MapStateToPropsType) => {
                let {isAuth, ...restProps} = props;
                if(!isAuth) return <Redirect to={'/login'}/>
                return <Component {...restProps as T}/>
        }

   let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirecComponent);

    return ConnectedRedirectComponent
}



