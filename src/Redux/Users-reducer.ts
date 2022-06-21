import {
    ActionsType,
} from "./Store";
import {usersAPI} from "../API/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = "samurai-network/users/FOLLOW";
const UNFOLLOW = "samurai-network/users/UNFOLLOW";
const SET_USERS = "samurai-network/users/SET_USERS";
const SET_CURRENT_PAGE = "samurai-network/users/SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT_PAGE = "samurai-network/users/SET_USERS_TOTAL_COUNT_PAGE";
const TOOGLE_IS_FETCHING = "samurai-network/users/TOOGLE_IS_FETCHING";
const FOLLOWING_PROGRESS = "samurai-network/users/FOLLOWING_PROGRESS";

export type initialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    portionSize: number
}

export type UserType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: PhotosType
    status: null
    followed: boolean
}
export type PhotosType = {
    small: string | undefined
    large: string | undefined
}

const initialState: initialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    portionSize: 10
};

export const usersReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case FOLLOW:
            // return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)};
            return {...state, users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})};
        case UNFOLLOW:
            // return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)};
            return {...state, users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})};
        case SET_USERS:
            return {...state, users: action.users};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_USERS_TOTAL_COUNT_PAGE:
            return {...state, totalUsersCount: action.totalCount}
        case TOOGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        default:
            return state;
    }
}

export let followSuccess = (userID: number) => ({
    type: FOLLOW,
    userID
} as const)
export let unfollowSuccess = (userID: number) => ({type: UNFOLLOW, userID} as const);
export let setUsers = (users: Array<UserType>) => ({type: SET_USERS, users} as const);
export let setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const);
export let setTotalUsersCount = (totalCount: number) => ({type: SET_USERS_TOTAL_COUNT_PAGE, totalCount} as const);
export let toogleIsFetching = (isFetching: boolean) => ({type: TOOGLE_IS_FETCHING, isFetching} as const);
export let toogleFollowingProgress = (isFetching: boolean, userID: number) => ({
    type: FOLLOWING_PROGRESS,
    isFetching,
    userID,
} as const);

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: (action: ActionsType) => void) => {
        dispatch(toogleIsFetching(true));
        dispatch(setCurrentPage(page))

        const response = await usersAPI.getUsers(page, pageSize)
        dispatch(toogleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: (action: ActionsType) => void, userID: number, apiMethod: (userID: number) => any, actionCreator: (userID: number) => ActionsType) => {
    dispatch(toogleFollowingProgress(true, userID))
    let response = await apiMethod(userID)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(toogleFollowingProgress(false, userID))
}

export const follow = (userID: number) => {
    return (dispatch: (action: ActionsType) => void) => {
        followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userID: number) => {
    return (dispatch: (action: ActionsType) => void) => {
        followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}