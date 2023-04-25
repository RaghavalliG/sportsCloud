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

const Alert = () => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email:false,
        alert:false,
        post:false
    })
    return (
        <div className="prefarance-box player-info" style={{height:"100%",marginTop:"0px",borderRadius:"0px"}}>
        <SideMenuComponents manger="manger" />
        
        <SideNav name="Alert"/>
                          <div className="tab-content">
                              <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                  <div className="prefarance-tab-content">

                                      <div className="prefarance-form playerinfo-form">
                                          
                                          <div className="row">
                                              <div className="col-md-12">
                                                  <div className="prefarance-form-list">
                                                     
                                                      <textarea type="text" className="input-select"  style={{height:"210px",padding:"32px",fontSize:"larger",color:"red",border:"1px solid red",borderColor:"red"}}>About Alerting:

Alerts are sent via push notifications or text message. If neither of these are enabled, we'll send alerts via email.

Reply to alerts by creating a new alert within the TeamSnap app.

The more you say the word "alert" the funnier it sounds. Alert alert alert. See?</textarea>
                                                  </div>
                                              </div>
                                              <div className="col-md-12">
                                                  <div className="prefarance-form-list">
                                                      <label> Your Alert</label>
                                                      <textarea type="text" className="input-select"  style={{height:"210px"}}/>
                                                  </div>
                                              </div>
                                             </div>
                                             <div className="row" style={{marginBottom:"15px",paddingBottom:"28px",borderBottom:"0.5px solid gray"}}>
                                              <div className="col-md-7">
                                                  <div className="prefarance-form-list">
                                                    <p style={{fontSize:"larger",color:"white"}}>Player Recipients</p>
                                                  </div>
                                              </div>


                                              <div className="col-md-2">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span style={{color:"red"}}>Select All</span>
                                                   
                                                  </div>
                                              </div>
                                              <div className="col-md-3">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span style={{color:"red"}}>Select None</span>
                                                   
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span>Lisa Memon</span>
                                                   
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span>Asa West</span>
                                                   
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span>Mikey Mcclearly</span>
                                                   
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span>Karila Keishing</span>
                                                   
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span>Medha Usdi</span>
                                                   
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="prefarance-form-list">
                                                      
                                                     
                                                   
                                                  </div>
                                              </div>
                                              </div>
                                              <div className="row" style={{marginBottom:"15px",paddingBottom:"28px",borderBottom:"0.5px solid gray"}}>
                                              <div className="col-md-7">
                                                  <div className="prefarance-form-list">
                                                    <p style={{fontSize:"larger",color:"white"}}>Non-Player Recipients</p>
                                                  </div>
                                              </div>


                                              <div className="col-md-2">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span style={{color:"red"}}>Select All</span>
                                                   
                                                  </div>
                                              </div>
                                              <div className="col-md-3">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span style={{color:"red"}}>Select None</span>
                                                   
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span>Asa West</span>
                                                   
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span>Asa West</span>
                                                   
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                                  <div className="prefarance-form-list">
                                                      
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span>Asa West</span>
                                                   
                                                  </div>
                                              </div>
                                              </div>
                                              <div className="row" >
                                              
                                              <div className="col-md-12">
                                                  <div className="prefarance-form-list">
                                                      <label> Options</label>
                                                      <input type="checkbox" style={{height:"15px",width:"17px"}}/>
                                                      <span>Send me a copy</span>
                                                  </div>
                                              </div>
                                              <div className="col-md-12">
                                    <div className="prefarance-form-list" style={{marginLeft:"63%"}}>
                                       
                                    
                                        <button className="add-links" style={{ margin: "10px" }}>Cancel</button>
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

export default Alert;