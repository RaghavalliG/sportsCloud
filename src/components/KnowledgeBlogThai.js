import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../style.css";
import blogbanner from "../assets/image/blogbanner.png";
import profilepic1 from "../assets/image/profilepic1.png";
import banner_pic1 from "../assets/image/banner_pic1.png";
import blog_img1 from "../assets/image/blog_img1.png";
import blog_pic1 from "../assets/image/blog_pic1.png";
import blog_pic2 from "../assets/image/blog_pic2.png";
import blog_pic3 from "../assets/image/blog_pic3.png";

const KnowledgeBlogThai = () => {
  return (
    <div class='site-wrap'>
      <Header />

      <div class='inner-small-banner innerbanner'>
        <div class='text-center'>
          <img src={blogbanner} alt='' class='img-fluid' />
        </div>
      </div>
      <div class='blog_content_outer'>
        <div class='inner_content_maincont'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-12'>
                <div class='inner_maincont'>
                  <div class='inner_head_info'>
                    <h2>#SAFESEX #STDPREVENTION</h2>
                    <div class='caption_info'>
                      <h3>เพศสัมพันธ์เป็นสิ่งที่สวยงาม แต่ก็ไม่เสมอไป</h3>
                      <p>เข้าใจ SEX กับความปลอดภัยในบทความนี้</p>
                      <div class='profile_add'>
                        <div class='pref_pic'>
                          <img
                            src={profilepic1}
                            alt=''
                            class='img-fluid'
                          />
                        </div>
                        <div class='pref_pic_text'>
                          <h4>Sarisa Gajaseni</h4>
                          <p>20 Mar 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class='inner_cont_des_view'>
                    <p>
                      ก่อนอ่านบทความนี้
                      เราอยากชวนคุณนึกถึงเซ็กซ์ที่ผ่านมาของตัวเองดู
                      แล้วตอบคำถามว่าเคยมีเหตุการณ์ทำนองนี้เกิดขึ้นกับคุณไหม?{" "}
                    </p>

                    <p>
                      หลังถึงจุดสุดยอด คู่นอนรีบลุกไปล้างตัวเพราะรู้สึกผิดบาป
                      ทั้งที่เรายังตัวสั่นไม่เสร็จ
                      กล้ามเนื้อไม่ทันคลายตัวจากการจิกเกร็ง
                      พยายามรั้งให้นอนสัมผัสร่างกายกันต่อสักนิด
                      แต่ชวนยังไงอีกฝ่ายก็ไม่ยอม ยืนยันจะไปอาบน้ำก่อนเพื่อชะล้าง
                      ‘ความสกปรก’ ออกจากเนื้อตัว
                      จนเรางงว่าเซ็กซ์ที่เพิ่งผ่านพ้นดีหรือแย่
                      และเราต้องรู้สึกยังไง?
                    </p>

                    <p>
                      ปฏิกิริยาแบบนี้ไม่ใช่เรื่องแปลก
                      โดยเฉพาะในสังคมที่ปลูกฝังค่านิยมว่าเซ็กซ์เป็นสิ่งสกปรก
                      หรือเรื่องต้องห้าม
                      เมื่อเราตั้งต้นด้วยชุดความคิดเช่นนี้ตั้งแต่เด็ก
                      ไม่ผิดเลยที่เมื่อถึงเวลามีเซ็กซ์
                      เราจะสลัดตัวเองออกจากความรู้สึกผิดบาปนั้นได้ยากเหลือเกิน
                      ความย้อนแย้งคือในขณะเดียวกันเซ็กซ์ก็สร้างความสุขให้เรา
                      ซึ่งเป็นธรรมชาติของมนุษย์ ที่ต้องการความสุข
                      แต่เมื่อโดนค่านิยมนี้ครอบอยู่
                      การมีเซ็กซ์กลับกลายเป็นทุกข์เพราะเราเผลอไปมีความสุขกับสิ่งต้องห้าม
                    </p>

                    <p>
                      หลังถึงจุดสุดยอด บางคนอาจทำมากกว่าการอาบน้ำ แต่ยังก่นด่า
                      โบยตีตัวเองด้วยแส้ทางศีลธรรม
                    </p>

                    <p>
                      คำถามคือ เซ็กซ์ควรเป็นเรื่องที่เราต้องรู้สึกผิดหรือเปล่า?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='addinfo3'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-12'>
                <div class='addinfo3_pic'>
                  <img src={banner_pic1} alt='' class='img-fluid' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='inner_content_maincont'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-12'>
                <div class='inner_maincont'>
                  <div class='inner_cont_des_view'>
                    <h2>เซ็กซ์คือการเมือง</h2>
                    <p>
                      ปฏิเสธไม่ได้ว่าหนึ่งในปัจจัยที่ปลูกฝังค่านิยมนี้ให้หลายคนคือวิชาเพศศึกษา
                    </p>
                    <p>
                      นับตั้งแต่ปี 1960 จนถึงปัจจุบัน
                      วิชาเพศศึกษาในโรงเรียนแบ่งเป็น 2 แบบ อย่างแรกคือหลักสูตร
                      ที่เน้นไม่ให้มีเพศสัมพันธ์ (Abstinence-Only Sex Education)
                      เน้นการสอนไม่ให้วัยรุ่นมีเพศสัมพันธ์ จนกว่าจะแต่งงาน
                      เพราะเชื่อว่านั่นคือสิ่งที่ปลอดภัยที่สุด
                      หลักสูตรนี้จะไม่พูดถึงวิธีการใช้ถุงยาง และการคุมกำเนิด
                      ยกเว้นจะหยิบยกมาด้อยค่าว่าแม้ป้องกันแล้วแต่ยังมีอัตราความล้มเหลวอยู่
                      ไม่ได้ปลอดภัยร้อยเปอร์เซ็นต์
                    </p>

                    <p>
                      การสอนอีกแบบเรียกว่าหลักสูตรเพศวิถีศึกษารอบด้าน
                      (Comprehensive Sexuality Education)
                      เน้นการเรียนการสอนที่ครอบคลุมตั้งแต่เรื่องพัฒนาการด้านร่างกายและจิตใจ
                      การทำงานของสรีระ พฤติกรรมทางเพศ ความสัมพันธ์
                      ไปจนถึงทัศนคติและค่านิยมทางสังคมที่ส่งผลต่ออัตลักษณ์ทางเพศ
                      ช่วงหลังยังมีโปรแกรมแบบค็อกเทลผสมเพิ่มเข้ามา
                      (Abstinence-Plus Sex Education)
                      ซึ่งยังเน้นว่าไม่ควรมีเซ็กซ์
                      แต่ก็ยอมสอนเรื่องการใช้ถุงยางและวิธีการคุมกำเนิด
                    </p>

                    <p>
                      หลักสูตรที่เน้นไม่ให้มีเพศสัมพันธ์ยึดโยงอยู่กับศาสนาและการเมืองอย่างเหนียวแน่น
                      ในหลายประเทศมีการอ้างว่าการคุมกำเนิดและการมีเซ็กซ์ก่อนแต่งงานขัดต่อหลักทางศาสนา
                      และผู้ที่ทำงานวิจัยเพื่อส่งเสริมหลักสูตรที่เน้นไม่ให้มีเพศสัมพันธ์ก็ได้รับเงินสนับสนุนจากรัฐมากและยาวนานกว่า
                      อย่างในอเมริกาเพิ่งจะหันมาพิจารณาให้ทุนสนับสนุนหลักสูตรแบบรอบด้านเพิ่ม
                      ตอนรัฐบาลของบารัก โอบามา แต่พอโดนัลด์ ทรัมป์
                      ขึ้นเป็นประธานาธิบดีก็กลับไปสนใจหลักสูตรที่เน้นไม่ให้มีเพศสัมพันธ์แบบเดิม
                    </p>

                    <div class='inner_block_info2'>
                      <div class='innerblog_add'>
                        <img
                          src={blog_img1}
                          alt=''
                          class='img-fluid'
                        />
                      </div>
                      <div class='innerblog_des2'>
                        <p>
                          ความรู้เรื่องเพศไม่เคยหยุดนิ่งและลื่นไหลอยู่ตลอดเวลาซึ่งแบบเรียนเพศวิถีศึกษารบด้านนี่แหละจะช่วยเปิดเวทีและสร้างบทสนทนาที่ส่งเสริมความรู้ความเข้าใจอันดีจนวันหนึ่งเราจะสามารถพูดเรื่องเร้นลับในสื่อสาธารณะได้โดยไม่ต้องกลัวเกรง
                          เหมือนวันที่เด็กในวงประสานเสียงได้ร้องเพลง “suck,
                          suck, suck, sucking on my titties…” อย่างภาคภูมิใจ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='inner_content_maincont'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-12'>
                <div class='inner_subblock'>
                  <h2>บทความที่เกี่ยวข้อง</h2>
                  <div class='inner_subblock_des'>
                    <div class='blog_item'>
                      <div class='blog_item_pic'>
                        <Link to='#'>
                          <img
                            src={blog_pic1}
                            alt=''
                            class='img-fluid'
                          />
                        </Link>
                      </div>
                      <p>
                        <Link to='#'>
                          เพศสัมพันธ์เป็นสิ่งที่สวยงาม แต่ ก็ไม่เสมอไป เข้าใจ
                          SEX กับความ ปลอดภัยในบทความนี้{" "}
                        </Link>
                      </p>
                    </div>

                    <div class='blog_item'>
                      <div class='blog_item_pic'>
                        <Link to='#'>
                          <img
                            src={blog_pic2}
                            alt=''
                            class='img-fluid'
                          />
                        </Link>
                      </div>
                      <p>
                        <Link to='#'>
                          เพศสัมพันธ์เป็นสิ่งที่สวยงาม แต่ ก็ไม่เสมอไป เข้าใจ
                          SEX กับความ ปลอดภัยในบทความนี้{" "}
                        </Link>
                      </p>
                    </div>

                    <div class='blog_item'>
                      <div class='blog_item_pic'>
                        <Link to='#'>
                          <img
                            src={blog_pic3}
                            alt=''
                            class='img-fluid'
                          />
                        </Link>
                      </div>
                      <p>
                        <Link to='#'>
                          เพศสัมพันธ์เป็นสิ่งที่สวยงาม แต่ ก็ไม่เสมอไป เข้าใจ
                          SEX กับความ ปลอดภัยในบทความนี้{" "}
                        </Link>
                      </p>
                    </div>
                  </div>
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

export default KnowledgeBlogThai;
