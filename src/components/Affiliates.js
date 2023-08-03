import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../style.css";
import affiliate_left_img from "../assets/image/affiliate-left-img.png";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import SocialLinks from "./SocialLinks";
import { useNavigate } from 'react-router-dom';



const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail:"",
  socialMediaLinks:"",
  reasonToJoin:""
};

const Affiliates = () => {

  const [socialLinks,setSocialLinks] = useState([])
  const navigate = useNavigate();
  const showCharacterLimit = (textarea, display_id) => {
    const maxCharacters = 150;
    let currentCharacters = textarea.value.length;
    const characterCountElement = document.getElementById(display_id);
  
    characterCountElement.textContent = `${currentCharacters} / ${maxCharacters}`;
  
    textarea.addEventListener("keyup", () => {
      currentCharacters = textarea.value.length;
      characterCountElement.textContent = `${currentCharacters} / ${maxCharacters}`;
  
      if (currentCharacters > maxCharacters) {
        textarea.value = textarea.value.substring(0, maxCharacters);
      }
    });
  };

  useEffect(() => {
    const textarea = document.getElementById("why-join");
    const displayId = "why-join-count";
    showCharacterLimit(textarea, displayId);
  }, []);

 const affillateSchema = yup.object({
  firstName :yup.string().required("firsName is required"),
  lastName :yup.string().required("lastname is required"),
  email :yup.string().email("Invalid email").required("email is required"),
  confirmEmail: yup.string()
  .oneOf([yup.ref('email'), null], 'Emails must match')
  .required('Confirm Email is required'),
  })
 
  
  const { values, errors, handleChange, handleSubmit, handleBlur,touched } = useFormik({
    initialValues: initialValues,
    validationSchema: affillateSchema,
    onSubmit: (values) => {

      var Links = socialLinks.map(function(item) {
        return item['socialMediaLinks'];
      });
      // console.log(Links)
      
      values.socialMediaLinks = Links.toString();

      const lang = localStorage.getItem('language');

      axios({
        method: 'POST',
        url: 'https://pedsupab-dev.azure-api.net/pedsupabapi/affiliates/register?lang='+lang,
        data: values
      })
        .then(function (res) {
           console.log(res)
           if(res.data.status==400){
            toast.error(res.data.message)

           }
          //  alert(res.data.message);  
           else{
            toast.success("Your application has been submitted.")
            return navigate("/thank-you" ,{ replace: true });
              // alert("Sucessfully Registered");  
           }
           
        })
        .catch(function (res) {
           console.log(res)
             
      });
    },
  });
 
  const getSocialLinks =(data) =>{
    console.log(data)
    setSocialLinks(data);
}
  
  
  return (
    <div className='site-wrap'>
      <Header />
      <div className='affiliate-page-inner bg-gray'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-6 ps-0'>
              <div className='card graphic'>
                <img src={affiliate_left_img} alt='Image' />
              </div>
            </div>
            <div className='col-md-6 d-flex flex-wrap'>
              <div className='card content-sec'>
                <h5 className='card-title'>
                Join Our Affiliate Programme
                
                  </h5>
                <p className='card-text'>
                  Become part of the movement to create a sexually healthy
                  society
                </p>
                <form action='/join-affiliate-programme' method='post' onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label htmlFor='first-name' className='form-label'>
                      First Name
                   
                    </label>
                    <input
                      type='text'
                      id='first-name'
                      className='form-control'
                       // name="first_Name"
                      name='firstName'
                      
              
                   value={values.firstName}
                   onChange={handleChange}
                   onBlur={handleBlur}
                    />
                     {errors.firstName && touched.firstName ? (<p className="text-danger">{errors.firstName}</p>): null}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='last-name' className='form-label'>
                      Last Name
                   

                    </label>
                    <input
                      type='text'
                      id='last-name'
                      className='form-control'
                      // name="last_Name"
                      name='lastName'
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                      {errors.lastName && touched.lastName ?( <p className="text-danger">{errors.lastName}</p>):null}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                      Email
                     
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='form-control'
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                     {errors.email && touched.email ?( <p className="text-danger">{errors.email}</p>): null}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='confirm-email' className='form-label'>
                      Confirm Email
                  
                    </label>
                    <input
                      type='email'
                      id='confirm-email'
                      className='form-control'
                      // name='confirm_email'
                      name='confirmEmail'
                      value={values.confirmEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirmEmail && touched.confirmEmail ?( <p className="text-danger">{errors.confirmEmail}</p>): null}
                  </div>
                  <SocialLinks getSocialLinks={getSocialLinks}/>
                  {/* <div className='mb-3'>
                    <label htmlFor='social-media-links' className='form-label'>
                      Your Social Media Links
                    </label>
                    <input
                      type='text'
                      id='social-media-links'
                      className='form-control'
                      // name='social_media_links'
                      name='socialMediaLinks'
                      value={values.socialMediaLinks}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div> */}
                  <div className='mb-3'>
                    <label htmlFor='why-join' className='form-label'>
                      Why do you want to join our programme?
                   
                    </label>
                    <textarea
                      id='why-join'
                      className='form-control'
                      rows='3'
                      // name='why_join'
                      name='reasonToJoin'
                      value={values.reasonToJoin}
                      onChange={handleChange}
                      onBlur={handleBlur}

                    ></textarea>
                    <div className='text-right form-label'>
                      <small className='form-text text-muted' id='why-join-count'>
                        Limit 150 characters
                       
                      </small>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <button type='submit' className='btn btn-primary'>
                      Join
                     
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Start footer --> */}
      <Footer />
      {/* <!-- end footer --> */}
    </div>
  );
};

export default Affiliates;
