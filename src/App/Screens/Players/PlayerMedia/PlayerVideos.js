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
import Table from 'react-bootstrap/Table';


function PlayerVideos(props) {
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
                   <div className="player-info-head">
                    <h2 className="page-title">Video Albums</h2>
                        <div className="player-info-head-right">    
                        <div className="streming-head-right">
                            <div className="stream-tab">
                                <ul>
                                    <li onClick={() => history.push("./PlayerMedia")}><a href="#">Stream</a></li>
                                    <li onClick={() => history.push("./PlayerPhotos")}><a href="#">Photos</a></li>
                                    <li><a className="active" href="#">Videos</a></li>
                                    <li onClick={() => history.push("./PlayerFiles")}><a href="#">Files</a></li>
                                </ul>
                            </div>
                            <button className="start-stream-btn actvUpld">Upload New Photo</button>
                            <button className="start-stream-btn">Make Album Private</button>
                        </div>
                        </div>
                    </div>

                    <div className="prefarance-form-list">
                            <label className="options-check-family">Select All
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                            </label>
                    </div>

                    <div className="prefarance-box playerPhotopage">                      
                        <div className="ppHead">
                            <span>&nbsp;</span>
                            <select>
                                <option>Perform Action</option>
                                <option>Perform Action2</option>
                            </select>
                        </div>
                        <div className="ppTablebg">
                            <Table responsive="md">
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Title</th>
                                            <th>Added by</th>
                                            <th>Date Added</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>                                            
                                            <td><span className="ppImg"><img src={user.profile_image} alt="" /></span></td>
                                            <td>1551512214254545.jpg</td>
                                            <td>Lisa Menon</td>
                                            <td>Oct 20, 2021</td>
                                        </tr>
                                        <tr>                                            
                                            <td><span className="ppImg"><img src={user.profile_image} alt="" /></span></td>
                                            <td>1551512214254545.jpg</td>
                                            <td>Lisa Menon</td>
                                            <td>Oct 20, 2021</td>
                                        </tr>
                                        <tr>                                            
                                            <td><span className="ppImg"><img src={user.profile_image} alt="" /></span></td>
                                            <td>1551512214254545.jpg</td>
                                            <td>Lisa Menon</td>
                                            <td>Oct 20, 2021</td>
                                        </tr>
                                        <tr>                                            
                                            <td><span className="ppImg"><img src={user.profile_image} alt="" /></span></td>
                                            <td>1551512214254545.jpg</td>
                                            <td>Lisa Menon</td>
                                            <td>Oct 20, 2021</td>
                                        </tr>
                                    </tbody>                                    
                                </Table> 
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

export default PlayerVideos;
