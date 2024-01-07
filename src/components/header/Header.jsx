import "./header.style.css"
import React from "react";
import CustomLogo from "../CustomLogo/CustomLogo";
import CustomProfile from "../CustomProfile/CustomProfile";
import CustomHeaderButton from "../CustomHeaderButton/CustomHeaderButton";
import {useNavigate} from "react-router-dom";

const Header = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    function main() {
        navigate("/main");
    }
    function help() {
        navigate("/help");
    }


    return (
        <div className={"header-container"}>
            <CustomLogo/>

            <div className={"header-buttons-container"}>
                <CustomHeaderButton
                    style={{ borderRight: '0px solid #3B1B19' }}
                    buttonName = {"Main"}
                    onClick = {main}
                />
                <CustomHeaderButton
                    style={{ borderRight: '0px solid #3B1B19' }}
                    buttonName = {"Method"}
                />
                <CustomHeaderButton
                    buttonName = {"Help"}
                />

            </div>

            <div className={"header-custom-profile"}>
                <CustomProfile/>
            </div>

        </div>
    );
}

export default Header;