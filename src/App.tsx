import React from "react";
import "./App.css";
import {Navbar} from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import {Music} from "./components/Navbar/Music/Music";
import {Settings} from "./components/Navbar/Settings/Settings";
import {News} from "./components/Navbar/News/News";
import {Login} from "./components/Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";

import DialogsContainer from "./components/Navbar/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UserSContainer";
import ProfileContainer from "./components/Profile/ProfileInfo/ProfileContainer";



export type AppPropsType = {}

function App(props: AppPropsType) {
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className={"app-wrapper-content"}>
                <Route path='/profile/:userID?' render={() => <ProfileContainer/>}/>
                <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                <Route path='/users' render={() => <UsersContainer/>}/>
                <Route path='/login' render={() => <Login/>}/>
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
            </div>
        </div>
    );
}


export default App;
