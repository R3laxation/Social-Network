import {
    ActionsType,
    FollowedUserActionType,
    SetTotalUsersCountType,
    SetUsersActionType, toogleFollowingProgressType,
    toogleIsFetchingType, UnFollowedUserActionType,
} from "./Store";
import {usersAPI} from "../API/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT_PAGE = "SET_USERS_TOTAL_COUNT_PAGE";
const TOOGLE_IS_FETCHING = "TOOGLE_IS_FETCHING";
const FOLLOWING_PROGRESS = "FOLLOWING_PROGRESS";

export type initialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
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
    followingInProgress: []
};

export const usersReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)};
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)};
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

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: (action: toogleIsFetchingType | SetUsersActionType | SetTotalUsersCountType) => void) => {
        dispatch(toogleIsFetching(true));

        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toogleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            })
    }
}

export const follow = (userID: number) => {
    return (dispatch: (action: FollowedUserActionType | toogleFollowingProgressType ) => void) => {
        dispatch(toogleFollowingProgress(true, userID))
        usersAPI.follow(userID)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userID))
                }
                dispatch(toogleFollowingProgress(false, userID))
            })
    }
}

export const unfollow = (userID: number) => {
    return (dispatch: (action: UnFollowedUserActionType | toogleFollowingProgressType) => void) => {
        dispatch(toogleFollowingProgress(true, userID))
        usersAPI.unfollow(userID)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userID))
                }
                dispatch(toogleFollowingProgress(false, userID))
            })
    }
}