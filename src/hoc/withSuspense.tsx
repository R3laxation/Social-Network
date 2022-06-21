import React from "react";
import {Preloader} from "../components/Common/Preloader/Preloader";


type WithSuspensePropsType = {}

export function withSuspence(Component: React.ComponentType) {
    return (props: WithSuspensePropsType) => {
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...props}/>
        </React.Suspense>
    }
}