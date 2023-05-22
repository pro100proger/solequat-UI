import "./header.style.css"
// import {ReactComponent as Logo} from "../../icons/logo.svg";
import React from "react";
import CustomLogo from "../CustomLogo/CustomLogo";
import CustomProfile from "../CustomProfile/CustomProfile";

const Header = () => {

    return (
        <div className={"header-container"}>
            <CustomLogo/>

            <div className={"header-custom-profile"}>
                <CustomProfile/>
            </div>

        </div>
    );
}

export default Header;