import React from "react";
import "../style.css";
import footer_logo from "../assets/image/footer-logo.png";
import instagram from "../assets/image/icons/instagram.svg";
import facebook from "../assets/image/icons/facebook.svg";
import twitter from "../assets/image/icons/twitter.svg";
import tiktok from "../assets/image/icons/tiktok.svg";
import youtube from "../assets/image/icons/youtube.svg";
import footer_bot_icon_1 from "../assets/image/icons/footer-bot-icon-1.svg";
// import footer_bot_icon_2 from "../assets/image/icons/footer-bot-icon-2.svg";
import footer_bot_icon_2 from "../assets/image/icons/footer-bot-icon-2.1.png";
import footer_bot_icon_3 from "../assets/image/icons/footer-bot-icon-3.svg";
import footer_bot_icon_4 from "../assets/image/icons/footer-bot-icon-4.svg";
import footer_bot_icon_5 from "../assets/image/icons/footer-bot-icon-5.svg";
import footer_bot_icon_6 from "../assets/image/icons/footer-bot-icon-6.svg";
import footer_bot_icon_7 from "../assets/image/icons/footer-bot-icon-7.svg";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className='site-footer'>
      <div className='footer-top-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-5 footer-col-1'>
              <Link to='/'>
                <img src={footer_logo} alt='' />
              </Link>
              <p className='small'>
                เพศ + สุขภาพ + เพศสภาพ + สุขภาพทางเพศ
                ไม่ว่าจะเพศสภาพแบบไหนก็ควรมีสุขภาพทางเพศที่ดี
          
              </p>
            </div>
            <div className='col-lg-3 footer-col-2'>
              <ul>
                <li>
                  <Link to='/knowledge'>KNOWLEDGE</Link>
                </li>
                <li>
                  <Link to='/selfcollectkit'>SELF COLLECT KITS </Link>
                </li>
                <li>
                  <Link to='/faqs'>FAQs</Link>
                </li>
                <li>
                  <Link to='/aboutus'>ABOUT US </Link>
                </li>
              </ul>
            </div>
            <div className='col-lg-3 footer-col-2'>
              <h5 className='footer-title'>Follow Us</h5>
              <div className='social-links'>
                <Link to=''>
                  <img src={instagram} alt='' />
                </Link>
                <Link to=''>
                  <img src={facebook} alt='' />
                </Link>
                <Link to=''>
                  <img src={twitter} alt='' />
                </Link>
                <Link to=''>
                  <img src={tiktok} alt='' />
                </Link>
                <Link to=''>
                  <img src={youtube} alt='' />
                </Link>
              </div>
              <p>
                <Link to=''>Privacy Policy</Link>
              </p>
              <p>
                <Link to=''>Cookies Setting</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-bot-sec'>
        <div className='container'>
          <div className='footer-inline-links'>
            <Link to=''>
              <img src={footer_bot_icon_1} alt='' />
            </Link>
            <Link to=''>
              <img src={footer_bot_icon_2} alt='' />
            </Link>
            <Link to=''>
              <img src={footer_bot_icon_3} alt='' />
            </Link>
            <Link to=''>
              <img src={footer_bot_icon_4} alt='' />
            </Link>
            <Link to=''>
              <img src={footer_bot_icon_5} alt='' />
            </Link>
            <Link to=''>
              <img src={footer_bot_icon_6} alt='' />
            </Link>
            <Link to=''>
              <img src={footer_bot_icon_7} alt='' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
