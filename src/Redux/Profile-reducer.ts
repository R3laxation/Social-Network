import {ActionsType, setUsersProfileType} from "./Store";
import {usersAPI} from "../API/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";

export type ProfilePageStateType = {
    posts: Array<PostsStateType>
    newPostText: string
    profile: ProfileType | {}
}
export type PostsStateType = {
    id: number
    message: string
    likesCount: string
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}
export type ContactsType = {
    facebook: string
    website: string | null
    vk: string
    twitter: string
    instagram: string
    youtube: string | null
    github: string
    mainLink: string | null
}
export type PhotosType = {
    small: string
    large: string
}

const initialState: ProfilePageStateType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: "22"},
        {id: 2, message: "It is my first post\"", likesCount: "57"},
    ],
    newPostText: "",
    profile: {},
};

export const profileReducer = (state: ProfilePageStateType = initialState, action: ActionsType): ProfilePageStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {id: 3, message: state.newPostText, likesCount: "0"}
            return {...state, posts: [...state.posts, newPost], newPostText: ""}
        }
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.newText}
        }
        case SET_USERS_PROFILE: {
            return {...state, profile: action.profile}
        }
        default:
            return state
    }
}

export let addPost= () => ({type: ADD_POST} as const)
export let updateNewPostText = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text} as const)
export let setUsersProfile = (profile: ProfileType) => ({type: SET_USERS_PROFILE, profile} as const)
export let getUsersProfile = (userID: string) => (dispatch: (action: setUsersProfileType) => void) => {
    usersAPI.getProfile(userID).then(response => {
        dispatch(setUsersProfile(response.data))
    })
}