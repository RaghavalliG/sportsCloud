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
import BigUserProfile from "../../../images/big-user-profile.png";

import tableProfile from "../../../images/table-profile.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import teamList from "../../../images/team-list.png";
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import { Network } from '../../../Services/Api';



function ManageTeam(props) {
    const history = useHistory();
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});

    const [profilePic, setProfilePic] = useState([])
    const [loader, setLoader] = useState(false);
    const [dropdown, setDropdown] = useState([])
    const [team, setTeam] = useState([]);
    const [teamDropdown, setTeamDropDown] = useState("")
    const [timezoneList, setTimeZoneList] = useState([]);
    const pic = 'https://nodeserver.mydevfactory.com:1448/'

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
        updateProfile()
        teamSelect()
        dropdownMenu()
    }, []);

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };
    const updateProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'token': user.authtoken

            }
            console.log('user', user)

            Network('api/get-user-details?user_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("new Profile Pic----", res)
                    setProfilePic(res.response_data)
                    setLoader(true);

                })
        }

    }
    const dropdownMenu = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'token': user.authtoken

            }
            //console.log('user',user)

            Network('api/getAllTeamName?teamManagerId=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("dropdown----", res)
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setDropdown(res.response_data);







                })
        }

    }

    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)

    }

    const teamSelect = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            let header = {
                token: user.authtoken,
            };
            console.log("user", user);

            Network(
                "api/getAllTeamName?teamManagerId=" + user._id,
                "GET",
                header
            ).then(async (res) => {
                console.log("teanSelect----", res);
                if (res.response_code == 400) {
                    dispatch(logoutUser(null));
                    localStorage.removeItem("user");
                    history.push("/");
                    toast.error(res.response_message);
                }
                setTeam(res.response_data);
                // teamSchedule(res?.response_data[0]._id);
            });
        }
    };


    return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-main">
                    <SideMenuComponents manger="manger" />
                    <div className="dashboard-main-content">
                        <div className="dashboard-head">
                            <div className="teams-select">
                                <select onChange={change}>
                                    {dropdown?.map((dropdown) => {
                                        return (
                                            <option key={dropdown.team_id} value={dropdown.team_id}>{dropdown.team_name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="profile-head">
                                {loader ? (
                                    <div className="profile-head-name">
                                        {profilePic?.fname + " " + profilePic?.lname}
                                    </div>
                                ) : (
                                    <div className="profile-head-name">Loading...</div>
                                )}

                                <div className="profile-head-img">
                                    {profilePic?.profile_image == null ? (
                                        <img src={BigUserProfile} alt="" />
                                    ) : (
                                        <img src={`${profilePic?.profile_image}`} alt="" />
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

                            <div className="team-list-head">
                                <h2>Team</h2>
                                <span > Total: {team ? team.length : 0} </span>
                            </div>
                            <div
                                className="team-list-section"
                            // style={{ height: "544px", overflowX: "auto" }}
                            >
                                {team && team.length > 0 ? (
                                    team?.map((team) => {
                                        return (
                                            <div className="team-list-box">
                                                <div className="team-list-box-img">
                                                    {team.image == null ? (
                                                        <img src={teamList} alt="" />
                                                    ) : (
                                                        // <img src={`${pic}${team.image}`} alt="" />}
                                                        <img src={`/${team.sports}`} alt={team.sports} />
                                                    )}
                                                </div>
                                                <div className="team-list-box-text">
                                                    <h4>{team.team_name}</h4>

                                                    <a href="#">{team.sports}</a>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-center text-danger">No teams found</p>
                                )}
                            </div>


                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageTeam;
