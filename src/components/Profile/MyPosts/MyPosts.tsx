import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostsStateType} from "../../../Redux/Profile-reducer";


type MyPostsPropsType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
    posts: Array<PostsStateType>
    newPostText: string
}

export function MyPosts(props: MyPostsPropsType) {

    const posts = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>();

    const onAddPost = () => {
        props.addPost()
    }

    const onChangeHandler = () => {
        let text = newPostElement.current ?  newPostElement.current.value : '' ;
        props.updateNewPostText(text);
    }


return (
    <div className={s.myPosts}>
            <textarea
                value={props.newPostText}
                ref={newPostElement}
                onChange={onChangeHandler}/>
        <div>
            <button onClick={onAddPost}>Add Post</button>
        </div>
        <div>
            New Post
        </div>
        <div className={s.posts}>
            {posts}
        </div>
    </div>
)
}

