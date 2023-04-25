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

const Inbox = () => {
    const history = useHistory();

    return (
        <div className="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />

            <SideNav name="Send Emails"/>
            <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="prefarance-tab-content">

                        <div className="prefarance-form playerinfo-form">

                            <div className="row">
                                <div className="col-md-9">
                                    <div className="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="prefarance-form-list">
                                        <button className="add-links" style={{ margin: "10px" }}>Delete</button>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="team-payment team-assesment">

                                <table  >
                                    <thead >
                                        <tr>
                                            <th> </th>
                                            <th style={{fontSize:"Larger"}}> Subject</th>
                                            <th style={{fontSize:"Larger"}}> Sent From</th>
                                            <th style={{fontSize:"Larger"}}>Send Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="firstColumn">
                                            <td>   <input type="checkbox" style={{ height: "15px", width: "17px" }} /></td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr style={{borderBottom:"0px"}}>
                                            <td>   <input type="checkbox" style={{ height: "15px", width: "17px" }} /></td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td>   <input type="checkbox" style={{ height: "15px", width: "17px" }} /></td>
                                            <td >Larry the Bird</td>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>










                        </div>
                    </div>
                </div>
            </div>


        </div>


    )
}

export default Inbox;