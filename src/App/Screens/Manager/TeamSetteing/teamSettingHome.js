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
import SettingNav from './settingNav';
import DatePicker from "react-datepicker";
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";

const TeamSettingHome = () => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email: false,
        alert: false,
        post: false
    })
    const [startDate, setStartDate] = useState(new Date());
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [schedule, setSchedule] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()



    useEffect(() => {
        // let user = userdata && userdata._id ? true : false;
        // //console.log("userMe===>", user);
        dropdownMenu();
        // setUser(user);
        // //console.log("USerData", userdata);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);

        // teamSchedule();

    }, []);

    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
    };






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

                    teamSchedule(res.response_data[0]._id);





                })
        }

    }
    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);
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
                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + teamDropdown + '&page=1&limit=10'
            }
            //console.log('user',user)
            Network('api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10', 'GET', header)
                .then(async (res) => {
                    console.log("schedule----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    //console.log("doc data----->",res.response_data.docs)
                    setSchedule(res.response_data.docs)


                })
        }
    }
    const flagList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/all-flag-list', 'GET', header)
                .then(async (res) => {
                    console.log("flagList----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }



                })
        }
    }


    const deleteScheduleData = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id-------------->", id)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "_id": id
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/delete-assignment', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("delete assignment data", res)
                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
                teamSchedule()



            })

    }
    return (
        <div className="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />
            <div className="dashboard-main-content">
                <div className="dashboard-head">
                    <div className="teams-select">
                        <button className="create-new-team" onClick={() => history.push("./CreateTeam")}>Create New Teams</button>

                        <select onChange={change} value={teamDropdown == "" ? dropdown ?._id : teamDropdown} >
                            {dropdown?.map((dropdown) => {
                                return (
                                    <option value={dropdown._id}>{dropdown.team_name}</option>
                                )
                            })}
                        </select>
                        <select>
                            <option>Account</option>
                            <option>Account 2</option>
                            <option>Account 3</option>
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
                    <div className="page-header">
                        <h2 className="page-title">Manager</h2>
                        <div className="teams-select" >
                            <button className="create-new-team" onClick={() => history.push("./CreateTeam")} style={{ backgroundColor: "red" }}>Create New Teams</button>
                        </div>
                    </div>


                    <div className="prefarance-box" style={{ overflow: "auto" }} >
                        <SettingNav />

                        <div className="team-payment team-assesment" style={{ marginTop: "10px" }}>
                            <div className="prefarance-form playerinfo-form">

                                <div className="row" style={{ padding: "20px" }}>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <label>Team</label>
                                            <select className="input-select">
                                                <option>Kolkata Night Rider </option>
                                                <option> Chennai Super King</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="prefarance-form-list">

                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="prefarance-form-list">
                                            <div className="EditPhoto">Edit</div>

                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="prefarance-form-list">
                                            <label> Your Team Logo</label>
                                            <input type="text" className="input-select"  style={{borderRadius:"30px",width:"33%"}} placeholder=" Upload A Team Logo"/>
                                            <p style={{color:"white",fontSize:"15px",padding:"5px"}}>For best result, your team logo should be transparent PNG. <span style={{color:"red"}}> Learn more info about team logos.</span></p>
                                        </div>
                                    </div>


                                    <div className="col-md-12">
                                        <div className="prefarance-form-list">
                                            <label>Your Team Photo</label>
                                            <input type="text" className="input-select" style={{borderRadius:"30px",width:"33%"}} placeholder=" Upload A Team Photo"/>
                                               <p style={{color:"white",fontSize:"15px",padding:"5px"}}>This photo shows on the home page.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="prefarance-form-list">
                                            <label>Sponcer Information</label>
                                            <input type="text" className="input-select" style={{borderRadius:"30px",width:"33%"}} placeholder=" Add New Sponcer"/>
                                            <p style={{color:"white",fontSize:"15px",padding:"5px"}}>Add multiple sponsors to your team home page.<span style={{color:"red"}}> Find out More</span> </p>
                                        </div>
                                    </div>



                                    
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>

        </div >

    )
}

export default TeamSettingHome;