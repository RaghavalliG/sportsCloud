import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../style.css";
import order_product from "../assets/image/order-product.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useJwt } from "react-jwt";
import base64url from "base64url";
import { Buffer } from "buffer";
import { Stream } from "stream";
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import Alert from 'react-popup-alert'
// import { createHmac } from "crypto";

// import json_encode

// const token = "Your JWT";


const MyCart = () => {

  // var json_encode = require('json_encode');
  // var createHmac = require('create-hmac');
  const sign = require('jwt-encode');
  // const navigate = useNavigate();

  window.Buffer = window.Buffer || Buffer;

  let [quantity, setQuantity] = useState(1);
  const [today, setDate] = React.useState(new Date());
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [affiliateCode, setAffiliate] = useState('');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  let total = 0;
  const [reloadKey, setReloadKey] = useState(1)
  const [alert, setAlert] = React.useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })
  const locale = 'en';
  const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });


  const handleMinusClick = (value) => {
    console.log(value);
    const foundIndex = cart.findIndex(obj => obj.id === value.id);
    // const foundObject = cart.find(obj => obj.id === value.id);
    
    if (foundIndex !== -1 && value.quantity > 1) {
      cart[foundIndex].quantity = cart[foundIndex].quantity - 1;
      console.log('Object updated:', cart);
      setCart(JSON.parse(JSON.stringify(cart)));
      console.log(cart);
      localStorage.setItem('cart',JSON.stringify(cart)); 
    } else if(foundIndex !== -1 && value.quantity == 1){
      setAlert({
        type: 'error',
        text: 'The product '+cart[foundIndex].name+' is removed',
        show: true
      })
      // alert('The product '+cart[foundIndex].name+' is removed');
      console.log('---------------->')
      const foundObject = cart.find(obj => obj.id === value.id);
      console.log(cart[foundIndex])
      cart.splice(foundIndex,1);
      localStorage.setItem('cart',JSON.stringify(cart));
      
    }else{
      console.log('Object not found');
    }
    // if(value)
    // if (quantity > 1) {
    //   quantity = quantity - 1;
    // }
    // setReloadKey(Math.random());
  };

  const handlePlusClick = (value) => {
    console.log(value);
    
    // const value.id = 2;
    // const newName = 'Updated Object 2';
    const foundIndex = cart.findIndex(obj => obj.id === value.id);
    // const foundObject = cart.find(obj => obj.id === value.id);
    
    if (foundIndex !== -1) {
      cart[foundIndex].quantity = cart[foundIndex].quantity + 1;
      console.log('Object updated:', cart);
      setCart(JSON.parse(JSON.stringify(cart)));
      console.log(cart); 
      localStorage.setItem('cart',JSON.stringify(cart));
    } else {
      console.log('Object not found');
    }

    // quantity = quantity + 1;
    // // localStorage.setItem('cart')
    // setReloadKey(Math.random());
  };

  const handleCreditDebit = () => {
    document.querySelectorAll('#creditDebitCard')[0].style.display = "block";
  }
  useEffect(() => {

    document.querySelectorAll('#creditDebitCard')[0].style.display = "none";
    // let cartlocal = JSON.parse(localStorage.getItem('cart'));
    // cart.push(cartlocal)
    console.log(cart);
  }, [])

  const initialValues = {
    name: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    postalCode: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    affiliateCode: '',
    invoiceNo: Date.now()
  };

  const affillateSchema = yup.object({
    name: yup.string().required('Your name is required'),
    phone: yup.string().required("Mobile Number is required"),
    address: yup.string().required("Address is required"),
    province: yup.string().required("Province is required"),
    district: yup.string().required("district is required"),
    postalCode: yup.string().required("postalCode is required"),
    email: yup.string()
      .required("email is required")
      .email("Email should be in correct format"),
    cardNumber: yup.string().required("Card Number is required"),
    expiryDate: yup.string().required("expiry Date  is required"),
    cvv: yup.string().required("Cvv is required"),
    // amount: yup.string().required("amount is required"),
  });



  const { values, errors, handleChange, handleSubmit, handleBlur, touched } = useFormik({
    // validationSchema:{affillateSchema},
    initialValues: initialValues,
    validationSchema: affillateSchema,
    onSubmit: (values) => {
      console.log(values, 'values...>');


      console.log(cardNumber)
      console.log(expiryDate);
      console.log(cvv);
      
      // values.cardNumber = cardNumber;
      // values.expiryDate = expiryDate;
      // values.cvv = cvv;
      values.affiliateCode = affiliateCode

      //TESTING
      values.merchantID = "764764000009347";
      // secretKey = "0D6A706933AE782A686365CFA7C19160F65E887D55DC9F41729BB13D8B32C10A";

      //LIVE
      // values.merchantID = "764764000009573";
      // secretKey = "C155E4D4A2A68503C878673E9ED0320718F8B0442C28835D556CDEBB1B5AFBFB";

      values.amount = total;
      values.currencyCode = 'USD';
      values.description = 'item 1';
      values.frontendReturnUrl = 'http://localhost:3000/order/thank-you' ;
      values.frontendRedirectMethod = null;
      // let value;

      const PT_dataArray = {
        //MANDATORY PARAMS
        "merchantID": values.merchantID,
        "invoiceNo": values.invoiceNo,
        "description": values.description,
        "amount": values.amount,
        "currencyCode": values.currencyCode,
      }



      const payload = sign(values, '0D6A706933AE782A686365CFA7C19160F65E887D55DC9F41729BB13D8B32C10A');
      console.log(payload);


      const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/*+json' },
        body: JSON.stringify({
          'payload': payload
        })
      };
      if( values.amount <= 50){
        toast.error('Please add Product to Cart')
      }else{

      fetch('https://sandbox-pgw.2c2p.com/payment/4.1/PaymentToken', options)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          var paymentDetails = jwt(response.payload);
          console.log(paymentDetails);
          localStorage. removeItem('cart')
          if (paymentDetails.respCode === '0000') {
            //Redirect to the payment url paymentDetails.webPaymentUrl
            window.location.replace(paymentDetails.webPaymentUrl);

          }
        }
        )
        .catch(err => console.error(err));


    }
  },
  });

  return (
    <div className='site-wrap'>
      <Header />
      <div className='cart-page-inner-banner'>
        <div className='container'>
          <h1 className='page-title'>สินค้าของฉัน</h1>
        </div>
      </div>
      <div className='cart-container-wrap'>
        <div className='container'>
          <form onSubmit={handleSubmit} method='post'>
            <div className='row'>
              <div className='col-lg-7'>

                <div className='card card-shipping-address'>
                  <div className='card-header'>My Shipping Address</div>
                  <div className='card-body'>
                    {/* <form> */}
                    <div className='row'>
                      <div className='col-lg-6'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' className='form-control' id='name'
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <p className="error">
    
                          {errors.name && touched.name  ? (<p className="text-danger">{errors.name}</p>) : null}
                        </p>
                      </div>
                      <div className='col-lg-6'>
                        <label htmlFor='phone'>Phone Number</label>
                        <input type='text' className='form-control' id='phone'
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <p className="error">
                          {errors.phone && touched.phone ? (<p className="text-danger">{errors.phone}</p>) : null}
                        </p>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <label htmlFor='address'>Address</label>
                        <input type='text' className='form-control' id='address'
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <p className="error">
                          {errors.address && touched.address ? (<p className="text-danger">{errors.address}</p>) : null}
                        </p>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-6'>
                        <label htmlFor='province'>Province</label>
                        <select className='form-select' id='province'
                          value={values.province}
                          onChange={handleChange}
                          onBlur={handleBlur}>
                          <option value=''>Select Province</option>
                          <option value='Ontario'>Ontario</option>
                          <option value='Quebec'>Quebec</option>
                          <option value='British Columbia'>
                            British Columbia
                          </option>
                          <option value='Alberta'>Alberta</option>
                          <option value='Manitoba'>Manitoba</option>
                          <option value='Saskatchewan'>Saskatchewan</option>
                          <option value='New Brunswick'>New Brunswick</option>
                          <option value='Nova Scotia'>Nova Scotia</option>
                          <option value='Prince Edward Island'>
                            Prince Edward Island
                          </option>
                          <option value='Newfoundland and Labrador'>
                            Newfoundland and Labrador
                          </option>
                        </select>
                        <p className="error">
                          {errors.province && touched.province ? (<p className="text-danger">{errors.province}</p>) : null}
                        </p>
                      </div>
                      <div className='col-lg-6'>
                        <label htmlFor='district'>District</label>
                        <select className='form-select' id='district'
                          value={values.district}
                          onChange={handleChange}
                          onBlur={handleBlur}>
                          <option value=''>Select District</option>
                          <option value='Toronto'>Toronto</option>
                          <option value='Montreal'>Montreal</option>
                          <option value='Vancouver'>Vancouver</option>
                          <option value='Calgary'>Calgary</option>
                          <option value='Winnipeg'>Winnipeg</option>
                          <option value='Regina'>Regina</option>
                          <option value='Fredericton'>Fredericton</option>
                          <option value='Halifax'>Halifax</option>
                          <option value='Charlottetown'>Charlottetown</option>
                          <option value="St. John's">St. John's</option>
                        </select>
                        <p className="error">
                          {errors.district && touched.district ? (<p className="text-danger">{errors.district}</p>) : null}
                        </p>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-6'>
                        <label htmlFor='postalCode'>Post Code</label>
                        <input type='text' className='form-control' id='postalCode'
                          value={values.postalCode}
                          onChange={handleChange}
                          onBlur={handleBlur} />
                        <p className="error">
                          {errors.postalCode && touched.postalCode ? (<p className="text-danger">{errors.postalCode}</p>) : null}
                        </p>
                      </div>
                      <div className='col-lg-6'>
                        <label htmlFor='email'>Email Address</label>
                        <input type='email' className='form-control' id='email'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <p className="error">
                          {errors.email && touched.email ? (<p className="text-danger">{errors.email}</p>) : null}
                        </p>
                      </div>
                    </div>
                    {/* </form> */}
                  </div>
                </div>

                <div className='card card-payment-method'>
                  <div className='card-header text-color-pink'>ดำเนินการชำระเงิน</div>
                  <div className='card-body'>
                    <div className='btn-groups'>
                      <button type='button' className='btn btn-secondary' onClick={handleCreditDebit}>
                        Credit/Debit Card
                      </button>
                      {/* <form onSubmit={handleSubmit} method='post'> */}
                      <div className="card-body">
                        <div className='row' id="creditDebitCard">

                          <div className='col-lg-12'>

                            <label htmlFor='cardNumber'>Card Number</label>
                            <input
                              type="text"
                              className='form-control'
                              id='cardNumber'
                              placeholder="Card Number"
                              value={values.cardNumber}
                              onChange={handleChange}
                            />
                            <p className="error">
                              {errors.cardNumber && touched.cardNumber ? (<p className="text-danger">{errors.cardNumber}</p>) : null}
                            </p>
                          </div>
                          <div className='col-lg-6'>
                            <label htmlFor='expiryDate'>Expiry Date</label>
                            <input
                              type="text"
                              className='form-control'
                              id='expiryDate'
                              placeholder="Expiry Date"
                              value={values.expiryDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="error">
                              {errors.expiryDate && touched.expiryDate ? (<p className="text-danger">{errors.expiryDate}</p>) : null}
                            </p>
                          </div>
                          <div className='col-lg-6'>
                            <label htmlFor='cvv'>CVV</label>
                            <input
                              type="text"
                              id='cvv'
                              className='form-control'
                              placeholder="CVV"
                              value={values.cvv}
                              onChange={handleChange}
                            />
                            <p className="error">
                              {errors.cvv && touched.cvv ? (<p className="text-danger">{errors.cvv}</p>) : null}
                            </p>
                          </div>
                          <div className='col-lg-6'>
                            <label htmlFor='invoiceNo'>Invoice No</label>
                
                            <input
                              type="text"
                              id="invoiceNo"
                              className='form-control'
                              placeholder="Invoice No"
                              value={values.invoiceNo}
                              onChange={handleChange}
                            />
                            <p className="error">
                              {errors.invoiceNo && touched.invoiceNo ? (<p className="text-danger">{errors.invoiceNo}</p>) : null}
                            </p>
                          </div>
                          {/* <button type='submit' className='btn btn-primary'>
                            ADD Card Details

                          </button> */}
                        </div>
                      </div>

                      {/* <button type='button' className='btn btn-secondary'>
                      Bank Transfer
                    </button>
                    <button type='button' className='btn btn-secondary'>
                      Promptpay/QR
                    </button> */}
                    </div>
                  </div>
                </div>

              </div>
              <div className='col-lg-5'>
                <div className='card bg-primary order-card-sec'>
                  <div className='card-header'>รายการ</div>
                  <div className='card-body'>
                    <div className='card order-product-card'>
                      {/* {console.log(cart[0].name)} */}
                      {(cart && cart.length > 0) ? cart.map((item, index) => {
                        total = total + item.quantity * item.price
                        // quantity = item.quantity
                        // setQuantity(item.quantity)
                        return (
                          <div className='card-body d-flex' key={item.id}>
                            <div className='graphic'>
                              <img src={order_product} alt='' />
                            </div>
                            <div className='info'>
                              <h5 className='card-title'>{item.name}</h5>
                              <p className='card-text'>
                                {item.desc}
                              </p>

                              {/* <!-- quantity --> */}
                              <div className='input-group quantity-btns'>
                                <span className='input-group-btn'>
                                  <button
                                    type='button'
                                    className='btn btn-outline-secondary btn-number minus'
                                    data-type='minus'
                                    id='minus-btn'
                                    onClick={() => handleMinusClick(item)}
                                  >
                                    -
                                  </button>
                                </span>
                                <input
                                  // id="qty"
                                  type='number'
                                  className='form-control input-number'
                                  // value='1'
                                  id='quantity'
                                  value={item.quantity}
                                />
                                <span className='input-group-btn'>
                                  <button
                                    type='button'
                                    className='btn btn-outline-secondary btn-number plus'
                                    data-type='plus'
                                    id='plus-btn'
                                    onClick={() => handlePlusClick(item)}
                                  >
                                    +
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>)

                      }) : 'no products are added'}
                    </div>

                    {/* <!-- info --> */}
                    <div className='row'>
                      <div className='col-12'>
                        <label htmlFor='affiliate-code' className='form-label'>
                        โค้ดส่วนลด
                        </label>
                        <input
                          type='text'
                          id='affiliate-code'
                          className='form-control'
                          value={affiliateCode}
                          onChange={(e) => setAffiliate(e.target.value)}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className='col-12'>
                        <ul className='list-group list-group-flush'>
                          <li className='list-group-item'>
                            <strong>ยอดทั้งหมด</strong>
                            <span>฿ {total}</span>
                          </li>
                          <li className='list-group-item'>
                            <strong>การจัดส่ง</strong>
                            <span>฿ 50</span>
                          </li>
                        </ul>
                      </div>
                      <div className='col-12'>
                        <ul className='list-group list-group-flush bold-text'>
                          <li className='list-group-item'>
                            <strong>สรุปค่าสินค้า</strong>
                            <span>฿ {total + 50}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row actions'>
              <div className='col-12'>
                <Link to='' className='btn btn-trinary' onClick={handleSubmit}>
                ยืนยันคำสั่งซื้อ
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* <!-- Start footer --> */}
      <Footer />
      {/* <!-- end footer --> */}
    </div>
  );
};

export default MyCart;
