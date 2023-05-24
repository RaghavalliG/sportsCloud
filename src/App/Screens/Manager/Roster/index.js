import React, { useState, useEffect } from 'react';
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
    console.log("546433333333333")
    console.log("new player data", newplayerdata)
    const pic = 'https://nodeserver.mydevfactory.com:1447/'

    const pic1 = 'https://nodeserver.mydevfactory.com:1447/profilepic/'

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
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

            Network('api/get-user-details?user_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("new Profile Pic----", res)
                    setProfilePic(res.response_data)

                })
        }

    }

    const dropdownMenu = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'token': user.authtoken,

            }
            //console.log('user',user)

            Network('api/getAllTeamName?userId=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("dropdown----", res)
                    if (res.response_code == 400) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setDropdown(res.response_data);

                    teamRoster(res.response_data[0]._id);





                })
        }

    }





    const change = (event) => {
        console.log("event", event.target.value)
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
                    console.log("team player", res.response_data.PLAYER)
                    console.log("non player", res.response_data.NON_PLAYER)

                    setPlayer(res.response_data.PLAYER)
                    setNewPlayerData(res.response_data.PLAYER.filter(data => {
                        return data.member_id != null

                    }))
                    setNonPlayer(res.response_data.NON_PLAYER)
                    setNewNonPlayerData(res.response_data.NON_PLAYER.filter(data => {
                        return data.member_id != null

                    }))




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
                    'x-access-token': user.authtoken
                },
                body: JSON.stringify({
                    "player_id": id
                })
            };
            fetch('https://nodeserver.mydevfactory.com:1447/api/delete-player', requestOptions)
                .then(response => response.json())
                .then((res) => {
                    console.log("delete Player  data", res)
                    if (res.response_code == 2000) {
                        console.log("deleted data", res)
                        teamRoster(teamDropdown)
                    }
                    if (res.response_code == 4000) {
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
        fetch('https://nodeserver.mydevfactory.com:1447/api/update-player-details', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("update Player data", res)
                if (res.response_code == 2000) {
                    toast.success("Edit Player data succesful")
                    setModeValue(false)
                    setModeValue1(false)
                    teamRoster(teamDropdown);

                }

                if (res.response_code == 4000) {
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
        axios('https://nodeserver.mydevfactory.com:1447/api/add-update-player-profile-image',
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
    console.log("pic1", pic1)



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
                                <select onChange={change} value={teamDropdown == "" ? dropdown[0]?._id : teamDropdown} >
                                    {dropdown?.map((dropdown) => {
                                        return (
                                            <option key={dropdown._id} value={dropdown._id}>{dropdown.team_name}</option>
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
                                        <img src={`${pic1}${profilePic?.profile_image}`} alt="" />
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
                                    <button className="edit-btn" style={{ marginLeft: "5px" }} onClick={() => history.push('./Subscribe')}>Export</button>
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

                                <span style={{ color: "white", position: "absolute", right: "3%" }}>Total Player {resData.TOTAL_PLAYER}(Men:3,Women:2)</span>
                            </div>
                            <div className="prefarance-box">
                                <div className="team-payment team-assesment">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Male/Female</th>
                                                <th>Photo</th>
                                                <th>Name</th>
                                                <th>Jursey No</th>
                                                <th>contact Info</th>
                                                <th>Position</th>
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
                                                                            (player.member_id != null) ?
                                                                                <>

                                                                                    <tr key= {player.member_id}>

                                                                                        <td key="col1">

                                                                                            <div className="game-name">

                                                                                                {(player.member_id.gender) ? player.member_id.gender : null}
                                                                                                {/* {(player.member_id.gender)==Male ? player.member_id.gender : null} */}
                                                                                            </div>

                                                                                        </td>
                                                                                        <td key="col2" onClick={() => imageModalOpen(i, player.member_id._id)}>
                                                                                            {player.member_id.profile_image == null ?
                                                                                                <img key={player.member_id} src={UserProfile} alt="" /> :
                                                                                                <img key={player.member_id} src={`${pic1}${player.member_id.profile_image}`} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                                                                                            }
                                                                                        </td>
                                                                                        <td key="col3">
                                                                                            <span>{player.member_id.fname}{player.member_id.lname}</span>
                                                                                        </td>
                                                                                        <td key="col4">
                                                                                            <span>{player.jersey_number}</span>
                                                                                        </td>
                                                                                        <td key="col5">{player.member_id.fname}<br></br>
                                                                                            {player.member_id.email}

                                                                                        </td>
                                                                                        <td id="col6">
                                                                                            <div className="last-row">
                                                                                                <p>{player.position}</p> <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deletePlayerData(player.member_id._id)} ><img src={Delect} /></button>
                                                                                                <button onClick={() => updateModalValue(i, player.member_id._id)}><img src={pencil} /></button>
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
                                                        <select className="input-select" onChange={(e) => setGender(e.target.value)} defaultValue={newplayerdata[id].member_id.gender}>
                                                            <option key = "gender">Select</option>
                                                            <option key="male" value="male">Male</option>
                                                            <option key="male" value="female">Female</option>
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
                                                            <option key="membertype">Select</option>
                                                            <option key="player" value="player">PLAYER</option>
                                                            <option key="manager" value="manager">MANAGER</option>
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
                                                            <option key="membertype">Select</option>
                                                            <option key="player" value="player">PLAYER</option>
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
                                <span style={{ color: "white", position: "absolute", right: "3%" }}>Total Player {resData.TOTAL_NON_PLAYER}(Men:3,Women:2)</span>
                            </div>
                            <div className="prefarance-box">
                                <div className="team-payment team-assesment">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Male/Female</th>
                                                <th>Photo</th>
                                                <th>Name</th>
                                                <th>Jursey No</th>
                                                <th>contact Info</th>
                                                <th>Position</th>
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
                                                                        (nonPlayer.member_id != null) ?
                                                                            <>
                                                                                <tr key={nonPlayer.member_id}>

                                                                                    <td key="col1">

                                                                                        <div className="game-name">

                                                                                            {(nonPlayer.member_id.gender) ? nonPlayer.member_id.gender : null}
                                                                                        </div>

                                                                                    </td>
                                                                                    <td key="col2" onClick={() => imageModalOpen(i, nonPlayer.member_id._id)}>
                                                                                        {nonPlayer.member_id.profile_image == null ?
                                                                                            <img key={nonPlayer.member_id} src={UserProfile} alt="" /> :
                                                                                            <img key={nonPlayer.member_id} src={`${pic1}${nonPlayer.member_id.profile_image}`} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                                                                                        }
                                                                                    </td>
                                                                                    <td key="col3">
                                                                                        <span>{nonPlayer.member_id.fname}{nonPlayer.member_id.lname}</span>
                                                                                    </td>
                                                                                    <td key="col4">
                                                                                        <span>{nonPlayer.jersey_number}</span>
                                                                                    </td>
                                                                                    <td key="col5">{nonPlayer.member_id.fname}<br></br>
                                                                                        {nonPlayer.member_id.email}

                                                                                    </td>
                                                                                    <td key="col6">
                                                                                        <div className="last-row">
                                                                                            <p>{nonPlayer.position}</p> <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deletePlayerData(nonPlayer.member_id._id)} ><img src={Delect} /></button>
                                                                                            <button onClick={() => updateModalValue1(i, nonPlayer.member_id._id)}><img src={pencil} /></button>
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
