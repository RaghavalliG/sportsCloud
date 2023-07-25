import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "../../../Utils/css/style.css";
import "../../../Utils/css/responsive.css";
import "../../../Utils/css/bootstrap.min.css";
import "../../../Utils/css/bootstrap-datepicker.css";
import Logo from "../../../images/logo.png";
import { Network } from "../../../Services/Api";
import { useDispatch } from "react-redux";
// import { loginUser } from "../../Redux/Reducer/auth"
import MyLoader from "../../../Components/Comman/loader";
import { ToastContainer, toast } from "react-toastify";

function ForgetComponents(props) {
  const history = useHistory();

  const [input, setInput] = useState({});
  const [errors, setError] = useState({});

  const handleSubmit = (event) => {
    var obj = {
      email: input["email"],
      otp_type: "forgot_password",
    };
    Network("api/generate-otp", "post", obj)
      .then(async (res) => {
        console.log("res success verify otp--->", res);
        if (res.response_code == 200) {
          toast.success(res.response_message);
          history.push({
            pathname: "/verifyotp",
            state: {
              id: 7,
              email: input["email"],
              otp_type: "forgot_password",
            },
          });
        } else {
          toast.error(res.response_message);
        }
      })
      .catch((error) => {
        console.log("error===>", error);
      });
    event.preventDefault();
  };

  const handleChange = (event) => {
    let input1 = input;
    input1[event.target.name] = event.target.value;
    console.log(input1);
    setInput(input1);
  };

  return (
    <>
      <div className="login-container" style={{ flexGrow: 1 }}>
        <div className="container">
          <header className="text-center pt-4">
            <a href="#">
              <img src={Logo} alt="#" className="img-fluid" />
            </a>
          </header>
          <div className="login_box">
            <h4 className="login_box_header">Forgot Password</h4>
            <p className="subtxt_login">
              Enter your email, you will receive a code by email
            </p>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <div className="btn-set">
                  <button type="submit" className="btn btn-deflt">
                    Submit
                  </button>
                  <button
                    type="btn"
                    onClick={() => history.push("/")}
                    className="btn btn-deflt ml-2"
                    style={{ background: "#8A8A8A" }}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetComponents;
