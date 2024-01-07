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

    function logout() {
        localStorage.removeItem('user')
        navigate("/login");
    }

    return (
        <div className={"header-button"}>

            {getUserRole() === null ?
                <div className='custom-profile-auxiliary'>
                    <button className={"header-button-name"} onClick={signUp}>Sign up</button>{' '}
                </div>
                :
                <div className="custom-profile-auxiliary">
                    <button className={"header-button-name"} onClick={logout}>Log out</button>{' '}
                </div>
            }
        </div>
    );
}

export default CustomProfile;