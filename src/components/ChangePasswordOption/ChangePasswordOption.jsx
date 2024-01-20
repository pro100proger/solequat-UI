import "./change-password-option.style.css"
import PasswordInput from "../PasswordInput/PasswordInput";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const ChangePasswordOption = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [errors, setErrors] = useState("");
    const [user, setUser] = useState({
        password: "",
        confirmPassword: "",
        oldPassword: ""
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    function login() {
        navigate("/login");
    }


    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    function updateEmail(user) {
        console.log("updateEmail");
        return axios.put("http://localhost:8765/business-logic/api/v1/credentials/password", user, {
            headers: {
                authorization: "Bearer " + AuthToken["token"]
            }
        })
            .then(() => {
                localStorage.removeItem('user')
                login();
            })
            .catch((error) => {
                if (error) {
                    console.log(error.response);
                    console.log("ERROR: ", error.response.status);
                }
            });
    }

    const handleClick = event => {
        event.preventDefault()
        if (isValid()) {
            updateEmail(user);
        } else {
            console.log(errors);
        }
    }

    const isValid = () => {
        const {errors, isValid} = validateInput(user)
        if (!isValid) {
            setErrors(errors)
        }
        return isValid
    }


    const validateInput = data => {
        let errors = {}
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.password)) {
            errors.password = "Password must contain at least 8 characters (letters and numbers)"
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.confirmPassword)) {
            errors.confirmPassword = "Password must contain at least 8 characters (letters and numbers)"
        }
        if (data.password !== data.confirmPassword) {
            errors.password = "Password and confirmation password must match"
            errors.confirmPassword = "Password and confirmation password must match"
        }
        return {
            errors,
            isValid: JSON.stringify(errors) === '{}'
        }
    }

    return (
        <div className={"change-password-container"}>
            <div className={"change-password-auxiliary"}>
                {errors.password && <p className='input_error'>
                    {errors.password}
                </p>}
                <PasswordInput
                    label={"Password"}
                    name={"password"}
                    placeholder={"Enter password"}
                    value={user.password}
                    handleChange={handleChange}
                />
                <div className={"retreat-15"} />
                {errors.confirmPassword && <p className='input_error'>
                    {errors.confirmPassword}
                </p>}
                <PasswordInput
                    label={"Confirm password"}
                    name={"confirmPassword"}
                    placeholder={"Enter confirm password"}
                    value={user.confirmPassword}
                    handleChange={handleChange}
                />
            </div>
            <div className={"retreat-15"} />

            <div className={"change-password-auxiliary"}>
                {errors.oldPassword && <p className='input_error'>
                    {errors.oldPassword}
                </p>}
                <PasswordInput
                    label={"Old password"}
                    name={"oldPassword"}
                    placeholder={"Enter old password"}
                    value={user.oldPassword}
                    handleChange={handleChange}
                />
                <button className={"profile-change-button"} onClick={handleClick}>
                    Change
                </button>
            </div>
            <div className={"retreat"} />
            <div className={"change-password-tips"}>
                The password must contain at least <span className={"red"}>8 characters</span>,
                of which at least one capital letter(“<span className={"yellow"}>ABC</span>”)
                and one number(“<span className={"yellow"}>123</span>”).
            </div>
        </div>
    );
}

export default ChangePasswordOption;