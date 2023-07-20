import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

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
// import football from "../../../images/football.png"
// import UserProfile from "../../../images/user-profile.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import { read, utils, writeFile } from 'xlsx';
import { useDispatch } from 'react-redux';
import { Network } from '../../../Services/Api';
import BigUserProfile from "../../../images/big-user-profile.png";
import { logoutUser } from '../../../Redux/Actions/auth';

import ManagerHeader from '../../../Components/Header/ManagerHeader';

import DatePicker from "react-datepicker";


const ImportPlayer = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [players, setPlayers] = useState([]);
    const [dropdown, setDropdown] = useState([]);
    const [teamDropdown, setTeamDropDown] = useState("");
    const [profilePic, setProfilePic] = useState([])

    const handleImport = (event) => {
        console.log(event)
        const files = event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log(event);
                console.log(event.target.result)
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                console.log(sheets);

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    console.log(rows);
                    setPlayers(rows)
                    rows.forEach(row => {
                        players.push(row)
                    });

                    importPlayers(players);
                    console.log(players);
                }

            }
            reader.readAsArrayBuffer(file);

        }
    }

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
        dropdownMenu();
        // setTeamDropDown()
        // updateProfile()


    }, []);
    const pic1 = 'https://nodeserver.mydevfactory.com:1448/profilepic/'

    const handleLogout = () => {

        dispatch(logoutUser(null));
        localStorage.removeItem("user");
        // setUserData(null);
        history.push("/")
    };
    const dropdownMenu = () => {
        const user = JSON.parse(localStorage.getItem('user'));



        // console.log(user);
        if (user) {
            let header = {
                'token': user.authtoken,

            }
            // console.log('user',header)

            Network('api/getAllTeamName?teamManagerId=' + user._id, 'get', header)
                .then(async (res) => {
                    console.log("dropdown----", res)
                    if (res.response_code == 400) {
                        // dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setDropdown(res.response_data);

                    // teamRoster(res.response_data[0].team_id);





                })
        }

    }





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

    const importPlayers = (players) => {
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        if (user) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.authtoken
                },
                body: JSON.stringify(
                    {
                        "teamId": teamDropdown ? teamDropdown : "6470683a88ea6b032e255a3e",
                        "data": players
                    }

                )
            };
            console.log(requestOptions);
            fetch('https://nodeserver.mydevfactory.com:1448/api/createRoasterFromContacts', requestOptions)
                .then(response => response.json())
                .then((res) => {
                    console.log("player data", res)

                    if (res.response_code == 400) {
                        // dispatch(logoutUser(null))
                        // localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    } else {
                        toast.success(res.response_message)
                        // history.goBack();
                    }
                })
        }

    }


    return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-main">
                    <SideMenuComponents manger="manger" />
                    <div className="dashboard-main-content">
                        {/* <ManagerHeader change={change}/> */}
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
                        <div className="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>

                            <div className="tab-content">
                                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                    <div className="prefarance-tab-content">
                                        <h1 style={{ color: "white" }}>Import Player</h1>

                                        <div className="fileBox">
                                            <span>Import a list of players by uploading a file below:</span>
                                            <div className='form-group' >
                                                {/* <div className="update-team-photo" style={{ width: "20%" }}>
                                Choose File
                                <input type="file" name='img' />

                            </div> */}
                                                <div className="custom-file">
                                                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                                    <label className="custom-file-label" htmlFor="inputGroupFile">Choose file</label>
                                                </div>
                                                <div className="fileChoosen">No File Choosen</div>
                                            </div>
                                            <span className='mb-0' style={{ color: "#EC3525" }}>Download Our Roster Template</span>
                                            <span className='mb-0'>

                                                |  (Acceptable Formats: .XLS, .XLSX and .CSV)</span>

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
export default ImportPlayer;