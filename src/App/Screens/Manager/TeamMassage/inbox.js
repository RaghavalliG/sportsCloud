import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import "../../../Utils/css/style.css";
import "../../../Utils/css/responsive.css";
import "../../../Utils/css/bootstrap.min.css";
import "../../../Utils/css/bootstrap-datepicker.css";
import TeamList from "../../../images/team-list.png";
import SideMenuComponents from "../../../Components/SideMenu";
import Modal from "react-bootstrap/Modal";
import flag from "../../../images/flag.png";
import SideNav from "./sideNav";
import ManagerHeader from "../../../Components/Header/ManagerHeader";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Network } from "../../../Services/Api";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../../../Redux/Actions/auth";
const Inbox = () => {
  const dispatch = useDispatch();
  const [mailList, setMailList] = useState([])
  useEffect(() => {
   getAllMailList()
  }, [teamDropdown])
  
  const history = useHistory();

  const [teamDropdown, setTeamDropDown] = useState("");
  const [modalValue, setModalValue] = useState(false);

  const change = (value) => {
    console.log("eventssss", value);
    setTeamDropDown(value);
    // setPlayer([])
    // teamRoster(event.target.value);
  };
  const modalOpen = () => {
    setModalValue(true);
  }
  const modalClose = () => {
    setModalValue(false);
  }
  
  const getAllMailList = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // const userMail = user.email;
    const teamId = localStorage.getItem("ManagerTeamId");
    const token = user.authtoken;
    
   
      let header = {
        token: token,
      };
      Network(
        "api/getAllInboxMailList?teamId=" + teamId,
        "GET",
        header
      ).then(async (res) => {
        if (res.response_code == 400) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
        setMailList(res.response_data)
        console.log("Mails",res.response_data)
      });
    
  }
  console.log("dropdoe", teamDropdown);
  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <SideMenuComponents manger="manger" />
        <div className="dashboard-main-content">
          <ManagerHeader change={change} />
          <div
            className="prefarance-box player-info"
            style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}
          >
            <SideNav name="Send Emails" />
            <div
              className="tab-content"
              style={{ justifyContent: "center", width: "100%" }}
            >
              {mailList?.map((item, index) => (
              <div
                style={{
                  minWidth: "90%",
                  width:"auto",
                  backgroundColor: "#fff",
                  padding: "15px",
                  borderRadius: "12px",
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom:"10px"
                }}
                onClick={modalOpen}
              >
                <div style={{ flexDirection: "row", display: "flex", width:"100%" }}>
                 <div>
                  <img
                    src={item.from_user_profile_pic}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: "50%",
                      backgroundColor: "#000",
                    }}
                  />
                  
                  </div>
                  <div style={{ textAlign:"center",alignSelf: "center", }}>
                    {item.from_user_name}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      alignSelf: "center",
                       paddingLeft: "1em",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.subject}
                  </div>
                  {/* <div
                    style={{
                      fontSize: "15px",
                      alignSelf: "center",
                      
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                    
                  >
                    --Email Body sdfsfjksdfjksdb sdfjksdfjvbgdf. sjkvdf. jkdfv sdgsxdg
                  </div> */}
                  <div></div>
                </div>
                <div style={{ marginRight:"10px",
                    alignSelf:"center"}}>

                <img
                  src={require('../../../images/star.png')}
                  style={{
                    height: 25,
                    width: 25,
                    // borderRadius: "50%",
                    // backgroundColor: "#000",
                   
                  }}
                  />
                  </div>
              </div>
))}
              {/* 
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
            */}

<Modal show={modalValue} onHide={modalClose}>
<Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={modalClose}>
            Close
          </button>
          <button variant="primary" onClick={modalClose}>
            Save Changes
          </button>
        </Modal.Footer>
                  </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
