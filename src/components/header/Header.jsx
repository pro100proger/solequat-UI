import "./header.style.css"
import {ReactComponent as Logo} from "../../icons/logo.svg";
import React from "react";
import CustomLogo from "../CustomLogo/CustomLogo";

const Header = () => {

    return (
        <div className={"header-container"}>
        <CustomLogo/>


        </div>
    );
}

export default Header;