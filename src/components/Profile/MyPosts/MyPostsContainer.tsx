import React from "react";
import {addPost, PostsStateType, updateNewPostText} from "../../../Redux/Profile-reducer";
import {MyPosts} from "./MyPosts";
import { connect } from "react-redux";
import {AppStateType} from "../../../Redux/Redux-store";
import {Dispatch} from "redux";

type MyPostsContainerPropsType ={}

export type MapStateToPropsType = {
    posts: Array<PostsStateType>
    newPostText: string
}
export type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
}


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: () => {
           dispatch(addPost())
        },
        updateNewPostText: (text: string) => {
            let action = updateNewPostText(text)
            dispatch(action)
        }
    }
}


export const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, MyPostsContainerPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

