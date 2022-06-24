import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css";
import {ContactsType, ProfileType} from "../../../Redux/Profile-reducer";
import {Preloader} from "../../Common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userAva from "../../../assets/images/userAva.png";
import {ProfileDataFormReduxForm, ProfileFormDataType} from "./ProfileDataForm";
import {useDispatch} from "react-redux";


type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
    saveProfile: (profile: ProfileFormDataType) => Promise<any>
}

export function ProfileInfo({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfileInfoPropsType) {

    const [editMode, setEditMode] = useState(false);


    if (!profile) {
        return <Preloader/>
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ProfileFormDataType) => {
       saveProfile(formData).then((res) =>{
            setEditMode(false)
        })

    }

    return (
        <div>
            <div className={s.dashboard}>Dashboard</div>
            <div className={s.descr}>
                <img src={profile.photos.large || userAva} alt="ava" className={s.mainPhoto}/>
                {isOwner && <input type="file" onChange={mainPhotoSelected}/>}
                {editMode
                    ? <ProfileDataFormReduxForm initialValues={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
};

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}
            <div><b>Full Name</b>: {profile.fullName}</div>
            <div>
                <div><b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}</div>
                {profile.lookingForAJob &&
                    <div><b>My professional skills</b>: {profile.lookingForAJobDescription}</div>
                }
                <div><b>About me</b>: {profile.aboutMe}</div>
            </div>

            <div><b>Contacts</b>:{(Object.keys(profile.contacts) as Array<keyof ContactsType>).map((key) => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}</div>
        </div>
    );
};


type ContactsPropsType = {
    contactTitle: string
    contactValue: string | null
}

export const Contact = (props: ContactsPropsType) => {
    return (
        <div className={s.contact}>
            <b>{props.contactTitle}</b>: {props.contactValue}
        </div>
    );
};

