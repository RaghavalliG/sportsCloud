import React, { useState, useEffect } from 'react';
import CsvDownload from '../../../Components/Comman/CsvDownload';
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
import Modal from "react-bootstrap/Modal";
import axios from 'axios'
import BigUserProfile from "../../../images/big-user-profile.png"






function ManagerRoster(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [profilePic, setProfilePic] = useState([])
    const [player, setPlayer] = useState([]);
    const [resData, setResData] = useState({})
    const [nonPlayer, setNonPlayer] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    const [modeValue, setModeValue] = useState(false)
    const [uid, setUId] = useState("")
    const [id, setId] = useState("")
    const [modeValue1, setModeValue1] = useState(false)
    const [id1, setId1] = useState("")
    const [imageModal, setImageModal] = useState(false)
    const [imageId, setImageId] = useState("")
    const [image, Profile] = useState("")
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
    const [birthday, setBirthday] = useState('')
    const [memberType, setMemberType] = useState('')
    const [newplayerdata, setNewPlayerData] = useState([])
    const [newNonPlayerData, setNewNonPlayerData] = useState([])
    const [male, setMale] = useState(0)
    const [female, setFemale] = useState(0)






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
        // teamRoster();
        dropdownMenu();
        setTeamDropDown()
        updateProfile()


    }, []);
    
    const pic = 'https://nodeserver.mydevfactory.com:1448/'

    const pic1 = 'https://nodeserver.mydevfactory.com:1448/profilepic/'

    const handleLogout = () => {
        
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };


    const updateProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'token': user.authtoken,

            }
            console.log('user', user)

            Network('api/get-user-details?user_id=' + user._id, 'get', header)
                .then(async (res) => {
                    console.log("new Profile Pic----", res)
                    setProfilePic(res.response_data)

                })
        }

    }

    const dropdownMenu = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        if (user) {
            let header = {
                'token': user.authtoken,

            }
            // console.log('user',header)

            Network('api/getAllTeamName?teamManagerId=' + user._id, 'get', header)
                .then(async (res) => {
                    console.log("dropdown----", res)
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setDropdown(res.response_data);

                    teamRoster(res.response_data[0].team_id);





                })
        }

    }





    const change = (event) => {
        console.log("event", event)
        console.log("event", event.target.name)
        console.log("event", event.target.id)
        console.log("event", event.target.key)
        setTeamDropDown(event.target.value)
        setPlayer([])
        teamRoster(event.target.value);

    }

    console.log("player-------->", player)
    const teamRoster = (id) => {
        console.log("team roster id", id)   
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'token': user.authtoken,

            }
            console.log('user', user)

            Network('api/player-list-by-team-id?team_id=' + id, 'GET', header)
                .then(async (res) => {
                    console.log("teamRoster----", res)

                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setResData(res.response_data);
                    setPlayer(res.response_data.player)
                    setNewPlayerData(res.response_data.player.filter(data => {
                        return data._id != null

                    }))
                    setNonPlayer(res.response_data.non_player)
                    setNewNonPlayerData(res.response_data.non_player.filter(data => {
                        return data._id != null

                    }))
                    // history.goBack();




                })
        }
    }




    const deletePlayerData = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id-------------->", id)
        const a = window.confirm('Are you sure you wish to delete this Data?')
        console.log("delete click")
        if (a == true) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.authtoken
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


                    setPlayer(player.filter(data => {
                        return data._id != id
                    }))
                    setNonPlayer(nonPlayer.filter(data => {
                        return data._id != id
                    }))

                })
        }

    }


    const updateModalValue = (id1, uId) => {
        setModeValue(true)
        setUId(uId)
        setId(id1)
        console.log(id1);
        //set the initial values for the edit form.
        setGender(newplayerdata[id1].playerGender);
        setFName(newplayerdata[id1]?.firstName);
        setLName(newplayerdata[id1]?.lastName);
        setJursey(newplayerdata[id1]?.jerseyNumber);
        setEmail(newplayerdata[id1]?.contactInformationEmail);
        setPosition(newplayerdata[id1]?.position);
        setCity(newplayerdata[id1]?.contactInformationCity);
        setZip(newplayerdata[id1]?.contactInformationZipCode);
        setSateData(newplayerdata[id1]?.contactInformationState);
        setBirthday(newplayerdata[id1]?.playerBirthday);

        setPhone(newplayerdata[id1]?.contactInformationPhoneNumber);
        setMemberType(newplayerdata[id1]?.whoIsThis);
        console.log(id1);
        console.log(newplayerdata[id1].playerGender);



    }
    const updateModalValue1 = (id1, uId) => {
        setModeValue1(true)
        setUId(uId)
        setId1(id1)
        //set the initial values for the edit form.
        setGender(newplayerdata[id1]?.playerGender);
        setFName(newplayerdata[id1]?.firstName);
        setLName(newplayerdata[id1]?.lastName);
        setJursey(newplayerdata[id1]?.jerseyNumber);
        setEmail(newplayerdata[id1]?.contactInformationEmail);
        setPosition(newplayerdata[id1]?.position);
        setCity(newplayerdata[id1]?.contactInformationCity);
        setZip(newplayerdata[id1]?.contactInformationZipCode);
        setSateData(newplayerdata[id1]?.contactInformationState);
        setBirthday(newplayerdata[id1]?.playerBirthday);
        setPhone(newplayerdata[id1]?.contactInformationPhoneNumber);
        setMemberType(newplayerdata[id1]?.whoIsThis);


    }

    const handleChange = event => {
        console.log("URL.createObjectURL(event.target.files[0])---->", URL.createObjectURL(event.target.files[0]));
        Profile(event.target.files[0])
        // addShopData(event.target.files[0])

    };
    const updatePlayerData = (e) => {
        console.log(memberType);
        console.log(memberType == 'player');
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': user.authtoken
            },
            body: JSON.stringify({
                "rosterId" : uid,
                "firstName": fname,
                "lastName": lname,
                "contactInformationFirstName": "",
                "contactInformationLastName": "",
                "contactInformationEmail": email,
                "contactInformationPhoneNumber": phone,
                "contactInformationAddress": "",
                "contactInformationCity": city,
                "contactInformationState": stateData,
                "contactInformationZipCode": zip,
                "playerBirthday": birthday,
                "playerGender": gender,
                "jerseyNumber": jursey,
                "position": position,
                "managerAccess": (memberType == 'player') ? '' : true,
                "nonPlayer": (memberType == 'player') ? '' : true


            })

        };
        fetch('https://nodeserver.mydevfactory.com:1448/api/editRoasterdetailsById', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("update Player data", res)
                if (res.response_code == 200) {
                    toast.success("Edit Player data succesful")
                    setModeValue(false)
                    setModeValue1(false)
                    // teamRoster(teamDropdown);

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
                    'token': user.authtoken

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
    console.log("pic1", pic1)

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
                    <SideMenuComponents manger="manger" />
                    <div className="dashboard-main-content">
                        <div className="dashboard-head">
                            <div className="teams-select">
                                <button className="create-new-team" onClick={() => {
                                    history.push("/CreateTeam")
                                }}>Create New Teams</button>
                                <select onChange={change} value={teamDropdown == "" ? dropdown[0]?.team_id : teamDropdown} >
                                    {dropdown?.map((dropdown) => {
                                        return (
                                            <option key={dropdown.team_id} id={dropdown.team_id} name={dropdown.team_name} value={dropdown.team_id}>{dropdown.team_name}</option>
                                        )
                                    })}
                                </select>
                                <div className="dropBtn">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "#2C2C2C", border: "none" }}>
                                        ACCOUNT
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ backgroundColor: "#484848", listStyle: "none", margin: "14px" }}>
                                        <li className="dropdown-item" >{profilePic?.fname + " " + profilePic?.lname} </li>
                                        <Link to={{ pathname: "/MyAccount" }} >
                                            <li className="dropdown-item" >My Account </li>
                                        </Link>
                                        <Link to={{ pathname: "/Credit" }} >
                                            <li className="dropdown-item" >Credits </li>
                                        </Link>
                                        <Link to={{ pathname: "/Household" }} >
                                            <li className="dropdown-item" >My HouseHold </li>
                                        </Link>
                                        <Link to={{ pathname: "/ManageTeam" }} >
                                            <li className="dropdown-item" >Manage My Team </li>
                                        </Link>
                                        <Link to={{ pathname: "/Biling" }} >
                                            <li className="dropdown-item" >Biling & Plans </li>
                                        </Link>
                                        <Link to={{ pathname: "/CreateTeam" }} >
                                            <li className="dropdown-item" >Create New Team </li>
                                        </Link>
                                        <Link to={{ pathname: "/SignOut" }} >
                                            <li className="dropdown-item active" >Sign Out </li>
                                        </Link>

                                    </ul>
                                </div>
                            </div>
                            <div className="profile-head">
                                <div className="profile-head-name">{profilePic?.fname + " " + profilePic?.lname}</div>
                                <div className="profile-head-img">
                                    {profilePic?.profile_image == null ?
                                        <img src={BigUserProfile} alt="" /> :
                                        <img src={`${profilePic?.profile_image}`} alt="" />
                                    }

                                </div>
                            </div>
                            <div className="login-account"><ul><li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li></ul></div>


                        </div>

                        <div className="prefarance-page">
                            <div className="player-info-head">
                                <h2 className="page-title">Roster</h2>
                                <div className="player-info-head-right">
                                    <button className="edit-btn" style={{ width: "265px" }} onClick={() => history.push('./PlayerInfo')}>Manage My Player Info</button>
                                    <button className="add-new-family" style={{ width: "324px" }} onClick={() => history.push('./PlayerInfo')}>+ Add or Edit My Family Member</button>
                                    {/* <button className="edit-btn" style={{ marginLeft: "5px" }} onClick={() => history.push('./Subscribe')}>Export</button> */}
                                    <CsvDownload data={data} headers={headers} filename={`Roster list `} />
                                </div>
                            </div>

                            {user.user_type == "manager" ? <div className="manager-player-section">
                                <h3>Maneger</h3>
                                <ul >
                                    <Link to = "./AddPlayer"><li  style={{ color: "red" }} > + Add Player</li></Link>
                                    <Link to = "./ImportPlayer"><li style={{ color: "red" }}> Import Players</li></Link>
                                    <Link to = "./AnotherPlayer"><li style={{ color: "red" }}> Import From Another Teams</li></Link>
                                </ul>

                            </div> : ""}


                            <div className="manager-player-section">
                                <h3>Players</h3>

                                <span style={{ color: "white", position: "absolute", right: "3%" }}>Total Player {resData?.total_player}(Men:3,Women:2)</span>
                            </div>
                            <div className="prefarance-box">
                                <div className="team-payment team-assesment">
                                    <table>
                                        <thead>
                                            <tr>
                                                
                                                <th>Photo</th>
                                                <th>Name</th>
                                                <th>Male/Female</th>
                                                <th>Jursey No</th>
                                                <th>contact Info</th>
                                                <th>Position</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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

                                                                                    <tr key= {player._id}>

                                                                                        
                                                                                        <td key="col1" onClick={() => imageModalOpen(i, player._id)}>
                                                                                            {player?.profile_image == null ?
                                                                                                <img key={player._id} src={UserProfile} alt="" /> :
                                                                                                <img key={player.member_id} src={`${pic1}${player.member_id.profile_image}`} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                                                                                            }
                                                                                        </td>
                                                                                        <td key="col2">
                                                                                            <span>{player.firstName}{player.lastName}</span>
                                                                                        </td>
                                                                                        <td key="col3">
                                                                                            <span>{player.jerseyNumber}</span>
                                                                                        </td>
                                                                                        <td key="col4">

                                                                                            <div className="game-name">

                                                                                                {(player.playerGender) ? player.playerGender : null}
                                                                                                {/* {(player.member_id.gender)==Male ? player.member_id.gender : null} */}
                                                                                            </div>

                                                                                        </td>
                                                                                        <td key="col5">{player.firstName}<br></br>
                                                                                            {player.email}

                                                                                        </td>
                                                                                        <td id="col6">
                                                                                            <div className="last-row">
                                                                                                <p>{player.position}</p> 
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div className="last-row">
                                                                                            <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deletePlayerData(player._id)} ><img src={Delect} /></button>
                                                                                                <button id={player._id} onClick={() => updateModalValue(i, player._id)}><img src={pencil} /></button>
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

                                        </tbody>

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
                                                        <select className="input-select" onChange={(e) => setGender(e.target.value)} value={newplayerdata[id].playerGender}>
                                                            <option key = "gender">Select</option>
                                                            <option key="male" value="male">Male</option>
                                                            <option key="male" value="female">Female</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> First Name of Player</h2>
                                                        <input type="text" className="input-select" name="fname" placeholder="Virtual Practice " onChange={(e) => setFName(e.target.value)}
                                                            defaultValue={newplayerdata[id].firstName}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Last Name of Player</h2>
                                                        <input type="text" className="input-select" name="lname" placeholder="Virtual Practice " onChange={(e) => setLName(e.target.value)}
                                                            defaultValue={newplayerdata[id]?.lastName}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Jursey Number </h2>
                                                        <input type="text" className="input-select" name="jursey" placeholder="Jursey Number" onChange={(e) => setJursey(e.target.value)}
                                                            defaultValue={newplayerdata[id].jerseyNumber}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>Email</h2>
                                                        <input type="text" className="input-select" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                                                            defaultValue={newplayerdata[id].contactInformationEmail}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Player Position</h2>
                                                        <input type="text" className="input-select" placeholder=" Player Position" onChange={(e) => setPosition(e.target.value)}
                                                            defaultValue={newplayerdata[id].position}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  City</h2>
                                                        <input type="text" className="input-select" placeholder="City" onChange={(e) => setCity(e.target.value)}
                                                        defaultValue={newplayerdata[id].contactInformationCity}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Zip</h2>
                                                        <input type="text" className="input-select" placeholder="Zip " onChange={(e) => setZip(e.target.value)}
                                                        defaultValue={newplayerdata[id].contactInformationZipCode}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  State</h2>
                                                        <input type="text" className="input-select" placeholder="State " onChange={(e) => setSateData(e.target.value)}
                                                        defaultValue={newplayerdata[id].contactInformationState}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Birthday</h2>
                                                        <input type="date" className="input-select" placeholder="Birthday " onChange={(e) => setBirthday(e.target.value)}
                                                        defaultValue={newplayerdata[id].playerBirthday}
                                                        />
                                                    </div>

                                                </div>
                                                {/* <div className="col-md-12">
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

                                                </div> */}
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Phone Number</h2>
                                                        <input type="text" className="input-select" placeholder="Phone Number " onChange={(e) => setPhone(e.target.value)}
                                                        defaultValue={newplayerdata[id].contactInformationPhoneNumber}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Member Type</h2>

                                                        <select className="input-select" onChange={(e) => setMemberType(e.target.value)}>
                                                            <option key="membertype">Select</option>
                                                            <option key="player" value="player" selected>PLAYER</option>
                                                            <option key="manager" value="manager">MANAGER</option>
                                                        </select>
                                                    </div>

                                                </div>



                                            </div>



                                            <button className="add-links" style={{ margin: "10px" }} onClick={() => setModeValue(false)}>Cancel</button>
                                            <button className="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={(e)=>updatePlayerData(e)}>Update</button>

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
                                                        <select className="input-select" onChange={(e) => setGender(e.target.value)} defaultValue={newNonPlayerData[id1].playerGender}>
                                                        <option key = "gender">Select</option>
                                                            <option key="male" value="male">Male</option>
                                                            <option key="male" value="female">Female</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> First Name of Player</h2>
                                                        <input type="text" className="input-select" placeholder="enter Player First Name... " onChange={(e) => setFName(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1]?.firstName}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Last Name of Player</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Player Last Name... " onChange={(e) => setLName(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1]?.lastName}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Jursey Number </h2>
                                                        <input type="text" className="input-select" placeholder="Enter Jursey Number... " onChange={(e) => setJursey(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].jerseyNumber}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>Email</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Email Address.. " onChange={(e) => setEmail(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].contactInformationEmail}
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
                                                        defaultValue={newNonPlayerData[id1].contactInformationCity}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Zip</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Zip Code... " onChange={(e) => setZip(e.target.value)}
                                                        defaultValue={newNonPlayerData[id1].contactInformationZipCode}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  State</h2>
                                                        <input type="text" className="input-select" placeholder="Enter State... " onChange={(e) => setSateData(e.target.value)}
                                                        defaultValue={newNonPlayerData[id1].contactInformationState}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Birthday</h2>
                                                        <input type="date" className="input-select" placeholder="Select Birdthady... " onChange={(e) => setBirthday(e.target.value)}
                                                        defaultValue={newNonPlayerData[id1].playerBirthday}

                                                        />
                                                    </div>

                                                </div>
                                                {/* <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Address Line1</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Address Line1... " onChange={(e) => setAddress1(e.target.value)}
                                                        defaultValue={newNonPlayerData[id1].position}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2> Address Line 2</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Address Line 2... " onChange={(e) => setAddress2(e.target.value)}
                                                        defaultValue={newNonPlayerData[id1].position}

                                                        />
                                                    </div>

                                                </div> */}
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Phone Number</h2>
                                                        <input type="text" className="input-select" placeholder="Enter Phone Number... " onChange={(e) => setPhone(e.target.value)}
                                                        defaultValue={newNonPlayerData[id1].contactInformationPhoneNumber}

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">
                                                    <div className="prefarance-form-list">
                                                        <h2>  Member Type</h2>

                                                        <select className="input-select" onChange={(e) => setMemberType(e.target.value)}
                                                        defaultValue='nonplayer'>
                                                            <option key="membertype">Select</option>
                                                            <option key="player" value="player">PLAYER</option>
                                                            <option key="nonplayer" value="nonplayer" selected>NON - PLAYER</option>
                                                            <option key="manager" value="manager">MANAGER</option>
                                                        </select>
                                                    </div>

                                                </div>



                                            </div>



                                            <button className="add-links" style={{ margin: "10px" }} onClick={() => setModeValue1(false)}>Cancel</button>
                                            <button className="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={updatePlayerData}>Update</button>

                                        </div>
                                    </Modal.Body>

                                </Modal> : ""}


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
                                        <thead>
                                            <tr>
                                               
                                                <th>Photo</th>
                                                <th>Name</th>
                                                <th>Jursey No</th>
                                                <th>Male/Female</th>
                                                <th>contact Info</th>
                                                <th>Position</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {(newNonPlayerData && newNonPlayerData.length > 0) ?


                                                <>
                                                    {
                                                        newNonPlayerData?.map((nonPlayer, i) => {

                                                            return (
                                                                <>
                                                                    {
                                                                        (nonPlayer != null) ?
                                                                            <>
                                                                                <tr key={nonPlayer._id}>

                                                                                    
                                                                                    <td key="col1" onClick={() => imageModalOpen(i, nonPlayer?._id)}>
                                                                                        {nonPlayer?.profile_image == null ?
                                                                                            <img key={nonPlayer._id} src={UserProfile} alt="" /> :
                                                                                            <img key={nonPlayer._id} src={`${nonPlayer._id.profile_image}`} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                                                                                        }
                                                                                    </td>
                                                                                    <td key="col2">
                                                                                        <span>{nonPlayer.firstName}{nonPlayer.lastName}</span>
                                                                                    </td>
                                                                                    <td key="col3">
                                                                                        <span>{nonPlayer.jerseyNumber}</span>
                                                                                    </td>
                                                                                    <td key="col4">

                                                                                        <div className="game-name">

                                                                                            {(nonPlayer?.playerGender) ? nonPlayer?.playerGender : null}
                                                                                        </div>

                                                                                    </td>
                                                                                    <td key="col5">{nonPlayer.firstName}<br></br>
                                                                                        {nonPlayer.email}

                                                                                    </td>
                                                                                    <td key="col6">
                                                                                        <div className="last-row">
                                                                                            <p>{nonPlayer.position}</p> 
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <div className="last-row">
                                                                                        <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deletePlayerData(nonPlayer._id)} ><img src={Delect} /></button>
                                                                                            <button onClick={() => updateModalValue1(i, nonPlayer._id)}><img src={pencil} /></button>
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


                                        </tbody>



                                    </table>

                                </div>
                            </div>


                        </div>






                        <Footer />

                    </div>
                </div>
            </div >
        </div >
    );
}

export default ManagerRoster;
