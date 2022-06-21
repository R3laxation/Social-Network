import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import { login } from "../../Redux/Auth-reducer";
import {AppStateType} from "../../Redux/Redux-store";
import {Redirect} from "react-router";
import s from '../Common/FormsControls/FormsControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginForm = ({handleSubmit, error}: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField('Email', 'email', [required], Input)}
                {/*<Field placeholder={"Email"} name={"email"} component={Input} validate={[required]}/>*/}
                {createField('Password', 'password', [required], Input, {type: 'password'})}
                {/*<Field placeholder={"Password"} name={"password"} component={Input} validate={[required]} type={'password'}/>*/}
                {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'RememberMe')}
                {/*<Field type={"checkbox"} name={"rememberMe"} component={Input} validate={[required]}/> Remember me!*/}
            {error && <div className={s.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: "login"})(LoginForm)


type LoginPropsType = {}

export type MapStateToPropsType = {
    isAuth: boolean
}
export type MapDispatchToPropsType = {
    login: (email: string, password: string | number, rememberMe: boolean) => void
}

type ownPropsType = MapStateToPropsType & MapDispatchToPropsType ;

const Login = (props: ownPropsType) => {

    const onSumbit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSumbit}/>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, LoginPropsType, AppStateType>(mapStateToProps, {login})(Login)
// export default connect(null, {login})(Login)