import {ActionsType, setUsersProfileType} from "./Store";
import {profileAPI, usersAPI} from "../API/api";
import { Dispatch } from "redux";

const ADD_POST = "samurai-network/profile/ADD-POST";
const SET_USERS_PROFILE = "samurai-network/profile/SET_USERS_PROFILE";
const SET_USERS_STATUS = 'samurai-network/profile/SET_USERS_STATUS';

export type ProfilePageStateType = {
    posts: Array<PostsStateType>
    profile: ProfileType | {}
    status: string
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
    profile: {},
    status: ""
};

export const profileReducer = (state: ProfilePageStateType = initialState, action: ActionsType): ProfilePageStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {id: 3, message: action.newPostText, likesCount: "0"}
            return {...state, posts: [...state.posts, newPost]}
        }
        case SET_USERS_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_USERS_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}

export let addPost = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
export let setUsersProfile = (profile: ProfileType) => ({type: SET_USERS_PROFILE, profile} as const)
export let setStatus = (status: string) => ({type: SET_USERS_STATUS, status} as const)



export let getUsersProfile = (userID: string) => async (dispatch: (action: setUsersProfileType) => void) => {
    let response = await usersAPI.getProfile(userID)
        dispatch(setUsersProfile(response.data))
}
export let getStatus = (userID: string) => async (dispatch: Dispatch) => {
        let response = await profileAPI.getStatus(userID)
                dispatch(setStatus(response.data))
}
export let updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
                if(response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
}