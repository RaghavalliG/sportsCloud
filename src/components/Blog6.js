import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../style.css";
import blogbanner1 from "../assets/image/blogbanner1.png";
import profilepic from "../assets/image/profilepic.png";
import banner_pic1 from "../assets/image/banner_pic1.png";
import blog_img1 from "../assets/image/blog_img1.png";
import blog_pic1 from "../assets/image/blog_pic1.png";
import blog_pic2 from "../assets/image/blog_pic2.png";
import blog_pic3 from "../assets/image/blog_pic3.png";
import imag_blog1 from "../assets/image/image_blog1.png"

const Blog6 = () => {
    return (
        <div className='site-wrap'>
            <Header />

            <div className='inner-small-banner innerbanner'>
                <div className='text-center'>
                    <img src={blogbanner1} alt='' className='img-fluid' />
                </div>
            </div>
            <div className='blog_content_outer'>
                <div className='inner_content_maincont'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='inner_maincont'>
                                    <div className='inner_head_info'>

                                        <div className='caption_info'>
                                            <h3>The Rise of Cervical Cancer Infections: Understanding the Need for Increased Testing in Thailand </h3>
                                            {/* <p>เข้าใจ SEX กับความปลอดภัยในบทความนี้</p> */}
                                            {/* <div className='profile_add'>
                                                <div className='pref_pic'>
                                                    <img
                                                        src={profilepic}
                                                        alt=''
                                                        className='img-fluid'
                                                    />
                                                </div>
                                                <div className='pref_pic_text'>
                                                    <h4>Pedsupab Team</h4>
                                                    <p>20 Mar 2023</p>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <div className='inner_cont_des_view'>
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
                  </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='addinfo3'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='inner_content_maincont'>
                    <div className='container'>

                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='inner_maincont'>
                                    {/* <div className='blog-middle-img mb-5'>
                                        <img src={imag_blog1} alt='' className='img-fluid' />
                                    </div> */}
                                    <div className='inner_cont_des_view'>
                                        {/* <h2>เซ็กซ์คือการเมือง</h2>
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
                                        </p> */}

                                        <div className='inner_block_info2'>
                                            {/* <div className='innerblog_add'>
                        <img
                          src={blog_img1}
                          alt=''
                          className='img-fluid'
                        />
                      </div> */}
                                            <div className='innerblog_des2'>
                                                <p>
                                                    In more than 90% of individuals infected with HPV, their bodies can clear the infection on their own. However, according to the World Health Organization (WHO) survey in 2020, there were up to 60,400 new cases of cervical cancer and 34,200 deaths. Moreover, many cases remain untreated, with 90% of new infections and deaths occurring in low-income countries. Notably, over 90% of infections are attributed to sexual intercourse.

                                                </p>
                                                <p>It has also been found that individuals infected with HIV are up to 6 times more likely to develop cervical cancer than those without HIV.

                                                </p>
                                                <p>Therefore, the World Health Organization aims to have fewer than 4 cases of cervical cancer per 100,000 population in all countries worldwide by 2030. To achieve this, they have laid out the 90-70-90 strategy:


                                                </p>
                                                <p>
                                                    90 = 90% of 15-year-old girls should receive the full HPV vaccination.
                                                    70 = 70% of women should undergo cervical cancer screening at ages 35 and 45.

                                                </p>
                                                <p>90 = 90% of cervical cancer patients should receive treatment (90% of early-stage patients and 90% of advanced-stage patients).

                                                </p>
                                                <p>In Thailand, there are up to 8,000 new cases of cervical cancer per year, equivalent to approximately 21 new cases per day or almost one new case every hour. Yearly, approximately 4,500 deaths from cervical cancer, and 10 people die daily due to delayed treatment. These deaths primarily occur among individuals aged 40 to 50, a critical age group for cervical cancer.
                                                </p>
                                                <p>The most effective and cost-efficient way to prevent cervical cancer is through HPV vaccination and screening for HPV infection or abnormal cell development that could progress into cervical cancer. Currently, HPV testing can be easily performed with self-testing kits at home without the need to visit a healthcare provider, making it more convenient for preventing the development of cervical cancer.
</p>
                                                <p>References: World Health Organization, Department of Health, and Cancer Institute.
</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='inner_content_maincont'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='inner_subblock'>
                                    <h2>Related Blogs</h2>
                                    <div className='inner_subblock_des'>
                                        <div className='blog_item'>
                                            <div className='blog_item_pic'>
                                                <Link to='#'>
                                                    <img
                                                        src={blog_pic1}
                                                        alt=''
                                                        className='img-fluid'
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

                                        <div className='blog_item'>
                                            <div className='blog_item_pic'>
                                                <Link to='#'>
                                                    <img
                                                        src={blog_pic2}
                                                        alt=''
                                                        className='img-fluid'
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

                                        <div className='blog_item'>
                                            <div className='blog_item_pic'>
                                                <Link to='#'>
                                                    <img
                                                        src={blog_pic3}
                                                        alt=''
                                                        className='img-fluid'
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

export default Blog6;
