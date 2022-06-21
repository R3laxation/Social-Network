import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {logout} from "../../Redux/Auth-reducer";


type HeaderContainerPropsType = {}

type MapStateToPropsType = {
    isAuth: boolean
    login: null | string
}

type MapDispatchToPropsType = {
    logout: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class HeaderContainer extends React.Component <PropsType>{

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, HeaderContainerPropsType, AppStateType >(mapStateToProps,
    {logout})(HeaderContainer)