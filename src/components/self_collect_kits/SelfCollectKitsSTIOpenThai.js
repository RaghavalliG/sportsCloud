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

const SelfCollectKitsSTIOpenThai = () => {
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
              <h2>อะไรคือโรคติดต่อทางเพศสัมพันธ์? </h2>
              <p>
              เอสทีไอ เกิดขึ้นจากการติดเชื้อระกว่างมีเพศสัมพันธ์ซึ่งมีทั้ง เชื้อแบคทีเรีย เชื้อไวรัส เชื้อรา และปรสิต โรคติดต่อทางเพศสัมพันธ์สามารถพบได้ในทุกเพศ ทุกวัย สื่งที่ควรตระหนักคือบางคนอาจติดเชื้อ มีระยะฝักตัวของเชื้อแล้วแสดงอาการเลย เช่น ตุ่มน้ำหนองขึ้นบนร่างกาย, แผลตามอวัยวะเพศหรือช่องทางปาก, ตกขาวผิดปกติในเพศหญิง, คันบริเวณที่ติดเชื้อ แต่บางคนอาจได้รับเชื้อและไม่แสดงอาการอะไรเลย ซึ่งสามารถติดผู้อื่นได้เช่นกับคนที่มีอาการของโรค การตรวจจึงเป็นเรื่องสำคัญ{" "}
              </p>
              <div class='def_btn_opt'>
                <Link to={language == 'TH' ? '/th/selfcollectkit/sti/kit' :'/selfcollectkit/sti/kit'}>ตรวจด้วยตัวเอง</Link>
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
                  <h2 class='sec-title'>ชุดตรวจค้นหาโรคอะไรได้บ้าง </h2>
                  <p>
                  เราสามารถทดสอบการติดเชื้อโรคติดต่อทางเพศสัมพันธ์ 14 ชนิดจากการตรวจหนึ่งครั้ง ซึ่งครอบคลุมโรคติดเชื้อทางเพศที่พบบ่อยในประเทศไทยทั้งหมด
                  </p>
                </div>
                <div class='kit_hpv_des_add modf_prod'>
                  <div class={`kit_hpv_pic_opt ${activeOption === 0 ? 'activeprod' : ''}`} onClick={() => handleOptionClick(0)}>
                    <div class='prod_view_des'>
                      <div class='prod_add'>
                        <h3>เชื้อแบคทีเรีย</h3>
                        <img src={prod_pic1} alt='' />
                      </div>
                    </div>
                  </div>
                  <div class='kit_hpv_pic_opt'>
                    <div class={`kit_hpv_pic_opt ${activeOption === 1 ? 'activeprod' : ''}`} onClick={() => handleOptionClick(1)}>
                      <div class='prod_add'>
                        <h3>เชื้อรา </h3>
                        <img src={prod_pic2} alt='' />
                      </div>
                    </div>
                  </div>
                  <div class={`kit_hpv_pic_opt ${activeOption === 2 ? 'activeprod' : ''}`} onClick={() => handleOptionClick(2)}>
                    <div class='prod_view_des'>
                      <div class='prod_add'>
                        <h3>เชื้อไวรัส</h3>
                        <img src={prod_pic3} alt='' />
                      </div>
                    </div>
                  </div>
                  <div class={`kit_hpv_pic_opt ${activeOption === 3 ? 'activeprod' : ''}`} onClick={() => handleOptionClick(3)}>
                    <div class='prod_view_des'>
                      <div class='prod_add'>
                        <h3>ปรสิต </h3>
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
                          <Link to=''>ติดเชื้อราบริเวณอวัยวะเพศ </Link>
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
                          <Link to=''>เริมบริเวณช่องปาก </Link>
                        </li>

                        <li>
                          <Link to=''>เริมบริเวณอวัยวะเพศ</Link>
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
                          <Link to=''>พยาธิตในช่องคลอด </Link>
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
                        ตรวจเมื่อไหร่ดี?{" "}
                      </h2>
                      <div class='add_opt_text_des'>
                        <ul>
                          <li>คุณหรือคู่ของคุณ อยากตรวจเช็คเพื่อความปลอดภัยและสะบายใจ</li>
                          <li>มีเพศสัมพันธ์เเบบไม่ได้ป้องกัน</li>
                          <li>เมื่อเริ่มมีความสัมพันธ์ครั้งใหม่ หรือจบความสัมพันธ์ครั้งเก่า </li>
                          <li>ตรวจทุกสามเดือนหากมีคู่นอนหลายคน</li>
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
                    <span></span> มีอะไรในกล่องเอวาบ้าง {" "}
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
          <Link to='/th/selfcollectkit/sti/kit'>สั่งซื้อชุดตรวจ</Link>
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
                  ชุดตรวจทำอย่างไร<span></span>
                  </h2>
                  <div class='howitowrk_leftimg'>
                    <img src={sep1} alt='' />
                  </div>
                </div>
                <div class='howitowrk_info_right'>
                  <ul>
                    <li>
                      <span>1</span>
                      <strong>ลงทะเบียนชุดตรวจ</strong>
                      เมื่อได้รับชุดตรวจหาเชื้อ AVA แล้ว ลงทะเบียนผ่าน website
                      บนกล่อง
                    </li>
                    <li>
                      <span>2</span>
                      <strong>เก็บสิ่งส่งตรวจ</strong>
                      เก็บสิ่งตรวจตามขั้นตอนในคู่มือการเก็บสิ่งตรวจ
                    </li>
                    <li>
                      <span>3</span>
                      <strong>ส่งไปรศณีย์ไทยฟรี</strong>
                      เมื่อเก็บเสร็จแล้ว ส่งชุดตรวจกลับไปที่ห้อง lab
                      ผ่านทางไปรษณีย์โดยไม่เสียค่าใช้จ่าย
                    </li>
                    <li>
                      <span>4</span>
                      <strong>ผลตรวจ</strong>
                      หลังจากห้อง lab ได้รับสิ่งส่งตรวจ จะแจ้งผลลัพธ์ภายใน 7 วัน
                    </li>
                  </ul>
                </div>
              </div>

              <div class='positive_info'>
                <h2>ทำอย่างไร หากผล 'บวก' </h2>
                <p>
                ไม่ต้องกังวล - เรามีคำแนะนำที่ครอบคลุมทุกสิ่งที่คุณต้องรู้ ติดต่อเราเพื่อรับการปรึกษาและสำรวจรายชื่อสถานบริการทางการแพทย์และคลินิกพาร์ทเนอร์ใกล้คุณ.{" "}
                  <span>
                    <img src={misc} alt='' />
                  </span>
                </p>

                <div class='def_btnopt2'>
                  <Link to='#' class='learn_more_btn'>
                  เรียนรู้เพิ่ม{" "}
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

export default SelfCollectKitsSTIOpenThai;
