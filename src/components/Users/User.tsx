import React from "react";
import s from "./Users.module.css";
import userAva from "../../assets/images/userAva.png";
import {UserType} from "../../Redux/Users-reducer";
import {NavLink} from "react-router-dom";

type UserPropsType = {
    user: UserType
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    followingInProgress: number[]
};
const User = ({user, followingInProgress, follow, unfollow}: UserPropsType) => {

    return <div>
                    <span>
                        <div>
                            <NavLink to={"/profile/" + user.id}>
                            <img
                                className={s.userPhoto}
                                src={user.photos.small !== null
                                    ? user.photos.small
                                    : userAva}
                                alt="ava"/>
                                </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                unfollow(user.id)
                                }}>UnFollow</button>
                                :<button disabled={followingInProgress.some(id => id === user.id)}  onClick={() => {
                                follow(user.id)
                                }}>Follow</button>
                            }
                        </div>
                    </span>
                <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
    </div>
}

export default User
