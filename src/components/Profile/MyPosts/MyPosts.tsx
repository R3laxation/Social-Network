import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostsStateType} from "../../../Redux/Profile-reducer";
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import {required, maxLengthCreator} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";


type MyPostsPropsType = {
    addPost: (newPostText: string) => void
    posts: Array<PostsStateType>
}

export const MyPosts = React.memo( (props: MyPostsPropsType) => {

    const posts = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    // const newPostElement = React.createRef<HTMLTextAreaElement>();

    // const onAddPost = () => {
    //     props.addPost()
    // }
    //
    // const onChangeHandler = () => {
    //     let text = newPostElement.current ? newPostElement.current.value : "";
    //     props.updateNewPostText(text);
    // }

    const addNewPost = (values: FormDataType) => {
        props.addPost(values.newPostText)
    }


    return (
        <div className={s.myPosts}>
            <AddNewPostReduxForm onSubmit={addNewPost}/>
            <div>
                New Post
            </div>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    )
})

type FormDataType = {
    newPostText: string
}

const maxLength30 = maxLengthCreator(30);

const AddNewPostForm = (props: InjectedFormProps) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPostText"} placeholder='Post message'
                       validate={[required, maxLength30]}/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>

    )
}

const AddNewPostReduxForm = reduxForm<any>({form: "profileAddNewPostForm"})(AddNewPostForm)
