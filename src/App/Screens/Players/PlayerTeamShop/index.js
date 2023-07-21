import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import { Network } from "../../../Services/Api";
import "../../../Utils/css/style.css";
import "../../../Utils/css/responsive.css";
import "../../../Utils/css/bootstrap.min.css";
import "../../../Utils/css/bootstrap-datepicker.css";
import UserProfile from "../../../images/user-profile.png";
import listImage from "../../../images/list-pro1.png";
import SideMenuComponents from "../../../Components/SideMenu";
import Footer from "../../../Components/Footer";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../../../Redux/Actions/auth";
import BigUserProfile from "../../../images/big-user-profile.png";

function PlayerTeamShop(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [shopData, setShopData] = useState([]);
  const [team, setTeam] = useState([]);
  const [profilePic, setProfilePic] = useState([]);

  useEffect(() => {
    // let user = userdata && userdata._id ? true : false;
    // console.log("userMe===>", user);
    setUser(user);
    // console.log("USerData", userdata);
    const userLocal = JSON.parse(localStorage.getItem("user"));
    console.log("userData after login--->", userLocal);
    let userD = userLocal && userLocal._id ? true : false;
    setUser(userD);
    setUserData(userLocal);
    teamSelect();
    teamShopData();
    updateProfile();
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/");
  };
  const pic = "https://nodeserver.mydevfactory.com:1448/";

  const pic1 = "https://nodeserver.mydevfactory.com:1447/profilepic/";

  const updateProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        authToken: user.authtoken,
      };
      console.log("user", user);

      Network("api/get-user-details?user_id=" + user._id, "GET", header).then(
        async (res) => {
          console.log("new Profile Pic----", res);
          if (res.response_code == 4000) {
            dispatch(logoutUser(null));
            localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }
          setProfilePic(res.response_data);
        }
      );
    }
  };

  const teamSelect = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        authToken: user.authtoken,
      };
      console.log("user", user);

      Network(
        "api/player-joined-team-list?player_id=" + user._id,
        "GET",
        header
      ).then(async (res) => {
        console.log("res----", res);
        if (res.response_code == 4000) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }

        setTeam(res.response_data);
      });
    }
  };

  const teamShopData = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("iddddd", id);
    if (user) {
      let header = {
        token: user.authtoken,
      };
      console.log("user", user);

      console.log("id----------->", id);
      // Network('api/team-store-product-list?manager_id=' + user._id + '&team_id=' + id, 'GET', header)
      Network("api/getAllProductDetails", "GET", header).then(async (res) => {
        console.log("teamShopData----", res);

        if (res.response_code == 4000) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
        setShopData(res.response_data);
        // if(res.response_data.length!=0){
        //   teamShopData(res.response_data._id)
        // }
      });
    }
  };

  const change = (event) => {
    console.log("event", event.target.value);
    teamShopData(event.target.value);
  };

  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <SideMenuComponents />
          <div className="dashboard-main-content">
            <div className="dashboard-head">
              <div className="teams-select">
                <select onClick={change}>
                  {team?.map((team) => {
                    return (
                      <option value={team.team_id._id}>
                        {team.team_id.team_name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="profile-head">
                {/* {profilePic.fname ? */}
                <div className="profile-head-name">
                  {" "}
                  {user?.fname + " " + user?.lname}
                </div>{" "}
                :{/* <div className="profile-head-name">Loading...</div> */}
                {/* } */}
                <div className="profile-head-img">
                  {profilePic?.profile_image == null ? (
                    <img src={BigUserProfile} alt="" />
                  ) : (
                    <img src={`${pic1}${profilePic.profile_image}`} alt="" />
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
                  {/* <li><a href="#" data-toggle="modal" data-target="#myModalregister" onClick={handleLogout}>Logout</a></li> */}
                </ul>
              </div>
            </div>

            <div className="team-shop-page">
              <div className="my-order-section">
                <a href="#">My Orders</a>
              </div>
              <div className="team-shop-list-box">
                <div className="sort-by-section">
                  <div className="sort-by-section-main">
                    <label>Sort By</label>
                    <select>
                      <option>Popularity</option>
                      <option>Popularity 2</option>
                      <option>Popularity 3</option>
                    </select>
                  </div>
                </div>

                <div className="team-shop-list-main">
                  {shopData?.length == 0 ? (
                    <div className="team-shop-list-main">
                      <div className="team-shop-product-box">
                        <div className="team-shop-product-img">
                          <Link
                            to={{ pathname: "/AddShopData", state: "GAME" }}
                          >
                            <img src={listImage} alt="" />
                          </Link>
                        </div>
                        <div className="team-shop-product-text">
                          <h2 className="product-title">Nike Edition</h2>
                          <p className="product-description">
                            Men's Chicago Bulls Wendell Carter Jr. Nike Red
                            Swingman Team Jersey
                          </p>
                          <div className="product-price">$82.49</div>
                          <div className="product-size">
                            Size : S, M, L, XL, XXL
                          </div>
                        </div>
                      </div>
                      <div className="team-shop-product-box">
                        <div className="team-shop-product-img">
                          <img src={listImage} alt="" />
                        </div>
                        <div className="team-shop-product-text">
                          <h2 className="product-title">Nike Edition</h2>
                          <p className="product-description">
                            Men's Chicago Bulls Wendell Carter Jr. Nike Red
                            Swingman Team Jersey
                          </p>
                          <div className="product-price">$82.49</div>
                          <div className="product-size">
                            Size : S, M, L, XL, XXL
                          </div>
                        </div>
                      </div>
                      <div className="team-shop-product-box">
                        <div className="team-shop-product-img">
                          <img src={listImage} alt="" />
                        </div>
                        <div className="team-shop-product-text">
                          <h2 className="product-title">Nike Edition</h2>
                          <p className="product-description">
                            Men's Chicago Bulls Wendell Carter Jr. Nike Red
                            Swingman Team Jersey
                          </p>
                          <div className="product-price">$82.49</div>
                          <div className="product-size">
                            Size : S, M, L, XL, XXL
                          </div>
                        </div>
                      </div>
                      <div className="team-shop-product-box">
                        <div className="team-shop-product-img">
                          <img src={listImage} alt="" />
                        </div>
                        <div className="team-shop-product-text">
                          <h2 className="product-title">Nike Edition</h2>
                          <p className="product-description">
                            Men's Chicago Bulls Wendell Carter Jr. Nike Red
                            Swingman Team Jersey
                          </p>
                          <div className="product-price">$82.49</div>
                          <div className="product-size">
                            Size : S, M, L, XL, XXL
                          </div>
                        </div>
                      </div>
                      <div className="team-shop-product-box">
                        <div className="team-shop-product-img">
                          <img src={listImage} alt="" />
                        </div>
                        <div className="team-shop-product-text">
                          <h2 className="product-title">Nike Edition</h2>
                          <p className="product-description">
                            Men's Chicago Bulls Wendell Carter Jr. Nike Red
                            Swingman Team Jersey
                          </p>
                          <div className="product-price">$82.49</div>
                          <div className="product-size">
                            Size : S, M, L, XL, XXL
                          </div>
                        </div>
                      </div>
                      <div className="team-shop-product-box">
                        <div className="team-shop-product-img">
                          <img src={listImage} alt="" />
                        </div>
                        <div className="team-shop-product-text">
                          <h2 className="product-title">Nike Edition</h2>
                          <p className="product-description">
                            Men's Chicago Bulls Wendell Carter Jr. Nike Red
                            Swingman Team Jersey
                          </p>
                          <div className="product-price">$82.49</div>
                          <div className="product-size">
                            Size : S, M, L, XL, XXL
                          </div>
                        </div>
                      </div>
                      <div className="team-shop-product-box">
                        <div className="team-shop-product-img">
                          <img src={listImage} alt="" />
                        </div>
                        <div className="team-shop-product-text">
                          <h2 className="product-title">Nike Edition</h2>
                          <p className="product-description">
                            Men's Chicago Bulls Wendell Carter Jr. Nike Red
                            Swingman Team Jersey
                          </p>
                          <div className="product-price">$82.49</div>
                          <div className="product-size">
                            Size : S, M, L, XL, XXL
                          </div>
                        </div>
                      </div>
                      <div className="team-shop-product-box">
                        <div className="team-shop-product-img">
                          <img src={listImage} alt="" />
                        </div>
                        <div className="team-shop-product-text">
                          <h2 className="product-title">Nike Edition</h2>
                          <p className="product-description">
                            Men's Chicago Bulls Wendell Carter Jr. Nike Red
                            Swingman Team Jersey
                          </p>
                          <div className="product-price">$82.49</div>
                          <div className="product-size">
                            Size : S, M, L, XL, XXL
                          </div>
                        </div>
                      </div>
                      <div className="team-shop-product-box">
                        <div className="team-shop-product-img">
                          <img src={listImage} alt="" />
                        </div>
                        <div className="team-shop-product-text">
                          <h2 className="product-title">Nike Edition</h2>
                          <p className="product-description">
                            Men's Chicago Bulls Wendell Carter Jr. Nike Red
                            Swingman Team Jersey
                          </p>
                          <div className="product-price">$82.49</div>
                          <div className="product-size">
                            Size : S, M, L, XL, XXL
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    shopData?.map((data) => {
                      console.log(data, "=-=-=-=-=-==-=-=-0=-=-=-=-");
                      return (
                        <div className="team-shop-product-box">
                          <div className="team-shop-product-img">
                            {data.image == null ? (
                              <img src={listImage} alt="" />
                            ) : (
                              // <img src={`${pic}${data.image}`} alt="" />}
                              <img src={data.image} alt="" />
                            )}
                          </div>
                          <div className="team-shop-product-text">
                            <h2 className="product-title">{data.brand}</h2>
                            <p className="product-description">
                              {data.description}
                            </p>
                            <div className="product-price">${data.price}</div>
                            <div className="product-size">{data.size}</div>
                          </div>
                        </div>
                      );
                    })
                  )}

                  {/* 
                  <div className="team-shop-product-box">
                    <div className="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div className="team-shop-product-text">
                      <h2 className="product-title">Nike Edition</h2>
                      <p className="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div className="product-price">
                        $82.49
                      </div>
                      <div className="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>

                  <div className="team-shop-product-box">
                    <div className="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div className="team-shop-product-text">
                      <h2 className="product-title">Nike Edition</h2>
                      <p className="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div className="product-price">
                        $82.49
                      </div>
                      <div className="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div className="team-shop-product-box">
                    <div className="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div className="team-shop-product-text">
                      <h2 className="product-title">Nike Edition</h2>
                      <p className="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div className="product-price">
                        $82.49
                      </div>
                      <div className="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div className="team-shop-product-box">
                    <div className="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div className="team-shop-product-text">
                      <h2 className="product-title">Nike Edition</h2>
                      <p className="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div className="product-price">
                        $82.49
                      </div>
                      <div className="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div className="team-shop-product-box">
                    <div className="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div className="team-shop-product-text">
                      <h2 className="product-title">Nike Edition</h2>
                      <p className="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div className="product-price">
                        $82.49
                      </div>
                      <div className="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div> */}
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

export default PlayerTeamShop;
