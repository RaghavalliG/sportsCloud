import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../style.css";
import { Link } from "react-router-dom";
import innerbanner2 from "../../assets/image/innerbanner2.png";
import bg2 from "../../assets/image/bg2.png";
import prod_pic1 from "../../assets/image/bacteria_prod_1.png";
import prod_pic2 from "../../assets/image/fungus.png";
import prod_pic4 from "../../assets/image/parasides.png";
import prod_pic3 from "../../assets/image/virus.png";
import staropt from "../../assets/image/staropt.png";
import addimg1 from "../../assets/image/addimg1.png";
import addimg2 from "../../assets/image/addimg2.png";
import star3 from "../../assets/image/star3.png";
import start_icon2 from "../../assets/image/start_icon2.png";
import new_text from "../../assets/image/new-text.png";
import add2 from "../../assets/image/add2a.png";
import sep1 from "../../assets/image/sep1.png";
import misc from "../../assets/image/misc.png";

const SelfCollectKitsSTIOpen = () => {
  const [activeOption, setActiveOption] = useState(null);
  const language = localStorage.getItem('language');

  const handleOptionClick = (index) => {
    if (activeOption === index) {
      setActiveOption(null);
    } else {
      setActiveOption(index);
    }
  };
  return (
    <div class='site-wrap'>
      <Header />
      <div class='inner-small-banner innerbanner innerbanner2'>
        <div class='text-center'>
          <img src={innerbanner2} alt='' class='img-fluid' />
          <div class='banner_text'>
            <span>SEXUALLY</span>
            <span>TRANSMITTED</span>
            <span>INFECTIONS</span>
          </div>
        </div>
      </div>
      <div class='container our-kit-sec stlsoption'>
        <div class='row'>
          <div class='col-lg-12'>
            <div class='inner_head_des'>
              <h2>What are STIs? </h2>
              <p>
                Sexually Transmitted Infections are contracted through sexual
                intercourse. There are different types of STIs from bacteria to
                virus{" "}
              </p>
              <div class='def_btn_opt'>
                <Link to={language == 'TH' ? '/th/selfcollectkit/sti/kit' :'/selfcollectkit/sti/kit'}>Get Tested </Link>
                {/* <Link to=''>Get Tested </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='kit_hpv_des'>
        <div class='kit_hpv_des_top'>
          <img src={bg2} alt='' />
        </div>
        <div class='kit_hpv_des_mid bg2update'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-12'>
                <div class='kit_hpv_des_info'>
                  <h2 class='sec-title'>Which STIs do our kits test?</h2>
                  <p>
                    We can test for 14 STIs from one swipe, covering all common
                    STIs in Thailand.
                  </p>
                </div>
                <div class='kit_hpv_des_add modf_prod'>
                  <div class={`kit_hpv_pic_opt ${activeOption === 0 ? 'activeprod' : ''}`} onClick={() => handleOptionClick(0)}>
                    <div class='prod_view_des'>
                      <div class='prod_add'>
                        <h3>BACTERIAS</h3>
                        <img src={prod_pic1} alt='' />
                      </div>
                    </div>
                  </div>
                  <div class='kit_hpv_pic_opt'>
                    <div class={`kit_hpv_pic_opt ${activeOption === 1 ? 'activeprod' : ''}`} onClick={() => handleOptionClick(1)}>
                      <div class='prod_add'>
                        <h3>FUNGUS </h3>
                        <img src={prod_pic2} alt='' />
                      </div>
                    </div>
                  </div>
                  <div class={`kit_hpv_pic_opt ${activeOption === 2 ? 'activeprod' : ''}`} onClick={() => handleOptionClick(2)}>
                    <div class='prod_view_des'>
                      <div class='prod_add'>
                        <h3>VIRUS</h3>
                        <img src={prod_pic3} alt='' />
                      </div>
                    </div>
                  </div>
                  <div class={`kit_hpv_pic_opt ${activeOption === 3 ? 'activeprod' : ''}`} onClick={() => handleOptionClick(3)}>
                    <div class='prod_view_des'>
                      <div class='prod_add'>
                        <h3>PARASITE </h3>
                        <img src={prod_pic4} alt='' />
                      </div>
                    </div>
                  </div>
                </div>
                <div class='prod_view_text_wrap'>
                  <div className={`prod_view_text_block opt1 ${activeOption === 0 ? 'activeprod_des' : ''}`}>
                    <div class='star_icon2'>
                      <img src={staropt} alt='' />
                    </div>
                    <div class='prod_inner_cont'>
                      <ul>
                        <li>
                          <Link to=''>Neisseria Gonorrhoeae </Link>
                        </li>

                        <li>
                          <Link to=''>Ureaplasma Parvum </Link>
                        </li>

                        <li>
                          <Link to=''>Chlamydia Trachomatis </Link>
                        </li>
                        <li>
                          <Link to=''>Treponema Pallidum </Link>
                        </li>

                        <li>
                          <Link to=''>Mycoplasma Genitalium </Link>
                        </li>

                        <li>
                          <Link to=''>Gardnerella Vaginalis </Link>
                        </li>
                        <li>
                          <Link to=''>Mycoplasma hominis </Link>
                        </li>
                        <li>
                          <Link to=''>Haemophilus Ducreyi </Link>
                        </li>
                        <li>
                          <Link to=''>Ureaplasma Urealyticum </Link>
                        </li>
                        <li>
                          <Link to=''>Group B Streptococcus </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={`prod_view_text_block opt2 ${activeOption === 1 ? 'activeprod_des' : ''}`}>
                    <div class='star_icon2'>
                      <img src={staropt} alt='' />
                    </div>
                    <div class='prod_inner_cont'>
                      <ul>
                        <li>
                          <Link to=''>Yeast Infection/Candida albicans  </Link>
                        </li>

                        
                      </ul>
                    </div>
                  </div>
                  <div className={`prod_view_text_block opt3 ${activeOption === 2 ? 'activeprod_des' : ''}`}>
                    <div class='star_icon2'>
                      <img src={staropt} alt='' />
                    </div>
                    <div class='prod_inner_cont'>
                      <ul>
                        <li>
                          <Link to=''>Oral herpes or cold sores/Herpes simplex virus type 1 </Link>
                        </li>

                        <li>
                          <Link to=''>Genital herpes/Herpes simplex virus type 2  </Link>
                        </li>

                        
                      </ul>
                    </div>
                  </div>
                  <div className={`prod_view_text_block opt4 ${activeOption === 3 ? 'activeprod_des' : ''}`}>
                    <div class='star_icon2'>
                      <img src={staropt} alt='' />
                    </div>
                    <div class='prod_inner_cont'>
                      <ul>
                        <li>
                          <Link to=''>Trichomoniasis/Trichomonas vaginalis  </Link>
                        </li>

                        
                      </ul>
                    </div>
                  </div>
                </div>

                <div class='kit_add_banner_opt'>
                  <div class='kit_add_banner_cont'>
                    <div class='add_opt'>
                      <div class='add_pic1'>
                        <img src={addimg1} alt='' />
                      </div>
                      <div class='add_pic2'>
                        <img src={addimg2} alt='' />
                      </div>
                    </div>
                    <div class='add_opt_text'>
                      <h2>
                        <span>
                          <img src={star3} alt='' />
                        </span>{" "}
                        When & Who Should Get Tested?{" "}
                      </h2>
                      <div class='add_opt_text_des'>
                        <ul>
                          <li>You and/or your partner want to be safe </li>
                          <li>You have unprotected sex  </li>
                          <li>Begining a new relationship and/or ending a relationship </li>
                          <li>Test every three months if you are sexually active with more than one partner </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='avaKit_opt avaKit_opt2'>
          <div class='avaKit_icon1'>
            <img src={start_icon2} alt='' />
          </div>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-12'>
                <div class='avaKit_opt_banner'>
                  <div class='newv_text'>
                    <img src={new_text} alt='' />
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

        <div class='order_ket_opt order_ket_opt2'>
          <Link to='/selfcollectkit/sti/kit'>ORDER A KIT</Link>
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
                      Once you have received the AVA testing kit, please register through QR code provided on the box.
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

export default SelfCollectKitsSTIOpen;
