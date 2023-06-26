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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import { Network } from '../../../Services/Api';
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import CalenderIcon from "../../../images/calenderIcon.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import UserProfile from "../../../images/user-profile.png"
import Assignment from './Assignment';




const NewGame = () => {


    const history = useHistory();
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState('');
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [flag, setFlag] = useState([])
    const [name, setName] = useState()
    const [lebel, setLebel] = useState()
    // const [date, setDate] = useState()
    const [time, setTime] = useState('');
    // const [time, setTime] = useState()
    const [oponent, setOponent] = useState()
    const [location, setLocation] = useState()
    const [locationDetails, setLocationDetails] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [arrivalTime, setArrivalTime] = useState()
    const [note, setNote] = useState()
    const [availability, setAvalability] = useState()
    const [assignment, setAssingment] = useState()
    const [uniform, setUniform] = useState()
    const [teamId, setTeamId] = useState()
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState('')
    const [ownDropdown, setOwnDropDown] = useState("")
    const [opnentDropdown, setOponentDropDown] = useState("")
    const [check, setCheck] = useState("false")
    const [flagId, setFlagId] = useState("")
    const { state } = useLocation()
    const [schedule, setSchedule] = useState([])
    const [locationlist, setLocationList] = useState([]);










    useEffect(() => {

        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        flagList()
        // eventCreate()
        dropdownMenu()
        locationList()



    }, []);
    const pic = 'https://nodeserver.mydevfactory.com:1447/'



    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
    };



    const flagList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }


            Network('api/all-flag-list', 'GET', header)
                .then(async (res) => {
                    console.log("flagList----", res)
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setFlag(res.response_data)


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





    const gameCreate = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const eventType = localStorage.getItem("eventType")
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': user.authtoken
            },
            body: {
                "team_id" : teamDropdown,
                "game_name": name,
                "short_label": lebel,
                "date": startDate,
                "time": startTime,
                "timezone": "62a33c98527edd5bf020ab14",
                "location": location,
                "opponent": oponent,
                "Volunteer": assignment,
                "at_an_event" : "",
                "game_type" : '',
                "start_time": startTime,
                "end_time": endTime,
                "arrival_time": arrivalTime,
                "notes": note,
                "uniform": "",
                "duration": "90",
                "notify_team": true,
                "track_availability": true
            }
        };
        console.log(requestOptions);
        fetch('https://nodeserver.mydevfactory.com:1447/api/addGames', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("event Data", res)
                console.log("eventType", eventType)
                if (res.response_code == 200) {
                    console.log("success new game event", res)
                    history.push("/Teamschdule")
                }
                if (res.response_code == 400) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

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

                    if (res.response_code == 400) {
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


    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);
    }

    const changeTeam = (event) => {
        setOwnDropDown(event.target.value)
    }

    const changeOponent = (event) => {
        setOponentDropDown(event.target.value)
    }

    const selectFlag = (event) => {
        setFlagId(event.target.value)
    }




    const CheckValidatiion = () => {

        if (name == null) {
            toast.error("Please Provide  Name", {
                position: "top-center"
            })
        }
        if (startDate == null) {
            toast.error("Please Provide Starting Time", {
                position: "top-center"
            })
        }
        if (teamDropdown == null) {
            toast.error("Please Select A Team", {
                position: "top-center"
            })
            return
        }
        if (lebel == null) {
            toast.error("Please Fill the Label", {
                position: "top-center"
            })
            return
        }
        if (opnentDropdown == null) {
            toast.error("Please Select Oponent Team", {
                position: "top-center"
            })
            return
        }
        // if (state == null) {
        //     toast.error("Please Provide State", {
        //         position: "top-center"
        //     })
        //     return
        // }
        if (locationDetails == null) {
            toast.error("Please Select Location Details", {
                position: "top-center"
            })
            return
        }
        if (location == null) {
            toast.error("Please Select Location", {
                position: "top-center"
            })
            return
        }
        // if (uniform == null) {
        //     toast.error("Please Select Uniform", {
        //         position: "top-center"
        //     })
        //     return
        // }
        if (arrivalTime == null) {
            toast.error("Please Provide Arrival Time", {
                position: "top-center"
            })
            return
        }
        if (note == null) {
            toast.error("Please Provide  Note", {
                position: "top-center"
            })
            return
        }
        if (assignment == null) {
            toast.error("Please Provide Assignment", {
                position: "top-center"
            })
            return
        }
        if (flagId == null) {
            toast.error("Please Select Your Flag", {
                position: "top-center"
            })
            return
        }
        if (startTime == null) {
            toast.error("Please Provide Starting Time", {
                position: "top-center"
            })
            return
        }
        if (endTime == null) {
            toast.error("Please Provide End Time", {
                position: "top-center"
            })
            return
        }


        gameCreate()



    }

    const locationList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'Content-Type': 'application/json',
                'token': user.authtoken

            }
            //console.log('user',user)

            Network('api/getAllLocationData', 'GET', header)
                .then(async (res) => {
                    console.log("location List----", res)
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    if (res.response_code == 200) {
                        setLocationList(res.response_data);
                        // res.response_data.map(location => {
                        //     locationlist.push(location);
                        // })

                    }
                    // setLoading(false)
                    // window.location.reload(false); 



                })
        }

    }

    const locationChange = (e) => {
        console.log(e)
        setLocation(e.target.value);
    }
    const getAssignments =(data) =>{
        console.log(data)
        setAssingment(data);
    }

    return (
        <div className="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />
            <div className="dashboard-main-content">
                <div className="dashboard-head">
                    <div className="teams-select">
                        <button className="create-new-team" onClick={() => history.push("./CreateTeam")}>Create New Teams</button>

                        <select onChange={change} value={teamDropdown == "" ? dropdown[0]?.team_id : teamDropdown} >
                            {dropdown.map((dropdown) => {
                                return (
                                    <option value={dropdown.team_id}>{dropdown.team_name}</option>
                                )
                            })}
                        </select>
                        <select onClick={() => {
                            history.push("/MyAccount")
                        }}>
                            <option >Account</option>
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
                <div className="prefarance-box" style={{ overflow: "auto" }} >
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"><h1 style={{ color: "white", fontSize: "35px" }}>New {state}</h1> </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">{state} Details</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Optional {state} Info</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Assignment</a>
                        </li>

                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="tabs-1" role="tabpanel">
                            <div className="prefarance-tab-content">

                                <div className="prefarance-form playerinfo-form">

                            
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label> Name of {state}</label>
                                                <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Short Label</label>
                                                <input type="text" className="input-select" placeholder="e.g ,Practice,BBQ,Meeting,etc" onChange={(e) => setLebel(e.target.value)} />
                                                <p style={{ color: "gray" }}>A short label to identify the types of event, 10 character max</p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Date</label>
                                                <input type="date" onChange={(e) => setStartDate(e.target.value)} className="input-select" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Time <span style={{ color: "gray" }}>(Leave Blank for "TBD")</span></label>
                                                <input type="time" onChange={(e) => setTime(e.target.value)} className="input-select" />
                                                <p style={{ color: "gray" }}>Pacific Time (US & Canada)<span style={{ color: "red" }}>Change</span></p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Team</label>
                                                <select className="input-select" onChange={changeTeam}>
                                                    <option value="">Select A Team </option>
                                                    {dropdown?.map((dropdown) => {
                                                        return (


                                                            <option value={dropdown.team_id}>{dropdown.team_name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Oponent</label>
                                                <select className="input-select" onChange={changeOponent} >
                                                    <option value="">Select Oponent Team </option>
                                                    {dropdown?.map((dropdown) => {
                                                        return (

                                                            <option value={dropdown._id}>{dropdown.team_name}</option>


                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                       
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Location</label>
                                                {locationlist && locationlist.length > 0 ?
                                                    <select className="input-select" onChange={locationChange}>
                                                        <option key= "location" value={location != "" ?  location:''} >Select Location </option>
                                                        {locationlist?.map((location) => {
                                                            return (

                                                                <option key={location._id} value={location._id}>{location.locationName}</option>


                                                            )
                                                        })}
                                                    </select> : ''}

                                                {/* <input type="text" className="input-select" onChange={(e) => setLocation(e.target.value)} /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Location Details</label>
                                                <input type="text" className="input-select" onChange={(e) => setLocationDetails(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="prefarance-form-list">
                                                <label>Start Time</label>
                                                <input type="time" className="input-select" onChange={(e) => setStartTime(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="prefarance-form-list">
                                                <label >End Time</label>
                                                <input type="time" className="input-select" onChange={(e) => setEndTime(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Arrival Time</label>
                                                <input type="time" className="input-select" onChange={(e) => setArrivalTime(e.target.value)} />
                                                <p style={{ color: "gray" }}> minutes befor the starting  time</p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Display Icon</label>

                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <div style={{ display: "flex" }}>
                                                    {flag?.map((flag) => {
                                                        return (

                                                            <div style={{ margin: "10px" }}><img src={`${pic}${flag.image}`} alt="" style={{ height: "30px", width: "30px" }} /><br></br>
                                                                <input type="radio" name="radio" style={{ height: "30px", margin: "5px" }} onClick={selectFlag} value={flag._id} /></div>
                                                        )
                                                    })}




                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="prefarance-form-list">
                                                <label >Notes</label>
                                                <input type="text" className="input-select" style={{ height: "150px" }} onChange={(e) => setNote(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="prefarance-form-list">
                                                <label >Availability</label>
                                                <input type="checkbox" style={{ height: "15px", width: "17px" }} onChange={(e) => setAvalability(e.target.value)} />
                                                <span style={{ color: "white" }}>Track availability on the Availability tab</span>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Assignment</label>
                                                <input type="text" className="input-select" onChange={(e) => setAssingment(e.target.value)} />
                                            </div>
                                        </div> */}
                                        <div className="col-md-6">
                                            <Assignment getAssignments={getAssignments} />
                                            {/* <div className="prefarance-form-list">
                                                <label>Uniform</label>
                                                <input type="text" className="input-select" onChange={(e) => setUniform(e.target.value)} /> */}
                                                {/* <p style={{ color: "red", fontSize: "15px", float: "right" }}>+Add Another</p> */}
                                            {/* </div> */}
                                        </div>
                                        <div className="col-md-12">
                                            <div className="prefarance-form-list">
                                                <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={() => setCheck(check == "true" ? "false" : "true")} />
                                                <span style={{ color: "white" }}> Notify Your Team?</span>
                                                <button className="add-links" style={{ margin: "10px" }}>Cancel</button>
                                                <button className="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={CheckValidatiion}>Save</button>
                                                <button style={{ backgroundColor: "#1d1b1b", padding: "13px", borderRadius: "30px", margin: "10px", color: "white" }}>+Save and Create Another</button>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-6">
                                                        <div className="prefarance-form-list">
                                                            <label>Links</label>
                                                            <button className="add-links">Add Links</button>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="prefarance-form-list">
                                                            <label>Files</label>
                                                            <button className="add-links">Add Files</button>
                                                        </div>
                                                    </div> */}
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

export default NewGame;