import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {
    follow,
    setCurrentPage,
    unfollow,
    UserType,
    toogleFollowingProgress,
    requestUsers,
} from "../../Redux/Users-reducer";
import Users from "./Users";
import {Preloader} from "../Common/Preloader/Preloader";
import {compose} from "redux";
import {
    getUsers,
    getTotalUsersCount,
    getCurrentPage,
    getPageSize, getIsFetching, getFollowingInProgress, getPortionSize
} from "../../Redux/UserSelectors";


type UsersContainerPropsType = {}

export type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalItemsCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    portionSize: number
}
export type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setCurrentPage: (currentPage: number) => void
    toogleFollowingProgress: (isFetching: boolean, userID: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}

type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType;

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount(): void {

        const {currentPage, pageSize} = this.props;

        this.props.requestUsers(currentPage, pageSize)
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
        const {pageSize} = this.props

        this.props.requestUsers(pageNumber, pageSize)
        // this.props.setCurrentPage(pageNumber)
        // this.props.toogleIsFetching(true)
        // usersAPI.getUsers(pageNumber, this.props.pageSize)
        //     .then(data => {
        //         this.props.toogleIsFetching(false)
        //         this.props.setUsers(data.items)
        //     })
    }

    render() {

        return (
            <>
            {this.props.isFetching
                ? <Preloader/>
                : null}
            <Users
                totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                portionSize={this.props.portionSize}
            />
        </>
        )
    }
}

// const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
}



export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, UsersContainerPropsType, AppStateType>(mapStateToProps, {
            follow, unfollow, setCurrentPage, toogleFollowingProgress, requestUsers,
        }),
)(UsersContainer)