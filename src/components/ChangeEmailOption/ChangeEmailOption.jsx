import "./change-email-option.style.css"
import CustomInput from "../CustomInput/CustomInput";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const ChangeEmailOption = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [errors, setErrors] = useState("");
    const [user, setUser] = useState({
        oldEmail: "",
        newEmail: ""
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
        return axios.put("http://localhost:8765/business-logic/api/v1/credentials/email", user, {
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
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(data.oldEmail)) {
            errors.oldEmail = "Please enter valid email"
        }
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(data.newEmail)) {
            errors.newEmail = "Please enter valid email"
        }
        return {
            errors,
            isValid: JSON.stringify(errors) === '{}'
        }
    }


    return (
        <div className={"change-email-container"}>
            <div className={"profile-change-auxiliary"}>
                {errors.oldEmail && <p className='input_error'>
                    {errors.oldEmail}
                </p>}
                <CustomInput
                    type="text"
                    label={"Old email"}
                    name={"oldEmail"}
                    placeholder={"Enter old email"}
                    value={user.oldEmail}
                    handleChange={handleChange}
                />
                <div className={"retreat"}/>
                {errors.newEmail && <p className='input_error'>
                    {errors.newEmail}
                </p>}
                <CustomInput
                    type="text"
                    label={"New email"}
                    name={"newEmail"}
                    placeholder={"Enter new email"}
                    value={user.newEmail}
                    handleChange={handleChange}
                />
                <button className={"profile-change-button"} onClick={handleClick}>
                    Change
                </button>
            </div>
            <div className={"retreat"}/>
            <div className={"change-email-tips"}>
                After clicking the "<span className={"yellow"}>Change</span>" button,
                you will be logged out and receive a confirmation
                letter on your new email. You will only be able to sign
                in after <span className={"red"}>confirming your email</span>.
            </div>
        </div>
    );
}

export default ChangeEmailOption;