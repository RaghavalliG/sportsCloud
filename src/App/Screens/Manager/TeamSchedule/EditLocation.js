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
import Modal from "react-bootstrap/Modal";

function EditLocation(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(props);

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
  const [latlong, setLatLong] = useState("");

  const [locationlist, setLocationList] = useState([]);
  const [locationId, setlocationId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
    locationList();

    // teamSchedule();
  }, []);
  const pic = "https://nodeserver.mydevfactory.com:1448/";

  const pic1 = "https://nodeserver.mydevfactory.com:1448/profilepic/";

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
      "https:/nodeserver.mydevfactory.com:1447/api/delete-assignment",
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

  //     const EventSet=(setEvent)=>{
  //         // setEventType(e.target.value)
  //         localStorage.setItem("eventType",setEvent)
  //         console.log("eventtype------>",setEvent)
  //    }

  const locationList = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        "Content-Type": "application/json",
        token: user.authtoken,
      };
      //console.log('user',user)

      Network("api/getAllLocationData", "GET", header).then(async (res) => {
        console.log("location List----", res);
        if (res.response_code == 400) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
        if (res.response_code == 200) {
          setLocationList(res.response_data);
          // res.response_data.map(location => {
          //     locationlist.push(location);
          // })
        }
        setLoading(false);
        // window.location.reload(false);
      });
    }
  };
  console.log(locationlist);
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

    editLocation();
  };

  const updateModalLocation = (location_id, id) => {
    setEditModal(true);

    // locationId = location._id;
    // setId(id1)
    // console.log(location._id);
    console.log(id);
    console.log(location_id);
    setlocationId(location_id);
    console.log(locationlist);
    setNotes(locationlist[id].notes);
    setLocationName(locationlist[id].locationName);
    setAddress(locationlist[id].address);
    setLink(locationlist[id].website);
    setLatLong(locationlist[id].locationLatLong);
    // editLocation(location._id)
  };
  const editLocation = (location_id) => {
    console.log(location_id);
    console.log(locationId);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.authtoken,
        },
        body: JSON.stringify({
          locationId: locationId,
          locationName: locationName,
          address: address,
          website: link,
          notes: notes,
          locationLatLong: latlong,
        }),
      };
      fetch(
        "https://nodeserver.mydevfactory.com:1448/api/editLocationDetailsById",
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          console.log("update location data", res);
          if (res.response_code == 200) {
            toast.success(res.response_message);
            setEditModal(false);
            locationList();
          }

          if (res.response_code == 400) {
            dispatch(logoutUser(null));
            localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }
          setEditModal(false);
        });
    }
  };

  // const updateDeletelocation = (location_id) => {
  //     setDelModal(true);
  //     setlocationId(location_id);

  // }
  const deletelocation = (location_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("id-------------->", location_id);
    const a = window.confirm("Are you sure you wish to delete this Data?");
    console.log("delete click");
    if (a == true) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.authtoken,
        },
        body: JSON.stringify({
          location_id: location_id,
        }),
      };
      fetch(
        "https://nodeserver.mydevfactory.com:1448/api/deleteLocationDetailsById",
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          console.log("delete location  data", res);
          if (res.response_code == 200) {
            console.log("deleted data", res);
            locationList();
          }
          if (res.response_code == 400) {
            dispatch(logoutUser(null));
            localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }
        });
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
                  onClick={() => history.push("./CreateTeam")}
                >
                  Create New Teams
                </button>

                <select
                  onChange={change}
                  value={teamDropdown == "" ? dropdown[0]?._id : teamDropdown}
                >
                  {dropdown.map((dropdown) => {
                    return (
                      <option value={dropdown._id}>{dropdown.team_name}</option>
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
                  {user ? `${user.fname} ${user.lname}` : null}
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
              <div className="manager-player-section">
                <h3>Manager:</h3>
                <div className="teams-select">
                  <ul>
                    <Link to={{ pathname: "/NewLocation", state: "GAME" }}>
                      <li>New Location</li>
                    </Link>
                    <Link to={{ pathname: "/NewGame", state: "GAME" }}>
                      <li>New Game</li>
                    </Link>
                    <Link to={{ pathname: "/NewEvent", state: "EVENT" }}>
                      <li>New Event</li>
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
                        <th>Location Name</th>
                        <th>Address</th>
                        <th>URL</th>
                        <th>Games/Events Scheduled at this Location</th>
                        <th>Manager</th>
                      </tr>
                      {locationlist && locationlist.length > 0
                        ? locationlist.map((location, id) => {
                            console.log();
                            return (
                              <tr>
                                <td>
                                  <span> {location.locationName}</span>
                                </td>
                                <td>
                                  <span>{location.address}</span>
                                </td>
                                <td>
                                  <span>{location.website}</span>
                                </td>
                                <td>
                                  <span>Shared Location</span>
                                </td>
                                <td>
                                  <div className="last-row">
                                    <button
                                      data-toggle="modal"
                                      data-target="#assignmentdelect"
                                      onClick={() =>
                                        deletelocation(location._id)
                                      }
                                    >
                                      <img src={Delect} />
                                    </button>{" "}
                                    <button
                                      onClick={() =>
                                        updateModalLocation(location._id, id)
                                      }
                                    >
                                      <img src={pencil} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        : "No data found"}
                    </table>
                  </div>
                </div>
              )}

              {editModal ? (
                <Modal show={editModal} size="md">
                  <Modal.Body>
                    <div className="playerinfo-form">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label> Location Name</label>
                            <input
                              type="text"
                              className="input-select"
                              defaultValue={locationName}
                              onChange={(e) => setLocationName(e.target.value)}
                            />
                            <span className="nb-txt">
                              The name of the game location Example: "Wilshire
                              Park Soccer Field"
                            </span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label> Address</label>
                            <input
                              type="text"
                              className="input-select"
                              defaultValue={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            <span className="nb-txt">
                              The Physical address of the game location Example:
                              " NE 33rd Ave & Skidmore St, Portland OR" (It'll
                              be automatically converted into a Google Map.)
                            </span>
                          </div>
                          {/* <div className="">
                                                    <label> Address</label>
                                                <PlaceComponent />
                                                </div> */}
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label> Link</label>
                            <input
                              type="text"
                              className="input-select"
                              defaultValue={link}
                              onChange={(e) => setLink(e.target.value)}
                            />
                            <span className="nb-txt">
                              The URL to the site - this could be a link to the
                              facility's home page or a link to your own map.
                              Must include http:// or https://
                            </span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label> Notes</label>
                            <textarea
                              type="text"
                              className="input-select"
                              defaultValue={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              style={{ height: "200px" }}
                            />
                            <span className="nb-txt">
                              Additional notes or directions to this location.
                            </span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="text-center">
                            <button
                              className="add-links"
                              style={{ margin: "10px" }}
                              onClick={() => setEditModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="add-links"
                              style={{
                                margin: "10px",
                                backgroundColor: "#1d1b1b",
                              }}
                              onClick={(e) => CheckValidation(e)}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <button className="add-links" style={{ margin: "10px" }} onClick={() => setEditModal(false)}>Cancel</button>
                                        <button className="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={updateImage}>Update</button> */}
                    </div>
                  </Modal.Body>
                </Modal>
              ) : (
                ""
              )}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLocation;
