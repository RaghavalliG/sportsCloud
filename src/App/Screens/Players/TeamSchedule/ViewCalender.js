import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import { Network } from "../../../Services/Api";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../../../Redux/Actions/auth";
import "../../../Utils/css/style.css";
import "../../../Utils/css/responsive.css";
import "../../../Utils/css/bootstrap.min.css";
import "../../../Utils/css/bootstrap-datepicker.css";
import TeamList from "../../../images/team-list.png";
import SideMenuComponents from "../../../Components/SideMenu";
import flag from "../../../images/flag.png";
import UserProfile from "../../../images/user-profile.png";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./viewCalender.css";
import flagIcon from "../../../images/flag.png";
import BigUserProfile from "../../../images/big-user-profile.png";

const ViewCalender = () => {
  const localizer = momentLocalizer(moment);

  // const events = [
  //     {
  //         start: '2023-07-19',
  //         end: '2023-07-19',
  //         title: 'test event',
  //         description: 'This is a test description of an event',
  //         data: 'you can add what ever random data you may want to use later',
  //     }

  // ]

  const history = useHistory();
  const dispatch = useDispatch();
  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [player, setPlayer] = useState([]);
  const [resData, setResData] = useState({});
  const [nonPlayer, setNonPlayer] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [teamDropdown, setTeamDropDown] = useState("");
  const [team, setTeam] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [event, setEvent] = useState([]);
  const [profilePic, setProfilePic] = useState([]);

  // const [Nonplayer,setNonPlayer]= useState([]);

  useEffect(() => {
    // let user = userdata && userdata._id ? true : false;
    // console.log("userMe===>", user);
    setUser(user);
    // console.log("USerData", userdata);
    const userLocal = JSON.parse(localStorage.getItem("user"));
    console.log("userData after login--->", userLocal);
    let userD = userLocal && userLocal._id ? true : false;
    setUser(userD);
    setUserData(userLocal);
    teamSelect();
    updateProfile()
    // teamRoster();
    teamSchedule();
  }, []);

  const pic = "https://nodeserver.mydevfactory.com:1447/";

  const handleLogout = () => {
    // console.log("pruyuuuuuu", props);
    dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    history.push("/");
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

  const teamRoster = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("id---->", id);
    if (user) {
      let header = {
        token: user.authtoken,
      };
      console.log("user", user);

      Network("api/player-list-by-team-id?team_id=" + id, "GET", header).then(
        async (res) => {
          console.log("teamRoster----", res);

          if (res.response_code == 4000) {
            dispatch(logoutUser(null));
            localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }
          setResData(res.response_data);
          console.log("team player", res.response_data.PLAYER);
          console.log("non player", res.response_data.NON_PLAYER);
          setPlayer(res.response_data.PLAYER);
          setNonPlayer(res.response_data.NON_PLAYER);
        }
      );
    }
  };

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
        // teamRoster(res.response_data[0]._id);
        // }
        teamSchedule(res?.response_data[0]._id);
      });
    }
  };

  const change = (event) => {
    console.log("event", event.target.value);
    setTeamDropDown(event.target.value);
    // teamRoster(event.target.value);
    teamSchedule(event.target.value);
  };
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

        if (res.response_code == 400) {
          // dispatch(logoutUser(null));
          // localStorage.removeItem("user");
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
        var transformEvent = [];
        console.log(res.response_data, "ohohohoioihjhihhhhj");
        res.response_data.forEach((item) => {
          console.log(item, "90980909");

          transformEvent.push({
            start: new Date(item.date),
            end: new Date(item.date),
            title:
              item.isFlag == "Game" ? (
                <div className="title-calendar"> {item.game_name}</div>
              ) : (
                <div className="title-calendar">
                  <img src={flagIcon} alt="flag-icon" className="flag-icon" />
                  <label className="t-label">{item.event_name}</label>
                </div>
              ),
            description: item.locationName,
          });
        });
        setEvent(transformEvent);
        console.log(transformEvent, "====>>>>>>");
      });
    }
  };

  return (
    <div className="dashboard-container">
      <div
        className="prefarance-box player-info"
        style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}
      >
        <SideMenuComponents />
        <div className="dashboard-main-content">
          <div className="dashboard-head">
            <div className="teams-select">
              <button
                className="create-new-team"
                onClick={() => history.push("./CreateTeam")}
              >
                Create New Teams
              </button>

              <select onClick={change}>
                <option>Select Team</option>
                {team?.map((team) => {
                  return (
                    <option value={team.accept_invite_team_id}>
                      {team.accept_invite_team_name}
                    </option>
                  );
                })}
              </select>
              <select>
                <option>Account</option>
                <option>Account 2</option>
                <option>Account 3</option>
              </select>
            </div>

            <div className="profile-head">
              {console.log(profilePic.lname,"3740000000000000000>>>>")}
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
                    <img src={profilePic?.profile_image} alt="" />
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
                    <li>
                      <a className="active" href="#">
                        List View
                      </a>
                    </li>
                    <li
                      onClick={() => {
                        history.push("/ViewCalender");
                      }}
                    >
                      <a href="#">Calendar View</a>
                    </li>
                  </ul>
                </div>

                <button className="start-stream-btn">
                  Select Availability
                </button>
                <button className="start-stream-btn">View Preferences</button>
                <button className="start-stream-btn">Subscribe/ Export</button>
              </div>
            </div>

            <div className="calBox">
              <div className="calBoxHead">
                <span>
                  <span>&#10094;</span>
                  Month
                  <span>&#10095;</span>
                </span>
                <div className="vcRgt">Team record: 8-5</div>
              </div>
              <div className="calBtm">
                {/* <div className="calInfo">
                                <span>Do you want to play college sports?</span>
                                <span className="maxW">Set up a free  recruiting profile with Next College Student Athlete and start connecting with over 35,000 college coaches.</span>
                                <span className="redTx">Let’s Do  This!</span>
                                <span className="redTx">No Thanks</span>
                            </div>
                            <div className="calTable">
                                <table>
                                    <tr>
                                        <th>Sunday</th>
                                        <th>Monday</th>
                                        <th>Tueday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th>Saturday</th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            2
                                            <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                            <h5>Dubcity Basketball Practice</h5>
                                            <p>Eleanor Murrary Fallon Middle School</p>
                                        </td>
                                        <td>3</td>
                                        <td>
                                            4
                                            <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                            <h5>Dubcity Basketball Practice</h5>
                                            <p>Eleanor Murrary Fallon Middle School</p>
                                        </td>
                                        <td>
                                            5
                                            <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                            <h5>Dubcity Basketball Practice</h5>
                                            <p>Eleanor Murrary Fallon Middle School</p>
                                        </td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>8</td>
                                        <td>9</td>
                                        <td>
                                            10
                                            <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                            <h5>Dubcity Basketball Practice</h5>
                                            <p>Eleanor Murrary Fallon Middle School</p>
                                        </td>
                                        <td>11</td>
                                        <td>12</td>
                                        <td>13</td>
                                    </tr>
                                    <tr>
                                        <td>14</td>
                                        <td>15</td>
                                        <td>
                                            16
                                            <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                            <h5>Dubcity Basketball Practice</h5>
                                            <p>Eleanor Murrary Fallon Middle School</p>
                                        </td>
                                        <td>17</td>
                                        <td>
                                            18
                                            <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                            <h5>Dubcity Basketball Practice</h5>
                                            <p>Eleanor Murrary Fallon Middle School</p>
                                        </td>
                                        <td>19</td>
                                        <td>20</td>
                                    </tr>
                                    <tr>
                                        <td>21</td>
                                        <td>22</td>
                                        <td>23</td>
                                        <td><span className="prcRedCircle">24</span></td>
                                        <td>
                                            25
                                            <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                            <h5>Dubcity Basketball Practice</h5>
                                            <p>Eleanor Murrary Fallon Middle School</p>
                                        </td>
                                        <td>26</td>
                                        <td>27</td>
                                    </tr>
                                    <tr>
                                        <td>28</td>
                                        <td>29</td>
                                        <td>30</td>
                                        <td>31</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div> */}
                <div className="">
                  <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={event}
                    className="cs-calendar"
                  />
                  {console.log(event, "++++++++++++++++++++++++++++++")}
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
    </div>
  );
};

export default ViewCalender;
