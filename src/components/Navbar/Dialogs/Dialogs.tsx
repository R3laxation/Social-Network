import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogsPageStateType} from "../../../Redux/Dialogs-reducer";
import { Redirect } from "react-router-dom";

type DialogsPropsType = {
    dialogsPage: DialogsPageStateType
    onChangeHandler: (body: string) => void
    onSendMessageClick: () => void
    isAuth: boolean
}

export function Dialogs(props: DialogsPropsType) {

    let state = props.dialogsPage;

    const dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>)
    const messagesElements = state.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>)
    const newMessageBody = state.newMessageBody;

    const onSendMessageClick = () => {
        props.onSendMessageClick();
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.onChangeHandler(body)
    }

    if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea
                            value={newMessageBody}
                            placeholder='Enter Your message'
                            onChange={onChangeHandler}>
                        </textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}