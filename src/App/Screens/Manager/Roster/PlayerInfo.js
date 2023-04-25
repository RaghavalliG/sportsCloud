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
import PlayerInfoNav from "./PlayerInfoNav"
import DatePicker from "react-datepicker";

const PlayerInfo = () => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email: false,
        alert: false,
        post: false
    })
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />

            <PlayerInfoNav />
            <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="prefarance-tab-content">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="prefarance-form-list">
                                    <h1 style={{color:"white",fontWeight:"bolder"}}>Player</h1>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="prefarance-form-list">
                                <button className="add-links"  style={{ backgroundColor: "#181717",marginRight:"5px"}} onClick={()=>history.push('./AddPlayer')}>Edit</button>
                                <button className="add-links" style={{width:"220px"}} onClick={()=>history.push('./AddPlayer')}>Add New Family Member</button>
                                
                                </div>
                            </div>
                        </div>

                        <div className="prefarance-form playerinfo-form">

                            <div className="row">
                                <div className="col-md-8">
                                    <div className="prefarance-form-list">
                                        <img src={UserProfile} alt="" style={{ height: "83px", width: "111px" }} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="prefarance-form-list">
                                        <div className="EditPhoto">Edit Photo</div>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="prefarance-form-list">
                                        <label> First Name</label>
                                        <input type="text" className="input-select" />
                                    </div>
                                </div>


                                <div className="col-md-6">
                                    <div className="prefarance-form-list">
                                        <label>Last Name</label>
                                        <input type="text" className="input-select" />

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="prefarance-form-list">
                                        <label>Email</label>
                                        <input type="text" className="input-select" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="prefarance-form-list">
                                        <label>Who's this</label>
                                        <input type="text" className="input-select" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="prefarance-form-list">
                                        <label>Phone Number</label>
                                        <input type="text" className="input-select" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="prefarance-form-list">
                                        <label>Label</label>
                                        <input type="text" className="input-select" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="prefarance-form-list">
                                        <label>Links</label>
                                        <button className="add-links">Add Links</button>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="prefarance-form-list">
                                        <label>Files</label>
                                        <button className="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} >Add Files</button>

                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="prefarance-form-list">
                                        <label style={{ paddingTop: "25px" }}>Player Status</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="prefarance-form-list">
                                        <div className="EditPhoto">Disable</div>

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

export default PlayerInfo;