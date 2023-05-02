import React, { useEffect, useState } from 'react';
import {
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import Logo from "../../images/logo.png";
import "../../Utils/css/bootstrap-datepicker.css";
import "../../Utils/css/bootstrap.min.css";
import '../../Utils/css/responsive.css';
import '../../Utils/css/style.css';



function SideMenuComponents(props) {
  console.log("props-----",props.manger)
  const history = useHistory();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const location = useLocation()
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
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };


  return (
    <div className="dashboard-side-bar">
      <div className="logo">
        <a href="#"><img src={Logo} alt="" /></a>
      </div>
      <div className="left-menu-section">
        <div className="nav-header">
          <button id="openMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="menulist">
          {
            props.manger == "manger" ?
            <ul>
            <Link to="/">
              <li className={(location.pathname == '/')? 'menu1 active' : 'menu1'}>Team Home</li>
            </Link>
            <Link to="/ManagerRoster">
              <li className={(location.pathname == '/ManagerRoster')? 'menu2 active' : 'menu2'}>Team Roster</li>
            </Link>
            <Link to="/Teamschdule">
            <li className={(location.pathname == '/Teamschdule')? 'menu3 active' : 'menu3'}>Team Schedule</li>
            </Link>
            <Link to="/ManagerTeamAvailability">
            <li className={(location.pathname == '/ManagerTeamAvailability')? 'menu4 active' : 'menu4'}>Team Availability</li>
            </Link>
            <Link to="/ManagerTeamShop">
              <li className={(location.pathname == '/ManagerTeamShop')? 'menu5 active' : 'menu5'}>Team Store</li>
            </Link>
            <Link to="/ScoreKeeper">
            <li className={(location.pathname == '/ScoreKeeper')? 'menu6 active' : 'menu6'}>Score Keeper</li>
            </Link>
            <Link to="/TeamAssignments">
              <li className={(location.pathname == '/TeamAssignments')? 'menu7 active' : 'menu7'}>Team Assignment</li>
            </Link>
            <Link to="/TeamMedia">
            <li className={(location.pathname == '/TeamMedia')? 'menu8 active' : 'menu8'}>Team Media</li>
            </Link>
            <Link to="/TeamMassage">
            <li className={(location.pathname == '/TeamMassage')? 'menu9 active' : 'menu9'}>Team Messages</li>
            </Link>
            <Link to="/preferance">
              <li className={(location.pathname == '/preferance')? 'menu10 active' : 'menu10'}>Team Preferences</li>
            </Link>
            <Link to='/TeamSettingHome'>
            <li className={(location.pathname == '/TeamSettingHome')? 'menu11 active' : 'menu11'}>Team Settings</li>
            </Link>
            <Link to='/TeamStatistics'>
            <li className={(location.pathname == '/TeamStatistics')? 'menu11 active' : 'menu11'}>Team Statistics</li>
            </Link>
            <Link to='/TeamOrganizer'>
            <li className={(location.pathname == '/TeamOrganizer')? 'menu12 active' : 'menu12'}>Tournament Organizer</li>
            </Link>
            <Link to = "/TeamLiabilityWaiver">
          <li className={(location.pathname == '/TeamLiabilityWaiver')? 'menu11 active' : 'menu11'}>Liability Waiver</li>
          </Link>
            <Link to="/TeamPayment">
              <li className={(location.pathname == '/TeamPayment')? 'menu12 active' : 'menu12'}>Team Payment</li>
            </Link>
           
            {/* <li><a href="#" className="menu13">Team Store</a></li>
            <li><a href="#" className="menu14">Website Adminis tration</a></li>
            <li><a href="#" className="menu15">player Liability Waiver</a></li>
            <li><a href="#" className="menu16" >Invoicing</a></li> */}
          </ul>
          :
          
          <ul>
          <Link to="/">
            <li className={(location.pathname == '/')? 'menu1 active' : 'menu1'}>Team Home</li>
          </Link>
          <Link to="/teamroster">
            <li className="menu2">Team Roster</li>
          </Link>
          <Link to="/playerschdule">
          <li className="menu3">Team Schedule</li>
          </Link>
          <Link to="/TeamAvailability">
          <li className="menu4">Player Availability</li>
          </Link>
          <Link to="/teamshop">
            <li className="menu5">Team Shop</li>
          </Link>
          <Link to="/ScoreKeeper">
            <li className="menu6">Score Keeper</li>
            </Link>
          <Link to="/playerassignments">
            <li className="menu7">Player Assignment</li>
          </Link>
          <Link to="/playermedia">
          <li className="menu8">Player Media</li>
          </Link>
          <li className="menu9">Player Messages</li>
          <Link to="/preferance">
            <li className={(location.pathname == '/preferance')? 'menu10 active' : 'menu10'}>Player Preferences</li>
          </Link>
          <Link to = "liabilitywaiver">
          <li className={(location.pathname == '/liabilitywaiver')? 'menu11 active' : 'menu11'}>Liability Waiver</li>
          </Link>
          <Link to="/payment">
          <li className={(location.pathname == '/payment')? 'menu12 active' : 'menu12'} >Team Payments</li>
          </Link>
          
        </ul>
          }
          
        </div>
      </div>
    </div>
  );
}

export default SideMenuComponents;
