import React from "react";
import {Profile} from "../Profile";
import {connect} from "react-redux";
import {getUsersProfile, ProfileType} from "../../../Redux/Profile-reducer";
import {AppStateType} from "../../../Redux/Redux-store";
import {Preloader} from "../../Common/Preloader/Preloader";
import {RouteComponentProps, withRouter } from "react-router-dom";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";
import { compose } from "redux";


type ProfileContainerPropsType  = {}

type PathParamsType = {
    userID: string
}
export type MapStateToPropsType = {
    profile: ProfileType | {},
}
export type MapDispatchToPropsType = {
    getUsersProfile: (userID: string) => void
}

type ownPropsType = MapStateToPropsType & MapDispatchToPropsType ;

type ProfilePropsType = RouteComponentProps<PathParamsType> & ownPropsType;

  class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount(): void {
        let userID = this.props.match.params.userID;
        if (!userID) {
            userID = '2';
        }
        this.props.getUsersProfile(userID)
    }

    render() {
        if(Object.keys(this.props.profile).length === 0) {
            return <Preloader/>
        }
        return (
                <Profile {...this.props} profile={this.props.profile as ProfileType}/>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, ProfileContainerPropsType, AppStateType>(mapStateToProps, {
        getUsersProfile
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)





