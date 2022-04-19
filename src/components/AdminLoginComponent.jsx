import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import authService from "../services/AuthService";
import { useLocation, useNavigate } from "react-router-dom";
import { FooterComponent } from "./FooterComponent";
import LoaderComponent from "./LoaderComponent";
const AdminLoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        authService.start()
            .finally(() => {
                setLoading(false);
            })
    }, [])
    const { state } = useLocation();
    const handleSubmit = (event) => {
        event.preventDefault();
        let state = {
            username: email,
            password: password,
            error: ""
        }
        console.log(state);
        authService.login(state)
            .then((response) => {
                console.log(response.access_token);
                let decoded = jwt_decode(response.access_token);
                if (decoded.roles[0] === "ROLE_ADMIN") {
                    navigate("/adminHome");
                    window.location.reload();
                } else if (decoded.roles[0] === "ROLE_USER") {
                    localStorage.removeItem("user")
                    setError("Username/ Password Not Correct")
                }
            }).catch(err => {
                console.log(err);
                if (err.response.status === 403) {
                    setError("Username/ Password Not Correct");
                }
            })
    }

    return (
        loading === true ? <LoaderComponent message={"Loading ..."} /> :
            <div>
                <div id="login">
                    <div className="row offset-3">
                        <div className="card w-75 text-center" style={{ marginTop: "15px" }}>
                            <div className="card-header">
                                <div className="row" style={{ justifyContent: "space-evenly" }}>
                                    <div className="col-xs-6 card-link">
                                        <a href="/adminLogin" className="active" id="login-form-link">Login</a>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form method="post" id="login-form"
                                            style={{ display: "block" }}>
                                            <div className="form-group">
                                                <input type="text" name="username" id="username" tabIndex="1"
                                                    className="form-control" placeholder="Email Id" onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" name="password" id="password"
                                                    tabIndex="2" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password"
                                                    required="required" />
                                            </div>
                                            <div className="form-group">
                                                <div className="row" style={{ marginLeft: "260px" }}>
                                                    <div className="text-center col-6 col-sm-offset-8">
                                                        <input type="button" name="login-submit" id="loginsubmit"
                                                            tabIndex="4" className="btn btn-primary" value="Log In"
                                                            style={{ paddingRight: "5px" }} onClick={handleSubmit} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="text-center">
                                                            <a href="/adminForgotPassLink" tabIndex="5" className="forgot-password">Forgot
                                                                Password?</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="validation" style={{ color: "red", fontWeight: "700" }}>{error === "" ? null : error}</div>
                                            <div id="validation" style={{ color: "red", fontWeight: "700" }}>{state !== null ? (state === "" ? null : state.message) : null}</div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>
    )
}

export default AdminLoginComponent;