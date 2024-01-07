import "./custom-header-button.style.css";
import React from "react";


const CustomHeaderButton = ({style, buttonName, onClick}) => {
    return (
      <div>
          <div className={"header-button"} style={style}>
              <button className={"header-button-name"} onClick={onClick}>
                  {buttonName}
              </button>
          </div>
      </div>
    );
}

export default CustomHeaderButton;

