import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/Auth-reducer";
import {AppStateType} from "../../Redux/Redux-store";
import {Redirect} from "react-router";
import s from '../Common/FormsControls/FormsControls.module.css'

type FormPropsType = {
    captchaUrl: null | string
}

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export const LoginForm = ({
                              handleSubmit,
                              error,
                              captchaUrl
                          }: InjectedFormProps<FormDataType, FormPropsType> & FormPropsType) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {/*<Field placeholder={"Email"} name={"email"} component={Input} validate={[required]}/>*/}
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            {/*<Field placeholder={"Password"} name={"password"} component={Input} validate={[required]} type={'password'}/>*/}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'RememberMe')}
            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input)}
            {/*<Field type={"checkbox"} name={"rememberMe"} component={Input} validate={[required]}/> Remember me!*/}
            {error && <div className={s.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType, FormPropsType>({form: "login"})(LoginForm)


type LoginPropsType = {}

export type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: null | string
}
export type MapDispatchToPropsType = {
    login: (email: string, password: string | number, rememberMe: boolean, captcha: string) => void
}

type ownPropsType = MapStateToPropsType & MapDispatchToPropsType;

const Login = (props: ownPropsType) => {

    const onSumbit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSumbit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, LoginPropsType, AppStateType>(mapStateToProps, {login})(Login)
// export default connect(null, {login})(Login)