import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";

import "./style.css"
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import UserProfile from "../../../images/user-profile.png"
import flag from "../../../images/flag.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";

import Modal from "react-bootstrap/Modal";





function EditOponent(props) {

    const history = useHistory();
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [schedule, setSchedule] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()

    const [oponentlist, setOponentList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [editModal, setEditModal] = useState(false);

    const [oponentId, setOponentID] = useState([]);

    const [oponentName, setOponentName] = useState('');
    const [oponentContact, setOponentContactName] = useState('');
    const [oponentPhoneNum, setOponentPhoneNum] = useState('');
    const [oponentNotes, setOponentNotes] = useState('');
    const [oponentEmail, setOponentEmail] = useState('');



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
        oponentList();

        // teamSchedule();

    }, []);

    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };
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

                    teamSchedule(res.response_data[0].team_id);





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


    //     const EventSet=(setEvent)=>{
    //         // setEventType(e.target.value)
    //         localStorage.setItem("eventType",setEvent)
    //         console.log("eventtype------>",setEvent)
    //    }

    const oponentList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'Content-Type': 'application/json',
                'token': user.authtoken

            }
            //console.log('user',user)

            Network('api/getAllOpponentsData', 'GET', header)
                .then(async (res) => {
                    console.log("oponent List----", res)
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    if (res.response_code == 200) {
                        setOponentList(res.response_data);
                        // res.response_data.map(location => {
                        //     locationlist.push(location);
                        // })

                    }
                    setLoading(false)
                    // window.location.reload(false); 



                })
        }
    }

    const CheckValidation = () => {
        if (oponentName == null) {
            toast.error("Please Provide  Oponent Name", {
                position: "top-center"
            })

        }
        if (oponentPhoneNum == null) {
            toast.error("Please Provide  Oponent phone number", {
                position: "top-center"
            })

        }
        if (oponentContact == null) {
            toast.error("Please Provide  contact", {
                position: "top-center"
            })

        }
        if (oponentEmail == null) {
            toast.error("Please Provides Oponent Email", {
                position: "top-center"
            })

        }
        if (oponentNotes == null) {
            toast.error("Please Provides some notes related to Oponent", {
                position: "top-center"
            })

        }

        editOponent();
        
    }

    const updateModalOponent = (oponent_id, id) => {
        setEditModal(true)
        setOponentID(oponent_id);

        setOponentName(oponentlist[id].opponentsName)
        setOponentContactName(oponentlist[id].contactName)
        setOponentPhoneNum(oponentlist[id].contactPhoneNumber)
        // setOponentNotes(oponentlist[id].)
        setOponentEmail(oponentlist[id].contactEmail)


    }

    const editOponent = () => {
        console.log();
        console.log(oponentId);
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.authtoken
                },
                body: JSON.stringify({
                    "opponentId": oponentId,
                    "opponentsName": oponentName,
                    "contactName": oponentContact,
                    "contactEmail": oponentEmail,
                    "contactPhoneNumber": oponentPhoneNum


                })

            };
            fetch('https://nodeserver.mydevfactory.com:1448/api/editOpponentsDetailsById', requestOptions)
                .then(response => response.json())
                .then((res) => {
                    console.log("update oponent data", res)
                    if (res.response_code == 200) {
                        toast.success(res.response_message)
                        setEditModal(false);
                        oponentList()
                       

                    }

                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setEditModal(false);
                })




        }
        

    }

    const deleteOponent = (oponent_id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id-------------->", oponent_id)
        const a = window.confirm('Are you sure you wish to delete this Data?')
        console.log("delete click")
        if (a == true) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.authtoken
                },
                body: JSON.stringify({
                    "oponent_id": oponent_id
                })
            };
            fetch('https://nodeserver.mydevfactory.com:1448/api/deleteLocationDetailsById', requestOptions)
                .then(response => response.json())
                .then((res) => {
                    console.log("delete location  data", res)
                    if (res.response_code == 200) {
                        console.log("deleted data", res)
                        oponentList()
                    }
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
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
                        <div className="dashboard-head">
                            <div className="teams-select">
                                <button className="create-new-team" onClick={() => history.push("./CreateTeam")}>Create New Teams</button>

                                <select onChange={change} value={teamDropdown == "" ? dropdown[0]?._id : teamDropdown} >
                                    {dropdown.map((dropdown) => {
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
                                <h2 className="page-title">Oponents</h2>

                            </div>
                            <div className="manager-player-section">
                                <h3>Manager:</h3>
                                <div className="teams-select">
                                    <ul >
                                        <Link to={{ pathname: "/NewOponent", state: "GAME" }} >
                                            <li >New Oponent</li>
                                        </Link>
                                        <Link to={{ pathname: "/NewGame", state: "GAME" }} >
                                            <li >New Game</li>
                                        </Link>
                                        <Link to={{ pathname: "/NewEvent", state: "EVENT" }} >
                                            <li   >New Event</li>
                                        </Link>
                                    </ul>


                                </div>
                                {/* <ul>
                                    <li><a href="#">Edit</a></li>
                                    <li><a href="#">Import</a></li>
                                </ul> */}
                            </div>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div className="prefarance-box">
                                    <div className="team-payment team-assesment">
                                        <table>
                                            <tr>
                                                <th>Opponent Name</th>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Notes</th>
                                                <th>Record vs.</th>
                                                <th>Scheduled Games</th>


                                            </tr>
                                            {oponentlist && oponentlist.length > 0 ?

                                                oponentlist.map((oponent, id) => {
                                                    return (
                                                        <tr>

                                                            <td>
                                                                <span> {oponent.opponentsName}</span>

                                                            </td>
                                                            <td><span>{oponent.contactName}</span></td>
                                                            <td>
                                                                <span>{oponent.contactPhoneNumber}</span>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    {oponent.contactEmail}</span>
                                                            </td>
                                                            <td>
                                                                <span>......</span>
                                                            </td>
                                                            <td>
                                                                <span>0-1</span>
                                                            </td>
                                                            <td>
                                                                <span>TeamLink Opponent</span>
                                                            </td>
                                                            <td>
                                                                <div className="last-row">
                                                                    <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deleteOponent(oponent._id)}><img src={Delect} />
                                                                    </button> <button onClick={() => updateModalOponent(oponent._id, id)}><img src={pencil} /></button>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                    )
                                                })
                                                :
                                                'No Data Found'
                                            }



                                        </table>
                                    </div>
                                </div>

                            )}

                            {editModal ? <Modal show={editModal} style={{ position: "absolute", top: "206px" }}>


                                <Modal.Body style={{ width: "1000" }}>
                                    <div className="prefarance-box" style={{ overflow: "hidden" }}>
                                        <div className="team-payment team-assesment" style={{ marginTop: "-12px" }}>
                                            <div className=" playerinfo-form">

                                                <div className="row" style={{ padding: "21px" }}>
                                                    <div className="col-md-6">
                                                        <div className="prefarance-form-list">
                                                            <label> Oponent Name</label>
                                                            <input type="text" className="input-select" 
                                                            defaultValue={oponentName}
                                                            onChange={(e) => setOponentName(e.target.value)} />
                                                            <span>The name of the game location Example: "Wilshire Park Soccer Field"</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="prefarance-form-list">
                                                            <label> Contact Name</label>
                                                            <input type="text" className="input-select" 
                                                            defaultValue={oponentContact}
                                                            onChange={(e) => setOponentContactName(e.target.value)} />
                                                            <span>A contact person for the opposing team Example: "Coach Smithers"</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="prefarance-form-list">
                                                            <label> Phone Number</label>
                                                            <input type="text" className="input-select" 
                                                            defaultValue={oponentPhoneNum}
                                                            onChange={(e) => setOponentPhoneNum(e.target.value)} />
                                                            <span>A phone number for that contact Example: "503-123-4567"</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="prefarance-form-list">
                                                            <label> Email address</label>
                                                            <input type="text" className="input-select" 
                                                            defaultValue={oponentEmail}
                                                            onChange={(e) => setOponentEmail(e.target.value)} />
                                                            <span>An email address tor that contact Example: "coach_smithers@domain.com"</span>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-6">
                                                        <div className="prefarance-form-list">
                                                            <label> Notes</label>
                                                            <textarea type="text" defaultValue={notes} className="input-select" onChange={(e) => setOponentNotes(e.target.value)} style={{ height: "200px" }} />
                                                            <span>Team colors, scouting reports, etc</span>
                                                        </div>
                                                    </div> */}
                                                    <div className="col-md-12">
                                                        <div className="prefarance-form-list" style={{ marginLeft: "60%" }}>
                                                        <button className="add-links" style={{ margin: "10px" }} onClick={() => setEditModal(false)}>Cancel</button>
                                                    <button className="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={(e) => CheckValidation(e)}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>

                            </Modal> : ""}
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditOponent;

