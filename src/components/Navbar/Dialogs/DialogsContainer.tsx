import React from "react";
import {
    DialogsPageStateType,
    sendMessageBodyCreator,
} from "../../../Redux/Dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/Redux-store";
import {compose, Dispatch} from "redux";
import { withAuthRedirect } from "../../../hoc/WithAuthRedirect";

type DialogsContainerPropsType ={}

export type MapStateToPropsType = {
    dialogsPage: DialogsPageStateType,
}
export type MapDispatchToPropsType = {
    onSendMessageClick: (newMessageBody: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        onSendMessageClick: (newMessageBody: string) => {
           dispatch(sendMessageBodyCreator(newMessageBody))
        }
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, DialogsContainerPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)