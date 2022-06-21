import {ActionsType} from "./Store";
import {authAPI} from "../API/api";
import {AppThunkType} from "./Redux-store";
import {stopSubmit} from "redux-form";


const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";

export type initialStateType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

const initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

export const authReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export let setAuthUserData = (userID: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {id: userID, email, login, isAuth}
} as const);

export let getAuthUserData = (): AppThunkType<Promise<any>> => async (dispatch) => {
   let response = await authAPI.me()
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(setAuthUserData(id, email, login, true));
        }
}

export let login = (email: string, password: string | number, rememberMe: boolean): any => async (dispatch: any) => {

    let response = await authAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
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