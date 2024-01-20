import "./login.style.css"
import React from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import CustomLogo from "../../components/CustomLogo/CustomLogo";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


const Login = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errors, setErrors] = useState("");

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value});
        setErrors({...errors, [name]: ''});
    };


    async function loginUser(user) {
        console.log("loginUser");
        const sendUser = {
            email: user.email,
            password: user.password
        };
        try {
            const response = await axios.post("http://localhost:8765/business-logic/api/v1/registration/authenticate", sendUser)
            localStorage.setItem('user', JSON.stringify(response.data))
            navigate("/main");
        } catch(error) {
            console.log(error.message)
            console.log("ERROR: ", error.response.status);
        }
    }

    const handleClick = event => {
        event.preventDefault()
        if (isValid()) {
            loginUser(user)

        } else {
            console.log(errors);
        }
    }

    const validateInput = data => {
        let errors = {}
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(data.email)) {
            errors.email = "Please enter valid email"
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.password)) {
            errors.password = "Password must contain at least 8 characters (letters and numbers)"
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

    function registration() {
        navigate("/registration");
    }

    return (
        <div className={"login-page"}>
            <div className={"login-two-sides-container"}>

                <div className={"login-left-panel"}>
                    <CustomLogo/>


                    <div className={"login-auxiliary-container"}>
                        <div className={"login-title"}>
                            Sign in to SolEquat
                        </div>

                        <div className={"login-sign-up"}>
                            <div className={"login-text-for-link"}>
                                Don't have account yet?
                            </div>
                            <button className={"login-button-for-link"} onClick={registration}>
                                Sign up
                            </button>
                        </div>

                        <form className="login-form-container">
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
                        </form>

                        <button className={"login-button-sign-in"} onClick={handleClick}>
                            {/*<button className={"login-button-sign-in"} onClick={localStorage.setItem('user', JSON.stringify("sda"))}>*/}
                            Sign in
                        </button>
                    </div>
                </div>


                <div className={"login-right-gradient"}/>
            </div>
        </div>
    );
}

export default Login;