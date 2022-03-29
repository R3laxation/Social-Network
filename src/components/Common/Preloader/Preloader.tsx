import preloader from "./../../../assets/images/preloader.svg";
import React from "react";

type PreloaderPropsType = {

}

export const Preloader = (props: PreloaderPropsType) => {
    return (
        <div style={{backgroundColor: "white"}}>
            <img src={preloader}/>
        </div>
    )

}