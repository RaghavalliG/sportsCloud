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

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PlaceComponent from "./PlaceComponent";

function NewLocation(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [teamDropdown, setTeamDropDown] = useState("");

  const [valueDropDown, setValueDropDown] = useState("");
  const [eventType, setEventType] = useState();

  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");

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
    props.history.push("/");
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

        teamSchedule(res.response_data[0].team_id);
      });
    }
  };
  const change = (event) => {
    console.log("event", event.target.value);
    setTeamDropDown(event.target.value);
    teamSchedule(event.target.value);
  };

  const teamSchedule = (id) => {
    console.log("id", id);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        authToken: user.authtoken,
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
      Network(
        "api/get-game-event-list?manager_id=" +
          user._id +
          "&team_id=" +
          id +
          "&page=1&limit=10",
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
        //console.log("doc data----->",res.response_data.docs)
        setSchedule(res.response_data.docs);
      });
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
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.authtoken,
      },
      body: JSON.stringify({
        _id: id,
      }),
    };
    fetch(
      "https://nodeserver.mydevfactory.com:1447/api/delete-assignment",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("delete assignment data", res);
        if (res.response_code == 4000) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
        teamSchedule();
      });
  };

  const CheckValidation = () => {
    if (locationName == null) {
      toast.error("Please Provide  Location Name", {
        position: "top-center",
      });
    }
    if (address == null) {
      toast.error("Please Provide  Location Address", {
        position: "top-center",
      });
    }
    if (link == null) {
      toast.error("Please Provide  website link", {
        position: "top-center",
      });
    }
    if (notes == null) {
      toast.error("Please Provides some notes related to Location", {
        position: "top-center",
      });
    }

    addLocation();
  };

  const addLocation = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.authtoken,
        },
        body: JSON.stringify({
          userId: user._id,
          locationName: locationName,
          address: address,
          website: link,
          notes: notes,
          locationLatLong:
            "EktNdW1icmEgQnlwYXNzIFJkLCBSYXNoaWQgQ29tcG91bmQsIEthdXNhLCBNdW1icmEsIFRoYW5lLCBNYWhhcmFzaHRyYSwgSW5kaWEiLiosChQKEgnN1dJh6L7nOxFVs4wymvWnBhIUChIJ1ZpF_W2_5zsRPl3Hicw9h8c",
        }),
      };
      console.log(requestOptions);

      fetch(
        "https://nodeserver.mydevfactory.com:1448/api/createTeamLocation",
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          console.log("location data", res);

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
    }
  };

  //     const EventSet=(setEvent)=>{
  //         // setEventType(e.target.value)
  //         localStorage.setItem("eventType",setEvent)
  //         console.log("eventtype------>",setEvent)
  //    }

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
                  onClick={() => history.push("./CreateTeam")}
                >
                  Create New Teams
                </button>

                <select
                  onChange={change}
                  value={
                    teamDropdown == "" ? dropdown[0]?.team_id : teamDropdown
                  }
                >
                  {dropdown.map((dropdown) => {
                    return (
                      <option value={dropdown.team_id}>
                        {dropdown.team_name}
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
                <div className="profile-head-name">
                  {user ? user.fname : null}
                </div>
                <div className="profile-head-img">
                  {user ? (
                    <img src={user.profile_image} alt="" />
                  ) : (
                    <img src={UserProfile} alt="" />
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
                <h2 className="page-title">Locations</h2>
              </div>

              <div className="prefarance-box" style={{ overflow: "hidden" }}>
                <div className="team-payment team-assesment">
                  <div className="prefarance-form playerinfo-form">
                    <div className="row" style={{ padding: "21px" }}>
                      <div className="col-md-6">
                        <div className="prefarance-form-list">
                          <label> Location Name</label>
                          <input
                            type="text"
                            className="input-select"
                            onChange={(e) => setLocationName(e.target.value)}
                          />
                          <span>
                            The name of the game location Example: "Wilshire
                            Park Soccer Field"
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="prefarance-form-list">
                          <label> Address</label>
                          <input
                            type="text"
                            className="input-select"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          <span>
                            The Physical address of the game location Example: "
                            NE 33rd Ave & Skidmore St, Portland OR" (It'll be
                            automatically converted into a Google Map.)
                          </span>
                        </div>
                        {/* <div className="prefarance-form-list">
                                                    <label> Address</label>
                                                <PlaceComponent />
                                                </div> */}
                      </div>
                      <div className="col-md-6">
                        <div className="prefarance-form-list">
                          <label> Link</label>
                          <input
                            type="text"
                            className="input-select"
                            onChange={(e) => setLink(e.target.value)}
                          />
                          <span>
                            The URL to the site - this could be a link to the
                            facility's home page or a link to your own map. Must
                            include http:// or https://
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="prefarance-form-list">
                          <label> Notes</label>
                          <textarea
                            type="text"
                            className="input-select"
                            onChange={(e) => setNotes(e.target.value)}
                            style={{ height: "200px" }}
                          />
                          <span>
                            Additional notes or directions to this location.
                          </span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="prefarance-form-list"
                          style={{ marginLeft: "60%" }}
                        >
                          <button
                            className="add-links"
                            onClick={history.goBack}
                          >
                            CANCEL
                          </button>
                          <button
                            className="add-links"
                            onClick={CheckValidation}
                            style={{
                              backgroundColor: "#181717",
                              marginLeft: "5px",
                            }}
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
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLocation;
