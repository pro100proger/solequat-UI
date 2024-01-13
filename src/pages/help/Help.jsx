import "./help.style.css"
import Header from "../../components/Header/Header";
import React, {useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import PreviewOption from "../../components/PreviewOption/PreviewOption";
import ChangeNameOption from "../../components/ChangeNameOption/ChangeNameOption";


const Help = () => {
    const [userChoice, setUserChoice] = useState('option1');

    const handleButtonClick = (choice) => {
        setUserChoice(choice);
    };

    const renderContent = () => {
        switch (userChoice) {
            case 'option1':
                return (
                    <div>
                        <PreviewOption />
                    </div>
                );
            case 'option2':
                return (
                    <div>
                        <ChangeNameOption />
                    </div>
                );
            case 'option3':
                return (
                    <div>
                        {/* HTML для варіанту 3 */}
                        <p>asdasd</p>
                    </div>
                );
            case 'option4':
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
                            <button className={"profile-option-button"} onClick={() => handleButtonClick('option1')}>Preview</button>
                            <button className={"profile-option-button"} onClick={() => handleButtonClick('option2')}>Change name</button>
                            <button className={"profile-option-button"} onClick={() => handleButtonClick('option3')}>Change email</button>
                            <button className={"profile-option-button"} onClick={() => handleButtonClick('option4')}>Change password</button>
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