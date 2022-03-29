import {ActionsType, setAuthUsersData} from "./Store";
import {authAPI} from "../API/api";

const SET_USER_DATA = "SET_USER_DATA";

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

export const authReducer = (state= initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true};
        default:
            return state;
    }
}

export let setAuthUserData = (userID: number, email: string, login: string) => ({
    type: SET_USER_DATA,
    data: {userID, email, login}
} as const);

export let getAuthUserData = () => (dispatch: (action: setAuthUsersData) => void) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(setAuthUserData(id, email, login));
        }
    })
}