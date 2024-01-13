import "./help.style.css"
import Header from "../../components/Header/Header";
import React, {useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import PreviewOption from "../../components/PreviewOption/PreviewOption";
import ChangeNameOption from "../../components/ChangeNameOption/ChangeNameOption";
import ChangeEmailOption from "../../components/ChangeEmailOption/ChangeEmailOption";


const Help = () => {
    const [userChoice, setUserChoice] = useState('preview');

    const handleButtonClick = (choice) => {
        setUserChoice(choice);
    };

    const renderContent = () => {
        switch (userChoice) {
            case 'preview':
                return (
                    <div>
                        <PreviewOption />
                    </div>
                );
            case 'changeName':
                return (
                    <div>
                        <ChangeNameOption />
                    </div>
                );
            case 'changeEmail':
                return (
                    <div>
                        <ChangeEmailOption />
                    </div>
                );
            case 'changePassword':
                return (
                    <div>
                        {/* HTML для варіанту 4 */}
                        <p>ddddddddddddddddddddddddddddddddd</p>
                    </div>
                );
            default:
                return null; // Відобразити щось за замовчуванням або нічого, якщо немає вибору
        }
    };

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

                        <div className={"profile-options-container"}>
                            <button className={"profile-option-button"} onClick={() => handleButtonClick('preview')}>Preview</button>
                            <button className={"profile-option-button"} onClick={() => handleButtonClick('changeName')}>Change name</button>
                            <button className={"profile-option-button"} onClick={() => handleButtonClick('changeEmail')}>Change email</button>
                            <button className={"profile-option-button"} onClick={() => handleButtonClick('changePassword')}>Change password</button>
                        </div>

                        <div className={"profile-render-content"}>
                            {renderContent()}
                        </div>
                    </div>

                    <div className={"profile-end-part"}/>

                </div>
            </div>
        </div>
    );
}

export default Help;