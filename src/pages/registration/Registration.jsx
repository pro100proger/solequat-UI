import "./registration.style.css"
import CustomLogo from "../../components/CustomLogo/CustomLogo";
import CustomInput from "../../components/CustomInput/CustomInput";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const Registration = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState({
        Username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errors, setErrors] = useState("");

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    function registerUser(user) {
        console.log("registerUser");
        const sendUser = {
            Username: user.Username,
            email: user.email,
            password: user.password
        };
        axios.post("http://localhost:8765/api/v1/registration", sendUser)
            .then((response) => {
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    const handleClick = event => {
        event.preventDefault()
        if (isValid()) {
            registerUser(user)
            login()
        } else {
            console.log(errors);
        }
    }

    const validateInput = data => {
        let errors = {}
        if (!/^[A-Za-z]{3,32}$/.test(data.Username)) {
            errors.Username = "Username must contain only letters"
        }
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(data.email)) {
            errors.email = "Please enter valid email"
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.password)) {
            errors.password = "Password must contain at least 8 characters (letters and numbers)"
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.confirmPassword)) {
            errors.confirmPassword = "Password must contain at least 8 characters (letters and numbers)"
        }
        return {
            errors,
            isValid: JSON.stringify(errors) === '{}'
        }
    }
    const isValid = () => {
        const {errors, isValid} = validateInput(user)
        if (!isValid) {
            setErrors(errors)
        }
        return isValid
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    function login() {
        navigate("/login");
    }

    return (
        <div className={"registration-page"}>
            <div className={"registration-two-sides-container"}>

                <div className={"registration-left-panel"}>
                    <CustomLogo/>


                    <div className={"registration-auxiliary-container"}>
                        <div className={"registration-title"}>
                            Create Account
                        </div>

                        <div className={"registration-sign-in"}>
                            <div className={"registration-text-for-link"}>
                                Already have an account?
                            </div>
                            <button className={"registration-button-for-link"} onClick={login}>
                                Sign in
                            </button>
                        </div>

                        <form className="registration-form-container">
                            {errors.Username && <p className='input_error'>
                                {errors.Username}
                            </p>}
                            <CustomInput
                                type="text"
                                label={"Username"}
                                name={"Username"}
                                placeholder={"Enter username"}
                                value={user.Username}
                                handleChange={handleChange}
                            />
                            {errors.email && <p className='input_error'>
                                {errors.email}
                            </p>}
                            <CustomInput
                                type="text"
                                label={"Email"}
                                name={"email"}
                                placeholder={"Enter email"}
                                value={user.email}
                                handleChange={handleChange}
                            />
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
                        </form>

                        <button className={"registration-button-sign-in"} onClick={handleClick}>
                            Sign up
                        </button>
                    </div>
                </div>


                <div className={"registration-right-gradient"}/>
            </div>

        </div>
    );
}

export default Registration;

