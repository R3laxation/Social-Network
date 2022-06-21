import {addPost, PostsStateType} from "../../../Redux/Profile-reducer";
import {MyPosts} from "./MyPosts";
import { connect } from "react-redux";
import {AppStateType} from "../../../Redux/Redux-store";
import {Dispatch} from "redux";

type MyPostsContainerPropsType ={}

export type MapStateToPropsType = {
    posts: Array<PostsStateType>

}
export type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPost(newPostText))
        },
    }
}

export const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, MyPostsContainerPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

