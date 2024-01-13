import "./change-name-option.style.css"
import CustomInput from "../CustomInput/CustomInput";
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const ChangeNameOption = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [errors, setErrors] = useState("");
    const [user, setUser] = useState({
        firstName: "",
        lastName: ""
    });


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    function main() {
        navigate("/main");
    }


    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    function updateUserName(user) {
        console.log("updateUserName");
        axios.post("http://localhost:8765/business-logic/api/v1/", user)
            .then((response) => {
                main()
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
            updateUserName(user);
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
        if (!/^[A-Za-z]{3,32}$/.test(data.firstName)) {
            errors.firstName = "Firstname must contain only letters(at least 3)"
        }
        if (!/^[A-Za-z]{3,32}$/.test(data.lastName)) {
            errors.lastName = "Lastname must contain only letters(at least 3)"
        }
        return {
            errors,
            isValid: JSON.stringify(errors) === '{}'
        }
    }

    return (
        <div className={"change-name-container"}>

            <div className={"change-name-tips retreat"}>
                Here you can change your first and last name by typing it in the fields.
            </div>
            <div className={"change-name-auxiliary"}>
                {errors.firstName && <p className='input_error'>
                    {errors.firstName}
                </p>}
                <CustomInput
                    type="text"
                    label={"First name"}
                    name={"firstName"}
                    placeholder={"Enter first name"}
                    value={user.firstName}
                    handleChange={handleChange}
                />
                <div className={"retreat"} />
                {errors.lastName && <p className='input_error'>
                    {errors.lastName}
                </p>}
                <CustomInput
                    type="text"
                    label={"Last name"}
                    name={"lastName"}
                    placeholder={"Enter last name"}
                    value={user.lastName}
                    handleChange={handleChange}
                />
                <button className={"profile-change-button"} onClick={handleClick}>
                    Change
                </button>
            </div>
        </div>
    );
}

export default ChangeNameOption;