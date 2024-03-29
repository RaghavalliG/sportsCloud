import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
  useParams,
  useLocation,
} from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Network } from "../../../Services/Api";
import "../../../Utils/css/style.css";
import "../../../Utils/css/responsive.css";
import "../../../Utils/css/bootstrap.min.css";
import "../../../Utils/css/bootstrap-datepicker.css";
import TeamList from "../../../images/team-list.png";
import Delect from "../../../images/delect.png";
import SideMenuComponents from "../../../Components/SideMenu";
import UserProfile from "../../../images/user-profile.png";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../../../Redux/Actions/auth";
import BigUserProfile from "../../../images/big-user-profile.png";
import timeData from "../../timezone";

const CreateTeam = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [zip, setZip] = useState();
  const [language, setLanguage] = useState();
  const [teamName, setTeamName] = useState();
  const [sport, setSport] = useState();
  const [timeZone, setTimeZone] = useState();
  const [country, setCountry] = useState();
  const [parentName, setParentName] = useState();
  const [profilePic, setProfilePic] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [teamDropdown, setTeamDropDown] = useState("");
  const [timezoneList, setTimeZoneList] = useState([]);
  const pic = "https://nodeserver.mydevfactory.com:1448/";

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    //console.log("userData after login--->", userLocal)
    let userD = userLocal && userLocal._id ? true : false;
    setUser(userD);
    setUserData(userLocal);
    // createTeamData()
    updateProfile();
    dropdownMenu();
    // getTimeZone()
    setTimeZoneList(timeData);
  }, []);
  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/");
  };

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

  const dropdownMenu = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        token: user.authtoken,
      };
      //console.log('user',user)

      Network(
        "api/getAllTeamName?teamManagerId=" + user._id,
        "GET",
        header
      ).then(async (res) => {
        console.log("dropdown----", res);
        if (res.response_code == 400) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
        setDropdown(res.response_data);
      });
    }
  };
  const change = (event) => {
    console.log("event", event.target.value);
    setTeamDropDown(event.target.value);
  };
  // const getTimeZone = () => {
  //     const user = JSON.parse(localStorage.getItem('user'));
  //     if (user) {
  //         let header = {
  //             'token': user.authtoken

  //         }
  //         console.log('user', user)

  //         Network('https://nodeserver.mydevfactory.com:1448/api/getAllTimeZoneList', 'GET', header)
  //             .then(async (res) => {
  //                 console.log("timezone list----", res)
  //                 setTimeZoneList(res.response_data)

  //             })
  //     }

  // }

  const createTeamData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.authtoken,
      },
      body: JSON.stringify({
        teamName: teamName,
        sportName: sport,
        userId: user._id,
        teamTimeZone: timeZone,
        country: country,
        zip_code: zip,
        language: language,
        player_parent_name: parentName,
      }),
      redirect: "follow",
    };
    fetch(
      "https://nodeserver.mydevfactory.com:1448/api/createTeam",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("create team data", res);
        if (res.response_code == 400) {
          // dispatch(logoutUser(null))
          // localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        } else {
          toast.success(res.response_message);
          history.goBack();
        }
      });
  };

  const CheckValidatiion = () => {
    console.log("teamName =", teamName);
    console.log("timeZone =", timeZone);
    console.log("sport =", sport);
    console.log("country =", country);
    console.log("language =", language);
    console.log("parentName =", parentName);
    console.log("zip =", zip);

    if (
      teamName &&
      sport &&
      timeZone &&
      country &&
      zip &&
      language &&
      parentName
    ) {
      createTeamData();

      return;
    } else {
      toast.error("Please Provide All Field");
    }
  };

  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <SideMenuComponents manger="manger" />
          <div className="dashboard-main-content">
            <div className="dashboard-head">
              <div className="teams-select">
                <button
                  className="create-new-team"
                  onClick={() => {
                    history.push("/CreateTeam");
                  }}
                >
                  Create New Teams
                </button>
                <select onChange={change}>
                  {dropdown?.map((dropdown) => {
                    return (
                      <option key={dropdown._id} value={dropdown._id}>
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
                    <li className="dropdown-item" href="#">
                      {profilePic?.fname + " " + profilePic?.lname}
                    </li>
                    <Link to={{ pathname: "/MyAccount" }}>
                      <li className="dropdown-item" href="#">
                        My Account
                      </li>
                    </Link>
                    {/* <Link to={{ pathname: "/Credit" }} >
                                            <li className="dropdown-item" href="#">Credits</li>
                                        </Link> */}
                    <Link to={{ pathname: "/Household" }}>
                      <li className="dropdown-item" href="#">
                        My HouseHold
                      </li>
                    </Link>
                    <Link to={{ pathname: "/ManageTeam" }}>
                      <li className="dropdown-item" href="#">
                        Manage My Team
                      </li>
                    </Link>
                    {/* <Link to={{ pathname: "/Biling" }} >
                                            <li className="dropdown-item" href="#">Biling & Plans</li>
                                        </Link> */}
                    <Link to={{ pathname: "/CreateTeam" }}>
                      <li className="dropdown-item" href="#">
                        Create New Team
                      </li>
                    </Link>
                    {/* <Link to={{ pathname: "/SignOut" }} >
                                            <li className="dropdown-item active" href="#">Sign Out</li>
                                        </Link> */}
                  </ul>
                </div>
              </div>
              <div className="profile-head">
                <div className="profile-head-name">
                  {profilePic?.fname + " " + profilePic?.lname}
                </div>
                <div className="profile-head-img add">
                  {profilePic?.profile_image == null ? (
                    <img src={BigUserProfile} alt="" />
                  ) : (
                    <img
                      src={`${pic}profilepic/${profilePic?.profile_image}`}
                      alt=""
                    />
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
            </div>
            <div className="prefarance-box player-info add-new-form">
              <div className="prefarance-form playerinfo-form">
                <div className="row">
                  <div className="col-md-6">
                    <div
                      className="prefarance-form-list"
                      style={{ color: "white" }}
                    >
                      <h1 className="cn-title">Create a New Team</h1>
                      <h3 className="cn-subtitle">Let's get started</h3>
                      <p className="cn-subtext">
                        We'll create your team on the Free plan, which includes
                        all of our core features:
                      </p>
                      <ul className="ins-list">
                        <li>Schedule games, practices and events</li>
                        <li>Instantly connect with everyone via chat</li>
                        <li>Get paid for team expenses</li>
                      </ul>
                      <p className="cn-subtext">
                        Ready to take your team to the next level?
                      </p>
                      <p
                        className="cn-subtext"
                        style={{
                          color: "red",
                        }}
                      >
                        Explore our paid plans
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <div className="prefarance-form-list">
                        <div className="form-group">
                          <label>Language</label>
                          <select
                            className="input-select"
                            onChange={(e) => setLanguage(e.target.value)}
                          >
                            <option key="lang">Select Language</option>
                            <option key="ENGLISH" value="ENGLISH">
                              ENGLISH
                            </option>
                            <option key="HINDI" value="HINDI">
                              HINDI
                            </option>
                            <option key="BENGALI" value="BENGALI">
                              BENGALI
                            </option>
                            <option key="SPANISH" value="SPANISH">
                              SPANISH
                            </option>
                            <option key="ARABIC" value="ARABIC">
                              ARABIC
                            </option>
                            <option key="PORTUGUESE" value="PORTUGUESE">
                              PORTUGUESE
                            </option>
                            <option key="RUSSIAN" value="RUSSIAN">
                              RUSSIAN
                            </option>
                            <option key="JAPANESE" value="JAPANESE">
                              JAPANESE
                            </option>
                            <option key="LAHNDA" value="LAHNDA">
                              LAHNDA
                            </option>
                            <option key="GERMAN" value="GERMAN">
                              GERMAN
                            </option>
                            <option key="KOREAN" value="KOREAN">
                              KOREAN
                            </option>
                            <option key="FRENCH" value="FRENCH">
                              FRENCH
                            </option>
                            <option key="TELUGU" value="TELUGU">
                              TELUGU
                            </option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Team Name</label>
                          <input
                            type="text"
                            className="input-select"
                            onChange={(e) => setTeamName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Player Parent Name</label>
                          <input
                            type="text"
                            className="input-select"
                            onChange={(e) => setParentName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Sport</label>
                          <select
                            className="input-select"
                            onChange={(e) => setSport(e.target.value)}
                          >
                            <option key="sport">--Select--</option>
                            <option key="Football" value="Football">
                              Football
                            </option>
                            <option key="Cricket" value="Cricket">
                              Cricket
                            </option>
                            <option key="Badminton" value="Badminton">
                              Badminton
                            </option>
                          </select>
                        </div>
                        {/* <input type="text" className="input-select" onChange={(e) => setSport(e.target.value)}/> */}
                        <div className="form-group">
                          <label>Country</label>
                          <select
                            className="input-select"
                            onChange={(e) => {
                              setCountry(e.target.value);
                            }}
                          >
                            <option key="country">--Select--</option>
                            <option key="India" value="India">
                              India
                            </option>
                            <option key="America" value="America">
                              America
                            </option>
                            <option key="South Africa" value="South Africa">
                              South Africa
                            </option>
                          </select>
                        </div>
                        {/* <div>
                                                    <GooglePlacesAutocomplete
                                                        apiKey="AIzaSyB_Ve5EsMrUcHRCZHxkZeSdz24emqo4X6Y"
                                                    />
                                                </div> */}
                        <div className="form-group">
                          <label>Time Zone</label>
                          <select
                            className="input-select"
                            onChange={(e) => setTimeZone(e.target.value)}
                          >
                            <option key="Timezone">--Select--</option>
                            {timezoneList && timezoneList.length > 0 ? (
                              timezoneList.map((timezone) => {
                                return (
                                  <option
                                    key={timezone.label}
                                    value={`${timezone.label} ${timezone.timezone}`}
                                  >
                                    {timezone.label}
                                    {timezone.timezone}
                                  </option>
                                );
                              })
                            ) : (
                              <option> Team1</option>
                            )}
                            {/* // <option key="Timezone2" value="Time Zone2">Time Zone2</option>
                                                    // <option key="Timezone3" value="Time Zone3">Time Zone3</option> */}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            className="input-select"
                            onChange={(e) => setZip(e.target.value)}
                          />
                        </div>
                        {/* <input type="text" className="input-select" onChange={(e) => setTimeZone(e.target.value)}/> */}
                      </div>
                    </div>

                    <div className="text-center pb-3">
                      <div className="prefarance-form-list">
                        <button
                          className="add-links"
                          onClick={() => history.goBack()}
                        >
                          CANCEL
                        </button>
                        <button
                          className="add-links"
                          style={{
                            backgroundColor: "#181717",
                            marginLeft: "15px",
                          }}
                          onClick={CheckValidatiion}
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
