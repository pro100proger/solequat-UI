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

    function equationSolver() {
        navigate("/equation");
    }
    function eigenvaluesSolver() {
        navigate("/eigenvalues");
    }

    function help() {
        navigate("/help");
    }


    return (
        <div className={"header-container"}>
            <CustomLogo/>

            <div className={"header-buttons-container"}>
                <CustomHeaderButton
                    style={{borderRight: '0px solid #3B1B19'}}
                    buttonName={"Main"}
                    onClick={main}
                />
                <div className="custom-profile-auxiliary-methods">
                    <CustomHeaderButton
                        style={{borderRight: '0px solid #3B1B19'}}
                        buttonName={"Method"}
                    />
                    <div>
                        <ul className={"header-dropdown-methods"}>
                            <li>
                                <CustomHeaderButton
                                    style={{background: '#260B0A'}}
                                    buttonName={"Linear System"}
                                    onClick={equationSolver}
                                />
                            </li>
                            <li>
                                <CustomHeaderButton
                                    style={{background: '#260B0A'}}
                                    buttonName={"Eigenvalues"}
                                    onClick={eigenvaluesSolver}
                                />
                            </li>
                        </ul>
                    </div>

                </div>
                <CustomHeaderButton
                    buttonName={"Help"}
                    onClick={help}
                />

            </div>

            <div className={"header-custom-profile"}>
                <CustomProfile/>
            </div>

        </div>
    );
}

export default Header;