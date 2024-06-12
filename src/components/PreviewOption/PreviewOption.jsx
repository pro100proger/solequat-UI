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
    const [userBalance, setUserBalance] = useState({
        totalDuration: "",
        totalCalculations: "",
        totalPrice: ""
    });


    function getUserCredentials() {
        console.log("getUserCredentials");
        return axios.get("http://localhost:8765/business-logic/api/v1/credentials/username", {
            headers: {
                authorization: "Bearer " + AuthToken["token"]
            }
        })
            .then((response) => {
                const data = response.data;
                setUserPreview({
                    previewFirstName: data.firstName,
                    previewLastName: data.lastName
                })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.message)
                    console.log("error")
                }
            });
    }

    function getUserEmail() {
        console.log("getUserEmail");
        return axios.get("http://localhost:8765/business-logic/api/v1/credentials/email", {
            headers: {
                authorization: "Bearer " + AuthToken["token"]
            }
        })
            .then((response) => {
                const data = response.data;
                setUserPreview({
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

    function getUserBalance() {
        console.log("getUserCredentials");
        return axios.get("http://localhost:8765/business-logic/api/v1/payment", {
            headers: {
                authorization: "Bearer " + AuthToken["token"]
            }
        })
            .then((response) => {
                const data = response.data;
                setUserBalance({
                    totalPrice: data.totalPrice,
                    totalDuration: data.totalDuration,
                    totalCalculations: data.totalCalculations
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
        getUserCredentials();
        getUserEmail();
        getUserBalance();
    }, []);

    return (
        <div className={"preview-container"}>
            <div className={"preview-auxiliary-container"}>
                <div className={"preview-balance-container"}>
                    <label className={"preview-balance"}>
                        Balance:
                    </label>
                    <span className={"preview-balance-value"}>
                        {(userBalance.totalPrice ? Number(userBalance.totalPrice).toFixed(2) : '0.00')}$
                    </span>
                </div>
                <div className={"preview-balance-container"}>
                    <label className={"preview-balance"}>
                        Duration:
                    </label>
                    <span className={"preview-balance-value"}>
                         {(userBalance.totalPrice ? Number(userBalance.totalDuration).toFixed(2) : '0')} seconds
                    </span>
                </div>
                <div className={"preview-balance-container"}>
                    <label className={"preview-balance"}>
                        Number of calculations:
                    </label>
                    <span className={"preview-balance-value"}>
                         {(userBalance.totalCalculations ? userBalance.totalCalculations : '0')}
                    </span>
                </div>
                <div className={"preview-balance-tip"}>
                    Above you can see the <span className={"main-span-yellow"}>duration</span> and <span
                    className={"main-span-yellow"}>number of calculations</span> that have not been paid.
                </div>
                <div id="paypal-button-container">
                    <button id="paypal-button">Pay with PayPal</button>
                </div>
            </div>


            <div className={"preview-credentials"}>
                <div className="custom-input retreat">
                    <label className="form-label" htmlFor="input">first name</label>
                    <br/>
                    <input className="form-input" id="input" disabled={true} value={userPreview.previewFirstName}/>
                </div>

                <div className="custom-input retreat">
                    <label className="form-label" htmlFor="input">last name</label>
                    <br/>
                    <input className="form-input" id="input" disabled={true} value={userPreview.previewLastName}/>
                </div>

                <div className="custom-input retreat">
                    <label className="form-label" htmlFor="input">Email</label>
                    <br/>
                    <input className="form-input" id="input" disabled={true} value={userPreview.previewEmail}/>
                </div>

                <div className={"retreat"}/>
            </div>

        </div>

    );
}

export default PreviewOption;