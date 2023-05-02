import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
    useParams,
    useLocation
} from "react-router-dom";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Network } from '../../../Services/Api';
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import Delect from "../../../images/delect.png"
import SideMenuComponents from "../../../Components/SideMenu"
import UserProfile from "../../../images/user-profile.png"
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import BigUserProfile from "../../../images/big-user-profile.png"

const CreateTeam = (props) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [zip, setZip] = useState()
    const [language, setLanguage] = useState()
    const [teamName, setTeamName] = useState()
    const [sport, setSport] = useState()
    const [timeZone, setTimeZone] = useState()
    const [country, setCountry] = useState()
    const [parentName, setParentName] = useState()
    const [profilePic, setProfilePic] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    const pic = 'https://nodeserver.mydevfactory.com:1447/'

    useEffect(() => {

        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        createTeamData()
        updateProfile()
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


    const dropdownMenu = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/my-team-list?team_manager_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("dropdown----", res)
                    if (res.response_code == 4000) {
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

    const createTeamData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "team_name": teamName,
                "team_manager_id": user._id,
                "sports": sport,
                "time_zone": timeZone,
                "country": country,
                "zip": zip,
                "language": language,
                "parentName": parentName
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/create-team', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("create team data", res)
                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

    }


    const CheckValidatiion = () => {
        console.log("teamName ="  ,teamName)
        console.log("timeZone ="  ,timeZone)
        console.log("sport =" , sport)
        console.log("country =" , country)
        console.log("language =" , language)
        console.log("parentName =" , parentName)
        console.log("zip =" , zip)

        if (teamName && sport && timeZone && country && zip && language && parentName) {
            createTeamData()

            return
        }
        else {
            toast.error("Please Provide All Field")

        }





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
                                <select onChange={change}>
                                    {dropdown.map((dropdown) => {
                                        return (
                                            <option value={dropdown._id}>{dropdown.team_name}</option>
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
                                <div className="profile-head-name">{profilePic.fname + " " + profilePic.lname}</div>
                                <div className="profile-head-img">
                                    {profilePic.profile_image == null ?
                                        <img src={BigUserProfile} alt="" /> :
                                        <img src={`${pic}${profilePic.profile_image}`} alt="" />
                                    }

                                </div>
                            </div>
                            <div className="login-account"><ul><li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li></ul></div>

                        </div>
                        <div className="prefarance-box player-info" style={{ padding: "10px" }}>
                            <div className="prefarance-form playerinfo-form">

                                <div className="row">
                                    <div className="col-md-6" >
                                        <div className="prefarance-form-list" style={{ color: "white" }}>
                                            <h1 style={{ color: "white", fontSize: "35px", padding: "10px" }}>Create a  New Team</h1>
                                            <h3 style={{ color: "white", fontSize: "25px", padding: "10px" }}>Let's get started</h3>
                                            <p style={{ color: "white", fontSize: "20px", padding: "10px" }}> We'll create your team on the Free plan, which includes all of our

                                                core features:</p>
                                            <ul style={{ color: "white", fontSize: "20px" }}>
                                                <li>Schedule games, practices and events</li>
                                                <li>Instantly connect with everyone via chat
                                                </li>
                                                <li>Get paid for team expenses</li>
                                            </ul>
                                            <p style={{ color: "white", fontSize: "20px", padding: "10px" }}>Ready to take your team to the next level?</p>
                                            <p style={{ color: "red", fontSize: "20px", padding: "10px" }}>Explore our paid plans</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="col-md-12">
                                            <div className="prefarance-form-list">
                                                <label>Language</label>
                                                <select className="input-select" onChange={(e) => setLanguage(e.target.value)}>
                                                    <option>Select Language</option>
                                                    <option>ENGLISH</option>
                                                    <option>HINDI</option>
                                                    <option>BENGALI</option>
                                                    <option>SPANISH</option>
                                                    <option>ARABIC</option>
                                                    <option>PORTUGUESE</option>
                                                    <option>RUSSIAN</option>
                                                    <option>JAPANESE</option>
                                                    <option>LAHNDA</option>
                                                    <option>GERMAN</option>
                                                    <option>KOREAN</option>
                                                    <option>FRENCH</option>
                                                    <option>TELUGU</option>
                                                </select>
                                                <label>Team Name</label>
                                                <input type="text" className="input-select" onChange={(e) => setTeamName(e.target.value)} />
                                                <label>Player Parent Name</label>
                                                <input type="text" className="input-select" onChange={(e) => setParentName(e.target.value)} />
                                                <label>Sport</label>
                                                <select className="input-select" onChange={(e) => setSport(e.target.value)}>
                                                    <option>--Select--</option>
                                                    <option>Football</option>
                                                    <option>Cricket</option>
                                                    <option>Badminton</option>
                                                </select>
                                                {/* <input type="text" className="input-select" onChange={(e) => setSport(e.target.value)}/> */}

                                                <label>Country</label>
                                                <select className="input-select" onChange={(e) => {setCountry(e.target.value)}}>
                                                    <option>--Select--</option>
                                                    <option>India</option>
                                                    <option>America</option>
                                                    <option>South Africa</option>
                                                </select>
                                                <div>
                                                    <GooglePlacesAutocomplete
                                                        apiKey="AIzaSyB_Ve5EsMrUcHRCZHxkZeSdz24emqo4X6Y"
                                                    />
                                                </div>
                                                <label>Time Zone</label>
                                                <select className="input-select" onChange={(e) => setTimeZone(e.target.value)}>
                                                    <option>Time Zone1</option>
                                                    <option>Time Zone2</option>
                                                    <option>Time Zone3</option>
                                                </select>

                                                <label>Zip Code</label>
                                                <input type="text" className="input-select" onChange={(e) => setZip(e.target.value)} />

                                                {/* <input type="text" className="input-select" onChange={(e) => setTimeZone(e.target.value)}/> */}
                                            </div>
                                        </div>

                                        <div className="col-md-12" style={{ display: "flex", flexDirection: "row" }}>
                                            <div className="col-md-6">
                                                <div className="prefarance-form-list">
                                                    <button className="add-links">CANCEL</button>

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="prefarance-form-list">
                                                    <button className="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} onClick={CheckValidatiion} >SAVE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTeam;