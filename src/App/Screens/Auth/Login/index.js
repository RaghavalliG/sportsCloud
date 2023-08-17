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
import "../Login/style.css";
import "../../../Utils/css/bootstrap.min.css";
import "../../../Utils/css/bootstrap-datepicker.css";
import Logo from "../../../images/logo.png";
import { Network } from "../../../Services/Api";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../Redux/Actions/auth";
import MyLoader from "../../../Components/Comman/loader";
import { ToastContainer, toast } from "react-toastify";

function LoginComponents(props) {
  const history = useHistory();

  const [input, setInput] = useState({});
  const [errors, setError] = useState({});
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const validate = () => {
    let input1 = input;
    let errors = {};
    let isValid = true;

    if (!input1["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input1["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input1["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }
    if (!input1["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }
    setError(errors);
    return isValid;
  };
  //.........for on change mether.............

  const handleChange = (event) => {
    let input1 = input;
    input1[event.target.name] = event.target.value;
    console.log(input1);
    setInput(input1);
  };

  //.........Login submit............

  const handleSubmit = (event) => {
    if (validate()) {
      var obj = {
        email: input["email"],
        password: input["password"],
        apptype: "ANDROID",
        devicetoken: "123456",
      };
      // console.log("obj submit for log in ----->", obj)
      setLoader(true);
      //       var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");

      // var raw = JSON.stringify({
      //   "apptype": "ANDROID",
      //   "devicetoken": "123456",
      //   "email": "md.raja@gmail.com",
      //   "password": "123456"
      // });

      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: 'follow'
      // };

      // fetch("https://nodeserver.mydevfactory.com:1448/api/login", requestOptions)
      //   .then(response => response.text())
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error));
      Network("api/login", "post", obj)
        .then(async (res) => {
          console.log("res success login--->", res);
          if (res.response_code == 200) {
            // console.log('response_')
            // console.log(res.response_data.authtoken)
            // console.log(res.response_data.authtoken != "" && res.response_data.authtoken != null)
            if (res.response_data.authtoken != "" && res.response_data.authtoken != null) {
              // console.log('response_au')
              toast.success(res.response_message);
              setLoader(false);
              localStorage.setItem("user", JSON.stringify(res.response_data));
              dispatch(loginUser(res.response_data));
              props.history.push("/");
            } else {
              // console.log('response_no')
              toast.error(res.response_message);
            }
          } else {
            toast.error(res.response_message);
            setLoader(false);
          }
        })
        .catch((error) => {
          setLoader(false);
          console.log("error===>", error);
        });
    }
    event.preventDefault();
  };

  return (
    <>
      <MyLoader active={loader}>
        <div className="login-container" style={{ flexGrow: 1 }}>
          <div className="container">
            <header className="text-center pt-4">
              <a href="/">
                <img src={Logo} alt="#" className="img-fluid" />
              </a>
            </header>
            <div className="login_box">
              <h4 className=" login_box_header">Login</h4>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    name="email"
                  />
                  <span style={{ color: "red", fontSize: 12 }}>
                    {errors.email}
                  </span>
                </div>
                <div className="form-group mb-2">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    name="password"
                  />
                  <span style={{ color: "red", fontSize: 12 }}>
                    {errors.password}
                  </span>
                </div>
                <div className="text-right">
                  <Link to="/forgetpassword">
                    <h3 className="forget-title">Forgot Password?</h3>
                  </Link>
                </div>
                <div className="btn-set">
                  <button type="submit" className="btn btn-deflt">
                    Submit
                  </button>
                </div>
                <div>
                  <p id="account">
                    Don't have an account? {"  "}
                    <Link
                      to="/signup"
                      style={{ color: "white", cursor: "pointer" }}
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MyLoader>
    </>
  );
}

export default LoginComponents;
