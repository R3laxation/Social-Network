import React from "react";
import s from "./Profile.module.css";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Redux/Profile-reducer";

type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
}

export function Profile(props: ProfilePropsType) {

    return (
        <div className={s.profile}>
            <ProfileInfo
                profile={props.profile} status={props.status}
                         updateStatus={props.updateStatus} isOwner={props.isOwner}
                savePhoto={props.savePhoto}/>
            <MyPostsContainer/>
        </div>
    )
}

