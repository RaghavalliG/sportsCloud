import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  HashRouter,
} from "react-router-dom";
import listImage from "../../../images/list-pro1.png";
import "../../../Utils/css/style.css";
import "../../../Utils/css/responsive.css";
import "../../../Utils/css/bootstrap.min.css";
import "../../../Utils/css/bootstrap-datepicker.css";
import TeamList from "../../../images/team-list.png";
import SideMenuComponents from "../../../Components/SideMenu";
import flag from "../../../images/flag.png";
import Footer from "../../../Components/Footer";
import { useDispatch } from "react-redux";
import BigUserProfile from "../../../images/big-user-profile.png";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { data } from "jquery";
import { Network } from "../../../Services/Api";
import { logoutUser } from "../../../Redux/Actions/auth";


const Order = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();


  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [profilePic, setProfilePic] = useState([]);
  const [cart, setCart] = useState([]);
  const [sizeDropdown, setSizeDropDown] = useState("");
  const [cartQuantity, setCartQuantity] = useState();

  const pic1 = "https://nodeserver.mydevfactory.com:1447/profilepic/";

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
    // sizeSelect();
    showCart();
    // editCart()
    updateProfile()
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/");
  };
  // const placeOrder=()=>{
  //     const user = JSON.parse(localStorage.getItem('user'));

  //         axios(

  //           "https://nodeserver.mydevfactory.com:1448/api/addProductToCart",
  //           {
  //             method: "post",
  //             headers: {

  //               "token": user?.authtoken,
  //             },
  //             data: {
  //                 userId: user._id,
  //                 productId: state._id,
  //                 productSize:"S"

  //            }
  //         }
  //         ).then((res) => {
  //           // console.log("edit user Image", res);
  //           if (res.status == 200) {

  //             // console.log("edit Image", res);
  //             setCartdata(res.data);
  //             console.log(res.data.response_data
  //                 ,"reponse data565r65656")
  //           }

  //         //   if (res.response_code == 4000) {
  //         //     dispatch(logoutUser(null));
  //         //     localStorage.removeItem("user");
  //         //     history.push("/");
  //         //     toast.error(res.response_message);
  //         //   }
  //         });

  // }

  const updateProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        "token": user.authtoken,
      };
      // console.log("user", user);

      Network("api/getUserDetailsById?user_id=" + user?._id, "GET", header).then(
        async (res) => {
          // console.log("new Profile Pic----", res);
          if (res.response_code == 400) {
            dispatch(logoutUser(null));
            localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }
          setProfilePic(res.response_data.userDetailsObj);
        }
      );
    }
  };


  const showCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios(
      "https://nodeserver.mydevfactory.com:1448/api/getAllProductsCartDetailsByUserId?userId=" +
        user._id,
      {
        method: "get",
        headers: {
          token: user?.authtoken,
        },
      }
    ).then((res) => {
      // console.log("edit user Image", res);
      if (res.status == 200) {
        console.log(res.data.success, "123456789009875432");

        if (res.data.success == true) {
          setCart(res.data?.response_data.getList);
          console.log(res.data.response_data, "reponse data565r65656");
          console.log(cart, "----->>>>");
          setSizeDropDown();
          
        }
        if ((res.data.success = false)) {
          toast.error(res.data.response_message);
        }

        // console.log("edit Image", res);
      }

      //   if (res.response_code == 4000) {
      //     dispatch(logoutUser(null));
      //     localStorage.removeItem("user");
      //     history.push("/");
      //     toast.error(res.response_message);
      //   }
    });
  };

  const removeCart = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const a = window.confirm("Are you sure you wish to delete this Data?");
    if (a == true) {
      axios(
        "https://nodeserver.mydevfactory.com:1448/api/deleteProductsCartDetailsByCartId",
        {
          method: "post",
          headers: {
            token: user?.authtoken,
          },
          data: {
            cartId: id,
          },
        }
      ).then((res) => {
        // console.log("edit user Image", res);
        if (res.status == 200) {
          // console.log("edit Image", res);
          setCart(
            cart.filter((data) => {
              return data.cartId != id;
            })
          );
          showCart();
        }

          if (res.response_code == 4000) {
            dispatch(logoutUser(null));
            localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }
      });
    }
  };

  const removeAll = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const a = window.confirm(
      "Are you sure you wish to delete all the cart item?"
    );
    if (a == true) {
      axios(
        "https://nodeserver.mydevfactory.com:1448/api/deleteAllProductsCartDetailsByUserId",
        {
          method: "post",
          headers: {
            token: user?.authtoken,
          },
          data: {
            userId: user._id,
          },
        }
      ).then((res) => {
        // console.log("edit user Image", res);
        if (res.status == 200) {
          setCart([]);

          // console.log("edit Image", res);
          // setCart(
          //     cart.filter((data) => {
          //         return data.cartId != id;
          //     })
          // );
          showCart();
        }

          if (res.response_code == 4000) {
            dispatch(logoutUser(null));
            localStorage.removeItem("user");
            history.push("/");
            toast.error(res.response_message);
          }
      });
    }
  };

  const editCart = (id, size, constant) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(constant, "show constant 0000/////");
    let requestdata = {};
    if (constant == "size") {
      requestdata = {
        cartId: id,
        userId: user._id,
        productSize: size,
        // quantity:"6"
      };
    } else {
      requestdata = {
        cartId: id,
        userId: user._id,
        // productSize:size,
        quantity: size,
      };
    }

    // if () {
    axios(
      "https://nodeserver.mydevfactory.com:1448/api/editProductsCartDetailsByCartId",
      {
        method: "post",
        headers: {
          token: user?.authtoken,
        },
        data: requestdata,
      }
    ).then((res) => {
      // console.log("edit user Image", res);
      if (res.status == 200) {
        // console.log("edit Image", res);
        // setCart(
        //     cart.filter((data) => {
        //         return data.cartId != id;
        //     })
        // );
        showCart();
      }

        if (res.response_code == 4000) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
    });
    // }
  };
  const change = (event, cartId) => {
    console.log("event+++++++++++++++++++++", event.target.value);
    // setSizeDropDown(event.target.value);
    console.log(cartId, "cartid-------->>>>");
    // teamRoster(event.target.value);
    // setPlayer([]);
    editCart(cartId, event.target.value, "size");
  };

  const incrementQuantity = (cartId,currentQuantity) => {
    // console.log("event+++++++++++++++++++++", event.target.value);
    const newQuantity = currentQuantity + 1
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity} : item
      )
    );
    editCart(cartId, newQuantity, "quantity");
  };

  const decrementQuantity = (cartId,currentQuantity) => {
 
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCart((prevItems) =>
        prevItems.map((item) =>
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
      editCart(cartId, newQuantity, "quantity");
    }

  };

  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <SideMenuComponents />
          <div className="dashboard-main-content">
            <div className="dashboard-head">
              <div className="teams-select">
                {/* <select onClick={change}>
                      {team?.map((team) => {
                        return (
                          <option value={team.team_id._id}>
                            {team.team_id.team_name}
                          </option>
                        );
                      })}
                    </select> */}
              </div>

              <div className="profile-head">
              {console.log(profilePic.lname,"3740000000000000000>>>>")}
                {profilePic?.fname ? (
                  <div className="profile-head-name">
                   
                    {profilePic?.fname + " " + profilePic?.lname}
                  </div>
                ) : (
                  <div className="profile-head-name">{profilePic?.fname} {profilePic?.lname}</div>
                )}
                <div className="profile-head-img">
                  {profilePic?.profile_image == null ? (
                    <img src={BigUserProfile} alt="" />
                  ) : (
                    <img src={profilePic?.profile_image} alt="" />
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
            <div className="cart_wrapper">
              {cart?.length == 0 ? (
                <Card>
                  {console.log(cart?.length, "282382")}
                  <h3 style={{ color: "white" }}> your cart is empty</h3>
                </Card>
              ) : (
                <Row>
                  <Col md={8}>
                    <Card>
                      <button
                        className="btn removeAll"
                        onClick={() => removeAll()}
                      >
                        Remove all
                      </button>
                      {cart?.map((item) => {
                        return (
                          <div className="cart_item">
                            {console.log(
                              item.productImage,
                              "producrimage09000000>>>>"
                            )}
                            <img
                              // src={listImage} alt=""
                              src={item?.productImage}
                              alt={item?.productImage}
                              className="cart_item_img"
                            />

                            <div className="cart_item_content_wrp">
                              <h3 className="crt-itm-nme">
                                {item.productName}
                              </h3>
                              <h3 className="pdt-size">
                                Size:
                                <select
                                  className="form-control"
                                  value={item.productSize}
                                //  value={item.productAvailableSizes.size}
                                  onChange={(event) =>
                                    change(event, item.cartId)
                                  }
                                >
                                  <span className="text-white p-0">
                                    {item.productSize}
                                  </span>

                                  {item.productAvailableSizes.map(
                                    (sizeItem) => {
                                      // setSizeDropDown(sizeItem.size)
                                      // <li key={sizeItem._id}>{sizeItem.size}</li>

                                      return <option>{sizeItem.size}</option>;
                                    }
                                  )}
                                </select>
                              </h3>
                              {/* <h3 className="pdt-size">
                                                                Size:
                                                                <span className="text-white p-0">
                                                                    {item.productSize}
                                                                </span>
                                                            </h3> */}

                              <div className="crt-action">
                                <span className="cursor"  onClick={() => decrementQuantity(item.cartId,item.quantity)}>-</span>
                                <span> {item.quantity}</span>
                                <span className="cursor" onClick={() => incrementQuantity(item.cartId,item.quantity)}>+</span>
                              </div>
                            </div>
                            <div className="cart-price-prt">
                              <button
                                className="btn btn-dlt"
                                onClick={() => removeCart(item.cartId)}
                              >
                                <Trash />
                              </button>
                              <button className="btn btn-dlt">
                                <Pencil />
                              </button>
                              <h3 className="p-price">$ {item.productPrice}</h3>
                            </div>
                          </div>
                        );
                      })}
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card>
                      <div className="price-sum">
                        <span className="sm-txt">Charges</span>
                        <span>$108</span>
                      </div>
                      <div className="price-sum">
                        <span className="sm-txt">Total</span>
                        <span>${cart[cart?.length - 1]?.totalPrice}</span>
                      </div>
                      {console.log(cart.length, "?//////??????")}
                      <Button className="cart-proceed">
                        Proceed to checkout
                      </Button>
                    </Card>
                  </Col>
                </Row>
              )}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Order;
