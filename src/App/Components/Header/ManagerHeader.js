import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Network } from '../../Services/Api';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import BigUserProfile from "../../images/big-user-profile.png";
import { logoutUser } from "../../Redux/Actions/auth";
// import SideMenuComponents from "../../../Components/SideMenu"




const ManagerHeader = ({change}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    const [profilePic, setProfilePic] = useState([])
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
      
        dropdownMenu();
        // setTeamDropDown()
        updateProfile()


    }, []);

    // const pic = 'https://nodeserver.mydevfactory.com:1448/'

    const pic1 = 'https://nodeserver.mydevfactory.com:1448/profilepic/'

    const handleLogout = () => {
        
        dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
    };


    const updateProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'token': user.authtoken,

            }
            console.log('user', user)

            Network('api/get-user-details?user_id=' + user._id, 'get', header)
                .then(async (res) => {
                    console.log("new Profile Pic----", res)
                    setProfilePic(res.response_data)

                })
        }

    }

    const dropdownMenu = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        if (user) {
            let header = {
                'token': user.authtoken,

            }
            Network('api/getAllTeamName?teamManagerId=' + user._id, 'get', header)
                .then(async (res) => {
                    console.log("dropdown----", res)
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setDropdown(res.response_data);

                    // teamRoster(res.response_data[0].team_id);
                })
        }

    }

    // const change = (event) => {
    //     console.log("event", event)
    //     console.log("event", event.target.name)
    //     console.log("event", event.target.id)
    //     console.log("event", event.target.key)
    //     setTeamDropDown(event.target.value)
    //     // setPlayer([])
    //     // teamRoster(event.target.value);

    // }

    return (
        <div className="dashboard-head">
            <div className="teams-select">
                <button className="create-new-team" onClick={() => {
                    history.push("/CreateTeam")
                }}>Create New Teams</button>
                <select onChange={change} value={teamDropdown == "" ? dropdown[0]?.team_id : teamDropdown} >
                    {dropdown?.map((dropdown) => {
                        return (
                            <option key={dropdown.team_id} id={dropdown.team_id} name={dropdown.team_name} value={dropdown.team_id}>{dropdown.team_name}</option>
                        )
                    })}
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
                        <img src={`${pic1}${profilePic?.profile_image}`} alt="" />
                    }

                </div>
            </div>
            <div className="login-account"><ul><li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li></ul></div>


        </div>
    )
}
export default ManagerHeader;