import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
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


const ManagerTeamAvailability = () => {

    const history = useHistory();
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    const [schedule, setSchedule] = useState([])
    const [gameEvent, setGameEvent] = useState("60be4fb4fc11cd4f8ca2cf8c")
    const [gameEventAllData, setGameEventAllData] = useState([])
    const [colorValue, setColorValue] = useState("")
    const [divColor, setDivColor] = useState("")
    const [listValue, setListValue] = useState()
    const [listId, setListUserId] = useState()
    const [colorSelect, setColorSeleted] = useState(false)
    const [selectedOption, setSelectedOption] = useState(false)
    const [allUserId, setAllUserId] = useState([])
    const [indexVal, setIndexVal] = useState()
    const [dataIdVal, setDataId] = useState([{
        "dataId": "",
        "indexVal": ""
    }])
    const divColor1 = divColor
    console.log("dataId console", dataIdVal)
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Active', value: '1' },
        { name: 'Radio', value: '2' },
        { name: 'Radio', value: '3' },
    ];


    const colorArray = ["green", "gray", "red"]
    // console.log("color index", JSON.stringify(colorArray[dataIdVal[1].indexVal]))




    let AvailabilityArray = [{
        "name": "GOING",
        "value": "green"
    },
    {
        "name": "MAYBE",
        "value": "gray"
    },
    {
        "name": "NO",
        "value": "red"
    }]



    useEffect(() => {
        setUser(user);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        dropdownMenu()
        teamSchedule()
        GameEventList()
        setColor()


    }, []);
    const handleLogout = () => {

        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
    };

    const pic = 'https://nodeserver.mydevfactory.com:1447/'

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


    const GameEventList = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }

            let url = ""
            if (id == null) {
                url = 'api/team-player-availability-list?game_event_id=' + gameEvent
            }
            else {
                url = 'api/team-player-availability-list?game_event_id=' + id
            }

            Network(url, 'GET', header)
                .then(async (res) => {
                    console.log("gameEvent list----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setGameEventAllData(res.response_data.docs)





                })
        }

    }
    const setColor = (id, availability) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(" id and availability", id, availability)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "_id": id,
                "availability": availability
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/change-player-availability', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("availability", res)

                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

    }


    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);

    }

    const gameEventId = (e) => {
        setGameEvent(e.target.value)
        GameEventList(e.target.value)
        console.log("game event", e.target.value)
    }


    const colorChange = (e, id, dataId1) => {
        const indexNo = e.target.value
        console.log("id and value", id, e.target.value, dataId1)
        setDataId([{ "dataId": dataId1, "indexVal": indexNo }])
        //  setAllUserId([...allUserId,dataId])

        setListUserId(id)
        setIndexVal(e.target.value)


        if (e) {

            if (e.target.value == 0) {
                setDivColor("green")

            }
            else if (e.target.value == 1) {
                setDivColor("gray")
            }
            else if (e.target.value == 2) {
                setDivColor("red")
            }
            else {
                // setDivColor("green")
                console.log("jhfkg")
            }
        }




    }
    const goingcolor = { backgroundColor: "blue" }
    const goingcolor1 = { backgroundColor: "green" }

    console.log("color", divColor)


    const changeColor = i => {
        const goingcolor1 = { backgroundColor: "green" }

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
                                    <option>Select A Team</option>
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
                        {/* <div>
                            <h1 style={{color:"white",fontSize:"30px",fontWeight:"bold"}}>Availability for</h1>
                        </div> */}
                        <div className="player-info-head">
                            <h2 className="page-title">Availability</h2>
                            <div className="teams-select">
                                <select onChange={gameEventId}>

                                    <option >Select Game/Event</option>
                                    {schedule.map((schedule) => {
                                        return (
                                            <option value={schedule._id}>{schedule.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="player-info-head-right">

                                <select style={{ color: "red", fontWeight: "bold" }}>
                                    <option >Show All</option>
                                    <option> Games Only</option>
                                    <option> Events Only</option>
                                </select>
                                <button className="add-new-family" style={{ width: "324px" }} onClick={() => { history.push("./preferance") }}>Availability Preference</button>
                                <button className="edit-btn" style={{ marginLeft: "5px" }}>Export</button>
                            </div>
                        </div>


                        <div className="prefarance-box">
                            <div className="team-payment team-assesment" >

                                <table >
                                    <tr >
                                        <th style={{ fontSize: "25px", fontWeight: "bold", paddingLeft: "10%" }}>Players</th>
                                        <th style={{ fontSize: "25px", fontWeight: "bold", paddingLeft: "30%" }}> 2M/3W/1?</th>


                                    </tr>
                                    {gameEventAllData.map((data, index) => {
                                        return (
                                            <tr >
                                                <td style={{ paddingLeft: "10%" }}>
                                                    <div className="flag-prac">
                                                        {data.userDetails.image == null ? <img src={UserProfile} alt="" /> :
                                                            <img src={`${pic}${data.userDetails.image}`} alt="" />}
                                                        <span style={{ paddingTop: "15px" }}> {data.userDetails.fname}{" "}{data.userDetails.lname}</span>
                                                    </div>

                                                </td>


                                                <td style={{ display: "flex", paddingLeft: "40%" }} key={data._id}>

                                                
                                                    <button className='focus1' >GOING</button>
                                                    <button className='focus2' >MAY BE</button>
                                                    <button className='focus3' >NO</button>
                                                    

                                                    {/* <Button variant="light" >Going</Button>{' '}
                                                    <Button  onClick={(e)=>{

                                                    }}>May Be</Button>{' '}
                                                    <Button  variant="light">No</Button>{' '} */}

                                                    {/* <Button variant="primary">Primary</Button>{' '}
                                                    <Button variant="secondary">Secondary</Button>{' '}
                                                    <Button variant="success">Success</Button>{' '} */}
                                                    {/* <div>
                                                    <input type="checkbox" style={{ width: "20px", height: "20px" }}/>
                                                    </div> */}


                                                    {/* {
                                                        dataIdVal.find(item=>{
                                                            return (
                                                                item.dataId==data._id ?
                                                                <div style={{ height: "19px", width: "20px", marginLeft: "30px", marginTop: "16px", backgroundColor:JSON.stringify(colorArray[dataIdVal.indexVal])}} ></div> :
                                                                <div style={{ height: "19px", width: "20px", marginLeft: "30px", marginTop: "16px", backgroundColor: "green" }} ></div>
                                                        )}) 
                                                            } */}






                                                    {/* {dataIdVal.filter(item => {
                                                        return (
                                                            item.dataId == data._id ?
                                                                <div style={{ height: "19px", width: "20px", marginLeft: "30px", marginTop: "16px", backgroundColor: item.indexNo == 0 ? "green" : item.indexNo == 1 ? "grey" : "red" }} ></div> :
                                                                <div style={{ height: "19px", width: "20px", marginLeft: "30px", marginTop: "16px", backgroundColor: "green" }} ></div>

                                                        )
                                                    })} */}
                                                    {/* {dataIdVal[0].dataId == data._id ?
                                                        <div style={{ height: "19px", width: "20px", marginLeft: "30px", marginTop: "16px", backgroundColor: colorArray[dataIdVal[0].indexVal] }} ></div> :
                                                        <div style={{ height: "19px", width: "20px", marginLeft: "30px", marginTop: "16px", backgroundColor: "green" }} ></div>} */}

                                                    <div>

                                                        {/* <select style={{ width: "23px", height: "20px", marginTop: "15px" }}

                                                            onChange={(e) => {
                                                                colorChange(e, index, data._id)
                                                                // setIndexValue({[index]})
                                                                // console.log("abc   ",e.target.value)
                                                                setSelectedOption(true)
                                                            }
                                                            }
                                                        >
                                                            {AvailabilityArray.map((data1, i) => {
                                                                return (
                                                                    <option value={i}  > {data1.name}</option>
                                                                )
                                                            })}

                                                        </select> */}
                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    })}



                                </table>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ManagerTeamAvailability;