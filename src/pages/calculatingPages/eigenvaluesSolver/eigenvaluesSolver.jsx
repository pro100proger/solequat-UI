import "./eigenvaluesSolver.style.css"
import Header from "../../../components/Header/Header";
import React, {useEffect, useState} from "react";
import CustomInterface from "../../../components/CustomInterface/CustomInterface";
import axios from "axios";
import CustomDetailInterface from "../../../components/CustomDetailInterface/CustomDetailInterface";
import CustomResultText from "../../../components/CustomResultText/CustomResultText";
import CustomEigenvaluesDetailInterface
    from "../../../components/CustomEigenvaluesDetailInterface/CustomEigenvaluesDetailInterface";
// import {ReactComponent as ImportCSV} from "../../icons/import-csv.svg";

const EigenvaluesSolver = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [interface_, setInterface_] = useState([])
    const [interfaces, setInterfaces] = useState([])
    const [detailEigenvaluesInterface, setDetailEigenvaluesInterface] = useState(null)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errors, setErrors] = useState("");


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [eigenvalues, setEigenvalues] = useState({
        id: "",
        start_calculation: "",
        end_calculation: "",
        duration: ""
    });
    const [matrixFile, setMatrixFile] = useState(null);


    const handleChange = ({target: {name, value}}) => {
        setEigenvalues({...eigenvalues, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    const handleSubmit = async () => {
        await startCalculationEigenvalues(eigenvalues)
        console.log(eigenvalues)
        setEigenvalues({
            id: "",
            start_calculation: "",
            end_calculation: "",
            duration: ""
        })
    }

    function startCalculationEigenvalues(eigenvalues) {
        console.log("startCalculationEigenvalues");

        const formData = new FormData();
        if (matrixFile) {
            formData.append('matrixFile', matrixFile);

            console.log(formData);

            return axios.post("http://localhost:8765/business-logic/api/v1/eigenvalues", formData, {
                headers: {
                    authorization: "Bearer " + AuthToken["token"]
                }
            })
                .then((response) => {
                    const data = response.data;
                    setInterface_([...interface_, {
                        ...eigenvalues,
                        id: data.id,
                        start_calculation: data.startCalculation.substring(0, 19)
                    }])
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.message);
                        console.log("error");
                    }
                });
        } else {
            let errors = {}
            console.log("Files are not attached");
            errors.files = "Please select matrix file."
            setErrors(errors)
            console.log(errors.files);
        }
    }

    const handleMatrixFileChange = (event) => {
        setMatrixFile(event.target.files[0]);
    };

    const handleClick = (id) => {
        console.log("getEigenvaluesById");
        return axios.get("http://localhost:8765/business-logic/api/v1/eigenvalues?id=" + id, {
            headers: {
                authorization: "Bearer " + AuthToken["token"]
            }
        })
            .then((response) => {
                const data = response.data;
                setDetailEigenvaluesInterface({
                    duration: data.duration,
                    end_calculation: data.endCalculation.substring(0, 19),
                    start_calculation: data.startCalculation.substring(0, 19),
                    data_id: data.dataId,
                    result_id: data.resultId
                })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.message)
                    console.log("error")
                }
            });
    };


    useEffect(() => {
        getEigenvaluesHistory();
    }, []);

    function getEigenvaluesHistory() {
        console.log("getEigenvaluesHistory");
        return axios.get("http://localhost:8765/business-logic/api/v1/all/eigenvalues", {
            headers: {
                authorization: "Bearer " + AuthToken["token"]
            }
        })
            .then((response) => {
                const data = response.data;
                const arrays = data.map(item => ({
                    id: item.id,
                    start_calculation: item.startCalculation.substring(0, 19),
                    end_calculation: item.endCalculation.substring(0, 19),
                    duration: item.duration
                }))

                setInterfaces([...arrays])
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.message)
                    console.log("error")
                }
            });
    }


    return (
        <div className={"eigenvalues-page"}>
            <div>
                <Header/>
            </div>

            <div className={"eigenvalues-container"}>
                <div className={"eigenvalues-auxiliary-container"}>

                    <div className={"eigenvalues-calculator"}>
                        <div className={"main-eigenvalues-solver"}>
                            Online Systems of <span className={"main-span-orange"}>Eigenvalues Solver</span>
                        </div>
                        <div className={"main-tip"}>
                            Please, select matrix file then click on the button "<span
                            className={"main-span-yellow"}>Calculate</span>" to start calculating eigenvalues
                        </div>

                        {errors.files && <p className='input_error'>
                            {errors.files}
                        </p>}
                        <div className={"main-auxiliary-form-container"}>
                            <div className={"main-file-name-inputs"}>
                                <div className={"main-file-name"}>
                                    Matrix file:
                                </div>
                            </div>
                            <div className={"main-auxiliary-import-files"}>
                                {/*{errors.matrixFile && <p className='input_error'>*/}
                                {/*    {errors.matrixFile}*/}
                                {/*</p>}*/}
                                <div className={"main-select-file"}>
                                    <label className={"main-label-file"}>
                                        <input className={"main-select-input"} type="file" accept=".csv"
                                               onChange={handleMatrixFileChange}/>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={"main-button-auxiliary"}>
                            <button className={"main-button-calculate"} onClick={handleSubmit}>
                                Calculate
                            </button>
                        </div>
                    </div>


                    <div className={"main-history-container"}>
                        <div className={"main-history"}>
                            {interface_.map((interface__, index) => <CustomInterface
                                id={interface__.id}
                                start_calculation={interface__.start_calculation}
                                onClick={handleClick}
                                key={index}
                            />)}

                            {interfaces.map((eigenvalues_interface, index) => <CustomInterface
                                id={eigenvalues_interface.id}
                                start_calculation={eigenvalues_interface.start_calculation}
                                end_calculation={eigenvalues_interface.end_calculation}
                                onClick={handleClick}
                                key={index}
                            />)}

                        </div>

                        <div className={"main-details"}>
                            {detailEigenvaluesInterface ? <CustomEigenvaluesDetailInterface
                                detailEigenvaluesInterface={detailEigenvaluesInterface}
                            /> : <div></div>}

                        </div>
                    </div>
                </div>
            </div>
            <div className={"main-footer"}></div>
        </div>
    );
}

export default EigenvaluesSolver;