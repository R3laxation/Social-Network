import React from "react";
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../Redux/Profile-reducer";
import {Preloader} from "../../Common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";


type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}


export function ProfileInfo({profile, status, updateStatus}: ProfileInfoPropsType) {

    if(!profile) {
        return <Preloader/>
    }

    console.log(profile)

    return (
        <div>
            <div className={s.dashboard}>Dashboard</div>
            <div className={s.descr}>
                <img src={profile.photos.small} alt=""/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <div>Full Name: {profile.fullName}</div>
                <div>About: {profile.aboutMe}</div>
                <div>VK: {profile.contacts.vk}</div>
            </div>
        </div>
    )
}

