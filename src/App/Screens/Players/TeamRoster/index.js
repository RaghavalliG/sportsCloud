import React, { useState, useEffect } from 'react';
import CsvDownload from '../../../Components/Comman/CsvDownload';
import { EyeFill, ZoomIn } from 'react-bootstrap-icons';
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
import Logo from "../../../images/logo.png"
import UserProfile from "../../../images/user-profile.png"
import TeamList from "../../../images/team-list.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from '../../../Components/Footer';



import flag from "../../../images/flag.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"

import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import BigUserProfile from "../../../images/big-user-profile.png"
import Modal from "react-bootstrap/Modal";
import axios from 'axios'






function TeamRoster(props) {
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
    const [newplayerdata, setNewPlayerData] = useState([])

    // console.log( newplayerdata,"++++++++++++++++++++===")
    const [newNonPlayerData, setNewNonPlayerData] = useState([])
    const [profilePic, setProfilePic] = useState([])
    const [gender, setGender] = useState('')
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [jursey, setJursey] = useState('')
    const [position, setPosition] = useState('')
    const [contact, setContact] = useState('')
    const [phone, setPhone] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [stateData, setSateData] = useState('')
    const [zip, setZip] = useState('')
    const[timid,setTimid]=useState('')
    const [birthday, setBirthday] = useState('')
    const [memberType, setMemberType] = useState('')
    const [modeValue, setModeValue] = useState(false)
    const [uid, setUId] = useState("")
    const [id, setId] = useState("")
    const [modeValue1, setModeValue1] = useState(false)
    const [id1, setId1] = useState("")
    const [imageModal, setImageModal] = useState(false)
    const [imageId, setImageId] = useState("")
    const [image, Profile] = useState("")
    const[ditailsmodel,setDitailsmodel]= useState(false)
    const[ditails,setDitails]= useState({})
     console.log( ditails,"++++++++++++++++++++=== ditails")


    const pic = 'https://nodeserver.mydevfactory.com:1448/roster/'
    const pic1 = "https://nodeserver.mydevfactory.com:1448/profilepic/"



    // const [Nonplayer,setNonPlayer]= useState([]);

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
        updateProfile()
        teamRoster()
        playerDitails()
       



    }, []);


    const updateProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'token': user.authtoken

            }
            console.log('user', user)

            Network('api/get-user-details?user_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    // console.log(header,"header");
                    console.log("new Profile Pic----", res)
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setProfilePic(res.response_data)

                })
        }

    }



    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };


    const teamRoster = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id------>", id)
        if (user) {
            let header = {
                'token': user.authtoken

            }
            console.log('user', user)

            // Network('api/getRosterListByTeamId?teamid=' +"6480285555cf8a5024960668", 'GET', header)
            Network('api/player-list-by-team-id?team_id=' +id, 'GET', header)
                .then(async (res) => {
                    console.log("teamRoster----", res)

                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setResData(res.response_data);
                    // console.log(res.)
                    console.log("team player", res.response_data?.player)
                    console.log("non player", res.response_data?.non_player)
                    setPlayer(res.response_data.player)
                    setNewPlayerData(res.response_data?.player?.filter(data => {
                        return data._id != null
                       

                    }))
                    // setNewPlayerData(res.response_data.player)
                       

                    
                    
                    
                    // console.log( newplayerdata,"6767676769898988")
                    setNonPlayer(res.response_data.non_Player)
                    setNewNonPlayerData(res.response_data.non_player.filter(data => {
                        return data._id != null

                    }))


                })
        }
    }



    const teamSelect = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'token': user.authtoken

            }
            console.log('user', user)

            Network(
                // 'api/getAllAcceptedTeamListByPlayerId?playerId=' + "644a463b556e970345ff5be5", 
                "api/getAllAcceptedTeamListByPlayerId?playerId=" +user._id,
                // "api/getAllAcceptedTeamListByPlayerId?playerId=" +"644a463b556e970345ff5be5",
                'GET',
                 header)
                .then(async (res) => {
                    console.log("res----", res)
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }

                    setTeam(res.response_data);
                    // if(res.response_data.length!=0){
                    teamRoster(res?.response_data[0]._id);
                    // }


                })
        }
    }



    const change = (event) => {
        console.log("event+++++++++++++++++++++", event.target.value)
        setTeamDropDown(event.target.value)
        teamRoster(event.target.value);
        setPlayer([])
       
    }

    const deletePlayerData = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
      
        console.log("id------>---->---->---->--->", id)
        const a = window.confirm('Are you sure you wish to delete this Data?')
        console.log("delete click")
        if (a == true) {
            const requestOptions = {
                method: 'post',
                headers: {
                    // 'Content-Type': 'application/json',
                    // 'x-access-token': user.authtoken
                    "token":user.authtoken
                },
                body: JSON.stringify({
                    "roster_id": id
                })
            };
            fetch('https://nodeserver.mydevfactory.com:1448/api/deleteRoasterDetailsById', requestOptions)
                .then(response => response.json())
                .then((res) => {
                    console.log("delete Player  data", res)
                    if (res.response_code == 200) {
                        console.log("deleted data", res)
                        teamRoster(teamDropdown)
                    }
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }


                    // setPlayer(player.filter(data => {
                    //     return data._id != id
                    // }))
                    // setNonPlayer(nonPlayer.filter(data => {
                    //     return data._id != id
                    // }))

                })
        }

    }


    const updateModalValue = (id1, uId) => {
        setModeValue(true)
        setUId(uId)
        setId(id1)


    }
    const updateModalValue1 = (id1, uId) => {
        setModeValue1(true)
        setUId(uId)
        setId1(id1)


    }

    const handleChange = event => {
        console.log("URL.createObjectURL(event.target.files[0])---->", URL.createObjectURL(event.target.files[0]));
        Profile(event.target.files[0])
        // addShopData(event.target.files[0])

    };
    const updatePlayerData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({

                "player_id": uid,
                "email": email,
                "fname": fname,
                "lname": lname,
                "gender": gender,
                "city": city,
                "zip": zip,
                "dob": birthday,
                "state": stateData,
                "address_line_one": address1,
                "address_line_two": address2,
                "phone": phone,
                "member_type": memberType,
                "jersey_number": jursey,
                "position": position,
                "family_member": [{ "name": "jay", "email": "jayantakarmakar.brainium@gmail.com", "phone": 123453 }]

            })

        };
        fetch('https://nodeserver.mydevfactory.com:1448/api/update-player-details', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("update Player data", res)
                if (res.response_code == 200) {
                    toast.success("Edit Player data succesful")
                    setModeValue(false)
                    setModeValue1(false)
                    teamRoster(teamDropdown);

                }

                if (res.response_code == 400) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })




    }
    const imageModalOpen = (id1, uId) => {
        setImageModal(true)
        setUId(uId)
        setImageId(id1)


    }
    const updateImage = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData();
        formData.append('profile_image', image);
        formData.append('player_id', uid);
        axios('https://nodeserver.mydevfactory.com:1448/api/add-update-player-profile-image',
            {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    'x-access-token': user.authtoken

                },
                data: formData
            })
            .then((res) => {
                console.log("edit player Image", res)
                if (res.status == 200) {
                    toast.success("Edit Succecfull")
                    console.log("edit player Image", res)
                    setImageModal(false)
                    teamRoster(teamDropdown)
                }

                if (res.response_code == 400) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

    }
    const ditailsmodelvalue =(uId,id)=>{
        setDitailsmodel(true)
        setUId(uId)
        setId1(id)
        //set the  values for the  form.
        // setGender(newplayerdata[uId].playerGender);
        // setFName(newplayerdata[uId]?.firstName);
        // setLName(newplayerdata[uId]?.lastName);
        // setJursey(newplayerdata[uId]?.jerseyNumber);
        // setEmail(newplayerdata[uId]?.contactInformationEmail);
        // setPosition(newplayerdata[uId]?.position);
        // setCity(newplayerdata[uId]?.contactInformationCity);
        // setZip(newplayerdata[uId]?.contactInformationZipCode);
        // // setSateData(newplayerdata[uId]?.contactInformationState);
        // // setBirthday(newplayerdata[uId]?.playerBirthday);

        // setPhone(newplayerdata[uId]?.contactInformationPhoneNumber);
        // setMemberType(newplayerdata[uId]?.whoIsThis);
        // setTimid(newplayerdata[uId]?.teamId)
        playerDitails(id)
    }


    const playerDitails=(id)=>{
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user._id,"user idghkmh")
        axios({
          method: 'get',
        
          url:'https://nodeserver.mydevfactory.com:1448/api/getRoasterDetailsById?rosterId=' + id,
          headers: {
            "token": (user.authtoken)
            
          },
        
        })
          .then(function (res) {
            console.log(res,"978767564554343456767475784789567856756")
            setDitails(res.data.response_data)
           
            
             if(res.response_code == 200){
              setDitailsmodel(false  )
            //   teamRoster(teamDropdown)
              
              
             }
            
          })
          .catch(function (res) {
            //  console.log(res)
               
        });
      }
      let headers = [
        { label: "Firstname", key: "firstName" },
        { label: "lastname", key: "lastName" },
        { label: "email", key: "contactInformationEmail" },
        { label: "phone", key: "contactInformationPhoneNumber" },
        { label: "Gender", key: "playerGender" }
    ];

    const allPlayers = newplayerdata.concat(newNonPlayerData);
    let data = (allPlayers && allPlayers.length >0) ? allPlayers  : [];


    return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-main">
                    <SideMenuComponents />
                    <div className="dashboard-main-content">
                        <div className="dashboard-head">

                            <div className="teams-select">


                                <select value={teamDropdown}onChange={change}>
                                    <option>Select Team</option>
                                    {team?.map((team) => {
                                        console.log("676767555",team);
                                      
                                        return (
                                            <option value={team?.accept_invite_team_id}>{team?.accept_invite_team_name}</option>
                                           
                                        );
                                     
                                    })}
                                   


                                </select>

                            </div>



                            <div className="profile-head">
                                <div className="profile-head-name">{user?.fname + " " + user?.lname}</div>
                                <div className="profile-head-img">
                                    {profilePic?.profile_image == null ?
                                        <img src={BigUserProfile} alt="" /> :
                                        <img src={`${pic1}${profilePic?.profile_image}`} alt="" />
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
                            <div className="player-info-head">
                                <h2 className="page-title">Roster</h2>
                                <div className="player-info-head-right">
                                    <button className="edit-btn" style={{ width: "265px" }} onClick={() => history.push('./TeamPlayerInfo')}>Manage My Player Info</button>
                                    <button className="add-new-family" style={{ width: "324px" }} onClick={() => history.push('./TeamPlayerInfo')}>+ Add or Edit My Family Member</button>
                                    {/* <button className="edit-btn" style={{ marginLeft: "5px" }} onClick={() => history.push('./Export')}>Export</button> */}
                                    <CsvDownload data={data} headers={headers} filename={`Roster list `} />
                                </div>
                            </div>

                            {user.user_type == "manager" ? <div className="manager-player-section">
                                <h3>Manager</h3>
                                <ul >
                                    <li onClick={() => history.push('./AddPlayer')}><a href="#" style={{ color: "red" }}>+ Add Player</a></li>
                                    <li onClick={() => history.push('./ImportPlayer')}><a href="#" style={{ color: "red" }}>Import Players</a></li>
                                    <li><a href="#" style={{ color: "red" }} onClick={() => history.push('./AnotherPlayer')}>Import From Another Teams</a></li>
                                </ul>

                            </div> : ""}


                            <div className="manager-player-section">
                                <h3>Players</h3>

                                <span style={{ color: "white", position: "absolute", right: "3%" }}>Total Player {resData?.total_player}(Men:3,Women:2)</span>
                            </div>
                            <div className="prefarance-box">
                                <div className="team-payment team-assesment">
                                    <table>

                                        <tr>
                                            <th>Male/Female</th>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Jursey No</th>
                                            <th>contact Info</th>
                                            <th>Position</th>
                                            <th>Actions</th>
                                        </tr>
                                        {

                                            (newplayerdata && newplayerdata.length > 0) ?
                                                <>
                                                    {
                                                        newplayerdata?.map((player, i) => {

                                                            return (
                                                                <>
                                                                    {
                                                                        (player._id != null) ?
                                                                            <>

                                                                                <tr>

                                                                                    <td>

                                                                                        <div className="game-name">

                                                                                            {(player.playerGender) ? player.playerGender : null}
                                                                                            {/* {(player.member_id.gender)==Male ? player.member_id.gender : null} */}
                                                                                        </div>

                                                                                    </td>
                                                                                    <td onClick={() => imageModalOpen(i, player.member_id._id)}>
                                                                                        {player.member_id?.profile_image == null ?
                                                                                            <img src={UserProfile} alt="" /> :
                                                                                            <img src={`${pic1}${player.member_id?.profile_image}`} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        <span>{player.firstName}{player.lastName}</span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <span>{player.jerseyNumber}</span>
                                                                                    </td>
                                                                                    <span>{player.contactInformationAddress}</span>
                                                                                    {/* <td>{player._id?.fname}<br></br>
                                                                                        {player._id.email}

                                                                                    </td> */}
                                                                                    <td>
                                                                                    <span>{player.position}</span>
                                                                                        {/* <div className="last-row">
                                                                                            <p>{player.position}</p> 
                                                                                            <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deletePlayerData(player.member_id._id)} ><img src={Delect} /></button>
                                                                                            <button onClick={() => updateModalValue(i, player.member_id._id)}><img src={pencil} /></button>
                                                                                        </div> */}
                                                                                    </td>
                                                                                    <td>
                                                                                    <div className="last-row">
                                                                                           
                                                                                            {/* <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deletePlayerData(player._id)} ><img src={Delect} /></button> */}
                                                                                            <button onClick={() =>  ditailsmodelvalue (i, player._id)}><EyeFill style={{ color: 'white' }} /></button>
                                                                                        </div>
                                                                                    </td>

                                                                                </tr>
                                                                            </>
                                                                            : null
                                                                    }
                                                                </>
                                                            )

                                                        })
                                                    }
                                                </>
                                                : null
                                        }



                                    </table>
                                </div>
                                {modeValue ? <Modal show={modeValue} style={{ position: "absolute", top: "206px" }}>


                                    <Modal.Body>
                                        <div className="prefarance-form playerinfo-form">
                                            <h1 style={{ color: "red", paddingBottom: "20px", fontWeight: "bold" }}>Edit Player Details</h1>
                                            <div className="row">

                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Gender</h2>
                                                        <select className="input-select" onChange={(e) => setGender(e.target.value)} defaultValue={newplayerdata[id].member_id.gender}>
                                                            <option>Select</option>
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> First Name of Player</h2>
                                                        <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setFName(e.target.value)}
                                                            defaultValue={newplayerdata[id].member_id?.fname}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Last Name of Player</h2>
                                                        <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setLName(e.target.value)}
                                                            defaultValue={newplayerdata[id].member_id?.lname}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Jursey Number </h2>
                                                        <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setJursey(e.target.value)}
                                                            defaultValue={newplayerdata[id].jersey_number}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>Email</h2>
                                                        <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setEmail(e.target.value)}
                                                            defaultValue={newplayerdata[id].member_id.email}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Player Position</h2>
                                                        <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setPosition(e.target.value)}
                                                            defaultValue={newplayerdata[id].position}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  City</h2>
                                                        <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setCity(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Zip</h2>
                                                        <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setZip(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  State</h2>
                                                        <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setSateData(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Birthday</h2>
                                                        <input type="date" className="input-select" placeholder="Virtual Practice " onChange={(e) => setBirthday(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Address Line1</h2>
                                                        <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setAddress1(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Address Line 2</h2>
                                                        <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setAddress2(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Phone Number</h2>
                                                        <input type="text" className="input-select" placeholder="Virtual Practice " onChange={(e) => setPhone(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Member Type</h2>

                                                        <select className="input-select" onChange={(e) => setMemberType(e.target.value)}>
                                                            <option>Select</option>
                                                            <option>PLAYER</option>
                                                            <option>MANAGER</option>
                                                        </select>
                                                    </div>

                                                </div>



                                            </div>



                                            <button className="add-links" style={{ margin: "10px" }} onClick={() => setModeValue(false)}>Cancel</button>
                                            <button className="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={updatePlayerData}>Update</button>

                                        </div>
                                    </Modal.Body>

                                </Modal> : ""}

                                {imageModal ? <Modal show={imageModal} style={{ position: "absolute", top: "206px" }}>


                                    <Modal.Body>
                                        <div className="prefarance-form playerinfo-form">
                                            <h1 style={{ color: "red", paddingBottom: "20px", fontWeight: "bold" }}>Edit Player Details</h1>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="update-team-photo" style={{ width: "100%" }}>
                                                        Choose Image
                                                        <input type="file" name='img' onChange={(event) => handleChange(event)} />

                                                    </div>
                                                </div>
                                            </div>
                                            <button className="add-links" style={{ margin: "10px" }} onClick={() => setImageModal(false)}>Cancel</button>
                                            <button className="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={updateImage}>Update</button>

                                        </div>
                                    </Modal.Body>

                                </Modal> : ""}


                                {modeValue1 ? <Modal show={modeValue1} style={{ position: "absolute", top: "206px" }}>


                                    <Modal.Body>
                                        <div className="prefarance-form playerinfo-form">
                                            <h1 style={{ color: "red", paddingBottom: "20px", fontWeight: "bold" }}>Edit Game/Event</h1>
                                            <div className="row">

                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Gender</h2>
                                                        <select className="input-select" onChange={(e) => setGender(e.target.value)} defaultValue={newNonPlayerData[id1].member_id.gender}>
                                                            <option>Select</option>
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> First Name of Player</h2>
                                                        <input type="text" className="input-select" placeholder="enter Player First Name... " onChange={(e) => setFName(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].member_id?.fname}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Last Name of Player</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Player Last Name... " onChange={(e) => setLName(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].member_id?.lname}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Jursey Number </h2>
                                                        <input type="text" className="input-select" placeholder="Enter Jursey Number... " onChange={(e) => setJursey(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].jersey_number}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>Email</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Email Address.. " onChange={(e) => setEmail(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].member_id.email}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Player Position</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Player Position..." onChange={(e) => setPosition(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].position}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  City</h2>
                                                        <input type="text" className="input-select" placeholder="Enter City..." onChange={(e) => setCity(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Zip</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Zip Code... " onChange={(e) => setZip(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  State</h2>
                                                        <input type="text" className="input-select" placeholder="Enter State... " onChange={(e) => setSateData(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Birthday</h2>
                                                        <input type="date" className="input-select" placeholder="Select Birdthady... " onChange={(e) => setBirthday(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Address Line1</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Address Line1... " onChange={(e) => setAddress1(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Address Line 2</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Address Line 2... " onChange={(e) => setAddress2(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Phone Number</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Phone Number... " onChange={(e) => setPhone(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Member Type</h2>

                                                        <select className="input-select" onChange={(e) => setMemberType(e.target.value)}>
                                                            <option>Select</option>
                                                            <option>PLAYER</option>
                                                            <option>MANAGER</option>
                                                        </select>
                                                    </div>

                                                </div>



                                            </div>



                                            <button className="add-links" style={{ margin: "10px" }} onClick={() => setModeValue1(false)}>Cancel</button>
                                            <button className="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={updatePlayerData}>Update</button>

                                        </div>
                                    </Modal.Body>

                                </Modal> : ""}
                                {ditailsmodel ? <Modal show={ditailsmodel} style={{ position: "absolute", top: "206px" }}>
                                <Modal.Body>
                                        <div className="prefarance-form playerinfo-form">
                                            <h1 style={{ color: "red", paddingBottom: "20px", fontWeight: "bold" }}>Player Details</h1>
                                            
                                            { ditails  ?
                                           


                                                <>  
                                                
                                                <div>
                                                <p>player ID:  {ditails._id}</p>
                                                <p>player Name: {` ${ditails.firstName} ${ditails.lastName} `}</p>
                                                <p>player gendar:  {ditails.playerGender}</p>
                                                <p>Tim ID:  {ditails.teamId}</p>
                                                <p>manager ID:  {ditails.managerId}</p>
                                                <p>Email:  {ditails.contactInformationEmail}</p>
                                                <p>address:  {ditails.contactInformationAddress}</p>
                                                <p>city:  {ditails.contactInformationCity}</p>
                                                <p>state:  {ditails.contactInformationState}</p>
                                                <p>zip:  {ditails.contactInformationZipCode}</p>
                                                <p>Membaer Type:  {ditails.nonPlayer == false ? "Player":"nonplayer"}</p>
                                                <p>birth day :  {ditails.playerBirthday}</p>
                                                <p>Position:  {ditails.position}</p>
                                                <p>jursey no :  {ditails.jerseyNumber}</p>
                                                <p>phone:  {ditails.contactInformationPhoneNumber}</p>
                                                </div>
                                                <div>
                                                {/* <p>Team Name: {ditails.team_name}</p> */}
                                                </div>
                                                </>
                                             : ''  
                                            }    

                                                <button className="add-links" style={{ margin: "10px" }} onClick={() => setDitailsmodel(false)}>Close</button>
                                            </div>
                                            </Modal.Body>
                                </Modal>:""}
                                

                            </div>

                            <div className="manager-player-section">
                                <h3> Non-Players</h3>
                                {/* <ul>
                                    <li><a href="#">New</a></li>
                                    <li><a href="#">Edit</a></li>
                                    <li><a href="#">Import</a></li>
                                </ul> */}
                                <span style={{ color: "white", position: "absolute", right: "3%" }}>Total Player {resData?.total_non_players}(Men:3,Women:2)</span>
                            </div>
                            <div className="prefarance-box">
                                <div className="team-payment team-assesment">
                                    <table>
                                        <tr>
                                            <th>Male/Female</th>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Jursey No</th>
                                            <th>contact Info</th>
                                            <th>Position</th>
                                            <th>Actions</th>
                                        </tr>



                                        {(newNonPlayerData && newNonPlayerData.length > 0) ?


                                            <>
                                                {
                                                    newNonPlayerData?.map((non_Player, i) => {

                                                        return (
                                                            <>
                                                                {
                                                                    (non_Player._id != null) ?
                                                                        <>
                                                                            <tr>

                                                                                <td>

                                                                                    <div className="game-name">

                                                                                        {(non_Player.playerGender) ? non_Player.playerGender: null}
                                                                                    </div>

                                                                                </td>
                                                                                <td onClick={() => imageModalOpen(i, non_Player.member_id._id)}>
                                                                                    {non_Player.member_id?.profile_image == null ?
                                                                                        <img src={UserProfile} alt="" /> :
                                                                                        <img src={`${pic1}${non_Player.member_id?.profile_image}`} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    <span>{non_Player.firstName} {non_Player.lastName}</span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>{non_Player.jerseyNumber}</span>
                                                                                </td>
                                                                                <td>
                                                                                <span>{non_Player.contactInformationAddress}</span>
                                                                                    {/* {nonPlayer.member_id?.fname}<br></br>
                                                                                    {nonPlayer.member_id.email} */}

                                                                                </td>
                                                                                <td>
                                                                                <span>{non_Player.position}</span>
                                                                                    {/* <div className="last-row">
                                                                                        <p>{non_Player.position}</p> 
                                                                                        <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deletePlayerData(non_Player.member_id._id)} ><img src={Delect} /></button>
                                                                                        <button onClick={() => updateModalValue1(i, non_Player.member_id._id)}><img src={pencil} /></button>
                                                                                    </div> */}
                                                                                </td>
                                                                                <td>
                                                                                <div className="last-row">
                                                                                         {/* <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deletePlayerData(non_Player._id)} ><img src={Delect} /></button> */}
                                                                                        <button onClick={() => ditailsmodelvalue(i, non_Player._id)}><EyeFill style={{ color: 'white' }}/></button>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </>
                                                                        : null
                                                                }
                                                            </>
                                                        )

                                                    })
                                                }
                                            </>
                                            : null
                                        }






                                    </table>
                                  
                                </div>
                            </div>
          

                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default TeamRoster;
