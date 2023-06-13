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
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import SideNav from './sideNav';

const TeamMassage = () => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email:false,
        alert:false,
        post:false
    })
    return (
        <div className="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />

            <SideNav name="Send Emails"/>
            <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="prefarance-tab-content">

                        <div className="prefarance-form playerinfo-form">

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="prefarance-form-list">
                                        <label> Subjects</label>
                                        <input type="text" className="input-select" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="prefarance-form-list">
                                        <label> Massage</label>
                                        <textarea type="text" className="input-select" style={{ height: "210px" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "15px", paddingBottom: "28px", borderBottom: "0.5px solid gray" }}>
                                <div className="col-md-7">
                                    <div className="prefarance-form-list">
                                        <p style={{ fontSize: "larger", color: "white" }}>Player Recipients</p>
                                    </div>
                                </div>


                                <div className="col-md-2">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span style={{ color: "red" }}>Select All</span>

                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span style={{ color: "red" }}>Select None</span>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span>Lisa Memon</span>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span>Asa West</span>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span>Mikey Mcclearly</span>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span>Karila Keishing</span>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span>Medha Usdi</span>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="prefarance-form-list">



                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "15px", paddingBottom: "28px", borderBottom: "0.5px solid gray" }}>
                                <div className="col-md-7">
                                    <div className="prefarance-form-list">
                                        <p style={{ fontSize: "larger", color: "white" }}>Non-Player Recipients</p>
                                    </div>
                                </div>


                                <div className="col-md-2">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span style={{ color: "red" }}>Select All</span>

                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span style={{ color: "red" }}>Select None</span>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span>Asa West</span>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span>Asa West</span>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span>Asa West</span>

                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-12">
                                    <div className="prefarance-form-list">
                                        <label> File Attachments</label>
                                        <div className="fileStyle">
                                            Search
                                        </div>
                                        <p style={{ color: "gray" }}>Maximam Size: 20mb(combined)</p>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="prefarance-form-list">
                                        <label> Options</label>
                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span>Send me a copy</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="prefarance-form-list" style={{ marginLeft: "40%" }}>


                                        <button className="add-links" style={{ margin: "10px" }}>Cancel</button>
                                        <button className="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} >Save as Draft</button>
                                        <button style={{ backgroundColor: "#1d1b1b", padding: "13px", borderRadius: "30px", margin: "10px", color: "white" }}>Send Email</button>
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

export default TeamMassage;