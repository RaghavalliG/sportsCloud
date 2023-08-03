import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../style.css";
import innerbanner1 from "../../assets/image/innerbanner1.png";
import bg1 from "../../assets/image/bg1.png";
import starpic1 from "../../assets/image/starpic1.png";
import qus1 from "../../assets/image/qus1.png";
import hpv_pic1 from "../../assets/image/hpv_pic1.png";
import hpv_pic2 from "../../assets/image/hpv_pic2.png";
import hpv_pic3 from "../../assets/image/hpv_pic3.png";
import star3 from "../../assets/image/star3.png";
import addbanner from "../../assets/image/addbanner.png";
import start_icon from "../../assets/image/start_icon.png";
import newv_text from "../../assets/image/newv_text.png";
import add2 from "../../assets/image/add2.png";
import sep1 from "../../assets/image/sep1.png";
import misc from "../../assets/image/misc.png";
import { Link } from "react-router-dom";

const SelfCollectKitsHPV = () => {
  return (
    <div class='site-wrap'>
      <Header />
      <div class='inner-small-banner innerbanner'>
        <div class='text-center'>
          <img src={innerbanner1} alt='' class='img-fluid' />
          <div class='banner_text'>
            <span>HUMAN</span> PAPILLOMAVIRUS
          </div>
        </div>
      </div>
      <div class='container our-kit-sec'>
        <div class='row'>
          <div class='col-lg-12'>
            <div class='inner_head_des'>
              <h2>What is HPV?</h2>
              <p>
                HPV, or Human Papillomavirus, is a common sexually transmitted
                infection that affects both males and females. It is the most
                common sexually transmitted infection worldwide. HPV can be
                transmitted through vaginal, anal, or oral sex, as well as
                through close skin-to-skin contact.
              </p>
              <div class='def_btn_opt'>
                <Link to='/selfcollectkit/hpv/product'>Get Tested </Link>
                {/* <Link to=''>Get Tested </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='kit_hpv_des'>
        <div class='kit_hpv_des_top'>
          <img src={bg1} alt='' />
        </div>
        <div class='kit_hpv_des_mid'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-12'>
                <div class='kit_hpv_des_info'>
                  <h2 class='sec-title'>
                    <span>
                      <img src={starpic1} alt='' class='img-fluid' />
                    </span>{" "}
                    When is the right time to get tested?{" "}
                  </h2>
                  <p>
                    Without testing, it’s impossible to tell you have HPV
                    because most women don’t experience symptoms. Depending on
                    the HPV type, our bodies can eliminate the virus immediately
                    - or have it develop in our bodies for years.
                  </p>
                  <div class='qus1_pic'>
                    <img src={qus1} alt='' class='img-fluid' />
                  </div>
                </div>
                <div class='kit_hpv_des_add'>
                  <div class='kit_hpv_pic_opt'>
                    <img src={hpv_pic1} alt='' />
                  </div>
                  <div class='kit_hpv_pic_opt'>
                    <img src={hpv_pic2} alt='' />
                  </div>
                  <div class='kit_hpv_pic_opt'>
                    <img src={hpv_pic3} alt='' />
                  </div>
                </div>
                <div class='kit_add_banner_opt'>
                  <h2>
                    {/* <span>
                      
                      <img src={star3} alt='' />
  </span>*/}
                    HPV Screening vs Hospital Check Ups
                  </h2>
                  <div class='kit_add_banner'>
                    <img src={addbanner} alt='' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='avaKit_opt'>
          <div class='avaKit_icon1'>
            <img src={start_icon} alt='' />
          </div>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-12'>
                <div class='avaKit_opt_banner'>
                  <div class='newv_text'>
                    <img src={newv_text} alt='' />
                  </div>
                  <h2>
                    <span></span> What’s In The AVA Kit?{" "}
                  </h2>
                  <div class='avaKit_opt_text'>
                    <img src={add2} alt='' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='order_ket_opt'>
          <Link to='/selfcollectkit/hpv/product'>ORDER A KIT</Link>
        </div>
      </div>

      {/* <!-- Banner ends --> */}
      <div class='howitowrk_wrap'>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-12'>
              <div class='howitowrk_info'>
                <div class='howitowrk_info_left'>
                  <h2>
                    HOW IT <span>WORKS</span>
                  </h2>
                  <div class='howitowrk_leftimg'>
                    <img src={sep1} alt='' />
                  </div>
                </div>
                <div class='howitowrk_info_right'>
                  <ul>
                    <li>
                      <span>1</span>
                      <strong>REGISTER</strong>
                      Once you have received the AVA testing kit, please register through QR code provided in the box.
                    </li>
                    <li>
                      <span>2</span>
                      <strong>COLLECT</strong>
                      Please follow the instructions in the specimen collection manual to properly collect the sample for testing.
                    </li>
                    <li>
                      <span>3</span>
                      <strong>FREE DELIVERY</strong>
                      Once you have completed the specimen collection, please send the testing kit back to the laboratory using the provided postage-paid return envelope. You will not incur any charges for the return shipment.
                    </li>
                    <li>
                      <span>4</span>
                      <strong>RESULTS</strong>
                      After the laboratory receives the testing kit, you can expect to receive the test results within 7 days.
                    </li>
                  </ul>
                </div>
              </div>

              <div class='positive_info'>
                <h2>What if I test positive? </h2>
                <p>
                  Don’t worry - we got you covered. Explore a list of partner
                  medical facilities and clinics near you or call us for a
                  consultation.{" "}
                  <span>
                    <img src={misc} alt='' />
                  </span>
                </p>

                <div class='def_btnopt2'>
                  <Link to='#' class='learn_more_btn'>
                    Learn More{" "}
                  </Link>
                </div>
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

export default SelfCollectKitsHPV;
