import "./profile.style.css"
import Header from "../../components/Header/Header";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { ReactComponent as Arrow } from "../../icons/Arrow.svg";
import axios from "axios";


const Profile = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [changeCredentials, setChangeCredentials] = useState(false);
    const [errors, setErrors] = useState("");
    const [userPreview, setUserPreview] = useState({
        previewFirstName: "",
        previewLastName: "",
        previewEmail: ""
    });

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        oldEmail: "",
        password: "",
        confirmPassword: "",
        oldPassword: ""
    });

    function getUserCredentialsByEmail() {
        console.log("getUserCredentialsByEmail");
        return axios.get("http://localhost:8765/business-logic/api/v1/", {
            headers: {
                authorization: "Bearer " + AuthToken["token"]
            }
        })
            .then((response) => {
                const data = response.data;
                setUserPreview({
                    previewFirstName: data.firstName,
                    previewLastName: data.lastName,
                    previewEmail: data.email
                })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.message)
                    console.log("error")
                }
            });
    }

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value});
        setErrors({...errors, [name]: ''});
    };


    const handleClick = event => {
        event.preventDefault()
        if (isValid()) {
            console.log("ok");
        } else {
            console.log(errors);
        }
    }

    const validateInput = data => {
        let errors = {}
        if (!/^[A-Za-z]{3,32}$/.test(data.firstName)) {
            errors.firstName = "Username must contain only letters"
        }
        if (!/^[A-Za-z]{3,32}$/.test(data.lastName)) {
            errors.lastName = "Username must contain only letters"
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
        if (data.password !== data.confirmPassword) {
            errors.password = "Password and confirmation password must match"
            errors.confirmPassword = "Password and confirmation password must match"
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

    useEffect(() => {
        getUserCredentialsByEmail();
    }, []);



    return (
        <div className={"profile-page"}>
            <div>
                <Header/>
            </div>

            <div className={"profile-container"}>
                <div className={"profile-auxiliary-container"}>

                    <div className={"profile-profile-section"}>
                        <div className={"profile-headline"}>
                            Profile
                        </div>
                        <div className={"profile-auxiliary-tips"}>
                            <div className={"profile-tips"}>
                                This is your <span className={"yellow"}>profile</span>. Here you can change any account
                                information.
                                <span className={"red"}> Please read the tips below carefully!</span>
                            </div>
                        </div>
                    </div>

                    <div className={"profile-main-part"}>
                        {!changeCredentials ? (
                            <div>
                                <div className={"profile-preview-container"}>
                                    <div className="custom-input retreat">
                                        <label className="form-label" htmlFor="input">first name</label>
                                        <br/>
                                        <input className="form-input" id="input" disabled={true} value={userPreview.previewFirstName} />
                                    </div>

                                    <div className="custom-input retreat">
                                        <label className="form-label" htmlFor="input">last name</label>
                                        <br/>
                                        <input className="form-input" id="input" disabled={true} value={userPreview.previewLastName} />
                                    </div>

                                    <div className="custom-input retreat">
                                        <label className="form-label" htmlFor="input">Email</label>
                                        <br/>
                                        <input className="form-input" id="input" disabled={true} value={userPreview.previewEmail} />
                                    </div>

                                    <button className={"profile-change-button"} onClick={() => setChangeCredentials(true)}>
                                        Change
                                    </button>
                                    <div className={"retreat"}/>
                                </div>
                            </div>

                        ) : (

                            <div className={"profile-change-container"}>
                                <div className={"profile-tips-container"}>
                                    <div className={"profile-back-arrow"} onClick={() => setChangeCredentials(false)}>
                                        <Arrow/>
                                    </div>
                                    <div className={"profile-change-part-tips correct-padding-top"}>
                                        Here you can change your first and last name by typing it in the fields.
                                    </div>
                                    <div className={"profile-change-auxiliary"}>
                                        <CustomInput
                                            type="text"
                                            label={"First name"}
                                            name={"firstName"}
                                            placeholder={"Enter first name"}
                                            value={user.firstName}
                                            handleChange={handleChange}
                                        />
                                        <CustomInput
                                            type="text"
                                            label={"Last name"}
                                            name={"lastName"}
                                            placeholder={"Enter last name"}
                                            value={user.lastName}
                                            handleChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className={"profile-tips-container"}>
                                    <div className={"profile-brown-line"} />
                                    <div className={"profile-change-part-tips"}>
                                        After clicking the "<span className={"yellow"}>Change</span>" button,
                                        you will be logged out and receive a confirmation
                                        letter on your new email. You will only be able to sign
                                        in after <span className={"red"}>confirming your email</span>.
                                    </div>
                                    <div className={"profile-change-auxiliary"}>
                                        <CustomInput
                                            type="text"
                                            label={"Old email"}
                                            name={"oldEmail"}
                                            placeholder={"Enter old email"}
                                            value={user.oldEmail}
                                            handleChange={handleChange}
                                        />
                                        <CustomInput
                                            type="text"
                                            label={"Email"}
                                            name={"email"}
                                            placeholder={"Enter new email"}
                                            value={user.email}
                                            handleChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className={"profile-tips-container"}>
                                    <div className={"profile-brown-line"} />
                                    <div className={"profile-change-part-tips"}>
                                        The password must contain at least <span className={"red"}>8 characters</span>,
                                        of which at least one capital letter(“<span className={"yellow"}>ABC</span>”)
                                        and one number(“<span className={"yellow"}>123</span>”).
                                    </div>
                                    <div className={"profile-change-auxiliary correct-padding-bottom"}>
                                        <PasswordInput
                                            label={"Password"}
                                            name={"password"}
                                            placeholder={"Enter password"}
                                            value={user.password}
                                            handleChange={handleChange}
                                        />
                                        <PasswordInput
                                            label={"Confirm password"}
                                            name={"confirmPassword"}
                                            placeholder={"Enter confirm password"}
                                            value={user.confirmPassword}
                                            handleChange={handleChange}
                                        />
                                    </div>

                                    <div className={"profile-change-auxiliary"}>
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
                                </div>
                                <div className={"retreat"}/>
                            </div>
                        )}
                    </div>

                    <div className={"profile-end-part"}/>

                </div>
            </div>
        </div>
    );
}

export default Profile;