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

const SelfCollectKitsHPVThai = () => {
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
              <h2>เอชพีวีคืออะไร </h2>
              <p>
              เอชพีวี หรือว่าเชื้อไวรัสแปปิโลมา เป็นเชื้อโรคติดต่อทางเพศสัมพันธ์ที่พบเจอบ่อยในทั้งชายและหญิง เชื้อจะแพร่ผ่านการสัมพัสผิวหนังและเยื้อบุ ซึ่งไวรัสสามารถติดต่อได้จากช่องคลอด ถวารหนัก ออรัลเซ็กซ์ หรือแม้แต่การสัมผัสบริเวณต่าง ๆ ซึ่งกันและกัน นอกจากนี้การป้องกันและรู้ทันเชื้อไวรัสเอชพีวีก็สำคัญในการดูแลรักษาสุขภาพ ทุกเพศควรฉีดวัคซีนป้องกัน นอกจากนี้การตรวจคัดกรองไวรัสก็จะทำให้รู้ทันและได้รับการรักษาได้ก่อน
              </p>
              <div class='def_btn_opt'>
                <Link to='/selfcollectkit/hpv/product'>สั่งชุดตรวจ  </Link>
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
                    ควรตรวจเมื่อไหร่ {" "}
                  </h2>
                  <p>
                  เชื้อเอชพีวี เป็นเชื้อไวรัสที่ไม่แสดงการ ดังนั้นหากไม่ได้ตรวจหาเชื้อก็ไม่อาจทราบว่ามีเชื้อ ในเอชพีวีบางชนิดร่างกายของเราสามารถกำจัดเชื้อได้ด้วยตัวเอง แต่หากติดเชื้อบางชนิดก็เสี่ยงการนำไปสู่มะเร็งหรือผลเสียต่าง ๆ ต่อร่างกายในระยะยาวได้ ดังนั้นการตรวจป้องกันไว้ก่อนดีกว่าเสมอ 
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
                    <span></span> อุปกรณ์ในชุดตรวจ {" "}
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
          <Link to='/th/selfcollectkit/hpv/product'>สั่งซื้อชุดตรวจ</Link>
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
                  วิธีการใช้ชุดตรวจ<span></span>
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
                      <strong>ส่งไปรษณีย์ไทยฟรี</strong>
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
                <h2>ทำอย่างไร หากผล 'บวก'?</h2>
                <p>
                ไม่ต้องกังวล - เราคอยให้บริการครอบคลุมทุกเรื่องที่คุณต้องรู้ เรามีคำแนะที่ครอบคลุมทุกสิ่งที่คุณต้องรู้ ติดต่อเราเพื่อปรึกษาและสำรวจรายชื่อสถานบริการทางการแพทย์ใกล้คุณและคลินิกพาร์ทเนอร์ใกล้คุณ{" "}
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

export default SelfCollectKitsHPVThai;
