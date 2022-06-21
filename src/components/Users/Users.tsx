import React from "react";
import {UserType} from "../../Redux/Users-reducer";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

type UsersPropsType = {
    users: Array<UserType>
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    followingInProgress: number[]
    portionSize: number
};
 const Users = ({totalItemsCount, pageSize, followingInProgress, follow,  unfollow, currentPage, onPageChanged, portionSize, users}: UsersPropsType) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        {/*<div>*/}
        {/*    {*/}
        {/*        pages.map(p => {*/}
        {/*            return <span className={props.currentPage === p ? s.selectedPage : ""}*/}
        {/*                         onClick={(e) => {*/}
        {/*                             props.onPageChanged(p)*/}
        {/*                         }}>{p}</span>*/}
        {/*        })*/}
        {/*    }*/}
        {/*</div>*/}
        <Paginator
            pageSize={pageSize} totalItemsCount={totalItemsCount}
            currentPage={currentPage} onPageChanged={onPageChanged}
            portionSize={portionSize}
        />
        <div>
            {
                users.map(u => <User follow={follow} followingInProgress={followingInProgress} unfollow={unfollow} user={u} key={u.id}/>)
            }
        </div>
    </div>
}

export default Users
