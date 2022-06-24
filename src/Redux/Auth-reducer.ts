import {ActionsType} from "./Store";
import {authAPI, securityApi} from "../API/api";
import {AppThunkType} from "./Redux-store";
import {stopSubmit} from "redux-form";


const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const SET_CAPTCHA_URL = "samurai-network/auth/SET_CAPTCHA_URL";

export type initialStateType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean,
    captchaUrl: null | string
}

const initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

export const authReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export let setAuthUserData = (userID: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {id: userID, email, login, isAuth}
} as const);

export let setCaptchaUrl = (captchaUrl: string) => ({
    type: SET_CAPTCHA_URL,
    payload: {captchaUrl}
} as const);



export let getAuthUserData = (): AppThunkType<Promise<any>> => async (dispatch) => {
   let response = await authAPI.me()
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(setAuthUserData(id, email, login, true));
        }
}

export let login = (email: string, password: string | number, rememberMe: boolean, captcha: string): AppThunkType => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error'
            dispatch(stopSubmit('login', {_error: message}))
        }
}

export let logout = (): AppThunkType => async (dispatch) => {
    let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
}

export let getCaptchaUrl = (): AppThunkType => async (dispatch) => {
    const response = await securityApi.getCaptcha()
     dispatch(setCaptchaUrl(response.data.url))
}