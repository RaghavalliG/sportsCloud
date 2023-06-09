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
import TeamList from "../../../images/team-list.png"
import UserProfile from "../../../images/user-profile.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import NavBarSide from './NabBar';
import DatePicker from "react-datepicker";
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import validator from 'validator'
import { Button } from 'bootstrap';
import axios from 'axios'
import BigUserProfile from "../../../images/big-user-profile.png"
const MyAccount = () => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email: false,
        alert: false,
        post: false
    })
    const [allUserDataList, setAlluserDatalist] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [schedule, setSchedule] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()
    const [firstName, setFirstName] = useState(allUserDataList?.fname)
    const [lastName, setLastName] = useState(allUserDataList?.lname)
    const [birthday, setBirthday] = useState(allUserDataList?.dob)
    const [gender, setGender] = useState(allUserDataList?.gender)
    const [email, setEmail] = useState(allUserDataList?.email)
    const [type1, setType1] = useState(allUserDataList?.apptype)
    const [type2, setType2] = useState('')
    const [number1, setNumber1] = useState(allUserDataList?.phone)
    const [number2, setNumber2] = useState(allUserDataList?.alternative_phone)
    const [address1, setAddress1] = useState(allUserDataList?.address_line_one)
    const [address2, setAddress2] = useState(allUserDataList?.address_line_two)
    const [city, setCity] = useState(allUserDataList?.city)
    const [state1, setState1] = useState(allUserDataList?.state)
    const [zip, setZip] = useState(allUserDataList?.zip)
    const [country, setCountry] = useState(allUserDataList?.country)
    const [private1, setPrivate1] = useState(false)
    const [private2, setPrivate2] = useState(false)
    const [private3, setPrivate3] = useState(false)
    const [private4, setPrivate4] = useState(false)
    const [private5, setPrivate5] = useState(false)
   
    const [profilePicture, setProfilePicture] = useState('')
    const [profilePic, setProfilePic] = useState([])

    const [file, Profile] = useState();
    const pic = 'https://nodeserver.mydevfactory.com:1448/profilepic/'
    console.log("email",email)
    console.log("fname",firstName ==""? allUserDataList?.fname:firstName)


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
        getAllUserData()
        updateProfile()

        // teamSchedule();

    }, []);

    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
    };

    const updateProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/get-user-details?user_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("new Profile Pic----", res)
                    setProfilePic(res.response_data)

                })
        }

    }


    function handleUpload(event) {
        console.log('imagepath', URL.createObjectURL(event.target?.files));
        Profile(event.target?.files);
        setProfilePicture(event.target?.files)
        EditUserImage(event.target?.files)


    }
    const ImageThumb = ({ image }) => {
        return <img src={URL.createObjectURL(image)} alt={image.name} style={{ height: "90px", width: "90px", borderRadius: "60px" }} />;
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
                    if (res.response_code == 400) {
                        // dispatch(logoutUser(null))
                        // localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setDropdown(res.response_data);

                    teamSchedule(res?.response_data[0]._id);





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
                    if (res.response_code == 400) {
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
    console.log("file------", file,)
    console.log("profile pic", profilePicture)

    const getAllUserData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network("api/get-user-details", 'GET', header)
                .then(async (res) => {
                    console.log("tget all user details----", res)
                    setAlluserDatalist(res.response_data)
                    setPrivate5(res.response_data?.email_is_private == "no" ? false : true)
                    setPrivate1(res.response_data?.hide_age == "no" ? false : true)
                    setPrivate2(res.response_data?.phone_is_private == "no" ? false : true)




                })
        }

    }

    const EditUserDetails = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "firstName": firstName ==null? allUserDataList?.fname:firstName,
                "lastName": lastName ==null? allUserDataList?.lname:lastName,
                "email": email ==null? allUserDataList?.email:email,
                "dob": birthday ==null? allUserDataList?.dob:birthday,
                "phone": number1 ==null ? allUserDataList?.phone:number1,
                "gender": gender ==null? allUserDataList?.gender:gender,
                "alternative_phone": number2 ==null? allUserDataList?.alternative_phone:number2,
                "address_line_one": address1 ==null? allUserDataList?.address_line_one:address1,
                "address_line_two": address2 ==null? allUserDataList?.address_line_two:address2,
                "city": city ==null? allUserDataList?.city:city,
                "state": state1 ==null? allUserDataList?.state:state1,
                "zip": zip ==null? allUserDataList?.zip:zip,
                "country": country ==null? allUserDataList?.country:country,
                "hide_age": private1 ,
                "email_is_private": private5 ,
                "alternative_phone_is_private": private2 ,
                "phone_is_private": private3 ,
                "address_is_private": private4 
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1448/api/edit-user-details', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("edit user data", res)
                if (res.response_code == 200) {
                    toast.success("Edit Succecfull")
                    console.log("edit data", res)

                }

                if (res.response_code == 400) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

    }

    const EditUserImage = (value) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("image in formdata", value)
        const formData = new FormData();
        formData.append('profile_image', value);
        axios('https://nodeserver.mydevfactory.com:1448/api/update-user-profile-image',
            {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    'x-access-token': user.authtoken

                },
                data: formData
            })
            .then((res) => {
                console.log("edit user Image", res)
                if (res.status == 200) {
                    toast.success("Edit Succecfull")
                    console.log("edit Image", res)
                    updateProfile()
                }

                if (res.response_code == 400) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

    }


    const CheckValidatiion = () => {

        if (email == null) {
            toast.error("Please Provide  Email", {
                position: "top-center"
            })
            
        }


        if (firstName == null) {
            toast.error("Please Provide First Name", {
                position: "top-center"
            })
        }
        if (lastName == null) {
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
        if (address1 == null) {
            toast.error("Please Select Adress1", {
                position: "top-center"
            })
            return
        }
        if (address2 == null) {
            toast.error("Please Select Adress2", {
                position: "top-center"
            })
            return
        }
        if (state1 == null) {
            toast.error("Please Select State", {
                position: "top-center"
            })
            return
        }
        if (number1 == null) {
            toast.error("Please Select Phone Number", {
                position: "top-center"
            })
            return
        }
        if (number2 == null) {
            toast.error("Please Select Alternate Phone Number", {
                position: "top-center"
            })
            return
        }
        if (birthday == null) {
            toast.error("Please Provide Birthday", {
                position: "top-center"
            })
            return
        }




        EditUserDetails()



    }
    console.log("private", private5 ? "yes" : "no")



    return (
        <div className="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />
            <div className="dashboard-main-content">
            <div className="dashboard-head">
                            <div className="teams-select">
                                <button className="create-new-team" onClick={() => {
                                    history.push("/CreateTeam")
                                }}>Create New Teams</button>
                                <select onChange={change} value={teamDropdown == "" ? dropdown[0]?._id : teamDropdown} >
                                    {dropdown.map((dropdown) => {
                                        return (
                                            <option value={dropdown._id}>{dropdown.team_name}</option>
                                        )
                                    })}
                                </select>
                                <div className="dropBtn">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "#2C2C2C", border: "none" }}>
                                        ACCOUNT
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ backgroundColor: "#484848", listStyle: "none", margin: "14px" }}>
                                        <li><a className="dropdown-item" href="#">{user?.fname + " " + user?.lname}</a></li>
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
                                <div className="profile-head-name">{user?.fname + " " + user?.lname}</div>
                                <div className="profile-head-img">
                                    {profilePic?.profile_image == null ?
                                        <img src={BigUserProfile} alt="" /> :
                                        <img src={`${pic}${profilePic?.profile_image}`} alt="" />
                                    }

                                </div>
                            </div>
                            <div className="login-account"><ul><li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li></ul></div>

                        </div>
                <div className="prefarance-page">
                    <div className="page-header">
                        <h2 className="page-title">My Account</h2>

                    </div>


                    <div className="prefarance-box" style={{ overflow: "auto" }} >
                        <NavBarSide />
                        <div className="team-payment team-assesment">




                            <div className="prefarance-form playerinfo-form">

                                <div className="row" style={{ padding: "20px" }}>
                                    <div className="col-md-8">
                                        <div className="prefarance-form-list">
                                            {/* <img src={UserProfile} alt="" style={{ height: "83px", width: "111px" }} /> */}
                                            {file == null ? <img src={`${pic}${allUserDataList?.profile_image}`} alt="" style={{ height: "90px", width: "90px", borderRadius: "60px" }} /> : file && <ImageThumb image={file} style={{ height: "90px", width: "90px", borderRadius: "60px" }} />}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="prefarance-form-list">
                                            <div className="update-team-photo">
                                                Edit Photo
                                                <input type="file" name='img' onChange={handleUpload} />

                                            </div>
                                            {/* <button onClick={()=>EditUserImage(file)} style={{padding:"10px",marginTop:"10px",marginLeft:"103px",borderRadius:"10px",backgroundColor:"green"}}>Update</button> */}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <label> First Name</label>
                                            <input type="text" className="input-select" onChange={(e) => setFirstName(e.target.value)} defaultValue={allUserDataList?.fname} />
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <label>Last Name</label>
                                            <input type="text" className="input-select" onChange={(e) => setLastName(e.target.value)} defaultValue={allUserDataList?.lname} />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <label>Birthday</label>
                                            <div className="input-select" >
                                                <input  type="date"  defaultValue className="input-select" onChange={(e) => setBirthday(e.target.value)} style={{ border: "none" }} 
                                                value={allUserDataList?.dob}/>
                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <label>Gender</label>
                                            <select className="input-select" onChange={(e) => setGender(e.target.value)} defaultChecked={allUserDataList?.gender}>
                                                <option >{allUserDataList?.gender}</option>
                                                <option >{allUserDataList?.gender=="Male"? "Female":"Male"}</option>
                                                
                                            </select>

                                        </div>
                                    </div>


                                    <div className="col-md-12">
                                        <div className="prefarance-form-list">

                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={(e) => setPrivate1(!private1)} />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Hide Age</span>

                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{

                                    marginTop: "15px",
                                    paddingBottom: "16px",
                                    padding: "20px"
                                }}>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <label>Email</label>
                                            <input type="text" className="input-select" onChange={(e) => setEmail(e.target.value)} defaultValue={private5 ? "" : allUserDataList?.email} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="prefarance-form-list">
                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={(e) => setPrivate5(!private5)} />
                                        <span style={{ color: "white", textDecoration: "underline" }}>Private</span>
                                    </div>
                                </div>

                                <div className="row" style={{

                                    marginTop: "15px",
                                    paddingBottom: "16px",
                                    padding: "20px"
                                }}>

                                    <div className="col-md-3">
                                        <div className="prefarance-form-list">
                                            <label>Type </label>
                                            <select className="input-select" onChange={(e) => setType1(e.target.value)} defaultValue={allUserDataList?.apptype}>
                                                <option>Home</option>
                                                <option>Personal</option>
                                            </select> </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="prefarance-form-list">
                                            <label>Phone </label>
                                            <input type="text" className="input-select" onChange={(e) => setNumber1(e.target.value)} defaultValue={private2 ? "" : allUserDataList?.phone} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="prefarance-form-list">
                                            <label>Type </label>
                                            <select className="input-select" onChange={(e) => setType2(e.target.value)} defaultValue={allUserDataList?.apptype}>
                                                <option>Home</option>
                                                <option>Personal</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="prefarance-form-list">
                                            <label>Phone </label>
                                            <input type="text" className="input-select" onChange={(e) => setNumber2(e.target.value)} defaultValue={private3 ? "" : allUserDataList?.alternative_phone} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={(e) => setPrivate2(!private2)} />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Private</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={(e) => setPrivate3(!private3)} />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Private</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row" style={{

                                    marginTop: "15px",
                                    paddingBottom: "16px",
                                    padding: "20px"
                                }}>





                                    <div className="col-md-12">
                                        <div className="prefarance-form-list">
                                            <label>Address1 Line</label>
                                            <input type="text" className="input-select" onChange={(e) => setAddress1(e.target.value)} defaultValue={allUserDataList?.address_line_one} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="prefarance-form-list">
                                            <label>Address2 Line</label>
                                            <input type="text" className="input-select" onChange={(e) => setAddress2(e.target.value)} defaultValue={allUserDataList?.address_line_two} />
                                        </div>
                                    </div>




                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <label>City</label>
                                            <input type="text" className="input-select" onChange={(e) => setCity(e.target.value)} defaultValue={allUserDataList?.city} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <label >State</label>
                                            <input type="text" className="input-select" onChange={(e) => setState1(e.target.value)} defaultValue={allUserDataList?.state} />
                                            {/* <select className="input-select" onClick={(e) => setState1(e.target.value)} defaultValue={allUserDataList.state}>
                                                <option>Select</option>
                                                <option>State1</option>
                                                <option>State2</option>
                                            </select> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <label>Zip Code</label>
                                            <input type="text" className="input-select" onChange={(e) => setZip(e.target.value)} defaultValue={private4 ? "" : allUserDataList?.zip} />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <label>Country</label>
                                            <input type="text" className="input-select" onChange={(e) => setCountry(e.target.value)} defaultValue={allUserDataList?.country} />

                                            {/* <select className="input-select" onClick={(e) => setCountry(e.target.value)} defaultValue={allUserDataList.country}>
                                                <option>Select</option>
                                                <option>Country1</option>
                                                <option>Country2</option>
                                            </select> */}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={(e) => setPrivate4(!private4)} defaultValue={allUserDataList?.fname} />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Private</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row" style={{ padding: "20px" }}>
                                    <div className="col-md-6">
                                        <div className="prefarance-form-list">
                                            <button className="add-links" onClick={() => history.push("/")}>CANCEL</button>
                                            <button className="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} onClick={EditUserDetails}>SAVE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>

        </div >

    )
}

export default MyAccount;