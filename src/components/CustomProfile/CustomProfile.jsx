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

    function signIn() {
        navigate("/login");
    }

    function signUp() {
        navigate("/registration");
    }

    function logout() {
        localStorage.removeItem('user')
        navigate("/login");
    }

    return (
        <div className={"custom-profile-container"}>

            {getUserRole() === null ?
                <div className='custom-profile-auxiliary'>
                    <button className={"custom-profile-sign-in-up-out"} onClick={signUp}>Sign up</button>{' '}
                    <button className={"custom-profile-sign-in-up-out"} onClick={signIn}>Sign in</button>{' '}
                </div>
                :
                <div className="custom-profile-auxiliary">
                    <button className={"custom-profile-sign-in-up-out"} onClick={logout}>Log out</button>{' '}
                </div>
            }
        </div>
    );
}

export default CustomProfile;