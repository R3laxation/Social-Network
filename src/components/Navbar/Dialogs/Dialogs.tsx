import React from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogsPageStateType} from "../../../Redux/Dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";


type DialogsPropsType = {
    dialogsPage: DialogsPageStateType
    onChangeHandler: (body: string) => void
    onSendMessageClick: (newMessageBody: string) => void
    isAuth: boolean
}

const Dialogs: React.FC<DialogsPropsType> = React.memo((props) => {

    let state = props.dialogsPage;

    const dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>)
    const messagesElements = state.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>)
    // const newMessageBody = state.newMessageBody;
    //
    // const onSendMessageClick = () => {
    //     props.onSendMessageClick();
    // }

    const addNewMessage = (values: FormDataType) => {
        props.onSendMessageClick(values.newMessageBody)
    }

    // const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     let body = e.currentTarget.value;
    //     props.onChangeHandler(body)
    // }

    // if (!props.isAuth) return <Redirect to={"/login"}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    )
})

type FormDataType = {
    newMessageBody: string
}

const maxLength = maxLengthCreator(50);

const AddMessageForm = (props: InjectedFormProps) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxLength]}
                       name={"newMessageBody"} placeholder="Enter Your message"/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<any>({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs