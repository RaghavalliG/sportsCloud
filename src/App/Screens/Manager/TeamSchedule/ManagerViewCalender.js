import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import UserProfile from "../../../images/user-profile.png"
import './ManagerViewCalender.css'
// import EventCalendar from 'react-event-calendar';
import { Calendar, momentLocalizer, globalizeLocalizer  } from "react-big-calendar";
import moment from "moment";
import globalize from 'globalize'
import "react-big-calendar/lib/css/react-big-calendar.css";
import CsvDownload from '../../../Components/Comman/CsvDownload';


const ManagerViewCalender = () => {
    // const localizer = momentLocalizer(moment);
    const localizer = globalizeLocalizer(globalize)
    // const EventCalendar = require('/../react-event-calendar');
    // var dateTimeObj = moment('2023-07-14T00:00:00.000Z' + '04:00 PM', 'YYYY-MM-DDLT');
    // var dateTime = dateTimeObj.format('YYYY-MM-DDTHH:mm:s');
    // console.log(dateTime + 'datetime');
    // const events = [
    //     // {
    //     //     start: '2023-07-20',
    //     //     end: '2023-07-02',
    //     //     eventClasses: 'optionalEvent',
    //     //     title: 'test event',
    //     //     description: 'This is a test description of an event',
    //     // },
    //     {
    //         start: '2023-07-19',
    //         end: '2023-07-19',
    //         title: 'test event',
    //         description: 'This is a test description of an event',
    //         data: 'you can add what ever random data you may want to use later',
    //     },
    //     {
    //         start: '2023-07-14T00:00:00.000Z',
    //         end: '2023-07-14T00:00:00.000Z',
    //         title: 'Acfg event',
    //         description: 'This is a test description of an event',
    //         data: 'you can add what ever random data you may want to use later',
    //     },
    //     // {
    //     //     start: moment().toDate(),
    //     //     end: moment()
    //     //       .add(1, "days")
    //     //       .toDate(),
    //     //     title: "Some title"
    //     //   }
    // ];
    const history = useHistory();
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [schedule, setSchedule] = useState([])
  
    const [event, setEvent] = useState([]);
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()
    const [m, setM] = useState(new Date().getMonth())
    const [y, setY] = useState(new Date().getFullYear())
    
    const Month = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    console.log("month ", Month[m])
    console.log("teamDropdown ", teamDropdown)


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
        flagList()
        deleteScheduleData()

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





    // const teamSchedule = (id) => {
    //     console.log("id", id)
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     if (user) {
    //         let header = {

    //             'token': user.authtoken

    //         }

    //         let url = ""
    //         if (id != undefined) {

    //             url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10'
    //         }
    //         else {
    //             url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + teamDropdown + '&page=1&limit=10'
    //         }
    //         //console.log('user',user)
    //         Network('api/getAllEventAndGamesData?team_id=' + id, 'GET', header)
    //             .then(async (res) => {
    //                 console.log("schedule----", res)
    //                 if (res.response_code == 400) {
    //                     dispatch(logoutUser(null))
    //                     localStorage.removeItem("user");
    //                     history.push("/")
    //                     toast.error(res.response_message)
    //                 }
    //                 //console.log("doc data----->",res.response_data.docs)
    //                 setSchedule(res.response_data.docs)


    //             })
    //     }
    // }

// calender event view

    const teamSchedule = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            let header = {
                token: user.authtoken,
            };
            console.log("user", user);

            Network(
                // 'api/get-game-event-list-for-player?user_id='+user._id+'&page=1&limit=10',
                // "api/getAllEventAndGamesData?team_id="+"6470683a88ea6b032e255a3e",
                "api/getAllEventAndGamesData?team_id=" + id,
                // +'&page=1&limit=10',
                "GET",
                header
            ).then(async (res) => {
                console.log("schedule----", res);

                if (res.response_code == 4000) {
                    dispatch(logoutUser(null));
                    localStorage.removeItem("user");
                    history.push("/");
                    toast.error(res.response_message);
                }
                setSchedule(res.response_data);
                // var transformEvent=[]
                // console.log(res.response_data, "9090909890990990");
                // const transformEvent = schedule.map((item) => {
                //     console.log(item, "==========>>>>>>>");
                //     // const{}=item
                //     return {
                //         date: item.date,
                //     };
                // });
                // setEvent(transformEvent);
                // console.log(transformEvent, "090989786543");
                var transformEvent=[]
                console.log (res.response_data,"ohohohoioihjhihhhhj")
                res.response_data.forEach((item)=>{

                    console.log(item,"90980909")

                    transformEvent.push({

                        start:new Date(item.date),
                        end:new Date(item.date)
                     })

                })
                setEvent(transformEvent);
                console.log(transformEvent, "====>>>>>>");
            });
        }
    };



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


    console.log("year", y)


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


    const CalenderListView = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "month": m,
                "year": y,
                "team_id": teamDropdown
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/game-event-calender-data', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("calender view data", res)
                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }




            })

    }
    let headers = [
        // { label: "Event/Game", key: "firstName" },
        { label: "Event Name", key: "event_name" },
        // { label: "email", key: "contactInformationEmail" },
        // { label: "phone", key: "contactInformationPhoneNumber" },
        // { label: "Gender", key: "playerGender" }
    ];
    let data = (schedule && schedule.length>0 )? schedule: [];
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
                        <h2 className="page-title">Schedule</h2>
                        <div className="streming-head-right">
                            <div className="stream-tab">
                                <ul>
                                    <li><a className="active" href="#">List View</a></li>
                                    <li onClick={() => {
                                        history.push("/ManagerViewCalender")
                                    }}><a href="#">Calendar View</a></li>

                                </ul>
                            </div>

                            <button className="start-stream-btn" onClick={() => { history.push("/ManagerTeamAvailability") }}>Select Availability</button>
                            {/* <button className="start-stream-btn">View Preferences</button> */}
                            <button className="start-stream-btn">Subscribe/ Export</button>
                            <CsvDownload data={data} headers={headers} filename={`Schedule list `} />
                        </div>
                    </div>

                    <div className="calBox">
                        {/* <div className="calBoxHead"> */}
                        {/* <span>
                                <span onClick={() => setM(m - 1)}>&#10094;</span>
                                {Month[m]}
                                <span onClick={() => setM(m + 1)}>&#10095;</span>
                            </span>
                            <span>
                                <span onClick={() => setY(y - 1)}>&#10094;</span>
                                {y}
                                <span onClick={() => setY(y + 1)}>&#10095;</span>
                            </span>
                            <span onClick={CalenderListView}>
                                <i className="fas fa-search"></i>
                            </span>
                            <div className="vcRgt">Team record: 8-5</div> */}
                        {/* </div> */}
                        <div className="calBtm">
                            {/* <div className="calInfo">
                                <span>Do you want to play college sports?</span>
                                <span className="maxW">Set up a free  recruiting profile with Next College Student Athlete and start connecting with over 35,000 college coaches.</span>
                                <span className="redTx">Let’s Do  This!</span>
                                <span className="redTx">No Thanks</span>
                            </div> */}
                            <div className="">
                                <Calendar
                                    localizer={localizer}
                                    defaultDate={new Date()}
                                    defaultView="month"
                                    events={event}
                                    style={{ height: "200vh" }}
                                />
                                {/* <EventCalendar
                                    month={7}
                                    year={2023}
                                    events={events}
                                    // onEventClick={(target, eventData, day) => console.log(eventData)}
                                        /> */}
                            </div>
                        </div>

                    </div>


                </div>

            </div>


        </div>

    )
}

export default ManagerViewCalender;