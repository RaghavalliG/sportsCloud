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
import Modal from "react-bootstrap/Modal";
import BigUserProfile from "../../../images/big-user-profile.png";
import axios from "axios";
import Delect from "../../../images/delect.png";
import pencil from "../../../images/pencil.png";
import Sizes from "./Sizes";

function ManagerTeamShop(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [dropdown, setDropdown] = useState([]);

  const [teamDropdown, setTeamDropdown] = useState("");
  const [shopData, setShopData] = useState([]);
  const [modalValue, setModalValue] = useState(false);
  const [image, Profile] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [jursey, setJursey] = useState("");
  const [size, setSize] = useState("");
  const [desciption, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [material, setMaterial] = useState("");
  const [teamId, setTeamID] = useState("");
  const [team, setTeam] = useState([]);
  const [profilePic, setProfilePic] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [modeValue, setModeValue] = useState(false);
  const [uid, setUId] = useState("");
  const [id, setId] = useState("");
  const [pid, setpId] = useState("");
  const [pi, setPi] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reloadKey, setReloadKey] = useState(1);

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
    updateProfile();
    dropdownMenu();
    setTeamDropdown();
    teamShopData();
    // addShopData()
    // updateProduct()
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/");
  };
  const pic = "https://nodeserver.mydevfactory.com:1447/";
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
          setProfilePic(res.response_data);
        }
      );
    }
  };

  const dropdownMenu = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let header = {
        authToken: user.authtoken,
      };
      //console.log('user',user)

      Network(
        "api/my-team-list?team_manager_id=" + user._id,
        "GET",
        header
      ).then(async (res) => {
        console.log("dropdown----", res);
        if (res.response_code == 4000) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
        setDropdown(res.response_data);

        teamShopData(res.response_data[0]._id);
      });
    }
  };

  // const teamShopData = (id) => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user) {
  //     let header = {
  //       'authToken': user.authtoken

  //     }
  //     console.log('user', user)

  //     console.log("id----------->", id)

  //     Network('api/team-store-product-list?manager_id=' + user._id + '&team_id=' + id, 'GET', header)
  //       .then(async (res) => {
  //         console.log("teamShopData----", res)

  //         if (res.response_code == 4000) {
  //           dispatch(logoutUser(null))
  //           localStorage.removeItem("user");
  //           history.push("/")
  //           toast.error(res.response_message)
  //         }
  //         setShopData(res.response_data.docs)

  //       })
  //   }
  // }

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

        if (res.response_code == 400) {
          dispatch(logoutUser(null));
          localStorage.removeItem("user");
          history.push("/");
          toast.error(res.response_message);
        }
        setShopData(res.response_data);
      });
    }
  };

  const change = (event) => {
    console.log("event", event.target.value);
    setTeamDropdown(event.target.value);
    teamShopData(event.target.value);
  };
  // const addShopData = async () => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const formData = new FormData();
  //   formData.append('team_id', teamDropdown);
  //   formData.append('name', name);
  //   formData.append('jersey_number', jursey);
  //   formData.append('description', desciption);
  //   formData.append('price', price);
  //   formData.append('brand ', brand);
  //   formData.append('color', color);
  //   formData.append('material ', material);
  //   formData.append('size', size);
  //   formData.append('image', image);
  //   const requestOptions = {
  //     method:"POST",
  //       headers: {
  //           'x-access-token': user.authtoken
  //       },

  //   };
  //   console.log("image--> ",image)
  //   axios('https://nodeserver.mydevfactory.com:1447/api/add-store-image',
  //   {
  //     method:"POST",
  //     headers:{
  //         "Content-Type": "multipart/form-data",
  //         'x-access-token': user.authtoken

  //     },
  //     data:formData
  // })
  //       .then((res) => {
  //           console.log("edit shop Image", res)
  //           if(res.status==200){
  //               toast.success("Add Succecfull")
  //               console.log("Add Image",res)
  //               teamShopData(teamDropdown==null?dropdown[0]._id :teamDropdown)

  //           }

  //           if (res.response_code == 4000) {
  //               dispatch(logoutUser(null))
  //               localStorage.removeItem("user");
  //               history.push("/")
  //               toast.error(res.response_message)
  //           }
  //       })

  // }

  const addShopData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      createdByManagerId: user._id,
      name: name,
      category: category,
      description: desciption,
      price: price,
      sizes: size,
    };
    console.log("78787", data);
    axios({
      method: "post",
      url: "https://nodeserver.mydevfactory.com:1448/api/addProduct",
      headers: {
        "Content-Type": "application/json",
        token: user.authtoken,
      },
      data: data,
    }).then((res) => {
      console.log("edit shop Image", res);
      if (res.status == 200) {
        toast.success("Add Succecfull");
        console.log("Add Image", res);
        teamShopData();
      }

      if (res.response_code == 4000) {
        dispatch(logoutUser(null));
        localStorage.removeItem("user");
        history.push("/");
        toast.error(res.response_message);
      }
    });
  };
  const getSize = (data) => {
    console.log(data);
    setSize(data);
    setQuantity(data);
  };

  const handleChange = (event) => {
    console.log(
      "URL.createObjectURL(event.target.files[0])---->",
      URL.createObjectURL(event.target.files[0])
    );
    Profile(event.target.files[0]);
    // addShopData(event.target.files[0])
  };
  const save = () => {
    addShopData();
    setModalValue(false);
  };

  const deleteShopData = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("id-------------->", id);
    const a = window.confirm("Are you sure you wish to delete this Data?");
    console.log("delete click");
    if (a == true) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.authtoken,
        },
        body: JSON.stringify({
          productId: id,
        }),
      };
      fetch(
        "https://nodeserver.mydevfactory.com:1448/api/deleteProductById",
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          console.log("delete shop  data", res);
          if (res.response_code == 2000) {
            console.log("deleted data", res);
            const data = shopData;
            // teamShopData(teamDropdown==null?dropdown[0]._id :teamDropdown)
            // teamShopData();
            setShopData({
              ...shopData,
              data: data.filter((el) => el.id !== id),
            });
            setReloadKey(Math.random());
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

  const updateModalValue = (pi, pId) => {
    setModeValue(true);
    setpId(pId);
    setPi(pi);
    console.log(pi);
    console.log("shopdata-------->", shopData[pi]);
    setId(shopData[pi]?._id);
    setName(shopData[pi]?.name);
    setCategory(shopData[pi]?.category);
    setDescription(shopData[pi]?.description);
    setPrice(shopData[pi]?.price);
    setSize(shopData[pi]?.sizes);
  };

  //   const updateProduct = () => {
  //     const user = JSON.parse(localStorage.getItem('user'));
  //     const formData = new FormData();
  //     formData.append('image', image ==null ? shopData[id].image :image );
  //     formData.append('team_id', teamDropdown==null ? dropdown[0]._id :teamDropdown);
  //     formData.append('name', name ==null ? shopData[id].name :name);
  //     formData.append('jersey_number', jursey ==null ? shopData[id].jersey_number :jursey);
  //     formData.append('description  ', desciption ==null ? shopData[id].description :desciption);
  //     formData.append('price', price ==null ? shopData[id].price :price);
  //     formData.append('brand  ', brand ==null ? shopData[id].brand :brand);
  //     formData.append('color', color ==null ? shopData[id].color : color);
  //     formData.append('material ', material ==null ? shopData[id].material : material );
  //     formData.append('size', size ==null ? shopData[id].size :size);
  //     formData.append('id', uid );
  //     console.log("team dropdown",teamDropdown==null?dropdown[0]._id :teamDropdown)
  //     console.log("name--->",shopData[id].name)
  //     console.log("brand--->",brand)
  //     const requestOptions = {
  //       method:"POST",
  //         headers: {
  //             'x-access-token': user.authtoken
  //         },

  //     };
  //     console.log("formdata ",formData)
  //     axios('https://nodeserver.mydevfactory.com:1447/api/edit-store-image',
  //     {
  //       method:"POST",
  //       headers:{
  //           "Content-Type": "multipart/form-data",
  //           'x-access-token': user.authtoken

  //       },
  //       data:formData
  //   })
  //         .then((res) => {
  //             console.log("edit shop Image", res)
  //             if(res.status==200){
  //                 toast.success("Edit Succecfull")
  //                 console.log("edit Image",res)
  //                 setModeValue(false)
  //                 teamShopData(teamDropdown==null?dropdown[0]._id :teamDropdown)
  //             }

  //             if (res.response_code == 4000) {
  //                 dispatch(logoutUser(null))
  //                 localStorage.removeItem("user");
  //                 history.push("/")
  //                 toast.error(res.response_message)
  //             }
  //         })

  // }

  const updateProduct = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      productId: pid,
      name: name,
      category: category,
      description: desciption,
      price: price,
      sizes: size,
    };
    console.log("098765678990", data);

    axios({
      method: "post",
      url: "https://nodeserver.mydevfactory.com:1448/api/editProductDetails",
      headers: {
        "Content-Type": "application/json",
        token: user.authtoken,
      },
      data: data,
    }).then((res) => {
      console.log("edit shop Image", res);
      if (res.status == 200) {
        toast.success("Edit Succecfull");
        console.log("edit Image", res);
        setModeValue(false);
        teamShopData();
      }

      if (res.response_code == 4000) {
        dispatch(logoutUser(null));
        localStorage.removeItem("user");
        history.push("/");
        toast.error(res.response_message);
      }
    });
  };

  console.log("dta--->", shopData);

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
                <select onChange={change}>
                  {dropdown?.map((dropdown) => {
                    return (
                      <option value={dropdown._id}>{dropdown.team_name}</option>
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
                    <li>
                      <a className="dropdown-item" href="#">
                        Jayanta Karmakar
                      </a>
                    </li>
                    <Link to={{ pathname: "/MyAccount" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          My Account
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/Credit" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Credits
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/Household" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          My HouseHold
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/ManageTeam" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Manage My Team
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/Biling" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Biling & Plans
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/CreateTeam" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Create New Team
                        </a>
                      </li>
                    </Link>
                    <Link to={{ pathname: "/SignOut" }}>
                      <li>
                        <a className="dropdown-item active" href="#">
                          Sign Out
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="profile-head">
                <div className="profile-head-name">
                  {user?.fname + " " + user?.lname}
                </div>
                <div className="profile-head-img">
                  {profilePic?.profile_image == null ? (
                    <img src={BigUserProfile} alt="" />
                  ) : (
                    <img src={`${pic1}${profilePic?.profile_image}`} alt="" />
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

            <div className="team-shop-page">
              {/* <div
                className="my-order-section"
                onClick={() => history.push("./Order")}
              >
                <a href="#">My Orders</a>
              </div> */}
              <div className="team-shop-list-box">
                <div className="sort-by-section">
                  <div className="sort-by-section-main">
                    <div
                      className="my-order-section"
                      onClick={() => setModalValue(true)}
                    >
                      <a href="#">Add Product</a>
                    </div>
                  </div>
                </div>

                <div className="team-shop-list-main">
                  <Modal show={modalValue}>
                    <Modal.Body>
                      <div className="prefarance-form playerinfo-form">
                        <h1 className="m-title">Add Product</h1>
                        <div className="row">
                          {/* <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <h2>Team</h2>

                              <select onChange={change} className="input-select">
                                <option>Select A Team</option>
                                {dropdown?.map((dropdown) => {
                                  return (
                                    <option value={dropdown._id}>{dropdown.team_name}</option>
                                  )
                                })}
                              </select>

                            </div>
                          </div> */}
                          {/* <div className="col-md-12">
                            <div className="prefarance-form-list"> */}
                          {/* <h2>manager id</h2> */}
                          {/* <input type="text" className="input-select" onChange={(e) => setName(e.target.value)} /> */}
                          {/* <p>{user?._id}</p> */}
                          {/* </div>
                          </div> */}

                          <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <label className="input-label">Name</label>
                              <input
                                type="text"
                                className="input-select"
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <label className="input-label">Category</label>
                              {/* <input type="text" className="input-select" onChange={(e) => setCategory(e.target.value)} /> */}
                              <select
                                className="input-select"
                                onChange={(e) => setCategory(e.target.value)}
                              >
                                <option>Select Category</option>
                                <option value="full_zip_hoodie">
                                  Full Zip Hoodie
                                </option>
                                <option value="jerseys">Jerseys</option>
                                <option value="warm_up_jacket">
                                  Warm Up Jacket
                                </option>
                                <option value="jersey_shorts">
                                  Jersey Shorts
                                </option>
                                <option value="shirt">Shirt</option>
                                <option value="swingman_team_jersey">
                                  Swingman Team Jersey
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <label className="input-label">Description</label>
                              <input
                                type="text"
                                className="input-select"
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <label className="input-label">Price</label>
                              <input
                                type="text"
                                className="input-select"
                                onChange={(e) => setPrice(e.target.value)}
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <h2>Brand</h2>
                              <input type="text" className="input-select" onChange={(e) => setBrand(e.target.value)} />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <h2>Color</h2>
                              <select className="input-select" onChange={(e) => setColor(e.target.value)}>
                                <option>Select Color</option>
                                <option>RED</option>
                                <option>BLUE</option>
                                <option>WHITE</option>
                                <option>BLACK</option>
                                <option>YELLOW</option>

                              </select>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <h2>Material</h2>
                              <input type="text" className="input-select" onChange={(e) => setMaterial(e.target.value)} />
                            </div>
                          </div> */}

                          {/* <div className="col-md-6">
                            <div className="prefarance-form-list">
                              <h2>Size</h2>

                              <select className="input-select" onChange={(e) => setSize(e.target.value)}>
                                <option>Select Size</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                                <option>2XL</option>
                                <option>3XL</option>
                              </select>
                            </div>
                          </div>
                          <div className='col-md-6'>
                          <div className="prefarance-form-list">
                          <h2>quantity</h2>
                          <input type="text" className="input-select" onChange={(e) => setQuantity(e.target.value)} />

                          </div>
                          </div>
                          <button style={{ color: "red", fontSize: "15px", float: "right" }}>Add More..</button> */}
                          <div className="col-md-12">
                            <Sizes getSize={getSize} />
                          </div>
                          {/* <div className="col-md-12">
                            <div className="update-team-photo" style={{ width: "100%" }}>
                              Choose Image
                              <input type="file" name='img' onChange={(event) => handleChange(event)} />

                            </div>
                          </div> */}
                          <div className="col-md-12">
                            <div className="prefarance-form-list text-center">
                              <button
                                className="add-links"
                                onClick={() => setModalValue(false)}
                              >
                                CANCEL
                              </button>
                              <button
                                className="add-links"
                                style={{
                                  backgroundColor: "#181717",
                                  marginLeft: "5px",
                                }}
                                onClick={save}
                              >
                                SAVE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                  {
                    /* {shopData.length == 0 ?
                    <div className="team-shop-list-main">
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
                      </div>



                    </div>



                    : */
                    // shopData.map((data, id) => {
                    shopData?.map((data, id) => {
                      return (
                        <div key={reloadKey} className="team-shop-product-box">
                          <div className="team-shop-product-img">
                            <Link
                              to={{ pathname: "/ProductDetails", state: data }}
                            >
                              {data.image == null ? (
                                <img src={listImage} alt="" />
                              ) : (
                                // <img src={`${pic}${data.image}`} alt="" style={{height:"100%",width:"100%"}} />}
                                <img src={data.image} alt="" />
                              )}
                            </Link>
                          </div>
                          <div className="team-shop-product-text">
                            <h2 className="product-title">{data.brand}</h2>
                            <p className="product-description">
                              {data.description}
                            </p>
                            <div className="product-price d-flex">
                              ${data.price}
                              <div className="product-action">
                                {data.size}
                                <img
                                  src={pencil}
                                  alt=""
                                  className="edit-icon"
                                  onClick={(e) =>
                                    updateModalValue(id, data._id)
                                  }
                                />
                                <img
                                  src={Delect}
                                  onClick={() => deleteShopData(data._id)}
                                  alt="#"
                                />

                                {/* <button data-toggle="modal" data-target="#assignmentdelect" onClick={(e) =>  deleteShopData(data._id)} ><img src={Delect} style={{ marginLeft: "70%", marginRight: "10px", background: "orangered" }} /></button>
                              <button id={shopData._id} onClick={(e) => updateModalValue(id, data._id)}><img src={pencil} /></button> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }

                  {modeValue && shopData.length > 0 ? (
                    <Modal
                      show={modeValue}
                      style={{ position: "absolute", top: "206px" }}
                    >
                      <Modal.Body>
                        shopData
                        <div className="prefarance-form playerinfo-form">
                          <h1 style={{ color: "red", fontWeight: "bolder" }}>
                            {" "}
                            Edit PRODUCT
                          </h1>
                          <div className="row">
                            {/* <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <h2>Product Id</h2>
                              <input type="text" className="input-select" onChange={(e) => setId(e.target.value)}  defaultValue={shopData[pi]?._id}/>

                            </div>
                          </div> */}

                            <div className="col-md-12">
                              <div className="prefarance-form-list">
                                <h2>Name</h2>
                                <input
                                  type="text"
                                  className="input-select"
                                  onChange={(e) => setName(e.target.value)}
                                  defaultValue={shopData[pi]?.name}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="prefarance-form-list">
                                <h2>Category</h2>
                                <input
                                  type="text"
                                  className="input-select"
                                  onChange={(e) => setJursey(e.target.value)}
                                  defaultValue={shopData[pi]?.category}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="prefarance-form-list">
                                <h2>Description</h2>
                                <input
                                  type="text"
                                  className="input-select"
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  defaultValue={shopData[pi]?.description}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="prefarance-form-list">
                                <h2>Price</h2>
                                <input
                                  type="text"
                                  className="input-select"
                                  onChange={(e) => setPrice(e.target.value)}
                                  defaultValue={shopData[pi]?.price}
                                />
                              </div>
                            </div>
                            {/* <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <h2>Brand</h2>
                              <input type="text" className="input-select" onChange={(e) => setBrand(e.target.value)} defaultValue={shopData[id].brand}/>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <h2>Color</h2>
                              <select className="input-select" onChange={(e) => setColor(e.target.value)} defaultValue={shopData[id].color}>
                              <option>{shopData[id].color}</option>
                                <option>RED</option>
                                <option>BLUE</option>
                                <option>WHITE</option>
                                <option>BLACK</option>
                                <option>YELLOW</option>

                              </select>
                            </div>
                          </div> */}
                            {/* <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <h2>Material</h2>
                              <input type="text" className="input-select" onChange={(e) => setMaterial(e.target.value)} defaultValue={shopData[id].material}/>
                            </div>
                          </div> */}
                            {/* <div className="col-md-12">
                            <div className="prefarance-form-list">
                              <h2>Size</h2>

                              <select className="input-select" onChange={(e) => setSize(e.target.value)} defaultValue={shopData[id].size}>
                               <option>{shopData[id].size}</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                                <option>2XL</option>
                                <option>3XL</option>
                              </select>
                            </div>
                          </div> */}
                            {/* <Sizes getSize={getSize}/> */}
                            {/* <div className="col-md-12">
                            <div className="update-team-photo" style={{ width: "100%" }}>
                              Choose Image
                              <input type="file" name='img' onChange={(event) => handleChange(event)} />

                            </div>
                          </div> */}
                          </div>
                        </div>
                        <button
                          className="add-links"
                          style={{ margin: "10px" }}
                          onClick={() => setModeValue(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="add-links"
                          style={{ margin: "10px", backgroundColor: "#1d1b1b" }}
                          onClick={(e) => updateProduct(e)}
                          // onClick={updateProduct(pid)}
                        >
                          Update
                        </button>
                      </Modal.Body>
                    </Modal>
                  ) : (
                    ""
                  )}
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

export default ManagerTeamShop;
