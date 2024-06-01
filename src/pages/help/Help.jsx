import "./help.style.css"
import Header from "../../components/Header/Header";
import React from "react";


const Help = () => {

    return (
        <div className={"help-page"}>
            <div>
                <Header/>
            </div>

            <div className={"help-container"}>
                <div className={"help-auxiliary-container"}>
                    <div className={"help-help-headline"}>
                        Help
                    </div>

                    <div className={"help-explanation-container"}>
                        <div className={"help-explanation-headline"}>
                            How to Use the Calculator Page
                        </div>
                        <div className={"help-explanation-text"}>
                            <div className={"help-profile-text"}>
                                On the Calculator page, users can perform calculations by following these steps:
                            </div>
                            <div className={"help-profile-functionalities"}>1. Upload Files: Attach the necessary CSV files required for the calculations.</div>
                            <div className={"help-profile-functionalities"}>2. Start Calculation: Click the "<span className={"main-span-yellow"}>
                                Calculate</span>" button to initiate the computation process.</div>
                            <div className={"help-profile-functionalities"}>3. Processing Indicator: While the calculations are in progress, a yellow button will be displayed.</div>
                            <div className={"help-profile-functionalities"}>4. Completion Indicator: Once the calculations are complete, the button will turn green.</div>
                            <div className={"help-profile-functionalities"}>5. Download Results: Click on the relevant section to download both the results and the input data.</div>
                        </div>
                    </div>

                    <div className={"help-explanation-container"}>
                        <div className={"help-explanation-headline"}>
                            Profile
                        </div>
                        <div className={"help-explanation-text"}>
                            <div className={"help-profile-text"}>The "Profile" page is designed to allow users to preview and modify their account
                                information. This page is divided into four sections: "<span
                                    className={"main-span-yellow"}>Preview</span>", "<span
                                    className={"main-span-yellow"}>Change Name</span>", "<span
                                    className={"main-span-yellow"}>Change Email</span>", and "<span
                                    className={"main-span-yellow"}>Change Password</span>".</div>
                            <div className={"help-profile-text"}>In the "Preview" section, users can view the current details of their account. If users need
                                to update any information, they can do so in the subsequent three sections.</div>
                            <div className={"help-profile-text"}>Each section is accompanied by explanatory text to assist users in interacting with the site
                                more easily.</div>
                            <div className={"help-profile-functionalities"}>Here is a breakdown of the functionalities:</div>
                            <div className={"help-profile-functionalities"}><span
                                className={"main-span-yellow"}>Preview</span>: Displays the user's current account information.</div>
                            <div className={"help-profile-functionalities"}><span
                                className={"main-span-yellow"}>Change Name</span>: Allows the user to update their name.</div>
                            <div className={"help-profile-functionalities"}><span
                                className={"main-span-yellow"}>Change Email</span>: Enables the user to change their email address.</div>
                            <div className={"help-profile-functionalities"}><span
                                className={"main-span-yellow"}>Change Password</span>: Provides the option for the user to update their password.</div>
                            <div className={"help-profile-functionalities"}>These sections ensure that users can easily manage and update their personal
                                information as needed.
                            </div>
                        </div>
                    </div>

                    <div className={"help-bottom"}></div>
                </div>
            </div>
        </div>
    );
}

export default Help;