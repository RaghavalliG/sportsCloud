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
import BigUserProfile from "../../../images/big-user-profile.png";
import { logoutUser } from "../../../Redux/Actions/auth";
import Invoice from "../../../images/invoice.png";
import Cloudy from "../../../images/cloudy-small.png";
import teamList from "../../../images/team-list.png";
import Calender from "../../../images/calender.png";
import lineBar from "../../../images/line-bar.png";
import saveTravel from "../../../images/save-travel.png";
import bullk from "../../../images/bullk.png";
import SideMenuComponents from "../../../Components/SideMenu";
import Footer from "../../../Components/Footer";
import { useDispatch } from "react-redux";
import { Network } from "../../../Services/Api";
import { ToastContainer, toast } from "react-toastify";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import "../../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";

function HomeComponents(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [player, setPlayer] = useState([]);
  const [team, setTeam] = useState([]);
  const [degree, setDegree] = useState([]);
  const [newplayerdata, setNewPlayerData] = useState([]);
  const [image, Profile] = useState(BigUserProfile);

  // const [loading,setLoading]= useState(false)
  const [profilePic, setProfilePic] = useState([]);
  const[invitationlist,setInvitationlist]= useState([])
  const [modelValue, setModelValue] = useState(false)
  const [invite_id, setInviteId] = useState('')
  console.log("team ka value====>+++++++++++++++++++++++=", team);
  console.log(" typeof team====>", typeof team);
  

  const pic1 = "https://nodeserver.mydevfactory.com:1447/profilepic/";

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
    weather();
    invitationList()
  
  }, []);
  const pic = "https://nodeserver.mydevfactory.com:1448/";

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/");
  };
  const teamSelect = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        token: user.authtoken,
      };
      console.log("user+++++++++++", user._id
      );

      Network(
        "api/player-joined-team-list?player_id=" + user._id,
        "GET",
        header
      ).then(async (res) => {
        console.log("res----_______________+++++++++++++++()()", res);
        if (res.response_code == 400) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }

        setTeam(res.response_data);
      });

      
    }
  };

  const teamRoster = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        authTokentoken: user.authtoken,
      };
      console.log("user", user);

      Network(
        "api/player-list-by-team-id?team_id=" + "60a51abfae9b3244cc9d1eae",
        "GET",
        header
      ).then(async (res) => {
        console.log("teamRoster----", res);
        if (res.response_code == 400) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
        console.log("team player", res.response_data.PLAYER);
        setPlayer(res.response_data.PLAYER);
        setNewPlayerData(
          res.response_data.PLAYER.filter((data) => {
            return data.member_id != null;
          })
        );
      });
    }
  };

  const handleChange = (event) => {
    console.log(
      "URL.createObjectURL(event.target.files[0])---->",
      URL.createObjectURL(event.target.files[0])
    );
    Profile(event.target.files[0]);
    uploadImage(event.target.files[0]);
  };
  const updateProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        authToken: user.authtoken,
      };
      console.log("user", user);

      Network("api/get-user-details?user_id=" + user._id, "GET", header).then(
        async (res) => {
          console.log("new Profile Pic----", res);
          if (res.response_code == 4000) {
            dispatch(logoutUser(null));
            localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }
          setProfilePic(res.response_data);
        }
      );
    }
  };

  const uploadImage = (value) => {
    const formData = new FormData();
    formData.append("profile_image", value);
    console.log("image--->", value);

    axios(
      "https://nodeserver.mydevfactory.com:1447/api/update-user-profile-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": user.authtoken,
        },
        data: formData,
      }
    ).then((res) => {
      console.log("edit user Image", res);
      if (res.status == 200) {
        toast.success("Profile Picture Change  Succecfull");
        console.log("edit Image", res);
        updateProfile();
      }

      if (res.response_code == 4000) {
        dispatch(logoutUser(null));
        localStorage.removeItem("user");
        history.push("/");
        toast.error(res.response_message);
      }
    });
  };

  const weather = () => {
    fetch(
      // 'http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=2986831fc21dc86b9c0a3f789cec2721'
      "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=matric&appid=2986831fc21dc86b9c0a3f789cec2721"
    ).then((res) => {
      res.json().then((res) => {
        console.log("weather", res.daily);
        if (res.daily != null) {
          setDegree(res.daily);
        }
      });
    });
  };
    // console.log(user._id,"user.authtoken")
  const invitationList=()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user._id,"user idghkmh")
    axios({
      method: 'get',
      // url: 'https://nodeserver.mydevfactory.com:1448/api/getInvitationByPlayerId?PlayerId='+"647f1c8456ee340813ac0e49",
      url:`https://nodeserver.mydevfactory.com:1448/api/getInvitationByPlayerId?playerId=${user._id}`,
      headers: {
        "token": (user.authtoken)
        
      },
    
    })
      .then(function (res) {
         console.log(res,"9000000000000000000000000000000000009090")
        //  setInvitationlist(res.data.response_data.filter(data=>{
        //   return data.invite_id !=null;
        //  }));
         res.data.response_data.map((invitation)=>{
          invitationlist.push(invitation);
         })
        
         console.log(invitationlist,"dudaessdnjkndrftnryue")

         if(invitationlist && invitationlist.length>0){
          setModelValue(true)
         }
      })
      .catch(function (res) {
         console.log(res)
           
    });
  }
 
// const handleclick=(invite_id,type)=>{
//   const user = JSON.parse(localStorage.getItem('user'));
//   console.log(invite_id);
// //  const headers = {
// //     "token": (user.authtoken)
    
// //   }
// //  const body = {
// //     "invite_id": invite_id,
// //     "type": type === 'accept' ? 'accepted' : 'rejected'
// //     // "type":"ACCEPT"
// //   }
  
  
//   axios({
//     headers : {
//       "token": (user.authtoken)
      
//     },
    
//     method: 'post',
//     url: 'http://nodeserver.mydevfactory.com:1448/api/acceptOrRejectInviatationByInviteId',

//     data:  {
//       "invite_id": invite_id,
//       "type": type === 'accept' ? 'accepted' : 'rejected'
//       // "type":"ACCEPT"
//     }
//   })
 
//   .then((res)=>{
//     console.log(res,"ghghghghghghhghjgghggghfgg")

//   })
//   .catch((error)=>{

//   })
  
// }
const handleClick =(invite_id,type)=>{
  const user = JSON.parse(localStorage.getItem('user'));
  const api ="https://nodeserver.mydevfactory.com:1448/api/acceptOrRejectInviatationByInviteId"
   const headers = {
          "token": (user.authtoken)
          
        }
   const requestbody ={
    "invite_id": invite_id,
      "type": type === 'accept' ? 'ACCEPT' : 'REJECT'
   }      
  axios
  .post(api,requestbody,{headers:headers})
  .then((res)=>{
    console.log(res,"ghghghghghghhghjgghggghfgg")
    if(res.data.success==true){
      toast.success(res.data.response_message)
    }else{
      toast.error(res.data.response_message)
    }
  })
  .catch((err)=>{
    toast.error("an error occurred")

  })
  console.log(requestbody)
}

  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <SideMenuComponents />
          <div className="dashboard-main-content">
            <div className="dashboard-head">
              <div className="teams-select">
                <select >
                  {team?.map((team) => (
                    <>
                      <option>{team?.team_id?.team_name}</option>
                      {/* {console.log(item,"item====++++++")} */}
                    </>
                  ))}
                </select>
              </div>
              {/* <!--
                   <div className="create-teams">
                <button><img src="images/add-team.png" alt="" /> Create New Team</button>
              </div>
              --> */}
              <div className="profile-head">
                {profilePic?.fname ? (
                  <div className="profile-head-name">
                    {profilePic?.fname + " " + profilePic?.lname}
                  </div>
                ) : (
                  <div className="profile-head-name">{user?.fname} {user?.lname}</div>
                )}

                <div className="profile-head-img">
                  {profilePic?.profile_image == null ? (
                    <img src={BigUserProfile} alt="" />
                  ) : (
                    <img src={`${pic1}${profilePic?.profile_image}`} alt="" />
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
            <div className="dashboard-top-content">
              <div className="dashboard-top-content-left">
                <div className="dashboard-top-content-left-top">
                  <div className="team-profile">
                    <div className="team-profile-img">
                      {profilePic?.profile_image == null ? (
                        <img src={BigUserProfile} alt="" />
                      ) : (
                        <img
                          src={`${pic1}${profilePic?.profile_image}`}
                          alt=""
                        />
                      )}
                    </div>
                    {profilePic?.fname ? (
                      <div className="team-profile-name">
                        {profilePic?.fname + " " + profilePic?.lname}
                      </div>
                    ) : (
                      <div className="team-profile-name">{user?.fname
                      }  {user?.lname}</div>
                    )}

                    <div className="update-team-photo">
                      Update Player Photo
                      <input
                        type="file"
                        onChange={(event) => handleChange(event)}
                      />
                    </div>
                  </div>
                  {modelValue ? <Modal show={modelValue} >


                                    <Modal.Body>
                  
                  {/* // <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> */}
                  
                  
                  
                      <div class="modal-content">
                        <div class="modal-header">
                        <h4 class="modal-title">Accept Or Reject Invitations</h4>
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                          
                        </div>
                        <div class="modal-body">
                          {/* <p>{(invitationlist)?
                          
                          <>
                          <h3>TeamName:</h3> 
                          <h3>invite_team_manager_name:</h3> 
                          
                          
                          </>
                          :null
                            }</p> */}
                            <h2>Invitation List</h2>
        {invitationlist.map((invitation) => (
          <div key={invitation.invite_id}>
            <div>
            <p>Team Name: {invitation.invite_team_name}</p>
            </div>
            <div>
            <p>Team Manager: {invitation.invite_team_manager_name}</p>
            </div>
            <div>
            <button onClick={() => handleClick(invitation.invite_id, 'accept')}>Accept</button>
             <button onClick={() =>  handleClick(invitation.invite_id, 'reject')}>Reject</button>
              {/* <button  value='reject'onClick={() => {setInviteId(invitation.invite_id); handleclick()}}>Reject</button>
              <button  value='accept' onClick={() => {setInviteId(invitation.invite_id); handleclick()}}>Accept</button> */}
            </div>
          </div>
        ))}
                            
                        </div>
                        {/* <div class="modal-actions">
                          <button type="button" class="btn btn-default" >Accept</button>
                          <button type="button" class="btn btn-default" >reject</button>
                        </div> */}
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                  
                  
                  
                  </Modal.Body>

</Modal> : ""}

                  <div className="invoice-due">
                    <div className="ionice-due-inner">
                      <h2>Invoices Due</h2>
                      <div className="invoice-icon">
                        <img src={Invoice} alt="" />
                      </div>

                      <p>No invoices currently due.</p>
                      <span>Thank you for being awesome!</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-top-content-left-bottom">
                  <div className="dublin-weather">
                    <h2>Local Weather</h2>
                    {degree.length == 0 ? (
                      <div>
                        <div className="dublin-weather-bottom">
                          <div className="dublin-weather-bottom-boxes">
                            <h3>Today</h3>
                            <img src={Cloudy} alt="" />

                            <div className="active-degree">
                              <p>34˚/30˚</p>
                            </div>
                          </div>
                          <div className="dublin-weather-bottom-boxes">
                            <h3>Sat</h3>
                            <img src={Cloudy} alt="" />
                            <p>34˚/30˚</p>
                          </div>
                          <div className="dublin-weather-bottom-boxes">
                            <h3>Sun</h3>
                            <img src={Cloudy} alt="" />
                            <p>34˚/30˚</p>
                          </div>
                          <div className="dublin-weather-bottom-boxes">
                            <h3>Mon</h3>
                            <img src={Cloudy} alt="" />
                            <p>34˚/30˚</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="dublin-weather-bottom">
                          <div className="dublin-weather-bottom-boxes">
                            <h3>Today</h3>
                            <img src={Cloudy} alt="" />

                            <div className="active-degree">
                              <p>
                                {degree[0].temp.max}˚/{degree[0].temp.min}˚
                              </p>
                            </div>
                          </div>
                          <div className="dublin-weather-bottom-boxes">
                            <h3>Sat</h3>
                            <img src={Cloudy} alt="" />
                            <p>
                              {degree[1].temp.max}˚/{degree[1].temp.min}˚
                            </p>
                          </div>
                          <div className="dublin-weather-bottom-boxes">
                            <h3>Sun</h3>
                            <img src={Cloudy} alt="" />
                            <p>
                              {degree[2].temp.max}˚/{degree[2].temp.min}˚
                            </p>
                          </div>
                          <div className="dublin-weather-bottom-boxes">
                            <h3>Mon</h3>
                            <img src={Cloudy} alt="" />
                            <p>
                              {degree[3].temp.max}˚/{degree[3].temp.min}˚
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="dashboard-top-content-right">
                <div className="team-list-head">
                  <h2>Team Roster</h2>
                  <a href="#">View All</a>
                </div>
                <div className="team-list-section">
                  {newplayerdata?.map((player) => {
                    return (
                      <div className="team-list-box">
                        <div className="team-list-box-img">
                          {player.member_id?.profile_image == null ? (
                            <img src={teamList} alt="" />
                          ) : (
                            <img
                              src={`${pic1}${player.member_id?.profile_image}`}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="team-list-box-text">
                          <h4>
                            {player.member_id?.fname} {player.member_id?.lname}
                          </h4>
                          <h5>{player.member_type}</h5>
                          <a href="#">{player.position}</a>
                        </div>
                      </div>
                    );
                  })}
                  {/* <div className="team-list-box">
                    <div className="team-list-box-img">
                      <img src={teamList} alt="" />
                    </div>
                    <div className="team-list-box-text">
                      <h4>Boston Nets</h4>
                      <h5>Tab D’souza  <span>Manager</span></h5>
                      <a href="#">Go to Users Details</a>
                    </div>
                  </div>
                  <div className="team-list-box">
                    <div className="team-list-box-img">
                      <img src={teamList} alt="" />
                    </div>
                    <div className="team-list-box-text">
                      <h4>Brooklyn Nets</h4>
                      <h5>Tab D’souza  <span>Player</span></h5>
                      <a href="#">Go to Users Details</a>
                    </div>
                  </div>
                  <div className="team-list-box">
                    <div className="team-list-box-img">
                      <img src={teamList} alt="" />
                    </div>
                    <div className="team-list-box-text">
                      <h4>Golden State Warriors</h4>
                      <h5>Tab D’souza  <span>Administrative</span></h5>
                      <a href="#">Go to Users Details</a>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="player-schedule-section">
              <div className="record-standing-box">
                <div className="record-standing-head">Player Status</div>
                <div className="record-standing-box-inner">
                  <div className="standing-table">
                    <table>
                      <tr>
                        <th>Team</th>
                        <th>2 Pointers</th>
                        <th>3 Pointers</th>
                        <th>Free Throws</th>
                      </tr>
                      <tr>
                        <td>Dubcity Blue</td>
                        <td>8</td>
                        <td>5</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Dubcity Blue</td>
                        <td>8</td>
                        <td>5</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Dubcity Blue</td>
                        <td>8</td>
                        <td>5</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Dubcity Blue</td>
                        <td>8</td>
                        <td>5</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Dubcity Blue</td>
                        <td>8</td>
                        <td>5</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Dubcity Blue</td>
                        <td>8</td>
                        <td>5</td>
                        <td>0</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <div className="dashboard-schedule-section">
                <div className="dashboard-schedule-head">
                  <h2>Schedule</h2>
                  <a href="#">View Full Schedule</a>
                </div>
                <div className="dashboard-schedule-main-box">
                  <div className="dashboard-schedule-main-box-option">
                    <label className="options-radio">
                      Game
                      <input type="radio" name="radio" />
                      <span className="checkmark"></span>
                    </label>

                    <label className="options-radio">
                      Event
                      <input type="radio" name="radio" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  {/* <div className="dashboard-schedule-game-event">
                    <div className="dashboard-schedule-game-event-calender">
                      <img src={Calender} alt="" />
                    </div>

                  </div> */}
                  <CalendarComponent />
                </div>
              </div>
            </div>

            <div className="record-save-section">
              <div className="record-save-box">
                <div className="record-standing-head">Record</div>
                <div className="record-save-box-inner">
                  <div className="record-main-top">
                    <button>Last Game</button>
                    <h4>vs. HuskiesTS Grey</h4>
                    <span>Sat, Mar 14, 10:15 AM</span>
                  </div>
                  <div className="record-line-bar">
                    <img src={lineBar} alt="" />
                  </div>
                  <div className="enter-result">
                    <button className="enter-result-btn">Enter Result</button>
                  </div>
                </div>
              </div>
              <div className="save-travel">
                <div className="record-standing-head">Save on Travel</div>
                <div className="record-save-box-inner">
                  <div className="save-on-travel">
                    <div className="save-on-travel-img">
                      <img src={saveTravel} alt="" />
                    </div>
                    <h4>TeamSnap for Clubs & Leagues</h4>
                    <p>
                      If TeamSnap has joined up with HotelPlanner to provide
                      exclusive hotel discounts to TeamSnap users. Save on your
                      next away game, get group discounts and save on personal
                      travel tool!
                    </p>
                    <a href="#">Browse Travel Deals</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="myteam-teamsnap-section">
              <div className="record-save-box">
                <div className="record-standing-head">My Teams</div>
                <div className="myteam-list-section">
                  {team?.map((team) => {
                    console.log("team ----", team);
                    return (
                      <div className="team-list-box" key={team.id}>
                        <div className="team-list-box-img">
                          {team.team_id.image == null ? (
                            <img src={UserProfile} alt="" />
                          ) : (
                            <img src={`${pic}${team?.team_id?.image}`} alt="" />
                          )}
                        </div>
                        <div className="team-list-box-text">
                          <h4>{team?.team_id?.team_name}</h4>
                          {/* <div className="my-team-details">
                        <div className="name">John Doe</div>
                        <div className="category">Player</div>
                        <div className="season">Spring Season</div>
                      </div> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="teamsnap-section">
                <div className="teamsnap-section-head">
                  <h2>The TeamSnap Blog</h2>
                  <a href="#">View All</a>
                </div>
                <div className="teamsnap-section-main">
                  <div className="teamsnap-list-box">
                    <p>You Can Help Save Youth Sports in 30 Seconds.</p>
                    <span>May 7, 2021</span>
                  </div>
                  <div className="teamsnap-list-box">
                    <p>You Can Help Save Youth Sports in 30 Seconds.</p>
                    <span>May 7, 2021</span>
                  </div>
                  <div className="teamsnap-list-box">
                    <p>You Can Help Save Youth Sports in 30 Seconds.</p>
                    <span>May 7, 2021</span>
                  </div>
                  <div className="teamsnap-list-box">
                    <p>You Can Help Save Youth Sports in 30 Seconds.</p>
                    <span>May 7, 2021</span>
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

export default HomeComponents;
