import {addPost, savePhotoSuccess, setStatus, setUsersProfile} from "./Profile-reducer";
import {sendMessageBodyCreator} from "./Dialogs-reducer";
import {
    followSuccess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toogleFollowingProgress,
    toogleIsFetching,
    unfollowSuccess
} from "./Users-reducer";
import {setAuthUserData, setCaptchaUrl} from "./Auth-reducer";
import {initializedSuccess} from "./App-reducer";

// export type StoreType = {
//     _state: StateType
//     getState: () => StateType
//     setState: (state: StateType) => void
//     _callSubscriber: (state: StateType) => void
//     subscribe: (listener: (state: StateType) => void) => void
//     dispatch: (action: ActionsType) => void
// }

// export type StateType = {
//     profilePage: ProfilePageStateType
//     dialogsPage: DialogsPageStateType
// }

// export type ProfilePageStateType = {
//     posts: Array<PostsStateType>
//     newPostText: string
// }
// export type PostsStateType = {
//     id: number
//     message: string
//     likesCount: string
// }
// export type DialogsPageStateType = {
//     dialogs: Array<DialogsStateType>
//     messages: Array<MessagesStateType>
//     newMessageBody: string
// }
// export type DialogsStateType = {
//     id: number
//     name: string
// }
// export type MessagesStateType = {
//     id: number
//     message: string
// }

export type ActionsType =
    AddPostActionType
    | SendMessageActionType
    | FollowedUserActionType
    | UnFollowedUserActionType
    | SetUsersActionType
    | SetCurrentPageType
    | SetTotalUsersCountType
    | toogleIsFetchingType
    | setUsersProfileType
    | setAuthUsersData
    | toogleFollowingProgressType
    | setStatusType
    | initializedSuccess |
    savePhotoSuccess | setCaptchaUrl

export type AddPostActionType = ReturnType<typeof addPost>;
export type SendMessageActionType = ReturnType<typeof sendMessageBodyCreator>;
export type FollowedUserActionType = ReturnType<typeof followSuccess>;
export type UnFollowedUserActionType = ReturnType<typeof unfollowSuccess>;
export type SetUsersActionType = ReturnType<typeof setUsers>;
export type SetCurrentPageType = ReturnType<typeof setCurrentPage>;
export type SetTotalUsersCountType = ReturnType<typeof setTotalUsersCount>;
export type toogleIsFetchingType = ReturnType<typeof toogleIsFetching>;
export type setUsersProfileType = ReturnType<typeof setUsersProfile>;
export type setAuthUsersData = ReturnType<typeof setAuthUserData>;
export type toogleFollowingProgressType = ReturnType<typeof toogleFollowingProgress>;
export type setStatusType = ReturnType<typeof setStatus>;
export type initializedSuccess = ReturnType<typeof initializedSuccess>
export type savePhotoSuccess = ReturnType<typeof savePhotoSuccess>
export type setCaptchaUrl = ReturnType<typeof setCaptchaUrl>

// export const store: StoreType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 1, message: "Hi, how are you?", likesCount: "22"},
//                 {id: 2, message: "It is my first post\"", likesCount: "57"},
//             ],
//             newPostText: ""
//         },
//         dialogsPage: {
//             dialogs: [
//                 {id: 1, name: "Konstantin"},
//                 {id: 2, name: "Kapar"},
//                 {id: 3, name: "Max"},
//                 {id: 4, name: "Ruslan"},
//                 {id: 5, name: "Petr"},
//             ],
//             messages: [
//                 {id: 1, message: "Hi"},
//                 {id: 2, message: "How is it going?"},
//                 {id: 3, message: "Sup?"},
//                 {id: 4, message: "I'll be back!!!"},
//                 {id: 5, message: "Bye!"},
//             ],
//             newMessageBody: ""
//         },
//     },
//     getState() {
//         return this._state
//     },
//     setState(state: StateType) {
//         this._state = state
//     },
//     _callSubscriber(state: StateType) {
//     },
//     subscribe(listener: (state: StateType) => void) {
//         this._callSubscriber = listener;
//     },
//     dispatch(action: ActionsType) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
//         this._callSubscriber(this._state);
//     }
// }









