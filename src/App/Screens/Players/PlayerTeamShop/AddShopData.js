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

import TeamList from "../../../images/team-list.png";
import SideMenuComponents from "../../../Components/SideMenu";
import down_arrow from "../../../images/select-dropdown.png";

import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Accordion from "react-bootstrap/Accordion";
import { Card } from "react-bootstrap";
const AddShopData = () => {
  const [data, setData] = useState(null);
  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [cartData, setCartdata] = useState({});
  const [size, setSize] = useState();
  // const {productId } = useParams()
  // console.log (productId,"product id ====>>>>>>")
  const { state } = useLocation();
  console.log("state value", state);
  const history = useHistory();

  const handleBackButtonClick = () => {
    history.goBack();
  };

  // useEffect(()=>{
  //     const userLocal = JSON.parse(localStorage.getItem("user"))
  //     let userD = userLocal && userLocal._id ? true : false;
  //     setUser(userD);
  //     setUserData(userLocal)
  //     productDitails()

  // },[])

  //  const productDitails = ()=>{
  //     const user = JSON.parse(localStorage.getItem('user'));

  //     axios(

  //       "https://nodeserver.mydevfactory.com:1448/api/getProductDetailsByProductId?"+productId,
  //       {
  //         method: "get",
  //         headers: {

  //           "token": user?.authtoken,
  //         }

  //       }
  //     ).then((res) => {
  //       // console.log("edit user Image", res);
  //       if (res.status == 200) {

  //         // console.log("edit Image", res);
  //         setData(res.data);
  //         console.log(res.data.response_data
  //             ,"reponse data565r65656")
  //       }

  //     //   if (res.response_code == 4000) {
  //     //     dispatch(logoutUser(null));
  //     //     localStorage.removeItem("user");
  //     //     history.push("/");
  //     //     toast.error(res.response_message);
  //     //   }
  //     });
  //  }

  const addToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios("https://nodeserver.mydevfactory.com:1448/api/addProductToCart", {
      method: "post",
      headers: {
        token: user?.authtoken,
      },
      data: {
        userId: user._id,
        productId: state._id,
        productSize: size,
      },
    }).then((res) => {
      // console.log("edit user Image", res);
      if (res.status == 200) {
        console.log(res.data, "=======>>>>>>>");
        console.log(res.data.success, "<<<<<<<>>>>>>>");

        if (res.data.success == false) {
          console.log(res.data, "6565656555");
          console.log(res.response_message, "-+-+-+-+-+-+-+-");

          toast.error(res.data.response_message);
          // window.location.reload();
        }
        if (res.data.success == true) {
          setCartdata(res.data.response_data);
          console.log(res.data.response_data, "reponse data565r65656");

          toast.success(res.data.response_message);
          history.push("/orders");
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <SideMenuComponents />

        <div className="dashboard-main-content">
          <div className="product-details-wrap">
            <div className="top-prod-prt">
              <div className="row">
                <div className="col-md-5">
                  <button
                    className="Addcart bkbtn"
                    onClick={handleBackButtonClick}
                  >
                    Back
                  </button>
                  <div className="prefarance-form-list text-center">
                    <img
                      src={state?.image}
                      alt={state?.image}
                      className="img-fluid prdimg-lg"
                    />
                  </div>
                  <div className="thumb_img_cont">
                    <div className="prefarance-form-list">
                      <img src={state?.image} alt="" className="imgSize" />
                    </div>
                    <div className="prefarance-form-list">
                      <img src={state?.image} alt="" className="imgSize" />
                    </div>
                    <div className="prefarance-form-list">
                      <img src={state?.image} alt="" className="imgSize" />
                    </div>
                  </div>
                </div>

                <div className="col-md-7">
                  <div>
                    <p className="off-txt">Officially Licensed Gear</p>
                    <h1 className="prd-title">
                      Men's Chicago Bulls Wendell Carter Jr. Nike Red Swingman
                      Team Jersey
                    </h1>
                    <p className="in-stk-txt">
                      In Stock - This item will ship within two business days.
                    </p>
                    <div className="prd-price">$82.49</div>
                    <p className="sizetype">Regular: $109.99</p>
                    <p className="in-stk-txt">
                      You Save: $27.50 on select sizes
                    </p>
                  </div>
                  <div className="size-chart-wrp">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="chrt-head">
                          <span className="sz-title">Size</span>
                          <span className="sz-title txt-color">Size Chart</span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="prefarance-form-list">
                          <div className="d-flex mb-3">
                            {state?.sizes.map((item, index) => {
                              console.log(item, "90909090909090");

                              return (
                                <div
                                  key={index}
                                  className={`sizebox ${
                                    size === item.size ? "selected" : ""
                                  }`}
                                  onClick={() => setSize(item.size)}
                                >
                                  {item.size}
                                  {console.log(
                                    item.size,
                                    "//////++++++++------....."
                                  )}
                                </div>
                              );
                            })}
                            {/* <div className="sizebox"><br>
                                                        
                                                        </br>
                                                        </div> */}
                            {/* <div className="sizebox">M<br></br>
                                                        </div>
                                                        <div className="sizebox">L<br></br>
                                                        </div>
                                                        <div className="sizebox">XL<br></br>
                                                        </div>
                                                        <div className="sizebox">2XL<br></br>
                                                        </div>
                                                        <div className="sizebox">3XL<br></br>
                                                        </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <div className="prefarance-form-list">
                          <label>Jursey No</label>
                          <input
                            type="text"
                            className="form-control input-select"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <div className="prefarance-form-list">
                          <label>Quantity</label>
                          <input
                            type="number"
                            className="form-control input-select"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="prefarance-form-list">
                          <button className="Addcart" onClick={addToCart}>
                            Add To Cart
                          </button>
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

            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Shipping
                  <span className="accr-icon">
                    <img src={down_arrow} alt="#" />
                  </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <ul>
                      <li>This item will ship within two business days.</li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Details
                  <span className="accr-icon">
                    <img src={down_arrow} alt="#" />
                  </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <ul style={{ color: "white" }}>
                      <li>Product ID: 3231566</li>
                      <li>
                        Fit: Men's Nike Swingman Jerseys have an athletic cut.
                        For a looser fit, we recommend ordering one size larger
                        than you normally wear.
                      </li>
                      <li>Material: 100% Recycled Polyester</li>
                      <li>
                        Nike Dry fabrics move sweat from your skin for quicker
                        evaporation – helping you stay dry, comfortable and
                        focused on the task at hand
                      </li>
                      <li>Dri-FIT ® technology wicks away moisture</li>
                      <li>Rib-knit collar and arms</li>
                      <li>Woven authentic Swingman jersey jock tag</li>
                      <li>Back neck taping</li>
                      <li>
                        Men's Nike Swingman Jerseys have an athletic cut. For a
                        looser fit, we recommend ordering one size larger than
                        you normally wear
                      </li>
                      <li>Heat-sealed fabric applique graphics</li>
                      <li>Machine wash, tumble dry low</li>
                      <li>Tagless Collar</li>
                      <li>Officially licensed</li>
                      <li>Imported</li>
                      <li>Brand: Nike</li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  Details
                  <span className="accr-icon">
                    <img src={down_arrow} alt="#" />
                  </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <ul>
                      <li>
                        When you put on this Wendell Carter Jr. Chicago Bulls
                        Icon Swingman team jersey from Nike, you'll feel like
                        you're out on the court ready to shoot free throws.
                        While you're on the court, the Dri-FIT and Nike Dry
                        technologies built into this jersey will keep you
                        comfortable by wicking moisture away from your body.
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddShopData;
