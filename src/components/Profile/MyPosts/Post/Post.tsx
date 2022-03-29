import React from "react";
import s from "./Post.module.css";

type PostPropsType = {
    id: number
    message: string
    likesCount: string
}

export function Post(props: PostPropsType) {
    return (
        <div>
            <div className={s.item}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn-HdBk6kXnLfK7VTkMn3YWhoct3OsGPUoFA&usqp=CAU"
                    alt="ava"/>
                {props.message}
                <div>
                    <span>Likes</span> {props.likesCount}
                </div>
                <div>
                    <span>Dislikes</span>
                </div>
            </div>
        </div>
    )
}

