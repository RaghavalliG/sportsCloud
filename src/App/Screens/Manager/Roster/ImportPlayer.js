import React, { useState, useEffect } from 'react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useHistory,
//     HashRouter,
// } from "react-router-dom";
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
// import football from "../../../images/football.png"
// import UserProfile from "../../../images/user-profile.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import { read, utils, writeFile } from 'xlsx';


import DatePicker from "react-datepicker";


const ImportPlayer = () => {
    const [players,setPlayers] = useState([]);

    const handleImport = (event) => {
        console.log(event)
        const files = event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log(event);
                console.log(event.target.result)
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                console.log(sheets);

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    console.log(rows);
                    setPlayers(rows)
                    rows.forEach(row => {
                        players.push(row)  
                    });
                    console.log(players);
                }
            
            }
            reader.readAsArrayBuffer(file);
            
        }
    }

 
    return (
        <div className="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />


            <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="prefarance-tab-content">
                        <h1 style={{color:"white"}}>Import Player</h1>

                        <div className="fileBox">
                            <span>Import a list of players by uploading a file below:</span>
                            <div style={{display:"flex",paddingBottom:"20px"}}>
                            {/* <div className="update-team-photo" style={{ width: "20%" }}>
                                Choose File
                                <input type="file" name='img' />

                            </div> */}
                            <div className="custom-file">
                                    <input type="file" name="file"  className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile">Choose file</label>
                                </div>
                            <div className="fileChoosen">No File Choosen</div>
                            </div>
                            <span style={{ color: "red" }}>Download Our Roster Template</span><span>

                                |  (Acceptable Formats: .XLS, .XLSX and .CSV)</span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ImportPlayer;