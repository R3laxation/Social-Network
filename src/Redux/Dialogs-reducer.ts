import {ActionsType} from "./Store";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

// export type DialogsPageStateType = {
//     dialogs: Array<DialogsStateType>
//     messages: Array<MessagesStateType>
//     newMessageBody: string
// }
export type DialogsPageStateType = typeof initialState;

export type DialogsStateType = {
    id: number
    name: string
}
export type MessagesStateType = {
    id: number
    message: string
}

const initialState = {
    dialogs: [
        {id: 1, name: "Konstantin"},
        {id: 2, name: "Kapar"},
        {id: 3, name: "Max"},
        {id: 4, name: "Ruslan"},
        {id: 5, name: "Petr"},
    ] as Array<DialogsStateType>,
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is it going?"},
        {id: 3, message: "Sup?"},
        {id: 4, message: "I'll be back!!!"},
        {id: 5, message: "Bye!"},
    ] as Array<MessagesStateType>,
    newMessageBody: ""
};

export const dialogsReducer = (state: DialogsPageStateType = initialState, action: ActionsType): DialogsPageStateType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return ({...state, newMessageBody: action.body});
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return ({...state, messages: [...state.messages, {id: 6, message: body}], newMessageBody: ""});
        default:
            return state
    }
}

export let updateNewMessageBodyCreator = (body: string) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body
} as const)
export let sendMessageBodyCreator = () => ({type: SEND_MESSAGE} as const);