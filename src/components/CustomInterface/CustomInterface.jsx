import "./custom-interface.style.css";
import React, {useEffect, useState} from "react";
import CustomResultText from "../../components/CustomResultText/CustomResultText";
import axios from "axios";

const CustomInterface = ({id, start_calculation, end_calculation, onClick, ...otherProps}) => {

    return (
        <div className={"custom-interface-container"} onClick={()=>onClick(id)}>
            <div className={"custom-interface-name"}>
                <div className={"custom-interface-circles"}>
                    <div className={"custom-interface-yellow-circle"}/>
                    <div className={end_calculation || end_calculation === 0 ?
                        "custom-interface-green-circle" :
                        "custom-interface-empty-circle"}/>
                </div>
            </div>
            <div className={"custom-interface-interface"}>
                    <div className={"custom-interface-time"}>
                        <CustomResultText
                            resultValue={start_calculation ? start_calculation : "..."}
                            label={"Start time: "}
                        />
                    </div>
                    <div className={"custom-interface-time"}>
                        <CustomResultText
                            resultValue={end_calculation ? end_calculation : "..."}
                            label={"End time:  "}
                        />
                    </div>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    );
}

export default CustomInterface;