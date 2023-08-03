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

const Blog4 = () => {
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
                                            <h3>Debunking Common Misconceptions about HPV and HPV Testing: Shedding Light on Sexual Health </h3>
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
                                                    In this blog, we will address common misconceptions surrounding HPV (Human Papillomavirus) and HPV testing. By dispelling myths and providing accurate information, we aim to equip you with the knowledge needed to take control of your sexual health. Let's dive in!
                                                    Understanding HPV and its Link to Cervical Cancer:

                                                </p>
                                                <p>HPV is a common sexually transmitted infection that affects both men and women. Contrary to popular belief, HPV is not limited to a specific group or age range. It can be transmitted through various sexual activities, including vaginal, anal, and oral sex, as well as through intimate skin-to-skin contact.
                                                    One of the most significant misconceptions about HPV is its association with cervical cancer.
                                                </p>
                                                <p>While it is true that certain high-risk strains of HPV can increase the risk of developing cervical cancer, it's important to note that not all HPV infections lead to cancer. Most HPV infections clear up on their own without causing any long-term health issues.
                                                </p>
                                                <p>
                                                    HPV Testing: A Vital Component of Sexual Health:
                                                    Regular HPV testing plays a crucial role in early detection and prevention of cervical cancer. Unfortunately, there are still several misconceptions surrounding HPV testing that may prevent individuals from seeking this essential screening. Let's address these misconceptions:


                                                    <ul>
                                                        <li>Myth: Only women need HPV testing.
                                                        </li>
                                                        <li>Fact: HPV affects both men and women. While HPV testing is primarily associated with cervical cancer screening, it is equally important for men to be aware of their HPV status. HPV testing can help identify the presence of high-risk strains that can lead to genital warts, anal, or oropharyngeal cancers.

                                                        </li>
                                                        <li>
                                                            Myth: HPV testing is only necessary if I have symptoms.

                                                        </li>
                                                        <li>Fact: HPV infections often do not cause any noticeable symptoms. Regular HPV testing is essential, regardless of symptoms or visible signs. Early detection allows for timely interventions and reduces the risk of developing complications or transmitting the infection to others.
                                                        </li>
                                                        <li>Myth: Only sexually active individuals need HPV testing.
                                                        </li>
                                                        <li>Fact: HPV testing is recommended for all individuals, regardless of sexual activity. HPV can be contracted through any form of sexual contact, including skin-to-skin contact. Being proactive and aware of your HPV status is crucial for overall sexual health, regardless of your sexual history.
                                                        </li>
                                                    </ul>
                                                </p>
                                                <p>At-Home HPV Testing: Convenience and Privacy:
                                                    To address the hesitations that may arise when it comes to HPV testing, at-home testing options have become available. Self-collection kits offer convenience, privacy, and ease of use. Here's what you need to know:

                                                    <ul>
                                                        <li>Self-Collect: Taking the stigma out of testing.
                                                        </li>
                                                        <li>t-home HPV testing allows individuals to collect their own samples discreetly and comfortably in the privacy of their own homes. The self-collection process typically involves using a swab or brush to collect a sample from the vagina or anus, depending on the gender and sexual activity.
                                                        </li>
                                                        <li>Accuracy and Reliability:
                                                        </li>
                                                        <li>At-home HPV testing kits are designed to provide accurate results comparable to those obtained through clinical testing. These kits are scientifically validated and provide clear instructions for sample collection and return. It is important to follow the instructions carefully to ensure accurate results.
                                                        </li>
                                                        <li>Peace of Mind:
                                                        </li>
                                                        <li>At-home HPV testing empowers individuals to take charge of their sexual health. By testing regularly, you can stay informed about your HPV status, allowing for early intervention and reducing the potential risks associated with high-risk HPV strains.
                                                        </li>
                                                    </ul>
                                                </p>
                                                <p>Dispelling misconceptions about HPV and HPV testing is crucial for promoting sexual health awareness. Remember, HPV is a common infection that can affect anyone engaging in sexual activity. Regular HPV testing, whether conducted in a clinical setting or using at-home testing kits, plays a vital role in early detection and prevention of cervical cancer and other HPV-related conditions.

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

export default Blog4;
