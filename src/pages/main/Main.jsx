import "./main.style.css"
import Header from "../../components/Header/Header";
import React, {useEffect, useState} from "react";
import CustomInterface from "../../components/CustomInterface/CustomInterface";
import axios from "axios";
import CustomDetailInterface from "../../components/CustomDetailInterface/CustomDetailInterface";
import CustomResultText from "../../components/CustomResultText/CustomResultText";
// import {ReactComponent as ImportCSV} from "../../icons/import-csv.svg";

const Main = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [interface_, setInterface_] = useState([])
    const [interfaces, setInterfaces] = useState([])
    const [detailInterface, setDetailInterface] = useState(null)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errors, setErrors] = useState("");


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [equation, setEquation] = useState({
        id: "",
        start_calculation: "",
        end_calculation: "",
        duration: ""
    });
    const [matrixFile, setMatrixFile] = useState(null);
    const [vectorFile, setVectorFile] = useState(null);


    const handleChange = ({target: {name, value}}) => {
        setEquation({...equation, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    const handleSubmit = async () => {
        await startCalculation(equation)
        console.log(equation)
        setEquation({
            id: "",
            start_calculation: "",
            end_calculation: "",
            duration: ""
        })
    }

    function startCalculation(equation) {
        console.log("startCalculation");
        const formData = new FormData();
        formData.append('matrixFile', matrixFile);
        formData.append('vectorFile', vectorFile);
        console.log(formData)
        return axios.post("http://localhost:8765/business-logic/api/v1/equation", formData, {
            headers: {
                authorization: "Bearer " + AuthToken["token"]
            }
        })
            .then((response) => {
                const data = response.data;
                setInterface_([...interface_, {
                    ...equation,
                    id: data.id,
                    start_calculation: data.startCalculation.substring(0, 19)
                }])
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.message)
                    console.log("error")
                }
            });
    }

    const handleMatrixFileChange = (event) => {
        setMatrixFile(event.target.files[0]);
    };

    const handleVectorFileChange = (event) => {
        setVectorFile(event.target.files[0]);
    };

    const handleClick = (id) => {
        console.log("getEquationById");
        return axios.get("http://localhost:8765/business-logic/api/v1/equation?id=" + id, {
            headers: {
                authorization: "Bearer " + AuthToken["token"]
            }
        })
            .then((response) => {
                const data = response.data;
                setDetailInterface({
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
        getHistory();
    }, []);

    function getHistory() {
        console.log("getHistory");
        return axios.get("http://localhost:8765/business-logic/api/v1/equations", {
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
        <div className={"main-page"}>
            <div>
                <Header/>
            </div>


            <div className={"main-container"}>
                <div className={"main-auxiliary-container"}>

                    <div className={"main-calculator"}>
                        <div className={"main-equations-solver"}>
                            Online Systems of <span className={"main-span-orange"}>Equations Solver</span>
                        </div>
                        <div className={"main-tip"}>
                            Please, select matrix and vector files then click on the button "<span
                            className={"main-span-yellow"}>Calculate</span>" to start calculating your linear system
                        </div>

                        <div className={"main-auxiliary-form-container"}>
                            <div className={"main-file-name-inputs"}>
                                <div className={"main-file-name"}>
                                    Matrix file:
                                </div>
                                <div className={"main-file-name"}>
                                    Vector file:
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
                                <div className={"main-select-file"}>
                                    <label className={"main-label-file"}>
                                        <input className={"main-select-input"} type="file" accept=".csv"
                                               onChange={handleVectorFileChange}/>
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

                            {interfaces.map((equation_interface, index) => <CustomInterface
                                id={equation_interface.id}
                                start_calculation={equation_interface.start_calculation}
                                end_calculation={equation_interface.end_calculation}
                                onClick={handleClick}
                                key={index}
                            />)}

                        </div>

                        <div className={"main-details"}>
                            {detailInterface ? <CustomDetailInterface
                                detailInterface={detailInterface}
                            /> : <div></div>}

                        </div>
                    </div>
                </div>
            </div>
            <div className={"main-footer"}></div>
        </div>
    );
}

export default Main;