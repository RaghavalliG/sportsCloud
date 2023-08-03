import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../style.css";
import knowlage_title from "../assets/image/knowlage_title.png";
import Blog_Highlight from "../assets/image/Blog-Highlight.png";
import blog_img from "../assets/image/blog-img.png";
import imag_blog2 from "../assets/image/image_blog2.jpg";


const KnowledgeThai = () => {

  return (
    <div className='site-wrap blog-page'>
      <Header />

      <div className='knoledge-big-banner'>
        <h1 className='text-center'>
          <img src={knowlage_title} alt='' />
        </h1>
        <p className='page-sub-title text-center'>
          พื้นที่แบ่งปันเรื่องที่ควรรู้ เพราะความรู้จะมีค่าเมื่อเกิดการบอกต่อ

        </p>
        <div className='text-center mb-5'>
          <p className=' lead'>
            จากทีมงานของเรา

          </p>
        </div>
        <div className='quick-knoledge-sec'>
          <div className='container'>
            <div className='cover-card mb-0'>
              <img src={Blog_Highlight} alt='' className='card-img' />
              <div className='floted-caption pos-bot'>
                <div className='meta-date'>Sarisa Gajaseni 20 Mar 2023</div>
                <h3 className='card-title big'>

                  เพศสัมพันธ์เป็นสิ่งที่สวยงาม แต่ ก็ไม่เสมอไป{" "}
                </h3>
                <p className='card-text big'>
                  เข้าใจ SEX กับความปลอดภัยในบทความนี้

                </p>
                <div className='action btn-groups'>
                  <Link to='/knowledge/blog' className='pill pill-outline'>
                    {/* <Link to='' className='pill pill-outline'> */}
                    #SAFESEX
                  </Link>
                  <Link to='/knowledge/blog' className='pill pill-outline'>
                    {/* <Link to='' className='pill pill-outline'> */}

                    #STDPREVENTION
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Banner ends --> */}
      {/* <!-- search start --> */}
      <div className='bg-search-sec bg-yellow'>
        <h2 className='primary-title text-center text-white'>
          สงสัยเรื่องอะไรอยู่

        </h2>
        <div className='search-wrap-block'>
          <form action='' className='search-form-w'>
            <input
              type='text'
              name=''
              className='form-control'
              placeholder='ค้นหา'
            />
            <input type='button' value='' className='btn-search' />
          </form>
        </div>
      </div>
      {/* <!-- search start Ends --> */}

      {/* <!-- blog lists --> */}
      <div className='blog-lists'>
        <div className='container'>
          <div className='secondary-title'>

            เรื่องต่างๆ
          </div>
          <div className='blog-filter'>
            <Link to='' className='btn btn-pill-outline active'>
              #SAFESEX
            </Link>
            <Link to='' className='btn btn-pill-outline '>

              #STDPREVENTION
            </Link>
            <Link to='' className='btn btn-pill-outline '>
              #HPV
            </Link>
            <Link to='' className='btn btn-pill-outline '>

              #BIRTHCONTROL
            </Link>
            <Link to='' className='btn btn-pill-outline '>

              #RELATIONSHIPS
            </Link>
          </div>

          {/* <!-- posts --> */}
          <div className='posts'>
            <div className='post-article card'>
              <div className='row'>
                <div className='col-lg-7 graphic'>
                  <img src={imag_blog2} alt='' className='image-fluid' />
                </div>
                <div className='col-lg-5 content'>
                  <h2 className='post-title'>
                    เนื้อแนบเนื้อ ปลอดภัยจริงหรอ?

                  </h2>
                  <div className='post-meta'>Pedsupab Team 17 July 2023 </div>
                  <p>

                    หลายคนสงสัยว่าความรู้สึกแบบเนื้อแนบเนื้อมันดีกว่าใส่ถุงยางป้องกันจริงๆหรอ
                    แล้วถ้าเนื้อแนบเนื้อบ่อยๆจะเสี่ยงติดโรคติดต่อทางเพศสัมพันธ์ได้ทันทีเลยไหม วันนี้เราจะมาพูดคุยถึงหัวข้อนี้กัน
                    เรื่องการป้องกันใส่ถุงยางอนามัยขึ้นอยู่กับการตกลงของทั้งสองฝ่าย
                    ซึ่งไม่ว่าจะเป็นผู้หญิงหรือผู้ชายควรมีความยิมยอมกันทั้งสองฝ่ายไม่ว่าจะใส่ถุงหรือไม่ใส่
                    ส่วนใหญ่เรามักจะได้ยินมาว่าถ้าสดแล้วจะฟิลลื่นกว่าแบบถุง
                    ซึ่งอาจจะไม่จริงเสมอไปเพราะถุงยางอนามัยในปัจุบันนี้ต่างผลิตออกมาแข่งขันกันเรื่องสรรพคุณความบางเฉียบเหมือนไม่ใ
                    ส่ ฟิลเนื้อแนบเนื้อ แถมยังมีสารหล่อลื่นเลียนแบบธรรมชาติ
                    หลายยี่ห้อต่างโฆษณาถึงความลื่นของสารหล่อลื่นชนิดที่ว่าลื่นเสมือนของธรรมชาติ
                    แต่ก็มีบางคนที่ชอบสอดใส่สดโดยไม่ใส่ถุงยาง อาจเพราะเหตุผลแพ้ถุงยางอนามัย หรือก็เราคบกันแล้วจะไปกังวลทำไม
                    เหตุผลความเชื่อใจ
                  </p>

                  <p>

                    การมีเพศสัมพันธ์ภายนอก การเล้าโลม การใช้ปาก (Oral Sex ) ไม่ว่าจะแบบไหนไม่สอดใส่เข้าไป
                    ก็มีความเสี่ยงที่จะติดโรคติดต่อทางเพศสัมพันธ์
                    ผ่านทางสารคัดหลั่งของร่างกายบางคนร่างกายแข็งแรงภูมิคุ้มกันไม่บกพร่องก็สามารถต้านเชื้อเองได้
                    แล้วถ้าร่างกายไม่แข็งแรงมีโอกาสเสี่ยงติดโรคติดต่อทางเพศสัมพันธ์ได้
                  </p>
                  <div className='post-tag-meta'>
                    <Link to='' className='btn btn-pill-outline '>

                      #BIRTHCONTROL
                    </Link>
                    <Link to='' className='btn btn-pill-outline '>

                      #RELATIONSHIPS
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='post-article card'>
              <div className='row'>
                <div className='col-lg-7 graphic'>
                  <img src={blog_img} alt='' className='image-fluid' />
                </div>
                <div className='col-lg-5 content'>
                  <h2 className='post-title'>

                    เรื่องมักเข้าใจผิด กับเอชพีวี และความสำคัญของการตรวจคัดกรอง
                  </h2>
                  <div className='post-meta'>Pedsupab Team 17 July 2023</div>
                  <p>

                    ในบล็อกนี้ เราจะข้อแก้อกไขความเข้าใจผิดเกี่ยวกับ HPV (Human Papillomavirus) และการตรวจ HPV โดยการปฏิเสธความเชื่อที่ผิดและให้ข้อมูลที่ถูกต้อง เราหวังว่าจะจัดหาความรู้ที่จำเป็นให้คุณเพื่อที่คุณจะสามารถควบคุมสุขภาพเพศสัมพันธ์ของตัวเองได้ มาเริ่มกันเถอะ!
                  </p>

                  <p>

                    การทำความเข้าใจ HPV และความเชื่อมโยงกับมะเร็งปากมดลูก:

                    HPV เป็นโรคติดเชื้อทางเพศที่พบบ่อยที่สุดในทั้งชายและหญิง ขัดกับความเชื่อที่เป็นที่นิยม HPV ไม่จำกัดเฉพาะกลุ่มหรือช่วงอายุ มันสามารถถูกแพร่กระจายผ่านกิจกรรมเพศที่หลากหลาย รวมถึงเพศสัมพันธ์ทางช่องคลอด เพศสัมพันธ์ทางทวารหนัก และเพศสัมพันธ์ทางปาก รวมถึงการสัมผัสผิวหนังที่ใกล้ชิดm
                  </p>
                  <div className='post-tag-meta'>
                    <Link to='' className='btn btn-pill-outline '>

                      #BIRTHCONTROL
                    </Link>
                    <Link to='' className='btn btn-pill-outline '>

                      #BIRTHCONTROL
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='post-article card'>
              <div className='row'>
                <div className='col-lg-7 graphic'>
                  <img src={blog_img} alt='' className='image-fluid' />
                </div>
                <div className='col-lg-5 content'>
                  <h2 className='post-title'>

                    สูบบุหรี่เสี่ยงเป็นมะเร็งปากมดลูกอย่างไร
                  </h2>
                  <div className='post-meta'>Pedsupab Team 17 July 2023</div>
                  <p>

                    สำหรับสาวพ้นควันทั้งหลายที่ยังคงสับสนงุนงงว่าการสูบบุหรี่เสี่ยงเป็นมะเร็งปากมดลูกได้อย่างไรในเมื่อเราสูบควันลงไปแค่ปอดไม่ได้ลงไม่ถึงมดลูกหรือช่องคลอดเสียหน่อย ต้องเป็นมะเร็งจำพวก มะเร็งปาก มะเร็งช่องคอ มะเร็งปอด อะไรพวกนั้นสิถึงจะดูสมเหตุสมผลกว่า


                  </p>

                  <p>

                    การกระตุ้นผ่านกระแสเลือด

                    เชื้อ HPV ส่วนใหญ่มีผู้ชายเป็นพาหะ ดังนั้นการมีเพศสัมพันธ์เป็นสาเหตุ ถึง 90% (ปัจจัยอื่นอีกอีก 10% เช่น ห้องน้ำสาธาณะ) เพราะฉะนั่นคุณมีเพศสัมพันธ์ผ่านช่องทางไหนตรงนั้นก็สามารถเป็นมะเร็งหรือหูดเพราะเชื้อ HPV ได้ทั้งหมด
                  </p>
                  <div className='post-tag-meta'>
                    <Link to='' className='btn btn-pill-outline '>

                      #BIRTHCONTROL
                    </Link>
                    <Link to='' className='btn btn-pill-outline '>

                      #BIRTHCONTROL
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='post-article card'>
              <div className='row'>
                <div className='col-lg-7 graphic'>
                  <img src={blog_img} alt='' className='image-fluid' />
                </div>
                <div className='col-lg-5 content'>
                  <h2 className='post-title'>

                    อัตรามะเร็งปากมดลูกที่สูงขึ้น และความจำเป็นของการตรวจคัดกรองในไทย -
                  </h2>
                  <div className='post-meta'>Pedsupab Team 17 July 2023</div>
                  <p>

                    ผู้ที่ได้รับเชื้อ HPV กว่า 90% ร่างกายสามารถกำจัดเชื้อออกไปได้เอง แต่จากผลสำรวจขององค์การอนามัยโลก (WHO) ในปี 2020 มีผู้ที่เป็นมะเร็งปากมดลูกรายใหม่ ถึง 60,400 ราย และมีผู้เสียชีวิตถึง 34,200 ราย ทั้งยังมีผู้ที่ป่วยอยู่แล้วและยังไม่ได้เข้ารับการรักษาอีกด้วย ที่น่าเป็นห่วงคือ 90% ของผู้ติดเชื้อรายใหม่และผู้เสียชีวิตมาจากประเทศที่มีรายได้น้อย ที่สำคัญการมีติดเชื้อกว่า 90% มาจากการมีเพศสัมพันธ์


                  </p>

                  <p>

                    ทั้งยังพบด้วยว่าผู้ที่ติดเชื้อ HIV มีโอกาสเสี่ยงเป็นมะเร็งปากมดลูกกว่าคนที่ไม่ติดเชื้อถึง 6 เท่า

                    ทางองค์การอนามัยโลกจึงมีเป้าหมายให้ในปี 2030 ทุกประเทศทั่วโลกมีผู้ป่วยมะเร็งปากมดลูกน้อยกว่า 4 รายต่อประชากร 100,000 คนและคงไว้ จึงวางกลยุทธ์ 90-70-90
                  </p>
                  <div className='post-tag-meta'>
                    <Link to='' className='btn btn-pill-outline '>

                      #BIRTHCONTROL
                    </Link>
                    <Link to='' className='btn btn-pill-outline '>

                      #BIRTHCONTROL
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='post-article card'>
              <div className='row'>
                <div className='col-lg-7 graphic'>
                  <img src={blog_img} alt='' className='image-fluid' />
                </div>
                <div className='col-lg-5 content'>
                  <h2 className='post-title'>
                  กิจกรรมทางเพศทำให้เกิดความเครียดได้
                  </h2>
                  <div className='post-meta'>Pedsupab Team 17 July 2023</div>
                  <p>

                  การมีเพศสัมพันธ์รวมไปถึงการช่วยตัวเอง เป้าหมายทั้งสองอย่างคงหนีไม่พ้นการถึงจุดสุดยอด หรือการทำให้อีกฝ่ายรู้สึกดี แต่บางคู่กับรู้สึกแย่ เครียด ซึมเศร้า วิตกกังวล รู้สึกทำได้ไม่ดีพอ ก้าวร้าวทะเลาะกับคู่นอน ทัศนคติเกี่ยวกับSEX ปมจากการโดนล่วงละเมิด หลังจบกิจกรรมบนเตียงภาวะเหล่านี้ถ้าเป็นได้บ่อยๆ คือภาวะ Post-coital tristesse(PCT) หมายถึงอาการความเศร้าหรือความเหงาที่เกิดขึ้นหลังจากการมีเพศสัมพันธ์ ภาวะเหล่านี้คนส่วนใหญ่สามารถพบเจอได้ และมักจะหายไปเอง หรือบางคนอาจจะเป็นนานกว่าปกตินั้นคือภาวะที่เคมีในสมองมีส่วนเข้ามาเกี่ยวข้อง สาเหตุหลักภาวะ Post-coital tristesse(PCT) คือฮอร์โมนในร่างกาย เมื่อถึงจุดสุดยอด ร่างกายจะปล่อยฮอร์โมนออกมาไม่ว่าจะเป็น โดปามีน และออกซิโทซิน ถ้าถึงจุดสุดยอดรวมถึงฮอร์โมนอื่นจะปล่อยออกมาอย่างรวดเร็ว และลดระดับลงอย่างรวดเร็ว ตรงนี้คือช่วงที่เรียกได้ว่าเป็นจุดที่ฮอร์โมนไม่คงที่ จึงทำให้เกิดอาการ Post-coital tristesse(PCT)
                  </p>
                  <div className='post-tag-meta'>
                    <Link to='' className='btn btn-pill-outline '>

                      #BIRTHCONTROL
                    </Link>
                    <Link to='' className='btn btn-pill-outline '>

                      #BIRTHCONTROL
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- posts Ends --> */}
          <div className='post-pagination'>
            <ul className='pagination'>
              <li className='page-item'>
                <Link className='page-link active' to='#'>
                  1
                </Link>
              </li>
              <li className='page-item'>
                <Link className='page-link' to='#'>
                  2
                </Link>
              </li>
              <li className='page-item'>
                <Link className='page-link' to='#'>
                  3
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- blog lists Ends --> */}

      {/* <!-- Start footer --> */}
      <Footer />
      {/* <!-- end footer --> */}
    </div>
  );
};

export default KnowledgeThai;
