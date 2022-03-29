import React from "react";
import {
    DialogsPageStateType,
    sendMessageBodyCreator,
    updateNewMessageBodyCreator
} from "../../../Redux/Dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/Redux-store";
import {compose, Dispatch} from "redux";
import { withAuthRedirect } from "../../../hoc/WithAuthRedirect";

type DialogsContainerPropsType ={}

export type MapStateToPropsType = {
    dialogsPage: DialogsPageStateType,
}
export type MapDispatchToPropsType = {
    onChangeHandler: (body: string) => void
    onSendMessageClick: () => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        onChangeHandler: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
        onSendMessageClick: () => {
           dispatch(sendMessageBodyCreator())
        }
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, DialogsContainerPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)