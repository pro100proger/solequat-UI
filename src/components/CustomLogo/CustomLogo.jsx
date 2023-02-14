import React from 'react';
import "./custom-logo.style.css";
import {ReactComponent as Logo} from "../../icons/logo.svg";

const CustomLogo = () => {
    return (
        <div className={"logo-auxiliary-container-1"}>
            <div className={"logo-logo-and-text"}>
                <div className={"logo-logo"}>
                    <Logo/>
                </div>
                <div className={"logo-text"}>
                    SolEquat
                </div>
            </div>
        </div>
    );
}

export default CustomLogo;