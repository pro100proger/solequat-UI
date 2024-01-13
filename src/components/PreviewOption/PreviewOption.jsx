import "./preview-option.style.css"
import React, {useEffect, useState} from "react";
import axios from "axios";


const PreviewOption = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [userPreview, setUserPreview] = useState({
        previewFirstName: "",
        previewLastName: "",
        previewEmail: ""
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

    useEffect(() => {
        getUserCredentialsByEmail();
    }, []);

    return (
        <div className={"preview-container"}>
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

            <div className={"retreat"}/>
        </div>
    );
}

export default PreviewOption;