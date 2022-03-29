import React from "react";
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../Redux/Profile-reducer";
import {Preloader} from "../../Common/Preloader/Preloader";

type ProfileInfoPropsType = {
    profile: ProfileType
}


export function ProfileInfo(props: ProfileInfoPropsType) {

    if(!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.dashboard}>Dashboard</div>
            <div className={s.descr}>
                <img src={props.profile.photos.large} alt=""/>
                <div>Full Name: {props.profile.fullName}</div>
                <div>About: {props.profile.aboutMe}</div>
                <div>VK: {props.profile.contacts.vk}</div>
            </div>
        </div>
    )
}

