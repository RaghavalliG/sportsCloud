import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import UserProfile from "../../../images/user-profile.png"
import listImage from "../../../images/list-pro1.png"
import face from "../../../images/Face.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"


function Preferance(props) {
  const history = useHistory();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});

  useEffect(() => {
    // let user = userdata && userdata._id ? true : false;
    // console.log("userMe===>", user);
    setUser(user);
    // console.log("USerData", userdata);
    const userLocal = JSON.parse(localStorage.getItem("user"));
    console.log("userData after login--->", userLocal)
    let userD = userLocal && userLocal._id ? true : false;
    setUser(userD);
    setUserData(userLocal);
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };


  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <SideMenuComponents />
          <div className="dashboard-main-content">
            <div className="dashboard-head">
              <div className="teams-select">
                <select>
                  <option>My Teams</option>
                  <option>My Teams 2</option>
                  <option>My Teams 3</option>
                </select>
              </div>

              <div className="profile-head">
                <div className="profile-head-name">{user ? user.fname : null}</div>
                <div className="profile-head-img">
                  {
                    user ?
                      <img src={user.profile_image} alt="" /> :
                      <img src={UserProfile} alt="" />
                  }

                </div>
              </div>
              <div className="login-account">
                <ul>
                  <li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li>
                  {/* <li><a href="#" data-toggle="modal" data-target="#myModalregister" onClick={handleLogout}>Logout</a></li> */}
                </ul>
              </div>
            </div>

            <div className="prefarance-page">
              <h2 className="page-title">Preference</h2>
              <div className="prefarance-box">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Notification</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Social Sharing</a>
                  </li>

                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="prefarance-tab-content">
                      <h2>My Personal Game and Event Notifications</h2>
                      <div className="prefarance-form">
                        <div className="prefarance-form-list">
                          <label>First Name</label>
                          <div className="prefarance-form-list-box">
                            <select className="input-select">
                              <option>Team Default (Email)</option>
                              <option>Team Default (Email) 2</option>
                              <option>Team Default (Email) 3</option>
                            </select>
                            <p>me a reminder before each GAME</p>
                          </div>

                        </div>
                        <div className="prefarance-form-list">
                          <label>First Name</label>
                          <div className="prefarance-form-list-box">
                            <select className="input-select">
                              <option>Team Default (Email)</option>
                              <option>Team Default (Email) 2</option>
                              <option>Team Default (Email) 3</option>
                            </select>
                            <p>me a reminder before each EVENT</p>
                          </div>

                        </div>
                        <div className="prefarance-form-list">
                          <label>Mobile Notifications</label>
                          <div className="prefarance-form-list-box">
                            <select className="input-select">
                              <option>Team Default (Email)</option>
                              <option>Team Default (Email) 2</option>
                              <option>Team Default (Email) 3</option>
                            </select>
                            <p>push notifications to my iOS and
Android devices.</p>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-2" role="tabpanel">
                    <div className="prefarance-tab-content social-share">
                      <h2>Post Your Victories to Social Media!</h2>
                      <p>TeamSnap uses a tool called if This Then That (IFTTT) to share your photos and game score to your social media
               accounts. You can do other neat things too, like play music every time your teaam wins! It's very easy to setup and it's
fee. Create an account and connect it to TeamSnap today. <a href="#">Learn more about connecting TeamSnap to IFTTT.</a></p>
                      <a href="#" className="connect-toif">Connect to IFTTT</a>
                    </div>

                  </div>

                </div>
              </div>
            </div>
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferance;
