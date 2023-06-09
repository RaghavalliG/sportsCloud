import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
    useParams,
    useLocation
} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Network } from '../../../Services/Api';
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import Delect from "../../../images/delect.png"
import SideMenuComponents from "../../../Components/SideMenu"
import UserProfile from "../../../images/user-profile.png"
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import BigUserProfile from "../../../images/big-user-profile.png"
import validator from 'validator'


const AddPlayer = () => {

    const history = useHistory();
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date());
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [fname, setFName] = useState()
    const [lname, setLName] = useState()
    const [label, setLabel] = useState()
    const [birthday, setBirthday] = useState();
    const [email, setEmail] = useState()
    const [who, setWho] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [zip, setZip] = useState()
    const [gender, setGender] = useState()
    const [jursey, setJursey] = useState()
    const [position, setPosition] = useState()
    const [assignment, setAssingment] = useState()
    const [uniform, setUniform] = useState()
    const [schedule, setSchedule] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()
    const [profilePic, setProfilePic] = useState([])
    const [team, setTeam] = useState([])
    const [loader, setLoader] = useState(false)
    const [playerType,setPlayerType]=useState(false)
    const [nonplayerCheck,setNonplayerCheck]=useState(false)
    const [invite, setInvite] = useState(true)

    useEffect(() => {

        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        dropdownMenu();
        updateProfile()
        teamSelected();
        // change();


    }, []);
    const pic1 = "https://nodeserver.mydevfactory.com:1448/profilepic/"

    const updateProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'token': user.authtoken

            }
            console.log('user', user)

            Network('api/get-user-details?userId='+user._id, 'GET', header)
                .then(async (res) => {
                    console.log("new Profile Pic----", res)

                    setProfilePic(res.response_data)
                    setLoader(true)


                })
        }

    }

    const teamSelected = () => {

    }
    const playerData = () => {
        console.log(nonplayerCheck);
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': user.authtoken
            },
            body: JSON.stringify(
            {
                "teamId": teamDropdown? teamDropdown : "6470683a88ea6b032e255a3e",
                "managerId": user._id,
                "firstName": fname,
                "lastName": lname,
                "contactInformationEmail": email,
                "whoIsThis": "player",
                "contactInformationPhoneNumber": phone,
                "label": "a",
                "contactInformationAddress": address,
                "contactInformationCity": city,
                "contactInformationState": state,
                "contactInformationZipCode": zip,
                "playerBirthday": birthday,
                "playerGender": gender.toLowerCase(),
                "jerseyNumber": jursey,
                "position": position,  
                "managerAccess": nonplayerCheck == false ? false : "",   
                "nonPlayer": nonplayerCheck == false ? false : "",
                "assignment": "aaa",
                "uniform": "ab"

                
        }

            )


        };
        
        fetch('https://nodeserver.mydevfactory.com:1448/api/addRoaster', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("player data", res)

                if (res.response_code == 400) {
                    // dispatch(logoutUser(null))
                    // localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }else{
                    toast.success(res.response_message)
                    history.goBack();
                }
            })

    }



    const CheckValidatiion = () => {

        if (email == null) {
            toast.error("Please Provide  Email", {
                position: "top-center"
            })
           
        }
        if(email){
            if (validator.isEmail(email)) {
                console.log(email)
            }
            else {
                toast.error("Please Provide Valid Email", {
                    position: "top-center"
                })
            }

        }
       


        if (fname == null) {
            toast.error("Please Provide First Name", {
                position: "top-center"
            })
        }
        if (lname == null) {
            toast.error("Please Provide Last Name", {
                position: "top-center"
            })
            return
        }
        if (gender == null) {
            toast.error("Please Select Your Gender", {
                position: "top-center"
            })
            return
        }
        if (city == null) {
            toast.error("Please Select City Name", {
                position: "top-center"
            })
            return
        }
        if (zip == null) {
            toast.error("Please Provide Zip Code", {
                position: "top-center"
            })
            return
        }
        if (birthday == null) {
            toast.error("Please Select Birthday", {
                position: "top-center"
            })
            return
        }
        if (state == null) {
            toast.error("Please Select State", {
                position: "top-center"
            })
            return
        }
        if (phone == null) {
            toast.error("Please Select Phone Number", {
                position: "top-center"
            })
            return
        }
        if (jursey == null) {
            toast.error("Please Provide Jursey Number", {
                position: "top-center"
            })
            return
        }
        if (position == null) {
            toast.error("Please Provide  Position", {
                position: "top-center"
            })
            return
        }




        playerData()
        


    }



    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
    };






    const dropdownMenu = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'token': user.authtoken

            }
            //console.log('user',user)

            Network('api/getAllTeamName?teamManagerId=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("dropdown----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setDropdown(res.response_data);

                    teamSchedule(res.response_data[0]._id);





                })
        }

    }
    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);
    }





    const teamSchedule = (id) => {
        console.log("id", id)
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {

                'authToken': user.authtoken

            }

            let url = ""
            if (id != undefined) {

                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10'
            }
            else {
                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + teamDropdown + '&page=1&limit=10'
            }
            //console.log('user',user)
            Network('api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10', 'GET', header)
                .then(async (res) => {
                    console.log("schedule----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    //console.log("doc data----->",res.response_data.docs)
                    setSchedule(res.response_data.docs)


                })
        }
    }
    const flagList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/all-flag-list', 'GET', header)
                .then(async (res) => {
                    console.log("flagList----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }



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
                    "id": id
                })
            };
            fetch('https://nodeserver.mydevfactory.com:1447/api/delete-game-event', requestOptions)
                .then(response => response.json())
                .then((res) => {
                    console.log("delete Schedule  data", res)
                    if (res.response_code == 2000) {
                        console.log("deleted data", res)
                    }
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }


                    teamSchedule()

                })
        }

    }



    return (
        <div className="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>

            <SideMenuComponents manger="manger" />
            <div className="dashboard-main-content">
                <div className="dashboard-head">
                    <div className="teams-select">
                        <button className="create-new-team" onClick={() => {
                            history.push("/CreateTeam")
                        }}>Create New Teams</button>
                        <select onChange={change} >

                            {dropdown == null ? <option> Team1</option> :
                                dropdown.map((team) => {
                                    return (
                                        <option id={team.team_id} value={team.team_id}>{team.team_name}</option>
                                    )
                                })}
                        </select>
                        <div className="dropBtn">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "#2C2C2C", border: "none" }}>
                                ACCOUNT
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ backgroundColor: "#484848", listStyle: "none", margin: "14px" }}>
                                <li><a className="dropdown-item" href="#">Jayanta Karmakar</a></li>
                                <Link to={{ pathname: "/MyAccount" }} >
                                    <li><a className="dropdown-item" href="#">My Account</a></li>
                                </Link>
                                <Link to={{ pathname: "/Credit" }} >
                                    <li><a className="dropdown-item" href="#">Credits</a></li>
                                </Link>
                                <Link to={{ pathname: "/Household" }} >
                                    <li><a className="dropdown-item" href="#">My HouseHold</a></li>
                                </Link>
                                <Link to={{ pathname: "/ManageTeam" }} >
                                    <li><a className="dropdown-item" href="#">Manage My Team</a></li>
                                </Link>
                                <Link to={{ pathname: "/Biling" }} >
                                    <li><a className="dropdown-item" href="#">Biling & Plans</a></li>
                                </Link>
                                <Link to={{ pathname: "/CreateTeam" }} >
                                    <li><a className="dropdown-item" href="#">Create New Team</a></li>
                                </Link>
                                <Link to={{ pathname: "/SignOut" }} >
                                    <li><a className="dropdown-item active" href="#">Sign Out</a></li>
                                </Link>

                            </ul>
                        </div>
                    </div>
                    <div className="profile-head">
                        {loader ?
                            <div className="profile-head-name">{profilePic?.fname + " " + profilePic?.lname}</div> :
                            <div className="profile-head-name">Loading...</div>}

                        <div className="profile-head-img">
                            {profilePic?.profile_image == null ?
                                <img src={BigUserProfile} alt="" /> :
                                <img src={`${profilePic?.profile_image}`} alt="" />
                            }

                        </div>
                    </div>
                    <div className="login-account"><ul><li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li></ul></div>

                </div>
                <div className="prefarance-box" style={{ overflow: "auto" }} >
                    <ul className="nav nav-tabs" role="tablist" >
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"><h1 style={{ color: "white", fontSize: "29px" }}>New Member</h1> </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Member Info</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Contact Information</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Optional PLayer Details</a>
                        </li>
                        <li className="nav-item" href="#tabs-4" role="tab">
                            <div style={{ backgroundColor: "gray", borderRadius: "10px" }}>
                                <h3 style={{ color: "white", padding: "10px" }}> Reordering People</h3>
                                <p style={{ color: "white", padding: "10px" }}>In short, don't! Everyone receives the same information, regardless of their order in the list. Changing an email to another person's email address does not give them access. To invite some-one new, use the "Add New Family Member" button. <span style={{ color: "red" }}>Learn more</span> in our help center.</p>
                            </div>
                        </li>

                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="tabs-1" role="tabpanel">
                            <div className="prefarance-tab-content">

                                <div className="prefarance-form playerinfo-form">

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label> First Name</label>
                                                <input type="text" className="input-select" onChange={(e) => setFName(e.target.value)} />
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Last Name</label>
                                                <input type="text" className="input-select" onChange={(e) => setLName(e.target.value)} />

                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="prefarance-form-list">
                                                <label>Non Player</label>
                                                <input type="checkbox" onChange={(e) => setNonplayerCheck(e.target.checked)} style={{ height: "15px", width: "17px" }} onClick={()=>setPlayerType(!playerType)} />
                                                <span style={{ color: "white" }}>This person is a non playing player of the team </span>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Email</label>
                                                <input type="text" className="input-select" onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Whoe's This? </label>
                                                <input type="text" className="input-select" onChange={(e) => setWho(e.target.value)} />
                                            </div>
                                        </div>
                                        {/* <div className="col-md-12">
                                            <div className="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <button data-toggle="modal" data-target="#assignmentdelect" style={{ borderRadius: "12px", backgroundColor: "red", }}><img src={Delect} /></button>
                                            </div>
                                        </div> */}
                                        {/* <div className="col-md-12">
                                            <div className="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <p style={{ color: "white" }}> +Add Another Email</p>
                                            </div>
                                        </div> */}
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Phone Number</label>
                                                <input type="text" className="input-select" onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Label</label>
                                                <input type="text" className="input-select" onChange={(e) => setLabel(e.target.value)} />
                                            </div>
                                        </div>
                                        {/* <div className="col-md-12">
                                            <div className="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <button data-toggle="modal" data-target="#assignmentdelect" style={{ borderRadius: "12px", backgroundColor: "red", }}><img src={Delect} /></button>
                                            </div>
                                        </div> */}
                                        {/* <div className="col-md-12">
                                            <div className="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <p style={{ color: "white" }}> +Add Another Phone Number</p>
                                            </div>
                                        </div> */}
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Address</label>
                                                <input type="text" className="input-select" onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>City</label>
                                                <input type="text" className="input-select" onChange={(e) => setCity(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label >State/Province</label>
                                                <input type="text" className="input-select" onChange={(e) => setState(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Zip/Postal Code</label>
                                                <input type="text" className="input-select" onChange={(e) => setZip(e.target.value)} />

                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Gender</label>
                                                <select onChange={(e) => setGender(e.target.value)} className="input-select">
                                                    <option>SELECT</option>
                                                    <option >MALE</option>
                                                    <option>FEMALE</option>
                                                </select>
                                                

                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Birthday</label>
                                                <div className="input-select" >
                                                    <input type="date" className="input-select" onChange={(e) => setBirthday(e.target.value)} style={{ border: "none" }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label >Jursey Number</label>
                                                <input type="text" className="input-select" onChange={(e) => setJursey(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label >Position</label>
                                                <input type="text" className="input-select" onChange={(e) => setPosition(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Assignment</label>
                                                <input type="text" className="input-select" onChange={(e) => setAssingment(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <label>Uniform</label>
                                                <input type="text" className="input-select" onChange={(e) => setUniform(e.target.value)} />

                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <input type="checkbox" style={{ height: "15px", width: "17px" }} onChange={(e) => setInvite(e.target.checked)} />
                                                <span style={{ color: "white" }}>Invite to join </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="prefarance-form-list">
                                                <button className="add-links" onClick={history.goBack}>CANCEL</button>
                                                <button className="add-links" style={{ backgroundColor: "#181717", marginLeft: "4px" }} onClick={CheckValidatiion}>SAVE</button>
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


    )
}

export default AddPlayer;