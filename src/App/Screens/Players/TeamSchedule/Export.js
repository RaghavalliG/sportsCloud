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
import CsvDownload from '../../../Components/Comman/CsvDownload';




function Export(props) {

    const history = useHistory()
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [player, setPlayer] = useState([]);
    const [resData, setResData] = useState({})
    const [nonPlayer, setNonPlayer] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    const [team, setTeam] = useState([]);
    const [schedule, setSchedule] = useState([]);
    

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
        teamSelect()
        teamRoster();
       
       

    }, []);

    const pic = 'https://nodeserver.mydevfactory.com:1447/'

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };
    const teamRoster = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id---->",id)
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/player-list-by-team-id?team_id=' + id, 'GET', header)
                .then(async (res) => {
                    console.log("teamRoster----", res)

                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setResData(res.response_data);
                    console.log("team player", res.response_data.PLAYER)
                    console.log("non player", res.response_data.NON_PLAYER)
                    setPlayer(res.response_data.PLAYER)
                    setNonPlayer(res.response_data.NON_PLAYER)


                })
        }
    }

    // const teamSelect = () => {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     if (user) {
    //         let header = {
    //             'authToken': user.authtoken

    //         }
    //         console.log('user', user)

    //         Network('api/player-joined-team-list?player_id=' + user._id, 'GET', header)
    //             .then(async (res) => {
    //                 console.log("res----", res)
    //                 if (res.response_code == 4000) {
    //                     dispatch(logoutUser(null))
    //                     localStorage.removeItem("user");
    //                     history.push("/")
    //                     toast.error(res.response_message)
    //                 }

    //                 setTeam(res.response_data);
    //                 // if(res.response_data.length!=0){
    //                     teamRoster(res.response_data[0]._id);
    //                 // }
                   

    //             })
    //     }
    // }


    const teamSelect = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          let header = {
            token: user.authtoken,
          };
          console.log("user", user);
    
          Network(
            "api/getAllAcceptedTeamListByPlayerId?playerId=" + user._id,
            "GET",
            header
          ).then(async (res) => {
            console.log("res----", res);
            if (res.response_code == 4000) {
              dispatch(logoutUser(null));
              localStorage.removeItem("user");
              history.push("/");
              toast.error(res.response_message);
            }
    
            setTeam(res.response_data);
            // if(res.response_data.length!=0){
            teamSchedule(res?.response_data[0]._id);
            // }
          });
        }
      };

      const teamSchedule = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("id<<<<<", id);
        if (user) {
          let header = {
            token: user.authtoken,
          };
          console.log("user", user);
    
          Network(
            // 'api/get-game-event-list-for-player?user_id='+user._id+'&page=1&limit=10',
            // "api/getAllEventAndGamesData?team_id="+"645cc97e6612dc1e4cd97597",
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
          });
        }
      };

    

    const change = (event) => {
        console.log("event", event.target.value);
    setTeamDropDown(event.target.value);
    teamSchedule(event.target.value);
    }
    let headers = [
    //   schedule?.isFlag ==  "Event"? 
        { label: "Event/Game Name", key: "event_name" }
    //     { label: "Event/Game Name", key: "game_name" },
    // {label:"Event/Game name",key:["event_name","game_name"]}

    ];

    let data = (schedule && schedule.length>0 )? schedule: [];






    return (

        <div>
            <div className="dashboard-container">
                <div className="dashboard-main">
                    <SideMenuComponents />
                    <div className="dashboard-main-content">
                        <div className="dashboard-head">
                            <div className="teams-select">
                               

                                <select onClick={change}>
                                    <option>Select Team</option>
                                    {team?.map((team) => {
                                        return (
                                            <option value={team.accept_invite_team_id}>
                                            {team.accept_invite_team_name}
                                          </option>
                                        )
                                    })}


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
                                <h2 className="page-title">Export Schedule</h2>

                            </div>

                            <div className="prefarance-box" style={{ overflowX: "hidden" }}>
                                <div className="team-payment team-assesment" >
                                    <div className="prefarance-form playerinfo-form">
                                        <span style={{paddingLeft:"21px"}}>TeamSnap offers several ways to access or export your schedule data:</span>

                                        <div className="row" style={{ padding: "21px" }}>
                                            <div className="col-md-12">
                                                <div className="prefarance-form-list">
                                                    <h1 style={{color:"white"}}>iCal</h1>
                                                    <p style={{ color: "gray",paddingTop:"15px",paddingBottom:"15px" }}>If you use Apple iCal, Microsoft Outlook 2007+ or any iCal-compatible desktop calendar application you can "subscribe"

                                                        to your TeamSanp Schedule and have your full schedule of games and events show up automatically in your calendar. Just click this button:</p>
                                                    <button className="add-links" style={{width:"276px",marginRight:"10px"}}>Subscribe to full Calender</button>
                                                    <button className="add-links" style={{width:"276px",marginRight:"10px"}}>Subscribe to Games only</button>
                                                    <p style={{ color: "gray",paddingTop:"15px" }}>If you use Google Calendar, another web-based calendar, or just want to do things manually, you can also copy and paste the link directly into your calendar program (normally in the "Subscribe By URL" area):</p>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="prefarance-form-list">
                                                    <label> Full Calender</label>
                                                    <input type="text" className="input-select" />

                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="prefarance-form-list">
                                                    <label> Games Only</label>
                                                    <input type="text" className="input-select" />

                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="prefarance-form-list">
                                                    <label> CSV Export</label>
                                                    <span>You can export your schedule as a comma-separated (CSV) text file for use in a spreadsheet or word processing program. The file will begin downloading after you click the button below.</span>
                                                </div>
                                            </div>
                                            <div className="col-md-16">
                                                <div className="prefarance-form-list" style={{ marginLeft: "10px" }}>
                                                    {/* <button className="add-links">Export Text File</button> */}
                                                    <CsvDownload data={data} headers={headers} filename={`Schedule list `} />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Export;

