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
import tableProfile from "../../../images/table-profile.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer";
import "../Home/Player_style.css";
import { logoutUser } from "../../../Redux/Actions/auth";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Network } from "../../../Services/Api";
import BigUserProfile from "../../../images/big-user-profile.png";


function PlayerMedia(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [profilePic, setProfilePic] = useState([]);

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
        updateProfile();
    }, []);

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };
    const updateProfile = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            let header = {
                "token": user.authtoken,
            };
            // console.log("user", user);

            Network("api/getUserDetailsById?user_id=" + user?._id, "GET", header).then(
                async (res) => {
                    // console.log("new Profile Pic----", res);
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null));
                        localStorage.removeItem("user");
                        history.push("/");
                        toast.error(res.response_message);
                    }
                    setProfilePic(res.response_data.userDetailsObj);
                }
            );
        }
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
                                {console.log(profilePic.lname, "3740000000000000000>>>>")}
                                {profilePic?.fname ? (
                                    <div className="profile-head-name">

                                        {profilePic?.fname + " " + profilePic?.lname}
                                    </div>
                                ) : (
                                    <div className="profile-head-name">{profilePic?.fname} {profilePic?.lname}</div>
                                )}

                                <div className="profile-head-img">
                                    {profilePic?.profile_image == null ? (
                                        <img src={BigUserProfile} alt="" />
                                    ) : (
                                        // <img src={`${pic1}${profilePic?.profile_image}`} alt="" />
                                        <img
                                            src={profilePic?.profile_image}
                                            alt=""

                                        />
                                    )}
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
                            <div className="player-info-head">
                                <h2 className="page-title">Stream</h2>
                                <div className="player-info-head-right">

                                    <div className="streming-head-right">
                                        <div className="stream-tab">
                                            <ul>
                                                <li><a className="active" href="#">Stream</a></li>
                                                <li onClick={() => history.push("./PlayerPhotos")}><a href="#">Photos</a></li>
                                                <li><a href="#" onClick={() => history.push("./PlayerVideos")}>Videos</a></li>
                                                <li><a href="#" onClick={() => history.push("./PlayerFiles")}>Files</a></li>
                                            </ul>
                                        </div>

                                        <button className="start-stream-btn">Start Stream</button>
                                    </div>
                                </div>
                            </div>
                            <div className="prefarance-box streaming-section">
                                <div className="strame-chat-section">
                                    <div className="strame-main">
                                        <div className="strame-main-inner">
                                            <h3>Connect streaming software to go live</h3>
                                            <p>Viewers will be able to find your stream once you go live</p>
                                        </div>
                                    </div>
                                    <div className="chat-main">
                                        <h4>Live Chat</h4>
                                        <div className="chat-main-input">
                                            <input type="text" placeholder="say something..." className="input-field" />
                                            <button className="chat-send-btn"><img src="images/send-btn.png" alt="" /></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="streaming-form-section playerinfo-form">
                                    <div className="streaming-form-field-set">
                                        <div className="streaming-form-field-left">
                                            <div className="prefarance-form-list">
                                                <label>Title</label>
                                                <input type="text" className="input-select" />
                                            </div>
                                        </div>
                                        <div className="streaming-form-field-right">
                                            <div className="prefarance-form-list">
                                                <label>Game</label>
                                                <input type="text" className="input-select" />
                                            </div>
                                        </div>
                                        <div className="streaming-form-field-left">
                                            <div className="prefarance-form-list">
                                                <label>Game Description</label>
                                                <textarea className="input-textarea"> </textarea>
                                            </div>
                                        </div>
                                        <div className="streaming-form-field-right">
                                            <div className="prefarance-form-list">
                                                <label>Team</label>
                                                <input type="text" className="input-select" />
                                            </div>
                                            <div className="prefarance-form-list">
                                                <label>Privacy</label>
                                                <input type="text" className="input-select" />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="prefarance-form-list">
                                        <label className="options-check-family">Start sending us your video from your streaming software to go live
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerMedia;
