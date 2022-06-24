import React, {FC} from "react";
import {createField, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ContactsType} from "../../../Redux/Profile-reducer";
import s from "./ProfileInfo.module.css";
import ss from '../../Common/FormsControls/FormsControls.module.css'


export const ProfileDataForm: FC<InjectedFormProps<ProfileFormDataType>> = ({initialValues, handleSubmit, error}) => {
    const contactsEntries = Object.assign(initialValues.contacts || {})

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={ss.formSummaryError}>{error}</div>}
            <div><b>Full Name</b>: {createField('Full Name', 'fullName', [], Input)}</div>
            <div>
                <div><b>Looking for a job</b>:
                    {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
                </div>
                {initialValues.lookingForAJob &&
                    <div><b>My professional skills</b>:
                        {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
                    </div>}

                <div><b>About me</b>:
                    {createField('About me', 'aboutMe', [], Textarea)}
                </div>
            </div>

            <div><b>Contacts: {(Object.keys(contactsEntries) as Array<keyof ContactsType>).map((key) => {
                return  <div key={key} className={s.contact}>
                    <b>{key}:{createField(key, 'contacts.' + key, [], Input)} </b>
                </div>
            })}</b></div>
        </form>
    );
};

export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ContactsType
}

export const ProfileDataFormReduxForm = reduxForm<ProfileFormDataType>({form: "edit-profile"})(ProfileDataForm)
