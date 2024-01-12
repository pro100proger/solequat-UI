import "./profile.style.css"
import Header from "../../components/Header/Header";
import React, {useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";


const Profile = () => {
    const [changeCredentials, setChangeCredentials] = useState(false);


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
                                        <input className="form-input" id="input" disabled={true} value={"John"} />
                                    </div>

                                    <div className="custom-input retreat">
                                        <label className="form-label" htmlFor="input">last name</label>
                                        <br/>
                                        <input className="form-input" id="input" disabled={true} value={"Stone"} />
                                    </div>

                                    <div className="custom-input retreat">
                                        <label className="form-label" htmlFor="input">Email</label>
                                        <br/>
                                        <input className="form-input" id="input" disabled={true} value={"johnstone@gmail.com"} />
                                    </div>

                                    <button className={"profile-change-button"} onClick={() => setChangeCredentials(true)}>
                                        Change
                                    </button>
                                    <div className={"retreat"} />
                                </div>
                            </div>
                        ) : (
                            <div>
                                sdgsdfhdsh
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