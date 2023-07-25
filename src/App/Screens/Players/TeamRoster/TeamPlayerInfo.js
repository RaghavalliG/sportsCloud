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
import TeamList from "../../../images/team-list.png"
import UserProfile from "../../../images/user-profile.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import TeamPlayerInfoNav from "./TeamPlayerInfoNav"
import DatePicker from "react-datepicker";
import { Network } from '../../../Services/Api';
import BigUserProfile from "../../../images/big-user-profile.png";
import { logoutUser } from '../../../Redux/Actions/auth';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const TeamPlayerInfo = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [listValue, setList] = useState({
        email: false,
        alert: false,
        post: false
    })
    const [startDate, setStartDate] = useState(new Date());
    const [team, setTeam] = useState([]);
    const [teamDropdown, setTeamDropDown] = useState("");
    const [profilePic, setProfilePic] = useState([])
    // const [user, setUserData] = useState({});

    const pic = "https://nodeserver.mydevfactory.com:1448/";

    const pic1 = "https://nodeserver.mydevfactory.com:1448/profilepic/";



    const updateProfile = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            let header = {
                token: user.authtoken,
            };
            console.log("user", user);

            Network("api/get-user-details?user_id=" + user._id, "get", header).then(
                async (res) => {
                    console.log("new Profile Pic----", res);
                    setProfilePic(res.response_data);
                }
            );
        }
    };
    const handleLogout = () => {

        dispatch(logoutUser(null));
        localStorage.removeItem("user");
        // setUserData(null);
        history.push("/")
    };
    useEffect(() => {
        // let user = userdata && userdata._id ? true : false;
        // console.log("userMe===>", user);
        // setUser(user);
        // // console.log("USerData", userdata);
        // const userLocal = JSON.parse(localStorage.getItem("user"));
        // console.log("userData after login--->", userLocal)
        // let userD = userLocal && userLocal._id ? true : false;
        // setUser(userD);
        // setUserData(userLocal);
        // // teamRoster();
        teamSelect();
        // setTeamDropDown()
        updateProfile()


    }, []);
    const teamSelect = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            let header = {
                token: user.authtoken,
            };
            // console.log("user+++++++++++", user._id
            // );

            Network(
                // "api/player-joined-team-list?player_id=" + user._id,
                // "api/getAllAcceptedTeamListByPlayerId?playerId=" +"644a463b556e970345ff5be5",
                "api/getAllAcceptedTeamListByPlayerId?playerId=" + user._id,
                "GET",
                header
            ).then(async (res) => {
                // console.log("res----_______________+++++++++++++++()()", res);
                if (res.response_code == 400) {
                    dispatch(logoutUser(null));
                    localStorage.removeItem("user");
                    history.push("/");
                    toast.error(res.response_message);
                }

                setTeam(res.response_data);
                // teamRoster(res?.response_data[0]._id);
            });


        }
    };

    const change = (event) => {
        console.log("event", event)
        console.log("event", event.target.name)
        console.log("event", event.target.id)
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        console.log(teamDropdown)
        // setPlayer([])
        // teamRoster(event.target.value);

    }
    return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-main">
                    <SideMenuComponents />
                    <div className="dashboard-main-content">

                        <div className="dashboard-head">
                            
                                <div className="teams-select">
                                    <button className="create-new-team" onClick={() => {
                                        history.push("/CreateTeam")
                                    }}>Create New Teams</button>
                                    <select value={teamDropdown} onChange={change}  >
                                    <option>Select Team</option>
                                        {team?.map((team) => (
                                            <>
                                                return(
                                                <option value={team?.accept_invite_team_id}>{team?.accept_invite_team_name}</option>
                                                {/* {console.log(item,"item====++++++")} */}
                                                )
                                            </>
                                        ))}
                                    </select>
                                    <div className="dropBtn">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "#2C2C2C", border: "none" }}>
                                            ACCOUNT
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ backgroundColor: "#484848", listStyle: "none", margin: "14px" }}>
                                            <li className="dropdown-item" >{profilePic?.fname + " " + profilePic?.lname} </li>
                                            <Link to={{ pathname: "/MyAccount" }} >
                                                <li className="dropdown-item" >My Account </li>
                                            </Link>
                                            <Link to={{ pathname: "/Credit" }} >
                                                <li className="dropdown-item" >Credits </li>
                                            </Link>
                                            <Link to={{ pathname: "/Household" }} >
                                                <li className="dropdown-item" >My HouseHold </li>
                                            </Link>
                                            <Link to={{ pathname: "/ManageTeam" }} >
                                                <li className="dropdown-item" >Manage My Team </li>
                                            </Link>
                                            <Link to={{ pathname: "/Biling" }} >
                                                <li className="dropdown-item" >Biling & Plans </li>
                                            </Link>
                                            <Link to={{ pathname: "/CreateTeam" }} >
                                                <li className="dropdown-item" >Create New Team </li>
                                            </Link>
                                            <Link to={{ pathname: "/SignOut" }} >
                                                <li className="dropdown-item active" >Sign Out </li>
                                            </Link>

                                        </ul>
                                    </div>
                                </div>
                                <div className="profile-head">
                                    <div className="profile-head-name">{profilePic?.fname + " " + profilePic?.lname}</div>
                                    <div className="profile-head-img">
                                        {profilePic?.profile_image == null ?
                                            <img src={BigUserProfile} alt="" /> :
                                            // <img src={`${profilePic?.profile_image}`} alt="" />
                                            <img src={profilePic?.profile_image} alt="" />
                                            
                                        }

                                    </div>
                                </div>
                                <div className="login-account"><ul><li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li></ul></div>

                        </div>
                        <div className="prefarance-box player-info" style={{ height: "90%", marginTop: "0px", borderRadius: "0px" }}>


                            <TeamPlayerInfoNav />
                            <div className="tab-content">
                                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                    <div className="prefarance-tab-content">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="prefarance-form-list">
                                                    <h1 style={{ color: "white", fontWeight: "bolder" }}>Player</h1>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="prefarance-form-list">
                                                    <button className="add-links" style={{ backgroundColor: "#181717", marginRight: "5px" }} onClick={() => history.push('./TeamAddPlayer')}>Edit</button>
                                                    <button className="add-links" style={{ width: "220px" }} onClick={() => history.push('./TeamAddPlayer')}>Add New Family Member</button>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="prefarance-form playerinfo-form">

                                            <div className="row">
                                                <div className="col-md-8">
                                                    <div className="prefarance-form-list">
                                                        <img src={UserProfile} alt="" style={{ height: "83px", width: "111px" }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="prefarance-form-list">
                                                        <div className="EditPhoto">Edit Photo</div>

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="prefarance-form-list">
                                                        <label> First Name</label>
                                                        <input type="text" className="input-select" />
                                                    </div>
                                                </div>


                                                <div className="col-md-6">
                                                    <div className="prefarance-form-list">
                                                        <label>Last Name</label>
                                                        <input type="text" className="input-select" />

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="prefarance-form-list">
                                                        <label>Email</label>
                                                        <input type="text" className="input-select" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="prefarance-form-list">
                                                        <label>Who's this</label>
                                                        <input type="text" className="input-select" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="prefarance-form-list">
                                                        <label>Phone Number</label>
                                                        <input type="text" className="input-select" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="prefarance-form-list">
                                                        <label>Label</label>
                                                        <input type="text" className="input-select" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="prefarance-form-list">
                                                        <label>Links</label>
                                                        <button className="add-links">Add Links</button>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="prefarance-form-list">
                                                        <label>Files</label>
                                                        <button className="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} >Add Files</button>

                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="prefarance-form-list">
                                                        <label style={{ paddingTop: "25px" }}>Player Status</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="prefarance-form-list">
                                                        <div className="EditPhoto">Disable</div>

                                                    </div>
                                                </div>












                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div >

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamPlayerInfo;