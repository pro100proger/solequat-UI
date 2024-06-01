import "./custom-profile.style.css"
import React from "react";
import {useNavigate} from "react-router-dom";

const CustomProfile = () => {

    function getUserRole() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user != null) {
            return JSON.parse(localStorage.getItem("user")).role;
        } else {
            return null;
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    function signUp() {
        navigate("/registration");
    }

    function profile() {
        navigate("/profile");
    }
    function logout() {
        localStorage.removeItem('user')
        navigate("/login");
    }

    return (
        <div>
            {getUserRole() === null ?
                <div className={"header-button"}>
                    <div className='custom-profile-auxiliary'>
                        <button className={"header-button-name"} onClick={signUp}>Sign up</button>
                        {' '}
                    </div>
                </div>
                :
                <div className={"header-button"}>
                    <div className="custom-profile-auxiliary">
                        <div className={"header-menu-button"}>
                            <button className={"header-button-name"}>Menu</button>
                            {' '}
                        </div>

                        <ul className={"header-dropdown"}>
                            <li>
                                <button className={"header-dropdown-button"} onClick={profile}>Profile</button>
                            </li>
                            {/*<li>*/}
                            {/*    <button className={"header-dropdown-button gray"}>Settings</button>*/}
                            {/*</li>*/}
                            <li>
                                <button className={"header-dropdown-button red"} onClick={logout}>Log out</button>
                            </li>
                        </ul>

                    </div>
                </div>
            }
        </div>

    );
}

export default CustomProfile;