import React, { useState, useEffect } from "react";
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
import tableProfile from "../../../images/table-profile.png";
import add from "../../../images/add.png";
import Delect from "../../../images/delect.png";
import pencil from "../../../images/pencil.png";
import SideMenuComponents from "../../../Components/SideMenu";
import Footer from "../../../Components/Footer";
import { logoutUser } from "../../../Redux/Actions/auth";
import { useDispatch } from "react-redux";
import { Network } from "../../../Services/Api";
import { ToastContainer, toast } from "react-toastify";
import BigUserProfile from "../../../images/big-user-profile.png";
import { Button } from "bootstrap";
import { Col, Row } from "react-bootstrap";
import { unique } from "jquery";

function AnotherPlayer(props) {
  const history = useHistory();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const dispatch = useDispatch();
  const [team, setTeam] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [profilePic, setProfilePic] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [player, setPlayer] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [teamDropdown, setTeamDropDown] = useState("");
  const [teamdroplist, setTeamDroplist] = useState([]);
  const [id, setId] = useState([]);
  const [newplayerdata, setNewPlayerData] = useState([]);
  const [newNonPlayerData, setNewNonPlayerData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [addPlayer, setaddImportPlayers] = useState([]);
  const [inputFields, setInputFields] = useState([{ roster_id: "" }]);
  var res;

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
    teamRoster();
    updateProfile();
    dropdownMenu();
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/");
  };
  const pic = "https://nodeserver.mydevfactory.com:1448/profilepic/";
  const teamSelect = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        authToken: user.authtoken,
      };
      console.log("user", user);

      Network(
        "api/getAllTeamName?teamManagerId=" + user._id,
        "GET",
        header
      ).then(async (res) => {
        console.log("teanSelect----", res);
        if (res.response_code == 400) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
        setTeam(res.response_data);
        teamSchedule(res.response_data[0]._id);
      });
    }
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
          teamId +
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
        // if (res.response_code == 4000) {
        //     dispatch(logoutUser(null))
        //     localStorage.removeItem("user");
        //     history.push("/")
        //     toast.error(res.response_message)
        // }
        //console.log("doc data----->",res.response_data.docs)
        setSchedule(res.response_data.docs);
      });
    }
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

  const teamRoster = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        token: user.authtoken,
      };
      console.log("user", user);

      Network("api/player-list-by-team-id?team_id=" + id, "GET", header).then(
        async (res) => {
          console.log("teamRoster----", res);

          if (res.response_code == 400) {
            // dispatch(logoutUser(null))
            // localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }
          console.log("team player", res.response_data.player);
          console.log("non player", res.response_data.nonplayer);
          setPlayer(res.response_data.player);
          setNewPlayerData(
            res.response_data.player.filter((data) => {
              return data.member_id != null;
            })
          );
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

        teamRoster(res.response_data[0].team_id);
      });
    }
  };

  function removeDuplicates(players) {
    // Create an array of objects
    // books = [
    //     { title: "C++", author: "Bjarne" },
    //     { title: "Java", author: "James" },
    //     { title: "Python", author: "Guido" },
    //     { title: "Java", author: "James" },
    // ];

    // Declare a new array
    let newArray = [];

    // Declare an empty object
    let uniqueObject = {};

    // Loop for the array elements
    for (let i in players) {
      // Extract the title
      let roster_id = players[i]["roster_id"];

      // Use the title as the index
      uniqueObject[roster_id] = players[i];
      // newArray.push(uniqueObject)
    }

    // Loop to push unique object into array
    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }

    // Display the unique objects
    console.log(newArray);
    return newArray;
  }

  const PlayerImportData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(addPlayer);
    let data = [...inputFields];
    for (let i in addPlayer) {
      // console.log(event);
      let dat = { roster_id: "" };
      dat.roster_id = addPlayer[i]["_id"];
      data.push(dat);
      setInputFields(data);
      console.log(data);
    }

    const palyerimport_list = removeDuplicates(data);
    console.log(palyerimport_list);
    let players = [];
    for (let i in palyerimport_list) {
      if (palyerimport_list[i].roster_id == "") {
        palyerimport_list.splice(i, 1);
      }
    }
    // palyerimport_list.map((player,index)=>{
    // players['roster_id'] = player._id;
    //    players =  [...players, player._id]
    // player.roster_id == '' ? player.splice(index,1) : ''

    // })
    // console.log(players);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: user.authtoken,
      },
      body: JSON.stringify({
        // "player_id": id,
        // "manager_id": user._id,
        // 'team_id': teamDropdown,
        fromTeamId: teamdroplist,
        toTeamId: teamDropdown ? teamDropdown : dropdown[0].team_id,
        data: palyerimport_list,
      }),
    };
    fetch(
      "https://nodeserver.mydevfactory.com:1448/api/createRoasterFromAnotherTeam",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("Import  Data", res);
        if (res.response_code == 400) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
      });
  };

  const change = (event) => {
    console.log("event", event.target.value);
    setTeamDropDown(event.target.value);
    teamRoster(event.target.value);
  };
  const teamchange = (event) => {
    console.log("event", event.target.value);
    setTeamDroplist(event.target.value);
    teamRoster(event.target.value);
  };

  const removePlayer = (pid) => {
    setId(
      id.filter((data) => {
        return data != pid;
      })
    );
    // console.log(id);
  };

  // const handleCheck = (event) => {
  //     var updatedList = [...checked];
  //     if (event.target.checked) {
  //       updatedList = [...checked, event.target.value];
  //     } else {
  //       updatedList.splice(checked.indexOf(event.target.value), 1);
  //     }
  //     setChecked(updatedList);
  //   };
  //   var id = checked.length
  //   ? checked.reduce((total, item) => {
  //       return total + ", " + item;
  //     })
  //   : "";

  const newPlayerlist = (player) => {
    console.log("new", teamdroplist);
    console.log("old", teamDropdown);
    console.log(player);
  };
  const handleFormChange = (event) => {
    let data = [...inputFields];
    console.log(event);
    let dat = [{ roster_id: "" }];
    dat[event.target.name] = event.target.value;
    data.push(dat);
    setInputFields(data);
    console.log(data);
    // console.log(data.length);
    // // const obj = event.target.name : event.target.value;
    // // console.log(data.push(obj))
    // console.log(data);
    // getAssignments(data);
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
                  {dropdown.map((dropdown) => {
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
                      >{`${user?.fname}${user?.lname}`}</a>
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
                  {profilePic.fname + " " + profilePic.lname}
                </div>
                <div className="profile-head-img">
                  {profilePic.profile_image == null ? (
                    <img src={BigUserProfile} alt="" />
                  ) : (
                    <img src={`${profilePic.profile_image}`} alt="" />
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
            <div className="prefarance-page">
              <div className="page-header">
                <h2 className="page-title">Import Players From Another Team</h2>
              </div>
              <div className="prefarance-box playerOther">
                <p>
                  Select the player below from your other terms that you'd like
                  to add th this roster.
                </p>

                <div className="px-4">
                  <Row>
                    <Col md={4} sm={12}>
                      <select
                        className="form-control ml-0"
                        onChange={teamchange}
                      >
                        {dropdown.map((dropdown) => {
                          return (
                            <option value={dropdown.team_id}>
                              {dropdown.team_name}
                            </option>
                          );
                        })}
                      </select>
                    </Col>
                  </Row>
                </div>
                <div className="playerLists">
                  <div className="playerLstLft">
                    <h4>Players From Other Teams</h4>
                    {newplayerdata.map((player) => {
                      return (
                        <div className="playerRow">
                          <span>
                            {player.member_id.profile_image == null ? (
                              <img src={UserProfile} alt="" />
                            ) : (
                              <img
                                src={`${pic}${player.member_id.profile_image}`}
                                alt=""
                                style={{ height: "70px", width: "70px" }}
                              />
                            )}
                            <span>
                              {player.firstName}
                              {player.lastName}
                            </span>
                          </span>
                          <span>
                            <input
                              id={player._id}
                              value={`${player.firstName} ${player.lastName}`}
                              name="roster_id"
                              type="checkbox"
                              style={{ width: "20px", height: "20px" }}
                              onClick={() => {
                                setId([...id, player._id]);
                              }}
                              // onChange={event => handleFormChange(event)}
                              // onChange={setId([...id, player._id])}
                            />
                          </span>
                        </div>
                      );
                    })}
                    {/* <div className="playerRow">
                                            <span>
                                                <img src={user.profile_image} alt="" />
                                                <span>8U Brown</span>
                                            </span>
                                            <span className="playerColor pcB"></span>
                                        </div> */}
                  </div>
                  <div className="playerLstRgt">
                    <h4>Player select for import </h4>
                    {/* <div>
  {`Items checked are: ${id}`}
</div> */}
                    {newplayerdata.map((player) => {
                      id?.map((id) => {
                        return player._id == id ? addPlayer.push(player) : "";
                      });
                    })}
                    {newplayerdata.map((player) => {
                      return (
                        <div>
                          {
                            //    id.length>1 ?
                            //     res = [...new Set(id)]:
                            id?.map((id) => {
                              return (
                                <div>
                                  {player._id == id ? (
                                    <div className="playerRow">
                                      <span>
                                        <input
                                          type="checkbox"
                                          checked
                                          onClick={() =>
                                            removePlayer(player._id)
                                          }
                                        />
                                      </span>
                                      <span>
                                        {player.member_id.profile_image ==
                                        null ? (
                                          <img src={UserProfile} alt="" />
                                        ) : (
                                          <img
                                            src={`${pic}${player.member_id.profile_image}`}
                                            alt=""
                                            style={{
                                              height: "70px",
                                              width: "70px",
                                            }}
                                          />
                                        )}
                                        <span>
                                          {player.firstName}
                                          {player.lastName}
                                        </span>
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })
                          }
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "1rem",
                  }}
                >
                  <button
                    type="btn"
                    onClick={() => history.goBack()}
                    className="btn btn-deflt ml-2"
                    style={{ background: "#8A8A8A" }}
                  >
                    Back
                  </button>
                  <button
                    className="btn invite_player_btn"
                    onClick={PlayerImportData}
                  >
                    {" "}
                    Invite Players
                  </button>
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

export default AnotherPlayer;
