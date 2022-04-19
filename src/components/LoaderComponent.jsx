import { Circles } from "react-loader-spinner";
import "../css/loader.css"
import { FooterComponent } from "./FooterComponent";
const LoaderComponent = (props) => {

    return (
        <div>
            <div className="loader center">
                <Circles
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
                <br />
            </div>
            <div>
                <p id="msg">{props.message ? props.message : null}</p>
            </div>
            <div>
                <FooterComponent />
            </div>
        </div>)
}

export default LoaderComponent;