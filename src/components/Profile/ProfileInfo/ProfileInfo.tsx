import React, { ChangeEvent } from "react";
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../Redux/Profile-reducer";
import {Preloader} from "../../Common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userAva from "../../../assets/images/userAva.png";


type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
}


export function ProfileInfo({profile, status, updateStatus, isOwner, savePhoto}: ProfileInfoPropsType) {

    if(!profile) {
        return <Preloader/>
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
       if(e.target.files){
           savePhoto(e.target.files[0])
       }
    }

    return (
        <div>
            <div className={s.dashboard}>Dashboard</div>
            <div className={s.descr}>
                <img src={profile.photos.large || userAva} alt="ava" className={s.mainPhoto}/>
                {isOwner && <input type="file" onChange={mainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <div>Full Name: {profile.fullName}</div>
                <div>About: {profile.aboutMe}</div>
                <div>VK: {profile.contacts.vk}</div>
            </div>
        </div>
    )
}

