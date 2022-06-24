import React from "react";
import "./App.css";
import {Navbar} from "./components/Navbar/Navbar";
import {HashRouter, Route, withRouter, Switch, Redirect} from "react-router-dom";
import {Music} from "./components/Navbar/Music/Music";
import {Settings} from "./components/Navbar/Settings/Settings";
import {News} from "./components/Navbar/News/News";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UserSContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {AppStateType, store} from "./Redux/Redux-store";
import {compose} from "redux";
import {InitializeApp} from "./Redux/App-reducer";
import {Preloader} from "./components/Common/Preloader/Preloader";
import {withSuspence} from "./hoc/withSuspense";



const DialogsContainer = React.lazy(() => import("./components/Navbar/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileInfo/ProfileContainer"));


type AppProps = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType;

type MapStateToPropsType = {
    initialized: boolean
}

type MapDispatchToPropsType = {
    InitializeApp: () => void
}

class App extends React.Component<PropsType> {

     catchAllUnhendledErrors = (promiseRejectionEvent: any) => {
            alert('someErrorOccured')
         console.error(promiseRejectionEvent)
    }

    componentDidMount(): void {
        this.props.InitializeApp()
        window.addEventListener('unhendlerdrejection', this.catchAllUnhendledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhendlerdrejection', this.catchAllUnhendledErrors)
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (<div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Switch>
                        <Redirect exact from="/" to="/profile" />
                        <Route path='/profile/:userID?' render={withSuspence(ProfileContainer)}/>
                        <Route path='/dialogs' render={withSuspence(DialogsContainer)}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='*' render={() => <div>404 Not found</div>}/>

                    </Switch>
                </div>
            </div>
        )
    };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}


let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, AppProps, AppStateType>(mapStateToProps,
        {InitializeApp}),
)(App)

export let SamuraiJSApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}