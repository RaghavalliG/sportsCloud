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
import Footer from "../../../Components/Footer"
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { logoutUser } from "../../../Redux/Actions/auth";
import { ToastContainer, toast } from 'react-toastify';
import BigUserProfile from "../../../images/big-user-profile.png"



function TeamShedule(props) {
    const history = useHistory();

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const dispatch = useDispatch()
    const [team, setTeam] = useState([])
    const [schedule, setSchedule] = useState([])
    const [profilePic, setProfilePic] = useState([])
    const [teamId, setTeamId] = useState("")

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
        teamSelect()
        updateProfile()
    }, []);

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };
    const pic = 'https://nodeserver.mydevfactory.com:1447/'
    const teamSelect = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/my-team-list?team_manager_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("teanSelect----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setTeam(res.response_data)
                    teamSchedule(res.response_data[0]._id);


                })
        }
    }


    const teamSchedule = (id) => {
        console.log("id", id)
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {

                'authToken': user.authtoken

            }

            let url = ""
            if (id != undefined) {

                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10'
            }
            else {
                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + teamId + '&page=1&limit=10'
            }
            //console.log('user',user)
            Network('api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10', 'GET', header)
                .then(async (res) => {
                    console.log("schedule----", res)
                    // if (res.response_code == 4000) {
                    //     dispatch(logoutUser(null))
                    //     localStorage.removeItem("user");
                    //     history.push("/")
                    //     toast.error(res.response_message)
                    // }
                    //console.log("doc data----->",res.response_data.docs)
                    setSchedule(res.response_data.docs)


                })
        }
    }

    const updateProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/get-user-details?user_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("new Profile Pic----", res)
                    setProfilePic(res.response_data)

                })
        }

    }

    const change = (event) => {
        console.log("event", event.target.value)
        setTeamId(event.target.value)
        teamSchedule(event.target.value);
    }

    return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-main">
                    <SideMenuComponents manger="manger" />
                        <div className="dashboard-main-content">
                        <div className="dashboard-head">
                            <div className="teams-select">
                                <button className="create-new-team" onClick={() => {
                                    history.push("/CreateTeam")
                                }}>Create New Teams</button>
                                <select onChange={change} >

                                    {team == null ? <option> Team1</option> :
                                        team.map((team) => {
                                            return (
                                                <option key={team.id}>{team.team_name}</option>
                                            )
                                        })}
                                </select>
                                <div className="dropBtn">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "#2C2C2C", border: "none" }}>
                                        ACCOUNT
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ backgroundColor: "#484848", listStyle: "none", margin: "14px" }}>
                                        <li><a className="dropdown-item" href="#">Jayanta Karmakar</a></li>
                                        <Link to={{ pathname: "/MyAccount" }} >
                                            <li><a className="dropdown-item" href="#">My Account</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/Credit" }} >
                                            <li><a className="dropdown-item" href="#">Credits</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/Household" }} >
                                            <li><a className="dropdown-item" href="#">My HouseHold</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/ManageTeam" }} >
                                            <li><a className="dropdown-item" href="#">Manage My Team</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/Biling" }} >
                                            <li><a className="dropdown-item" href="#">Biling & Plans</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/CreateTeam" }} >
                                            <li><a className="dropdown-item" href="#">Create New Team</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/SignOut" }} >
                                            <li><a className="dropdown-item active" href="#">Sign Out</a></li>
                                        </Link>

                                    </ul>
                                </div>
                            </div>
                            <div className="profile-head">
                                <div className="profile-head-name">{profilePic?.fname + " " + profilePic?.lname}</div>
                                <div className="profile-head-img">
                                    {profilePic?.profile_image == null ?
                                        <img src={BigUserProfile} alt="" /> :
                                        <img src={`${pic}${profilePic?.profile_image}`} alt="" />
                                    }

                                </div>
                            </div>
                            <div className="login-account"><ul><li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li></ul></div>

                        </div>

                    <div className="prefarance-page">
                    <div className="player-info-head">
                        <h2 className="page-title">Tournament Schedule</h2>
                            <div className="player-info-head-right">
            
                            <div className="streming-head-right">
                            <div className="stream-tab">
                                <ul>
                                    <li><a href="#"  onClick={() => history.push("./TeamOrganizer")}>Tournament Organizer</a></li>
                                    <li><a className="active" href="#">Tournament Schedule</a></li>
                                    <li><a href="#" onClick={() => history.push("./Brackets")}>Brackets</a></li>
                                    <li><a href="#" onClick={() => history.push("./TeamRegister")}>Registration</a></li>
                                </ul>
                            </div>
                            
                            {/* <button className="start-stream-btn">Start Stream</button> */}
                            </div>
                            </div>
                        </div>
                        <div className="teamOrgbar">
                            <span><input type="checkbox"/>Show Historical</span>
                            <div className="teamBtnRgt">
                                <a href="#">Print</a>
                            </div>
                        </div>
                        <div className="teamOrgselect">
                            <div className="slctLft">
                                <div className="slctPart">
                                    <span>Location</span>
                                    <select>
                                        <option>Option 1</option>
                                        <option>2</option>
                                    </select>
                                </div>
                                <div className="slctPart">
                                    <Form.Group controlId="dob">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                                    </Form.Group>
                                </div>
                                <div className="slctPart">
                                    <span>Operational Staff</span>
                                    <select>
                                        <option>Option 1</option>
                                        <option>2</option>
                                    </select>
                                </div>
                                <div className="slctPart">
                                    <span>Tournament Name</span>
                                    <select>
                                        <option>Summer Apr 2020</option>
                                        <option>2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="prefarance-box teamSheduleBg">    
                            <div className="sheduledHd">Schedule</div>  
                            <div className="sheduleTable">
                                <Table responsive="md">
                                    <thead>
                                        <tr>
                                            <th>Game</th>
                                            <th>Location</th>
                                            <th>Time</th>
                                            <th>Court</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Chicago Bulls VS Brooklyn</td>
                                            <td>Staples Center (Los Angeles)</td>
                                            <td><span>9:30 AM</span></td>
                                            <td>Court 1</td>
                                            <td>140-126<p>Chicago Bulls Wins</p></td>
                                        </tr>
                                        <tr>
                                            <td>Chicago Bulls VS Brooklyn</td>
                                            <td>Staples Center (Los Angeles)</td>
                                            <td><span>9:30 AM</span></td>
                                            <td>Court 1</td>
                                            <td>140-126<p>Chicago Bulls Wins</p></td>
                                        </tr>
                                        <tr>
                                            <td>Chicago Bulls VS Brooklyn</td>
                                            <td>Staples Center (Los Angeles)</td>
                                            <td><span>9:30 AM</span></td>
                                            <td>Court 1</td>
                                            <td>140-126<p>Chicago Bulls Wins</p></td>
                                        </tr>
                                        <tr>
                                            <td>Chicago Bulls VS Brooklyn</td>
                                            <td>Staples Center (Los Angeles)</td>
                                            <td><span>9:30 AM</span></td>
                                            <td>Court 1</td>
                                            <td>140-126<p>Chicago Bulls Wins</p></td>
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

export default TeamShedule;
