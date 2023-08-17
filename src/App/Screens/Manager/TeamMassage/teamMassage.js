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
import TeamList from "../../../images/team-list.png";
import SideMenuComponents from "../../../Components/SideMenu";
import flag from "../../../images/flag.png";
import SideNav from "./sideNav";
import ManagerHeader from "../../../Components/Header/ManagerHeader";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Network } from "../../../Services/Api";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../../../Redux/Actions/auth";

const TeamMassage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [listValue, setList] = useState({
    email: false,
    alert: false,
    post: false,
  });
  const [teamDropdown, setTeamDropDown] = useState("");
  const [rosterList, setRosterList] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [allNonPlayers, setAllNonPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedNonPlayers, setSelectedNonPlayers] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    getRosterList();
  }, []);

  const getRosterList = async () => {
    const teamId = localStorage.getItem("ManagerTeamId");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      let header = {
        token: user.authtoken,
      };
      Network(
        "api/getRoasterUserDetailsByTeamId?teamId=" + teamId,
        "GET",
        header
      ).then(async (res) => {
        if (res.response_code == 400) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
        setRosterList(res.response_data);
        const playerArray = res.response_data?.filter(
          (item) => item.userType === "player"
        );
        const nonPlayerArray = res.response_data?.filter(
          (item) => item.userType === "non_player"
        );
        setAllNonPlayers(nonPlayerArray);
        setAllPlayers(playerArray);
      });
    }
  };

  const handlePlayerCheckboxChange = (event, playerId) => {
    if (event.target.checked) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    } else {
      setSelectedPlayers(selectedPlayers?.filter((id) => id !== playerId));
    }
  };

  const handleNonPlayerCheckboxChange = (event, nonPlayerId) => {
    if (event.target.checked) {
      setSelectedNonPlayers([...selectedNonPlayers, nonPlayerId]);
    } else {
      setSelectedNonPlayers(
        selectedNonPlayers?.filter((id) => id !== nonPlayerId)
      );
    }
  };

  const handleSelectAllPlayers = () => {
    const allPlayerIds = rosterList
      ?.filter((item) => item.userType === "player")
      ?.map((player) => player.user_id);
    setSelectedPlayers(allPlayerIds);
  };

  const handleSelectAllNonPlayers = () => {
    const allNonPlayerIds = rosterList
      ?.filter((item) => item.userType === "non_player")
      ?.map((nonPlayer) => nonPlayer.user_id);
    setSelectedNonPlayers(allNonPlayerIds);
  };

  const handleSelectNonePlayer = () => {
    setSelectedPlayers([]);
  };
  const handleSelectNoneNonPlayer = () => {
    setSelectedNonPlayers([]);
  };
  const change = (value) => {
    // console.log("Mess event", value);
    setTeamDropDown(value);
    // setPlayer([])
    // teamRoster(event.target.value);
  };
  console.log("dropdoe", teamDropdown);
  const handleSubjects = (event) => {
    setSubject(event.target.value);
  };
  const handleMessages = (event) => {
    setMessage(event.target.value);
  };
  const sendMails = async () => {
    // console.log("selected Non",selectedNonPlayers)
    // console.log("selected Play",selectedPlayers)
    if (selectedPlayers.length === 0 && selectedNonPlayers.length === 0) {
      toast.error("Please select recipients.");
      return;
    } else if (subject === "") {
      toast.error("Please add a subject.");
      return;
    } else if (message === "") {
      toast.error("Please write some message.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const userMail = user.email;
    const teamId = localStorage.getItem("ManagerTeamId");
    const token = user.authtoken;
    let header = {
      token: token,
    };
    const mergeRecipients = [...selectedPlayers, ...selectedNonPlayers];
    let data = {
      from_mail: userMail,
      team_id: teamId,
      to_mail: mergeRecipients,
      subject: subject,
      message: message,
    };
    var config = {
      method: "post",
      url: "https://nodeserver.mydevfactory.com:1448/api/createComposeEmail",
      headers: header,
      data: data,
    };
    await axios(config)
      .then((res) => {
        console.log("send Email----", res.data);
        if (res.data.success === true) {
        setSelectedPlayers([]);
        setSelectedNonPlayers([]);
        setSubject("");
        setMessage("");
        toast.success("Successfully Send Email", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      else{
        toast.error('Something went wrong. Please try after some time', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          })
      }
      })
      .catch((error) => {
        // setIsCategoryLoading(false)
        console.log("error", error.response.data.message);
        console.log("error", error.response.status);
        // handleError(error.response.status);
      });
  };
  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <SideMenuComponents manger="manger" />
          <div className="dashboard-main-content">
            <ManagerHeader change={change} />
            <div
              className="prefarance-box player-info"
              style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}
            >
              {/* <SideMenuComponents manger="manger" /> */}

              <SideNav name="Send Emails" />
              <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                  <div className="prefarance-tab-content">
                    <div className="prefarance-form playerinfo-form">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="prefarance-form-list">
                            <label> Subjects</label>
                            <input
                              type="text"
                              className="input-select"
                              onChange={handleSubjects}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="prefarance-form-list">
                            <label> Message</label>
                            <textarea
                              type="text"
                              className="input-select"
                              style={{ height: "210px" }}
                              onChange={handleMessages}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="row"
                        style={{
                          marginBottom: "15px",
                          paddingBottom: "28px",
                          borderBottom: "0.5px solid gray",
                        }}
                      >
                        <div className="col-md-7">
                          <div className="prefarance-form-list">
                            <p style={{ fontSize: "larger", color: "white" }}>
                              Player Recipients
                            </p>
                          </div>
                        </div>

                        <div className="col-md-2">
                          <button
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                            className="prefarance-form-list"
                            onClick={handleSelectAllPlayers}
                          >
                            <span style={{ color: "red" }}>Select All</span>
                          </button>
                        </div>
                        <div className="col-md-3">
                          <button
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                            className="prefarance-form-list"
                            onClick={handleSelectNonePlayer}
                          >
                            {/* <input
                              type="checkbox"
                              style={{ height: "15px", width: "17px" }}
                            /> */}
                            <span style={{ color: "red" }}>Select None</span>
                          </button>
                        </div>
                        {rosterList
                          ?.filter((item) => item.userType === "player")
                          .map((player) => (
                            <div className="col-md-4">
                              <div className="prefarance-form-list">
                                <input
                                  type="checkbox"
                                  checked={selectedPlayers.includes(
                                    player.user_id
                                  )}
                                  onChange={(event) =>
                                    handlePlayerCheckboxChange(
                                      event,
                                      player.user_id
                                    )
                                  }
                                  style={{ height: "15px", width: "17px" }}
                                />
                                <span>{player.fullName}</span>
                              </div>
                            </div>
                          ))}
                        {/* <div className="col-md-4">
                          <div className="prefarance-form-list">
                            <input
                              type="checkbox"
                              style={{ height: "15px", width: "17px" }}
                            />
                            <span>Asa West</span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="prefarance-form-list">
                            <input
                              type="checkbox"
                              style={{ height: "15px", width: "17px" }}
                            />
                            <span>Mikey Mcclearly</span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="prefarance-form-list">
                            <input
                              type="checkbox"
                              style={{ height: "15px", width: "17px" }}
                            />
                            <span>Karila Keishing</span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="prefarance-form-list">
                            <input
                              type="checkbox"
                              style={{ height: "15px", width: "17px" }}
                            />
                            <span>Medha Usdi</span>
                          </div>
                        </div> */}
                        <div className="col-md-4">
                          <div className="prefarance-form-list"></div>
                        </div>
                      </div>
                      <div
                        className="row"
                        style={{
                          marginBottom: "15px",
                          paddingBottom: "28px",
                          borderBottom: "0.5px solid gray",
                        }}
                      >
                        <div className="col-md-7">
                          <div className="prefarance-form-list">
                            <p style={{ fontSize: "larger", color: "white" }}>
                              Non-Player Recipients
                            </p>
                          </div>
                        </div>

                        <div className="col-md-2">
                          <button
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                            className="prefarance-form-list"
                            onClick={handleSelectAllNonPlayers}
                          >
                            {/* <input
                              type="checkbox"
                              style={{ height: "15px", width: "17px" }}
                            /> */}
                            <span style={{ color: "red" }}>Select All</span>
                          </button>
                        </div>

                        <div className="col-md-3">
                          <button
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                            className="prefarance-form-list"
                            onClick={handleSelectNoneNonPlayer}
                          >
                            {/* <input
                              type="checkbox"
                              style={{ height: "15px", width: "17px" }}
                            /> */}
                            <span style={{ color: "red" }}>Select None</span>
                          </button>
                        </div>
                        {rosterList
                          ?.filter((item) => item.userType === "non_player")
                          .map((nonPlayer) => (
                            <div className="col-md-4">
                              <div className="prefarance-form-list">
                                <input
                                  type="checkbox"
                                  checked={selectedNonPlayers.includes(
                                    nonPlayer.user_id
                                  )}
                                  onChange={(event) =>
                                    handleNonPlayerCheckboxChange(
                                      event,
                                      nonPlayer.user_id
                                    )
                                  }
                                  style={{ height: "15px", width: "17px" }}
                                />
                                <span>{nonPlayer.fullName}</span>
                              </div>
                            </div>
                          ))}
                        {/* <div className="col-md-4">
                          <div className="prefarance-form-list">
                            <input
                              type="checkbox"
                              style={{ height: "15px", width: "17px" }}
                            />
                            <span>Asa West</span>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="prefarance-form-list">
                            <input
                              type="checkbox"
                              style={{ height: "15px", width: "17px" }}
                            />
                            <span>Asa West</span>
                          </div>
                        </div> */}
                      </div>
                      <div className="row">
                        {/* <div className="col-md-12">
                          <div className="prefarance-form-list">
                            <label> File Attachments</label>
                            <div className="fileStyle">Search</div>
                            <p style={{ color: "gray" }}>
                              Maximam Size: 20mb(combined)
                            </p>
                          </div>
                        </div> */}
                        {/* <div className="col-md-12">
                          <div className="prefarance-form-list">
                            <label> Options</label>
                            <input
                              type="checkbox"
                              style={{ height: "15px", width: "17px" }}
                            />
                            <span>Send me a copy</span>
                          </div>
                        </div> */}
                        <div className="col-md-12">
                          <div
                            className="prefarance-form-list"
                            // style={{ marginLeft: "40%" }}
                          >
                            <button
                              className="add-links"
                              onClick={() => history.goBack()}
                            >
                              CANCEL
                            </button>
                            {/* <button className="add-links" style={{ margin: "10px" }}>Cancel</button> */}
                            <button
                              className="add-links"
                              style={{
                                margin: "10px",
                                backgroundColor: "#1d1b1b",
                              }}
                            >
                              Save as Draft
                            </button>
                            <button
                              onClick={sendMails}
                              style={{
                                backgroundColor: "#1d1b1b",
                                padding: "13px",
                                borderRadius: "30px",
                                margin: "10px",
                                color: "white",
                              }}
                            >
                              Send Email
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
      </div>
    </div>
  );
};

export default TeamMassage;
