import "./custom-resul-text.style.css";
import React from "react";

const CustomResultText = ({ resultValue, label, unitOfMeasurement, ...otherProps }) => {
    return (
        <div className={"result-container"}>
            <label className="result-label" htmlFor="input">{label}</label>
            <div className={"result-value"}>
                {resultValue} {unitOfMeasurement}
            </div>
        </div>
    );
};

export default CustomResultText;