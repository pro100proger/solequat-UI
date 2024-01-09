import "./profile.style.css"
import Header from "../../components/Header/Header";
import React, {useState} from "react";


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
                                <div className={"test"}>

                                </div>
                                <button onClick={() => setChangeCredentials(true)}>
                                    Change
                                </button>
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