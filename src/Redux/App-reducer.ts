import {ActionsType} from "./Store";
import {AppThunkType} from "./Redux-store";
import {getAuthUserData} from "./Auth-reducer";



const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type initialStateType = {
    initialized: boolean
}

const initialState: initialStateType = {
    initialized: false
};

export const appReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true};
        default:
            return state;
    }
}

export let initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
} as const);

export let InitializeApp = (): AppThunkType<Promise<any>> => (dispatch) => {
    return dispatch(getAuthUserData()).then((res) => {
        dispatch(initializedSuccess())
    })
}


