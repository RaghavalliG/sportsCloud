import React, { useState, useEffect } from "react";
import { EyeFill, ZoomIn } from "react-bootstrap-icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import "../../../Utils/css/style.css";
import "../../../Utils/css/responsive.css";
import "../../../Utils/css/bootstrap.min.css";
import "../../../Utils/css/bootstrap-datepicker.css";
import UserProfile from "../../../images/user-profile.png";
import flag from "../../../images/flag.png";
import add from "../../../images/add.png";
import Delect from "../../../images/delect.png";
import pencil from "../../../images/pencil.png";
import SideMenuComponents from "../../../Components/SideMenu";
import Footer from "../../../Components/Footer";
import { Network } from "../../../Services/Api";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../../../Redux/Actions/auth";
import BigUserProfile from "../../../images/big-user-profile.png";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function PlayerSchedule(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [team, setTeam] = useState([]);
  const [profilePic, setProfilePic] = useState([]);
  const [teamDropdown, setTeamDropDown] = useState("");
  const [dropdown, setDropdown] = useState([]);

  const [valueDropDown, setValueDropDown] = useState("");
  const [eventType, setEventType] = useState();
  const [modeValue, setModeValue] = useState(false);
  const [uid, setUId] = useState("");
  const [id, setId] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [dateUpdate, setDateUpdate] = useState("");
  const [timeUpdate, setTimeUpdate] = useState("");
  const [locationDetails, setLocationDetails] = useState("");
  const [assignmentUpdate, setAssignmentupdate] = useState("");
  const [volenteerUpdate, setVolenteerUpdate] = useState(""); 
  const [flag, setFlagList] = useState([]);
  const [flagId, setFlagId] = useState("");
  const [eventditailsmodel, seteventDitailsmodel] = useState(false);
  const [gameditailsmodel, setgameDitailsmodel] = useState(false);
  const [availableditailsmodel, setavailableDitailsmodel] = useState(false);
  const [availablitydetails, setAvalablitydetails] = useState({});
  const [gameavailablitydetails, setgameAvalablitydetails] = useState({});
  const [gameavailableditailsmodel, setgameavailableDitailsmodel] = useState(false);

  const [eventdetails, setEventdetails] = useState({});
  const [gamedetails, setGamedetails] = useState({});
  const [id1, setId1] = useState("");
  const[id2,setId2]=useState("")
  const pic = "https://nodeserver.mydevfactory.com:1447/profilepic/";


  useEffect(() => {
    // let user = userdata && userdata._id ? true : false;
   // console.log("userMe===>");
    setUser(user);
    // console.log("USerData", userdata);
    const userLocal = JSON.parse(localStorage.getItem("user"));
    console.log("userData after login--->", userLocal);
    let userD = userLocal && userLocal._id ? true : false;
    setUser(userD);
    setUserData(userLocal);
    teamSelect();
    //teamSchedule();
    updateProfile();
    eventDitails();
    gameDitails();
    // eventavailabilityDitails()
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/");
  };

  const updateProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        "token": user.authtoken,
      };
      // console.log("user", user);

      Network("api/getUserDetailsById?user_id=" + user?._id, "GET", header).then(
        async (res) => {
          // console.log("new Profile Pic----", res);
          if (res.response_code == 400) {
            dispatch(logoutUser(null));
            localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }
          setProfilePic(res.response_data.userDetailsObj);
        }
      );
    }
  };

  const teamSelect = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user", user);
    if (user) {
      let header = {
        token: user.authtoken,
      };
    

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
        console.log("res.response_data",res.response_data)
        // if(res.response_data.length!=0){
        //teamSchedule(res?.response_data[0]._id);
        teamSchedule(res?.response_data[0].accept_invite_team_id)
        // }
      });
    }
  };

  const teamSchedule = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("id<<<<<",`api/getAllEventAndGamesData?team_id=${id}`,);
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
          history.push("/")
          toast.error(res.response_message);
        }
        setSchedule(res.response_data);
        //console.log("res",res.response_data)
        
      });
    }
  };
  const change = (event) => {
    console.log("event", event.target.value);
    setTeamDropDown(event.target.value);

    const selectedTeamObject =team.find(
      (item) => item.accept_invite_team_id === event.target.value
    );
    // const selectedTeamObject = dropdown.find(
    //   team.map(team => team.accept_invite_team_id === event.target.value)
    
    // );
    console.log (selectedTeamObject,"===>>selectteamobject")
   
      console.log(selectedTeamObject?.accept_invite_team_id
        ,"===>>190")


    

    localStorage.setItem("PlayerrTeamName", selectedTeamObject?.accept_invite_team_name);
    localStorage.setItem("PlayerTeamId", selectedTeamObject?.accept_invite_team_id);
    localStorage.setItem(
      "PlayerRosterId",
      selectedTeamObject?.accept_invite_id
    );
    // setTeamDropDown(event.target.value);
    teamSchedule(event.target.value);
  };
  const flagList = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        authToken: user.authtoken,
      };
      //console.log('user',user)

      Network("api/all-flag-list", "GET", header).then(async (res) => {
        console.log("flagList----", res);
        setFlagList(res.response_data);
        if (res.response_code == 4000) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
      });
    }
  };

  const deleteScheduleData = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("id-------------->", id);
    const a = window.confirm("Are you sure you wish to delete this Data?");
    console.log("delete click");
    if (a == true) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.authtoken,
        },
        body: JSON.stringify({
          id: id,
        }),
      };
      fetch(
        "https://nodeserver.mydevfactory.com:1447/api/delete-game-event",
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          console.log("delete Schedule  data", res);
          if (res.response_code == 2000) {
            console.log("deleted data", res);
          }
          if (res.response_code == 4000) {
            dispatch(logoutUser(null));
            localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }

          teamSchedule(teamDropdown);
        });
    }
  };

  // const updateModalValue = (id1, uId) => {
  //   teamSchedule(teamDropdown == null ? dropdown[0]._id : teamDropdown);
  //   setModeValue(true);
  //   setUId(uId);
  //   setId(id1);
  //   console.log("idddddd-------->", id1);
  // };
  console.log("idddddd-------->22", id);

  const updateGameEvent = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.authtoken,
      },
      body: JSON.stringify({
        name: nameUpdate,
        short_label: schedule[id].short_label,
        _id: schedule[id]._id,
        opponent: schedule[id].opponent,
        event_type: schedule[id].event_type,
        date: dateUpdate,
        time: timeUpdate,
        location: locationDetails,
        location_details: locationDetails,
        home_or_away: schedule[id].home_or_away,
        uniform: schedule[id].uniform,
      }),
    };
    fetch(
      "https://nodeserver.mydevfactory.com:1447/api/edit-game-event",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("update game/event data", res);
        if (res.response_code == 2000) {
          toast.success("Edit Game/Event data succesful");
        }

        if (res.response_code == 4000) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
      });
  };
  const ditailsmodelvalue = (id, flag) => {
    setId1(id);
    flag == "Event" ? eventDitails(id) : gameDitails(id);
    if (flag == "Event") {
      seteventDitailsmodel(true);
      
    } else {
      setgameDitailsmodel(true);
    }
    console.log(flag, "======>>>>>>>>flag value");
  };

  const eventDitails = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(id, "redgfdgfgfdgfcddsdfs");
    axios({
      method: "get",

      url:
        "https://nodeserver.mydevfactory.com:1448/api/getDetailsByEventId?events_id=" +
        id,
      //'https://nodeserver.mydevfactory.com:1448/api/getRoasterDetailsById?rosterId=' + id,
      headers: {
        token: user.authtoken,
      },
    })
      .then(function (res) {
        console.log(res, "978767564554343456767475784789567856756");
        setEventdetails(res.data.response_data);

        if (res.response_code == 200) {
          seteventDitailsmodel(false);
          //   teamRoster(teamDropdown)
        }
      })
      .catch(function (res) {
        //  console.log(res)
      });
  };

  const gameDitails = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(id, "redgfdgfgfdgfcddsdfs");
    axios({
      method: "get",

      url:
        "https://nodeserver.mydevfactory.com:1448/api/getGameDetailsByGameId?game_id=" +
        id,
      //'https://nodeserver.mydevfactory.com:1448/api/getRoasterDetailsById?rosterId=' + id,
      headers: {
        token: user.authtoken,
      },
    })
      .then(function (res) {
        console.log(res, "game ditails");
        setGamedetails(res.data.response_data);

        if (res.response_code == 200) {
          setgameDitailsmodel(false);
          //   teamRoster(teamDropdown)
        }
      })
      .catch(function (res) {
        //  console.log(res)
      });
  };

  const selectFlag = (event) => {
    setFlagId(event.target.value);
  };


  const eventavailabilityDitails = (id,add) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const playerarosteraid= localStorage.getItem("PlayerRosterId")
    console.log(id, "redgfdgfgfdgfcddsdfs");
    axios({
      method: "post",

      url:
        "https://nodeserver.mydevfactory.com:1448/api/addEventAvailabilityByEventId" 
        ,
      //'https://nodeserver.mydevfactory.com:1448/api/getRoasterDetailsById?rosterId=' + id,
      headers: {
        token: user.authtoken,
      },
      data:{
        event_id:id,
        assignment_volunteer_roster_id:playerarosteraid,
        at_an_event:add
      }
    })
      .then(function (res) {
        console.log(res, "978767564554343456767475784789567856756");
        setAvalablitydetails(res.data.response_data);
        // setavailableDitailsmodel(true)

        if (res.response_code == 200) {
          // seteventDitailsmodel(false);
          //   teamRoster(teamDropdown)
        }
      })
      .catch(function (res) {
        //  console.log(res)
      });
  };
  const gameavailabilityDitails = (id,add) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const playerarosteraid= localStorage.getItem("PlayerRosterId")
    console.log(id, "redgfdgfgfdgfcddsdfs");
    axios({
      method: "post",

      url:
        "https://nodeserver.mydevfactory.com:1448/api/addGameAvailabilityByGameId" 
        ,
      //'https://nodeserver.mydevfactory.com:1448/api/getRoasterDetailsById?rosterId=' + id,
      headers: {
        token: user.authtoken,
      },
      data:{
        game_id:id,
        assignment_volunteer_roster_id:playerarosteraid,
        at_an_event:add
      }
    })
      .then(function (res) {
        console.log(res, "978767564554343456767475784789567856756");
        // setEventdetails(res.data.response_data);
        setgameAvalablitydetails(res.data.response_data);
        // setgameavailableDitailsmodel(true)

        if (res.response_code == 200) {
          // seteventDitailsmodel(false);
          //   teamRoster(teamDropdown)
        }
      })
      .catch(function (res) {
        //  console.log(res)
      });
  };

  const availablemodelvalue = (id, flag) => {
    setId2(id);
    // flag == "Event" ? eventavailabilityDitails(id) : gameavailabilityDitails(id);
    if (flag == "Event") {
      
      setavailableDitailsmodel(true)
    } else {

       setgameavailableDitailsmodel(true)
    }
    console.log(flag, "======>>>>>>>>flag value");
  };



  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <SideMenuComponents />
          <div className="dashboard-main-content">
            <div className="dashboard-head">
              <div className="teams-select">
                <select onClick={change}>
                  {/* <option>Select Team</option> */}
                  {team?.map((team,index) => {
                    //console.log("676767555", team);
                    return (
                      <option key={index} value={team.accept_invite_team_id}>
                        {team.accept_invite_team_name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="profile-head">
              {profilePic?.fname ? (
                  <div className="profile-head-name">
                   
                    {profilePic?.fname + " " + profilePic?.lname}
                  </div>
                ) : (
                  <div className="profile-head-name">{profilePic?.fname} {profilePic?.lname}</div>
                )}
                <div className="profile-head-img">
                {profilePic?.profile_image == null ? (
                    <img src={BigUserProfile} alt="" />
                  ) : (
                    // <img src={`${pic1}${profilePic?.profile_image}`} alt="" />
                    <img
                    src={profilePic?.profile_image}
                    alt=""
                    
                    />
                  )}
                  {/* <img src={user?.profile_image} alt="" /> */}
                  {/* {profilePic?.profile_image == null ? (
                    <img src={BigUserProfile} alt="" />
                  ) : (
                    // <img src={`${pic}${profilePic?.profile_image}`} alt="" />
                    <img src={user?.profile_image} alt="" />
                  )} */}
                </div>
              </div>
              <div className="login-account">
                <ul>
                  <li>
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#myModallogin"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="prefarance-page">
              <div className="page-header">
                <h2 className="page-title">Schedule</h2>
                <div className="streming-head-right">
                  <div className="stream-tab">
                    <ul>
                      <li>
                        <a className="active" href="#">
                          List View
                        </a>
                      </li>
                      <li
                        onClick={() => {
                          history.push("./ViewCalender");
                        }}
                      >
                        <a href="#">Calendar View</a>
                      </li>
                    </ul>
                  </div>

                  <button
                    className="start-stream-btn"
                    onClick={() => history.push("./TeamAvailability")}
                  >
                    Select Availability
                  </button>
                  <button className="start-stream-btn">View Preferences</button>
                  <button
                    className="start-stream-btn"
                    onClick={() => history.push("./Export")}
                  >
                    Subscribe/ Export
                  </button>
                </div>
              </div>

              <div className="prefarance-box">
                <div className="team-payment team-assesment">
                  <table>
                    <tr>
                      <th>Game/ Event</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Location</th>
                      <th>Assignments</th>
                      <th>Volunteer</th>
                      <th>Action</th>
                    </tr>
                    {schedule?.map((item, id) => {
                      return (
                        <tr key={`scheduleKey${id}`}>
                          <td>
                            <div className="flag-prac">
                              {/* <img src={schedule.display_icon.image} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} /> */}
                              <button className="practice">
                                {/* {item?.game_name} */}
                                {item.isFlag == "Event"
                                  ? item?.event_name
                                  : item?.game_name}
                              </button>
                            </div>
                          </td>
                          {/* <td><span>{`${new Date(item.date).getDate()}/${new Date(item.date).getMonth()}/${new Date(item.date).getFullYear()}`}</span></td> */}
                          <span>{item?.date}</span>
                          <td>
                            <span>
                              {item?.start_time}-{item?.end_time}
                            </span>
                          </td>
                          <td>
                            <span>
                              {item.location.locationName},
                              {item.location.address}
                            </span>
                          </td>
                          <td>
                          <button
                                onClick={() =>
                                  availablemodelvalue(item._id, item.isFlag)
                                }
                              >Set Availability
                              </button></td>
                          <td>
                            {/* <div className="last-row">
                                 <p>Avaneesh Shett</p> <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deleteScheduleData(schedule._id)}><img src={Delect} />
                                 </button> <button onClick={() => updateModalValue(id, schedule._id)}><img src={pencil} /></button>
                            </div> */}
                          </td>
                          <td>
                            <div className="last-row">
                              {/* <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deletePlayerData(player._id)} ><img src={Delect} /></button> */}
                              <button
                                onClick={() =>
                                  ditailsmodelvalue(item._id, item.isFlag)
                                }
                              >
                                <EyeFill style={{ color: "white" }} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                  {/* //ditailsmodel */}

                  {eventditailsmodel ? (
                    <Modal show={eventditailsmodel} size="md">
                      <Modal.Body>
                        <div className="prefarance-form playerinfo-form">
                          <h1 className="m-title">Event Details</h1>
                          {eventdetails ? (
                            <>
                              <div className="plr_dtls_wrp">
                                <div className="plr_dtls_itm">
                                  <label> Arrival Time:</label>
                                  <span> {eventdetails.arrival_time}</span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label> Team Name :</label>
                                  <span>{eventdetails.team_id.team_name}</span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label> Location Name :</label>
                                  <span>
                                    {eventdetails.location.locationName}
                                  </span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label> Start time :</label>
                                  <span>{eventdetails.start_time}</span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label>End time :</label>
                                  <span>{eventdetails.end_time}</span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label> Arrival time :</label>
                                  <span>{eventdetails.arrival_time}</span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label>Event duration :</label>
                                  <span> {eventdetails.duration}</span>
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}

                          <div className="text-center">
                            <button
                              className="add-links"
                              style={{ margin: "10px" }}
                              onClick={() => seteventDitailsmodel(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  ) : (
                    ""
                  )}

                  {/* //////game model */}

                  {gameditailsmodel ? (
                    <Modal show={gameditailsmodel} size="md">
                      <Modal.Body>
                        <div className="prefarance-form playerinfo-form">
                          <h1 className="m-title">Game Details</h1>
                          {gamedetails ? (
                            <>
                              <div className="plr_dtls_wrp">
                                <div className="plr_dtls_itm">
                                  <label>Game name :</label>
                                  <span>{gamedetails.game_name}</span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label>Opponent :</label>
                                  <span>
                                    {gamedetails?.opponent?.opponentsName}
                                  </span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label>Team name :</label>
                                  <span>{gamedetails.team_id.team_name}</span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label>Location name :</label>
                                  <span>
                                    {gamedetails.location.locationName}
                                  </span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label>Start time :</label>
                                  <span>{gamedetails.start_time}</span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label>End time :</label>
                                  <span>{gamedetails.end_time}</span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label>Arrival time :</label>
                                  <span>{gamedetails.arrival_time}</span>
                                </div>
                                <div className="plr_dtls_itm">
                                  <label>Game Duration :</label>
                                  <span>{gamedetails.duration}</span>
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                          <div className="text-center mt-3">
                            <button
                              className="add-links"
                              onClick={() => setgameDitailsmodel(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  ) : (
                    ""
                  )}

                  {modeValue && schedule.length != 0 ? (
                    <Modal show={modeValue} size="md">
                      <Modal.Body>
                        <div className="prefarance-form playerinfo-form">
                          <h1 className="m-title">Edit Game/Event</h1>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="prefarance-form-list">
                                <label className="input-label">
                                  Name of Event/Game
                                </label>
                                <input
                                  type="text"
                                  className="input-select"
                                  placeholder="Enter Name of Game/Event "
                                  defaultValue={schedule[id].name}
                                  onChange={(e) =>
                                    setNameUpdate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="prefarance-form-list">
                                <label className="input-label">Date</label>
                                <input
                                  type="date"
                                  className="input-select"
                                  placeholder="Select Date "
                                  defaultValue={`${new Date(
                                    schedule[id].date
                                  ).getDate()}/${new Date(
                                    schedule[id].date
                                  ).getMonth()}/${new Date(
                                    schedule[id].date
                                  ).getFullYear()}`}
                                  onChange={(e) =>
                                    setDateUpdate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="prefarance-form-list">
                                <label className="input-label">Time</label>
                                <input
                                  type="time"
                                  className="input-select"
                                  placeholder="Select Time "
                                  defaultValue={`${schedule[id].time.startTime}-${schedule[id].time.endTime}`}
                                  onChange={(e) =>
                                    setTimeUpdate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="prefarance-form-list">
                                <label className="input-label">Location</label>
                                <input
                                  type="text"
                                  className="input-select"
                                  placeholder="Enter Location"
                                  defaultValue={`${schedule[id].location_details},${schedule[id].location}`}
                                  onChange={(e) =>
                                    setLocationDetails(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="prefarance-form-list">
                                <label className="input-label">
                                  Assignment
                                </label>
                                <input
                                  type="text"
                                  className="input-select"
                                  placeholder="Enter Assingment "
                                  defaultValue={schedule[id].assignment}
                                  onChange={(e) =>
                                    setAssignmentupdate(e.target.value)
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="prefarance-form-list">
                                <label className="input-label">
                                  Name of Volenteer
                                </label>
                                <input
                                  type="text"
                                  className="input-select"
                                  placeholder="Enter Name Of Volenteer "
                                  defaultValue="Avaneesh Shett"
                                  onChange={(e) =>
                                    setVolenteerUpdate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="prefarance-form-list">
                            <div style={{ display: "flex" }}>
                              {flag?.map((flag) => {
                                return (
                                  <div style={{ margin: "10px" }}>
                                    <img
                                      src={`${pic}${flag.image}`}
                                      alt=""
                                      style={{ height: "30px", width: "30px" }}
                                    />
                                    <br></br>
                                    <input
                                      type="radio"
                                      name="radio"
                                      style={{ height: "30px", margin: "5px" }}
                                      onClick={selectFlag}
                                      value={flag._id}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="text-center mt-3">
                          <button
                            className="add-links mr-2"
                            onClick={() => setModeValue(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="add-links"
                            style={{
                              backgroundColor: "#1d1b1b",
                            }}
                            onClick={updateGameEvent}
                          >
                            Update
                          </button>
                        </div>
                      </Modal.Body>
                    </Modal>
                  ) : (
                    ""
                  )}

                   {availableditailsmodel ? (
                    <Modal show={availableditailsmodel} size="md">
                      <Modal.Body>
                        <div className="prefarance-form playerinfo-form">
                          <h1 className="m-title">Set Availability</h1>
                          {/* {availablitydetails ? ( */}
                            <>
                             <div>
                                <button onClick={() => eventavailabilityDitails(id2, 'going')}>Going</button>
                                <button onClick={() => eventavailabilityDitails(id2, 'maybe')}>Maybe</button>
                                <button onClick={() => eventavailabilityDitails(id2, 'no')}>No</button>
                               
                              </div> 
                            </>
                          {/* ) : (
                            ""
                          )} */}

                          <div className="text-center">
                            <button
                              className="add-links"
                              style={{ margin: "10px" }}
                              onClick={() => setavailableDitailsmodel(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                     ) : (
                      <Modal show={gameavailableditailsmodel} size="md">
                      <Modal.Body>
                        <div className="prefarance-form playerinfo-form">
                          <h1 className="m-title">Set Availability</h1>
                          {/* {availablitydetails ? ( */}
                            <>
                             <div>
                                <button onClick={() => gameavailabilityDitails(id2, 'going')}>Going</button>
                                <button onClick={() => gameavailabilityDitails(id2, 'maybe')}>Maybe</button>
                                <button onClick={() => gameavailabilityDitails(id2, 'no')}>No</button>
                               
                              </div> 
                            </>
                          {/* ) : (
                            ""
                          )} */}

                          <div className="text-center">
                            <button
                              className="add-links"
                              style={{ margin: "10px" }}
                              onClick={() => setgameavailableDitailsmodel(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                    )}
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

export default PlayerSchedule;
