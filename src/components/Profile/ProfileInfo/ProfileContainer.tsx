import React from "react";
import {Profile} from "../Profile";
import {connect} from "react-redux";
import {getStatus, getUsersProfile, ProfileType, savePhoto, updateStatus} from "../../../Redux/Profile-reducer";
import {AppStateType} from "../../../Redux/Redux-store";
import {Preloader} from "../../Common/Preloader/Preloader";
import {RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";


type ProfileContainerPropsType  = {}

type PathParamsType = {
    userID: string
}
export type MapStateToPropsType = {
    profile: ProfileType | {},
    status: string
    authorizedUserId: any
    isAuth: boolean
}
export type MapDispatchToPropsType = {
    getUsersProfile: (userID: string) => void
    getStatus: (userID: string) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: File) => void
}

type ownPropsType = MapStateToPropsType & MapDispatchToPropsType ;

type ProfilePropsType = RouteComponentProps<PathParamsType> & ownPropsType;

  class ProfileContainer extends React.Component<ProfilePropsType> {


       refreshProfile() {
           let userID = this.props.match.params.userID;
           if (!userID) {
               userID = this.props.authorizedUserId;
               if (!userID){
                   this.props.history.push('/login')
               }
           }
           this.props.getUsersProfile(userID)
           this.props.getStatus(userID)
      }

    componentDidMount(): void {
            this.refreshProfile()

        // setTimeout(() => {
        //
        // }, 1000)
    }

    componentDidUpdate(prevProps: Readonly<ProfilePropsType>, prevState: Readonly<{}>, snapshot?: any) {
           if(this.props.match.params.userID != prevProps.match.params.userID) {
               this.refreshProfile()
           }
    }

      render() {
        if(Object.keys(this.props.profile).length === 0) {
            return <Preloader/>
        }
        return (
                <Profile {...this.props}
                    isOwner={!this.props.match.params.userID}
                         profile={this.props.profile as ProfileType}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         savePhoto={this.props.savePhoto}
                />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {

    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, ProfileContainerPropsType, AppStateType>(mapStateToProps, {
        getUsersProfile, getStatus, updateStatus, savePhoto,
    }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)





