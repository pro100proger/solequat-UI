import "./main.style.css"
import Header from "../../components/Header/Header";
import React from "react";
import {useNavigate} from "react-router-dom";


const Main = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    function equationSolver() {
        navigate("/equation");
    }


    return (
        <div className={"main-page"}>
            <div>
                <Header/>
            </div>

            <div className={"main-container"}>
                <div className={"main-auxiliary-container"}>
                    <div className={"main-headline-container"}>
                        <div className={"main-headline"}>
                            SolEquat
                        </div>
                    </div>
                    <div className={"main-headline-container"}>
                        <div className={"main-auxiliary-text"}>
                            Welcome to SolEquat website! Here you can perform difficult mathematical
                            calculations without worrying about the complexity of performing such tasks.
                        </div>
                    </div>
                    <div className={"main-button-container"}>
                        <div className={"main-start-calculating-text"}>
                            You can start calculating by clicking on the button:
                        </div>
                        <div>
                            <button className={"main-calculating-button"} onClick={equationSolver}>
                                Get started!
                            </button>
                        </div>
                    </div>

                    <div className={"bottom-line"}></div>
                </div>
            </div>
        </div>
    );
}

export default Main;