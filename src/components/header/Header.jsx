import "./header.style.css"
import {ReactComponent as Logo} from "../../icons/logo.svg";

const Header= () => {

    return (
        <div className={"header-container"}>

            <div className={"header-auxiliary-container-1"}>
                <div className={"header-logo-and-text"}>
                    <div className={"header-logo"}>
                        <Logo/>
                    </div>
                    <div className={"header-text"}>
                        SolEquat
                    </div>
                </div>
            </div>



        </div>
    );
}

export default Header;