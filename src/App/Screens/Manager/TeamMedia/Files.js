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
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form'


function Files(props) {
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
                                <div className="profile-head-name">{user ? user?.fname : null}</div>
                                <div className="profile-head-img">
                                    {
                                        user ?
                                            <img src={user?.profile_image} alt="" /> :
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
                    <h2 className="page-title">Photo Albums</h2>
                    <div className="player-info-head-right">
    
                      <div className="streming-head-right">
                       <div className="stream-tab">
                           <ul>
                               <li><a href="#" onClick={() => history.push("./TeamMedia")}>Stream</a></li>
                               <li><a href="#" onClick={() => history.push("./Photos")}>Photos</a></li>
                               <li><a href="#" onClick={() => history.push("./Videos")}>Videos</a></li>
                               <li><a className="active" href="#">Files</a></li>
                           </ul>
                       </div>
                       
                       {/* <button className="start-stream-btn">Start Stream</button> */}
                       </div>
                    </div>
                    </div>
                    <div className="prefarance-box streaming-section">
                      <div className="photosTp">
                          <span>Import a Schedule of games by uploading a file that includes opponents, times, and locations.</span>                          
                      </div>
                      {/* <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" />
                        </Form.Group> */}
                      <div className="fileUploadSec">
                          <button>Choose File</button>
                          <span>No file choosen</span>
                      </div>
                      <div className="photoTpBtm">
                            <p>The First row should be your column headings (e.g., date, time, opponent, location). See the Schedule Template below for examples. </p>                            
                      </div>
                      <div className="filesBtms"><span className="filesDnld">Download Our Roster Template</span> | <span className="filepdnLft">(Acceptable Formats: .XLS, .XLSX and .CSV)</span></div>

                    </div>
                </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Files;
