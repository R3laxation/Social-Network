import {connect} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {
    follow,
    setCurrentPage,
    unfollow,
    UserType,
    toogleFollowingProgress,
    getUsers,
} from "../../Redux/Users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../Common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


type UsersContainerPropsType = {}

export type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
export type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setCurrentPage: (currentPage: number) => void
    toogleFollowingProgress: (isFetching: boolean, userID: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType;

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount(): void {

        this.props.getUsers(this.props.currentPage, this.props.pageSize)
        // this.props.toogleIsFetching(true);
        //
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
        //     .then(data => {
        //         this.props.toogleIsFetching(false);
        //         this.props.setUsers(data.items)
        //         this.props.setTotalUsersCount(data.totalCount)
        //     })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
        // this.props.setCurrentPage(pageNumber)
        // this.props.toogleIsFetching(true)
        // usersAPI.getUsers(pageNumber, this.props.pageSize)
        //     .then(data => {
        //         this.props.toogleIsFetching(false)
        //         this.props.setUsers(data.items)
        //     })
    }

    render() {

        return <>
            {this.props.isFetching
                ? <Preloader/>
                : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, UsersContainerPropsType, AppStateType>(mapStateToProps, {
            follow, unfollow, setCurrentPage, toogleFollowingProgress, getUsers,
        }),
    withAuthRedirect,
)(UsersContainer)