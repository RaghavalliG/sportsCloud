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
import UserProfile from "../../../images/user-profile.png"
import tableProfile from "../../../images/table-profile.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import InterestPhoto from './InterestPhoto';


function Photos(props) {
    const history = useHistory();
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    // const [image, setImage] = useState([])
    const [image_list, setImages] = useState([]);



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
        dropdownMenu()
        setTeamDropDown()
    }, []);

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };


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

                   





                })
        }

    }

    const change = (event) => {
        console.log("event", event)
        console.log("event", event.target.name)
        console.log("event", event.target.id)
        console.log("event", event.target.key)
        setTeamDropDown(event.target.value)
       
    }
    // const insertImages =()=>{
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     if (user) {
    //         const requestOptions = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'token': user.authtoken
    //             },
    //             body: JSON.stringify(
    //                 {
    //                     "folderName":"test",
    //                     "teamId": teamDropdown ? teamDropdown : "6470683a88ea6b032e255a3e",
    //                     "uploaderUserId": user._id,

    //                 }

    //             )
    //         };
    //         console.log(requestOptions);
    //         fetch('https://nodeserver.mydevfactory.com:1448/api/uploadTeamGalleryImages', requestOptions)
    //             .then(response => response.json())
    //             .then((res) => {
    //                 console.log("player data", res)

    //                 if (res.response_code == 400) {
    //                     // dispatch(logoutUser(null))
    //                     // localStorage.removeItem("user");
    //                     history.push("/")
    //                     toast.error(res.response_message)
    //                 } else {
    //                     toast.success(res.response_message)
    //                     // history.goBack();
    //                 }
    //             })
    //     }

    // }


    const getImages = (images) => {
        console.log(images);
        setImages(images);
    }



    return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-main">
                    <SideMenuComponents manger="manger" />
                    <div className="dashboard-main-content">
                        <div className="dashboard-head">
                            <div className="teams-select">
                                {/* <select>
                                    <option>My Teams</option>
                                    <option>My Teams 2</option>
                                    <option>My Teams 3</option>
                                </select> */}
                                 <select onChange={change} value={teamDropdown == "" ? dropdown[0]?.team_id : teamDropdown} >
                                    {dropdown?.map((dropdown) => {
                                        return (
                                            <option key={dropdown.team_id} id={dropdown.team_id} name={dropdown.team_name} value={dropdown.team_id}>{dropdown.team_name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="profile-head">
                                <div className="profile-head-name">{user ? user?.fname : null}</div>
                                <div className="profile-head-img">
                                    {
                                        user ?
                                            <img src={user.profile_image} alt="" /> :
                                            <img src={UserProfile} alt="" />
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
                    <h2 className="page-title">Photo Albums</h2>
                    <div className="player-info-head-right">
    
                      <div className="streming-head-right">
                       <div className="stream-tab">
                           <ul>
                               <li><a href="#" onClick={() => history.push("./TeamMedia")}>Stream</a></li>
                               <li><a className="active" href="#">Photos</a></li>
                               <li><a href="#" onClick={() => history.push("./Videos")}>Videos</a></li>
                               <li><a href="#" onClick={() => history.push("./Files")}>Files</a></li>
                           </ul>
                       </div>
                       
                       {/* <button className="start-stream-btn">Start Stream</button> */}
                       </div>
                    </div>
                    </div>
                    <div className="prefarance-box streaming-section">
                      <div className="photosTp">
                          <span>Photos</span>
                          <div className="photoProgress"><span>Storate : </span><ProgressBar now={90} /><span>0 MB used (0%), 98800 MB available</span></div>
                      </div>
                      <div className="photoTpBtm">
                            <p>TeamSnap makes it easy to share video links, photos and files with the entire team via a simple interface for uploading, organizing, and wirting custom titles and captions. Use the buttons in the upper right to switch between <span className="redTxt">Photos</span>, <span className="redTxt">Videos</span>, and <span className="redTxt">Files</span>. </p>
                            {/* <a href="#" className="addFirstvideo">Add Your First Photo</a> */}
                            {/* <input type="file" id="myFile" name="add your First Photo"/> */}
                            <InterestPhoto getImages={getImages} />
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

export default Photos;
