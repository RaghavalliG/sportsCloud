import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
  useLocation,
} from "react-router-dom";
import listImage from "../../../images/list-pro1.png";
import "../../../Utils/css/style.css";
import "../../../Utils/css/responsive.css";
import "../../../Utils/css/bootstrap.min.css";
import "../../../Utils/css/bootstrap-datepicker.css";
import TeamList from "../../../images/team-list.png";
import SideMenuComponents from "../../../Components/SideMenu";
import flag from "../../../images/flag.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Redux/Actions/auth";
import { Network } from "../../../Services/Api";
import BigUserProfile from "../../../images/big-user-profile.png";
import { ToastContainer, toast } from "react-toastify";

const ProductDetails = () => {
  const { state } = useLocation();
  console.log("state value", state);
  // const [sizes,setSizes] = useState(state.size)
  // const pic = 'https://nodeserver.mydevfactory.com:1447/'
  const history = useHistory();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState([]);
  const [teamDropdown, setTeamDropDown] = useState("");
  const [profilePic, setProfilePic] = useState([]);
  const [loader, setLoader] = useState(false);

  const pic = "https://nodeserver.mydevfactory.com:1448/";

  const pic1 = "https://nodeserver.mydevfactory.com:1448/profilepic/";
  useEffect(() => {
    // let user = userdata && userdata._id ? true : false;
    // console.log("userMe===>", user);
    // setUser(user);
    // // console.log("USerData", userdata);
    // const userLocal = JSON.parse(localStorage.getItem("user"));
    // console.log("userData after login--->", userLocal)
    // let userD = userLocal && userLocal._id ? true : false;
    // setUser(userD);
    // setUserData(userLocal);
    // // teamRoster();
    dropdownMenu();
    // setTeamDropDown()
    updateProfile();
  }, []);
  // const pic1 = 'https://nodeserver.mydevfactory.com:1448/profilepic/'

  const handleLogout = () => {
    dispatch(logoutUser(null));
    localStorage.removeItem("user");
    // setUserData(null);
    history.push("/");
  };
  const dropdownMenu = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    // console.log(user);
    if (user) {
      let header = {
        token: user.authtoken,
      };
      // console.log('user',header)

      Network(
        "api/getAllTeamName?teamManagerId=" + user._id,
        "get",
        header
      ).then(async (res) => {
        console.log("dropdown----", res);
        if (res.response_code == 400) {
          // dispatch(logoutUser(null))
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
        setDropdown(res.response_data);

        // teamRoster(res.response_data[0].team_id);
      });
    }
  };

  const updateProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        token: user.authtoken,
      };
      console.log("user", user);

      Network("api/getUserDetailsById?user_id=" + user._id, "GET", header).then(
        async (res) => {
          console.log("new Profile Pic----", res);
          setProfilePic(res.response_data.userDetailsObj);
          setLoader(true);
        }
      );
    }
  };

  const change = (event) => {
    console.log("event", event);
    console.log("event", event.target.name);
    console.log("event", event.target.id);
    console.log("event", event.target.value);
    setTeamDropDown(event.target.value);
    console.log(teamDropdown);
    // setPlayer([])
    // teamRoster(event.target.value);
  };

  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <SideMenuComponents manger="manger" />
          <div className="dashboard-main-content">
            <div className="dashboard-head">
              <div className="teams-select">
                <button
                  className="create-new-team"
                  onClick={() => {
                    history.push("/CreateTeam");
                  }}
                >
                  Create New Teams
                </button>
                <select
                  onChange={change}
                  value={
                    teamDropdown == "" ? dropdown[0]?.team_id : teamDropdown
                  }
                >
                  {dropdown?.map((dropdown) => {
                    return (
                      <option
                        key={dropdown.team_id}
                        id={dropdown.team_id}
                        name={dropdown.team_name}
                        value={dropdown.team_id}
                      >
                        {dropdown.team_name}
                      </option>
                    );
                  })}
                </select>
                <div className="dropBtn">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "#2C2C2C", border: "none" }}
                  >
                    ACCOUNT
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                    style={{
                      backgroundColor: "#484848",
                      listStyle: "none",
                      margin: "14px",
                    }}
                  >
                    <li className="dropdown-item">
                      {profilePic?.fname + " " + profilePic?.lname}{" "}
                    </li>
                    <Link to={{ pathname: "/MyAccount" }}>
                      <li className="dropdown-item">My Account </li>
                    </Link>
                    <Link to={{ pathname: "/Credit" }}>
                      <li className="dropdown-item">Credits </li>
                    </Link>
                    <Link to={{ pathname: "/Household" }}>
                      <li className="dropdown-item">My HouseHold </li>
                    </Link>
                    <Link to={{ pathname: "/ManageTeam" }}>
                      <li className="dropdown-item">Manage My Team </li>
                    </Link>
                    <Link to={{ pathname: "/Biling" }}>
                      <li className="dropdown-item">Biling & Plans </li>
                    </Link>
                    <Link to={{ pathname: "/CreateTeam" }}>
                      <li className="dropdown-item">Create New Team </li>
                    </Link>
                    <Link to={{ pathname: "/SignOut" }}>
                      <li className="dropdown-item active">Sign Out </li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="profile-head">
                {loader ? (
                  <div className="profile-head-name">
                    {profilePic?.fname + " " + profilePic?.lname}
                  </div>
                ) : (
                  <div className="profile-head-name">Loading...</div>
                )}

                <div className="profile-head-img">
                  {profilePic?.profile_image == null ? (
                    <img src={BigUserProfile} alt="" />
                  ) : (
                    <img src={`${profilePic?.profile_image}`} alt="ser" />
                  )}
                </div>
              </div>
              <div className="login-account">
                <ul>
                  <li>
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#myModallogin"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="prefarance-box player-info"
              style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}
            >
              {/* <SideMenuComponents manger="manger" /> */}

              <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                  <div className="prefarance-tab-content">
                    <div className="prefarance-form playerinfo-form">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="prefarance-form-list">
                            <img
                              src={`${state.image}`}
                              alt=""
                              style={{ width: "100%", padding: "10px" }}
                            />
                          </div>
                          <div style={{ display: "flex", marginLeft: "10%" }}>
                            <div className="prefarance-form-list">
                              <img
                                src={`${state.image}`}
                                alt=""
                                className="imgSize"
                              />
                            </div>
                            <div className="prefarance-form-list">
                              <img
                                src={`${state.image}`}
                                alt=""
                                className="imgSize"
                              />
                            </div>
                            <div className="prefarance-form-list">
                              <img
                                src={`${state.image}`}
                                alt=""
                                className="imgSize"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-12">
                              <p style={{ color: "white", fontSize: "Larger" }}>
                                Officially Licensed Gear
                              </p>
                              <p
                                style={{
                                  color: "white",
                                  fontSize: "Larger",
                                  fontWeight: "bolder",
                                  paddingTop: "15px",
                                  paddingBottom: "15px",
                                }}
                              >
                                {state.description}
                              </p>
                              <p style={{ color: "green", fontSize: "Larger" }}>
                                {" "}
                                In Stock - This item will ship within two
                                business days.
                              </p>
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "30px",
                                  paddingTop: "20px",
                                  paddingBottom: "20px",
                                  fontWeight: "bolder",
                                }}
                              >
                                ${state.price}
                              </span>
                              {/* <p style={{ color: "white", fontSize: "Larger" }}>Regular: $109.99</p> */}
                              {/* <p style={{ color: "green", fontSize: "Larger", paddingTop: "25px" }}>You Save: $27.50 on select sizes</p> */}
                            </div>
                            <div
                              className="row"
                              style={{
                                marginTop: "10%",
                                backgroundColor: "gray",
                                padding: "4%",
                                borderRadius: "10px",
                              }}
                            >
                              <div className="col-md-12">
                                <span style={{ paddingRight: "63%" }}>
                                  Size
                                </span>{" "}
                                <span style={{ color: "red" }}>
                                  {" "}
                                  Size Chart
                                </span>
                              </div>
                              <div className="col-md-12">
                                <div className="prefarance-form-list">
                                  <div style={{ display: "flex" }}>
                                    {/* <div className="sizebox">{state.size}<br></br> */}
                                    {
                                      // let sizes = state.size;
                                      state.sizes?.map((siz) => {
                                        console.log(siz);
                                        return (
                                          <div>
                                            <div class="sizebox">
                                              {siz.size}
                                              <br></br>{" "}
                                            </div>
                                            {`${siz.quantity} left`}
                                          </div>
                                        );
                                      })
                                    }
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-md-4">
                                                                <div className="prefarance-form-list">
                                                                    <label >Jursey No</label>
                                                                    <input type="text" className="input-select" defaultValue={state.jersey_number} />
                                                                </div>
                                                            </div> */}
                              {/* <div className="col-md-4">
                                                <div className="prefarance-form-list">
                                                    <label >Quantity</label>
                                                    <input type="number" className="input-select" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="prefarance-form-list">
                                                    <label >  </label>
                                                    <button className="Addcart">Add To Cart</button>
                                                </div>
                                            </div> */}
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="prefarance-form-list">
                                  <label>Shipping</label>
                                  <ul style={{ color: "white" }}>
                                    <li>
                                      This item will ship within two business
                                      days.
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="prefarance-form-list">
                                  <label>Details</label>
                                  <ul style={{ color: "white" }}>
                                    <li>Product ID: 3231566</li>
                                    <li>
                                      Fit: Men's Nike Swingman Jerseys have an
                                      athletic cut. For a looser fit, we
                                      recommend ordering one size larger than
                                      you normally wear.
                                    </li>
                                    <li>Material: 100% Recycled Polyester</li>
                                    <li>
                                      Nike Dry fabrics move sweat from your skin
                                      for quicker evaporation – helping you stay
                                      dry, comfortable and focused on the task
                                      at hand
                                    </li>
                                    <li>
                                      Dri-FIT ® technology wicks away moisture
                                    </li>
                                    <li>Rib-knit collar and arms</li>
                                    <li>
                                      Woven authentic Swingman jersey jock tag
                                    </li>
                                    <li>Back neck taping</li>
                                    <li>
                                      Men's Nike Swingman Jerseys have an
                                      athletic cut. For a looser fit, we
                                      recommend ordering one size larger than
                                      you normally wear
                                    </li>
                                    <li>
                                      Heat-sealed fabric applique graphics
                                    </li>
                                    <li>Machine wash, tumble dry low</li>
                                    <li>Tagless Collar</li>
                                    <li>Officially licensed</li>
                                    <li>Imported</li>
                                    <li>Brand: Nike</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="prefarance-form-list">
                                  <label>Details</label>
                                  <ul style={{ color: "white" }}>
                                    <li>
                                      When you put on this Wendell Carter Jr.
                                      Chicago Bulls Icon Swingman team jersey
                                      from Nike, you'll feel like you're out on
                                      the court ready to shoot free throws.
                                      While you're on the court, the Dri-FIT and
                                      Nike Dry technologies built into this
                                      jersey will keep you comfortable by
                                      wicking moisture away from your body.
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div className="col-md-6">
                                                        <div className="prefarance-form-list">
                                                            <label>Links</label>
                                                            <button className="add-links">Add Links</button>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="prefarance-form-list">
                                                            <label>Files</label>
                                                            <button className="add-links">Add Files</button>
                                                        </div>
                                                    </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
