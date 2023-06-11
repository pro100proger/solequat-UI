import CustomResultText from "../CustomResultText/CustomResultText";
import "./custom-detail-interface.css"
import React from "react";
import axios from "axios";

const CustomDetailInterface = ({detailInterface}) => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));

    const handleDownloadResult = () => {
        console.log("getResultById");
        return axios.get("http://localhost:8765/business-logic/api/v1/result?id=" + detailInterface.result_id, {
            headers: {
                authorization: "Bearer " + AuthToken["token"]
            }
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'result.csv');
                document.body.appendChild(link);
                link.click();

                console.log("data")
                console.log(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.message)
                    console.log("error")
                }
            });
    };

    const handleDownloadVector = () => {
        console.log("getVectorById");
        return axios.get("http://localhost:8765/business-logic/api/v1/vector?id=" + detailInterface.data_id, {
            headers: {
                authorization: "Bearer " + AuthToken["token"]
            }
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'vector.csv');
                document.body.appendChild(link);
                link.click();

                console.log("data.vector")
                console.log(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.message)
                    console.log("error")
                }
            });
    };

    const handleDownloadMatrix = () => {
        console.log("getMatrixById");
        return axios
            .get("http://localhost:8765/business-logic/api/v1/matrix?id=" + detailInterface.data_id, {
                headers: {
                    authorization: "Bearer " + AuthToken["token"],
                },
                responseType: "blob",
            })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "matrix.csv");
                document.body.appendChild(link);
                link.click();

                console.log("data.matrix");
                console.log(response.data.matrix);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.message);
                    console.log("error");
                }
            });
    };

    return (
        <div className={"custom-detail-container"}>

            <div className={"custom-detail-headline"}>
                Detail information:
            </div>
            <div className={"custom-detail-headline-line"}/>

            <div className={"custom-detail-details"}>
                <div className={"custom-detail-line"}>
                    <div className={"custom-detail-unit"}>
                        <CustomResultText
                            resultValue={detailInterface.duration ? detailInterface.duration : "..."}
                            label={"Duration: "}
                            unitOfMeasurement={"milliseconds"}
                        />
                    </div>
                    <div className={"custom-detail-unit"}>
                        <CustomResultText
                            resultValue={detailInterface.start_calculation ? detailInterface.start_calculation : "..."}
                            label={"Start time: "}
                        />
                    </div>
                    <div className={"custom-detail-unit"}>
                        <CustomResultText
                            resultValue={detailInterface.end_calculation ? detailInterface.end_calculation : "..."}
                            label={"End time: "}
                        />
                    </div>
                </div>
            </div>
            <div className={"custom-detail-headline-line"}/>
            <div className={"custom-detail-tip"}>
                Click on one of the buttons to download the corresponding file:
            </div>
            <div className={"custom-detail-buttons"}>
                <div>
                    <button className={"custom-detail-button"} onClick={handleDownloadMatrix}>
                        Matrix
                    </button>
                </div>
                <div>
                    <button className={"custom-detail-button"} onClick={handleDownloadVector}>
                        Vector
                    </button>
                </div>
                <div>
                    <button className={"custom-detail-button"} onClick={handleDownloadResult}>
                        Result
                    </button>
                </div>
            </div>

        </div>
    );
}

export default CustomDetailInterface;