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

const AlertSent = () => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email:false,
        alert:false,
        post:false
    })
    return (
        <div className="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />
            <SideNav name="Alert"/>
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
                                            <th style={{fontSize:"Larger"}}> Alert Excerpt</th>
                                            <th style={{fontSize:"Larger"}}> Sent To</th>
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

export default AlertSent;