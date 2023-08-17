import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";

import "./style.css";
import "../../../Utils/css/style.css";
import "../../../Utils/css/responsive.css";
import "../../../Utils/css/bootstrap.min.css";
import "../../../Utils/css/bootstrap-datepicker.css";
import UserProfile from "../../../images/user-profile.png";
import flagIcon from "../../../images/flag.png";
import football from "../../../images/football.png"
import Cricket from "../../../images/Cricket.png"
import add from "../../../images/add.png";
import Delect from "../../../images/delect.png";
import pencil from "../../../images/pencil.png";
import SideMenuComponents from "../../../Components/SideMenu";
import Footer from "../../../Components/Footer";
import { Network } from "../../../Services/Api";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../../../Redux/Actions/auth";
import Subscribe from "./Subscribe";
import Modal from "react-bootstrap/Modal";
import BigUserProfile from "../../../images/big-user-profile.png";
import CsvDownload from "../../../Components/Comman/CsvDownload";
import ManagerHeader from "../../../Components/Header/ManagerHeader";

function TeamSchdule(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [profilePic, setProfilePic] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [teamDropdown, setTeamDropDown] = useState("");

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
  const [availModal, setAvailModal] = useState();
  const [availSportModal, setAvailSportModal] = useState("");
  const [sportId, setSportId] = useState('');
  const [availDataModal, setAvailDataModal] = useState();

  const pic = "https://nodeserver.mydevfactory.com:1448/";

  useEffect(() => {
    // let user = userdata && userdata._id ? true : false;
    // //console.log("userMe===>", user);
    // dropdownMenu();

    // setUser(user);
    // //console.log("USerData", userdata);
    const userLocal = JSON.parse(localStorage.getItem("user"));
    //console.log("userData after login--->", userLocal)
    let userD = userLocal && userLocal._id ? true : false;
    setUser(userD);
    setUserData(userLocal);
    flagList();
    updateProfile();
    const team_id = localStorage.getItem("ManagerTeamId");
    setTeamDropDown(team_id);
    teamSchedule(team_id);
  }, []);

  // const handleLogout = () => {
  //   //console.log("pruyuuuuuu", props);
  //   dispatch(logoutUser(null));
  //   localStorage.removeItem("user");
  //   setUserData(null);
  //   props.history.push("/");
  // };
  const updateProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        token: user.authtoken,
      };
      console.log("user", user);

      Network("api/get-user-details?user_id=" + user._id, "GET", header).then(
        async (res) => {
          console.log("new Profile Pic----", res);
          setProfilePic(res.response_data);
        }
      );
    }
  };

  // const dropdownMenu = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     let header = {
  //       token: user.authtoken,
  //     };
  //     //console.log('user',user)

  //     Network(
  //       "api/getAllTeamName?teamManagerId=" + user._id,
  //       "GET",
  //       header
  //     ).then(async (res) => {
  //       console.log("dropdown----", res);
  //       if (res.response_code == 400) {
  //         dispatch(logoutUser(null));
  //         localStorage.removeItem("user");
  //         history.push("/");
  //         toast.error(res.response_message);
  //       }
  //       setDropdown(res.response_data);

  //       teamSchedule(res.response_data[0].team_id);
  //     });
  //   }
  // };
  const change = (value) => {
    console.log("eventssss", value);
    setTeamDropDown(value);
    teamSchedule(value);
    // setPlayer([])
    // teamRoster(event.target.value);
  };

  const teamSchedule = (id) => {
    console.log("id", id);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("authToken", user.authtoken);
    if (user) {
      let header = {
        token: user.authtoken,
      };

      let url = "";
      if (id != undefined) {
        url =
          "api/get-game-event-list?manager_id=" +
          user._id +
          "&team_id=" +
          id +
          "&page=1&limit=10";
      } else {
        url =
          "api/get-game-event-list?manager_id=" +
          user._id +
          "&team_id=" +
          teamDropdown +
          "&page=1&limit=10";
      }
      //console.log('user',user)
      // var teamid = id ? id :   "6480285555cf8a5024960668";
      Network("api/getAllEventAndGamesData?team_id=" + id, "GET", header).then(
        async (res) => {
          console.log("schedule----", res);
          if (res.response_code == 400) {
            dispatch(logoutUser(null));
            localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }
          //console.log("doc data----->",res.response_data.docs)
          setSchedule(res.response_data);
        }
      );
    }
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

  const deleteScheduleData = (id, flag) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("id-------------->", id);
    const a = window.confirm("Are you sure you wish to delete this Data?");
    console.log("delete click");
    if (a == true) {
      if (flag == 'Game') {
        var url = 'https://nodeserver.mydevfactory.com:1448/api/deleteGameDetailsById';
      } else {
        var url = 'https://nodeserver.mydevfactory.com:1448/api/deleteEventDetailsById'
      }
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
        url,
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          console.log("delete Schedule  data", res);
          if (res.response_code == 200) {
            console.log("deleted data", res);
            toast.success(res.response_message);
          }
          if (res.response_code == 400) {
            // dispatch(logoutUser(null));
            // localStorage.removeItem("user");
            // history.push("/");
            toast.error(res.response_message);
          }

          teamSchedule(teamDropdown);
        });
    }
  };

  const setAvailability = (flag, sport_id, availData) => {
    setAvailModal(true)
    setAvailSportModal(flag)
    setSportId(sport_id)
    console.log(availData)
    // if(availData.length > 0){
    setAvailDataModal(availData)
    // }
    // setAvailDataModal(availData)

  };
  const updateAvailability = () => {

  }
  const addAvailability = (status) => {
    console.log('add');
    const user = JSON.parse(localStorage.getItem("user"));
    const ManagerRosterId = localStorage.getItem("ManagerRosterId")
    console.log("id-------------->", id);
    // const a = window.confirm("Are you sure you wish to delete this Data?");
    // console.log("delete click");
    // if (a == true) {
    if (availSportModal == 'Game') {
      var url = 'https://nodeserver.mydevfactory.com:1448/api/addGameAvailabilityByGameId';
      var data = {

        game_id: sportId,
        assignment_volunteer_roster_id: ManagerRosterId,
        at_an_event: status
      };
    } else {
      var url = 'https://nodeserver.mydevfactory.com:1448/api/addEventAvailabilityByEventId';

      var data = {

        event_id: sportId,
        assignment_volunteer_roster_id: ManagerRosterId,
        at_an_event: status
      };
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": user.authtoken,
      },
      body: JSON.stringify(data),
    };
    fetch(
      url,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("Schedule  data", res);
        if (res.response_code == 200) {
          console.log(" data", res);
          toast.success(res.response_message);
        }
        if (res.response_code == 400) {
          // dispatch(logoutUser(null));
          // localStorage.removeItem("user");
          // history.push("/");
          toast.error(res.response_message);
        }

        // teamSchedule(teamDropdown);
      });
    // }


  }

  const updateModalValue = (id1, uId) => {
    teamSchedule(teamDropdown == null ? dropdown[0]._id : teamDropdown);
    setModeValue(true);
    setUId(uId);
    setId(id1);
    console.log("idddddd-------->", id1);
  };
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

  const selectFlag = (event) => {
    setFlagId(event.target.value);
  };

  let headers = [
    // { label: "Event/Game", key: "firstName" },
    { label: "Event Name", key: "event_name" },
    // { label: "email", key: "contactInformationEmail" },
    // { label: "phone", key: "contactInformationPhoneNumber" },
    // { label: "Gender", key: "playerGender" }
  ];

  // const allPlayers = newplayerdata.concat(newNonPlayerData);
  // let data = (allPlayers && allPlayers.length >0) ? allPlayers  : [];
  let data = schedule && schedule.length > 0 ? schedule : [];

  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <SideMenuComponents manger="manger" />
          <div className="dashboard-main-content">
            <ManagerHeader change={change} />
            {/* <div className="dashboard-head">
              <div className="teams-select">
                <button
                  className="create-new-team"
                  onClick={() => {
                    history.push("/CreateTeam");
                  }}
                >
                  Create New Teams
                </button>
                <select
                  onChange={change}
                  value={
                    teamDropdown == "" ? dropdown[0]?.team_id : teamDropdown
                  }
                >
                  {dropdown?.map((dropdown) => {
                    return (
                      <option value={dropdown.team_id}>
                        {dropdown.team_name}
                      </option>
                    );
                  })}
                </select>
                <div className="dropBtn">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "#2C2C2C", border: "none" }}
                  >
                    ACCOUNT
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                    style={{
                      backgroundColor: "#484848",
                      listStyle: "none",
                      margin: "14px",
                    }}
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                      >{`${profilePic?.fname} ${profilePic?.lname}`}</a>
                    </li>
                    <Link to={{ pathname: "/MyAccount" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          My Account
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/Credit" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Credits
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/Household" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          My HouseHold
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/ManageTeam" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Manage My Team
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/Biling" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Biling & Plans
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/CreateTeam" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Create New Team
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/SignOut" }}>
                      <li>
                        <a className="dropdown-item active" href="#">
                          Sign Out
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="profile-head">
                <div className="profile-head-name">
                  {profilePic?.fname + " " + profilePic?.lname}
                </div>
                <div className="profile-head-img">
                  {profilePic?.profile_image == null ? (
                    <img src={BigUserProfile} alt="" />
                  ) : (
                    <img src={`${profilePic?.profile_image}`} alt="" />
                  )}
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
            </div> */}

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
                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            history.push("./ManagerViewCalender");
                          }}
                        >
                          Calendar View
                        </a>
                      </li>
                    </ul>
                  </div>

                  <button
                    className="start-stream-btn"
                    onClick={() => {
                      history.push("./ManagerTeamAvailability");
                    }}
                  >
                    Select Availability
                  </button>
                  {/* <button
                    className="start-stream-btn"
                    onClick={() => {
                      history.push("./preferance");
                    }}
                  >
                    View Preferences
                  </button> */}
                  {/* <button className="start-stream-btn" onClick={() => {
                                        history.push("./Subscribe")
                                    }}>Subscribe/ Export</button> */}
                  <CsvDownload
                    data={data}
                    headers={headers}
                    filename={`Schedule list `}
                  />
                </div>
              </div>

              <div className="managerDropdownLink">
                <h3 style={{ color: "white" }}>Manager:</h3>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "#2C2C2C", border: "none" }}
                  >
                    New
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                    style={{
                      backgroundColor: "#484848",
                      listStyle: "none",
                      margin: "14px",
                    }}
                  >
                    <Link to={{ pathname: "/NewGame", state: "GAME" }}>
                      <li>
                        <a className="dropdown-item">New Game</a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/NewEvent", state: "EVENT" }}>
                      <li>
                        <a className="dropdown-item">New Event</a>
                      </li>
                    </Link>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "#2C2C2C", border: "none" }}
                  >
                    Create
                  </button>
                  {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ backgroundColor: "#484848", listStyle: "none", margin: "14px" }}>
                                        <Link to={{ pathname: "/Location", state: "Location" }} >
                                            <li><a className="dropdown-item" href="#">New Location</a></li></Link>
                                        <Link to={{ pathname: "/Oponent", state: "Opponent" }} >
                                            <li><a className="dropdown-item" href="#">New Opponent</a></li></Link>

                                    </ul>
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "#2C2C2C", border: "none" }}>
                                        Edit
                                    </button> */}
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton2"
                    style={{
                      backgroundColor: "#484848",
                      listStyle: "none",
                      margin: "14px",
                    }}
                  >
                    <Link to={{ pathname: "/EditLocation", state: "Location" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Edit Location
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/EditOponent", state: "Opponent" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Edit Opponent
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "#2C2C2C", border: "none" }}
                  >
                    Import
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                    style={{
                      backgroundColor: "#484848",
                      listStyle: "none",
                      margin: "14px",
                    }}
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Import from Schedule
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <div className="teams-select">
                                    <ul >
                                        <Link to={{ pathname: "/NewEvent", state: "GAME" }} >
                                            <li ><a href="javascript:void(0)"  >New Game</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/NewEvent", state: "EVENT" }} >
                                            <li   ><a href="javascript:void(0)"  >New Event</a></li>
                                        </Link>

                                        <Link to={{ pathname: "/EditLocation" }} >
                                            <li ><a href="#">Edit</a>

                                            </li>
                                        </Link>

                                        <Link to={{ pathname: "/EditOponent" }} >
                                            <li ><a href="#">Edit Oponent</a>

                                            </li>
                                        </Link>
                                        <li><a href="#">Import</a></li>
                                    </ul>


                                </div> */}
                {/* <ul>
                                    <li><a href="#">Edit</a></li>
                                    <li><a href="#">Import</a></li>
                                </ul> */}
              </div>
              <div className="prefarance-box">
                <div className="team-payment team-assesment">
                  <table>
                    <tr>
                      <th></th>
                      <th>Game/ Event</th>
                      <th>Date Time</th>
                      {/* <th>Time</th> */}
                      <th>Location</th>
                      <th></th>
                      <th>Actions</th>
                    </tr>

                    {schedule?.map((schedule, id) => {
                      return (
                        <tr>
                          <td> {schedule.isFlag == 'Game' ?
                            <img
                              src={Cricket}
                              alt="cricket-icon"
                              className="img-fluid"
                              style={{ 'max-width': 50 }}

                            />
                            :
                            <img
                              src={flagIcon}
                              alt="flag-icon"
                              className=""
                            />}</td>
                          <td>
                            <div className="flag-prac">
                              {/* <img
                                src={schedule.display_icon?.image}
                                alt=""
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  borderRadius: "50%",
                                }}
                              /> */}

                              <button className="practice">
                                {schedule.isFlag == 'Game' ? schedule.game_name : schedule.event_name}
                              </button>
                            </div>
                          </td>
                          <td>
                            <span>{schedule.date}</span>
                          </td>
                          {/* <td><span>{`${new Date(schedule.date).getDate()}/${new Date(schedule.date).getMonth()}/${new Date(schedule.date).getFullYear()}`}</span></td> */}
                          {/* <td> */}
                          {/* <span>{schedule.time.startTime}-{schedule.time.endTime}</span> */}
                          {/* </td> */}
                          <td>
                            <span>{schedule.location.locationName},</span>
                            <span>{schedule.location.address}</span>
                          </td>
                          <td> <div className="last-row">
                            <button style={{ color: '#ec3525' }}
                              data-toggle="modal"
                              data-target="#setAvailability"
                              onClick={() => setAvailability(schedule.isFlag, schedule._id, schedule.roster_availability)}
                            >Set Availability</button></div></td>
                          {/* <td>{schedule.assignment}</td> */}
                          <td>
                            <div className="last-row">
                              {/* <p>Avaneesh Shett</p>{" "} */}

                              <button
                                data-toggle="modal"
                                data-target="#assignmentdelect"
                                onClick={() => deleteScheduleData(schedule._id, schedule.isFlag)}
                              >
                                <img src={Delect} />
                              </button>{" "}
                              <button
                                onClick={() =>
                                  updateModalValue(id, schedule._id)
                                }
                              >
                                <img src={pencil} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </table>

                  {availModal ? (
                    <Modal show={availModal} size="md">
                      <Modal.Body>
                        <div className="prefarance-form playerinfo-form">
                          <h2 className="m-title">Set Availability</h2>
                          <div className="row">
                            <div className="col-md-12">
                              <button className="btn acceptbtn focus1" onClick={() => { availDataModal.length > 0 ? updateAvailability('going') : addAvailability('going') }}>
                                GOING
                              </button>
                              <button className="btn acceptbtn focus2" onClick={() => { availDataModal.length > 0 ? updateAvailability('maybe') : addAvailability('maybe') }}>
                                MAY BE
                              </button>
                              <button className="btn acceptbtn focus3" onClick={() => { availDataModal.length > 0 ? updateAvailability('not') : addAvailability('not') }}>NO</button>
                            </div></div>
                          <div className="text-center mt-3">
                            <button
                              className="add-links"
                              onClick={() => setAvailModal(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>)
                    : ''}

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
                                      src={`${pic}${flag?.image}`}
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
                            className="add-links"
                            onClick={() => setModeValue(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="add-links ml-2"
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

export default TeamSchdule;
