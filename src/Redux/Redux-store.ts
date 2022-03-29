import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./Profile-reducer";
import {dialogsReducer} from "./Dialogs-reducer";
import {usersReducer} from "./Users-reducer";
import {authReducer} from "./Auth-reducer";
import thunkMiddleWare from "redux-thunk";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
});



export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

// export type AppStoreType = typeof store;
export type AppStateType = ReturnType<typeof rootReducer>;


