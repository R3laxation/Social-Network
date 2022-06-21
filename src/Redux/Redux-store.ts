import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import {profileReducer} from "./Profile-reducer";
import {dialogsReducer} from "./Dialogs-reducer";
import {usersReducer} from "./Users-reducer";
import {authReducer} from "./Auth-reducer";
import thunkMiddleWare, { ThunkAction } from "redux-thunk";
import {reducer as formReducer} from  'redux-form'
import {ActionsType} from "./Store";
import {appReducer} from "./App-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

//@ts-ignore
export const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;
export const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunkMiddleWare)));

// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

// export type AppStoreType = typeof store;
export type AppStateType = ReturnType<typeof rootReducer>;

export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType, AppStateType, unknown, ActionsType>


