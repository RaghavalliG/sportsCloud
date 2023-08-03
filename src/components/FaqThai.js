import React,{useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../style.css";
import faq_col_1 from "../assets/image/faq-col-1.jpg";
import faq_col_2 from "../assets/image/faq-col-2.png";
import faq_col_3 from "../assets/image/faq-col-3.png";
import { Link } from "react-router-dom";

const FaqThai = () => {

  useEffect(() => {
    allFaQ()
    
    
  });
  const allFaQ = () => {
    for(var i = 0; i < document.querySelectorAll('.all-faq').length; i++) {
      document.querySelectorAll('.all-faq')[i].style.display = "block";
    }
    for(var i = 0; i < document.querySelectorAll('.sti').length; i++) {
      document.querySelectorAll('.sti')[i].style.display = "none";
    }
    for(var i = 0; i < document.querySelectorAll('.ava').length; i++) {
      document.querySelectorAll('.ava')[i].style.display = "none";
    }
    for(var i = 0; i < document.querySelectorAll('.hpv').length; i++) {
      document.querySelectorAll('.hpv')[i].style.display = "none";
    }
    
  }
  const HpvConnection=(e)=>{
    console.log('clicked')
    // e.currentTarget.classList.add('active');
    // document.querySelector('#hpvcard')[0].add('className','active');
    console.log(document.querySelectorAll('.all-faq').length)
    for(var i = 0; i < document.querySelectorAll('.all-faq').length; i++) {
      document.querySelectorAll('.all-faq')[i].style.display = "none";
    }
    for(var i = 0; i < document.querySelectorAll('.sti').length; i++) {
      document.querySelectorAll('.sti')[i].style.display = "none";
    }
    for(var i = 0; i < document.querySelectorAll('.ava').length; i++) {
      document.querySelectorAll('.ava')[i].style.display = "none";
    }
    for(var i = 0; i < document.querySelectorAll('.hpv').length; i++) {
      document.querySelectorAll('.hpv')[i].style.display = "block";
    }
    
    
    
    // document.getElementById('hpvcard').classList.add("active")
    // document.querySelector("hpv").show()
    // document.querySelector("all-faq,sti,ava").hide()

  }
  const stiConnection=(e)=>{
    console.log('clicked')
    // document.querySelector('#hpvcard')[0].add('className','active');
    console.log(document.querySelectorAll('.all-faq').length)
    for(var i = 0; i < document.querySelectorAll('.all-faq').length; i++) {
      document.querySelectorAll('.all-faq')[i].style.display = "none";
    }
    for(var i = 0; i < document.querySelectorAll('.sti').length; i++) {
      document.querySelectorAll('.sti')[i].style.display = "block";
    }
    for(var i = 0; i < document.querySelectorAll('.ava').length; i++) {
      document.querySelectorAll('.ava')[i].style.display = "none";
    }
    for(var i = 0; i < document.querySelectorAll('.hpv').length; i++) {
      document.querySelectorAll('.hpv')[i].style.display = "none";
    }
  
  }
  const shConnection=(e)=>{
    console.log('clicked')
    // document.querySelector('#hpvcard')[0].add('className','active');
    console.log(document.querySelectorAll('.all-faq').length)
    for(var i = 0; i < document.querySelectorAll('.all-faq').length; i++) {
      document.querySelectorAll('.all-faq')[i].style.display = "none";
    }
    for(var i = 0; i < document.querySelectorAll('.sti').length; i++) {
      document.querySelectorAll('.sti')[i].style.display = "none";
    }
    for(var i = 0; i < document.querySelectorAll('.ava').length; i++) {
      document.querySelectorAll('.ava')[i].style.display = "block";
    }
    for(var i = 0; i < document.querySelectorAll('.hpv').length; i++) {
      document.querySelectorAll('.hpv')[i].style.display = "none";
    }
  }
  return (
    <div className='site-wrap'>
      <Header />
      <section className='inner-banner faq-banner bg-light-blue'>
        <h1 className='font-2 banner-title'>
        ความรู้คือขุมทรัพย์
        </h1>
      </section>
      <div className='container'>
        <div className='search-box mt-50'>
          <input
            type='text'
            className='form-control'
            placeholder='Search for anything'
          />
          <button className='btn btn-search'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 35 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M27.0234 13.666C27.0234 20.3254 21.3707 25.8319 14.2617 25.8319C7.15264 25.8319 1.5 20.3254 1.5 13.666C1.5 7.00656 7.15264 1.5 14.2617 1.5C21.3707 1.5 27.0234 7.00656 27.0234 13.666Z'
                stroke='black'
                stroke-width='3'
              />
              <line
                y1='-1.5'
                x2='13.4894'
                y2='-1.5'
                transform='matrix(0.722026 0.691866 -0.722026 0.691866 22.2617 22.6672)'
                stroke='black'
                stroke-width='3'
              />
            </svg>
          </button>
        </div>
      </div>

      <div className='faq-flex-column'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='card ' id="hpvcard" onClick={(e)=>HpvConnection()}>
                <div className='graphic'>
                  <img src={faq_col_1} alt='' />
                </div>
                <h4 className='card-title'  id="hpv" >เอชพีวี</h4>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card' id="sticard" onClick={(e)=>stiConnection()}>
                <div className='graphic'>
                  <img src={faq_col_2} alt='' />
                </div>
                <h4 className='card-title'>เอสทีไอ</h4>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card' id="shcard" onClick={(e)=>shConnection()}>
                <div className='graphic'>
                  <img src={faq_col_3} alt='' />
                </div>
                <h4 className='card-title'>สุขภาพทางเพศ</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='faq-sec'>
        <div className='container'>
          <div className='pill-meta'>
            <h2 className='font-1 f-32'>Topics</h2>
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
          </div>

          <h2 className='font-1 f-36'>คำถามที่พบบ่อย</h2>
          <p className='font-1 f-20 color-blue-light'>
          เริ่มต้นด้วยคำถามที่ทุกคนถามบ่อย
          </p>

        

          <div className='accordion mb-5 accordion-flush' id="faq_accordion_list">
            
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_1'
                >
                 อาการของเอสทีไอมีอะไรบ้าง?
                </button>
              </h4>
              <div id='faq_row_1' className='accordion-collapse collapse show' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>
                หากคุณกังวลว่าอาจติดเชื้อทางเพศสัมพันธ์
                  ทางที่ดีคือรีบตรวจสุขภาพ หาว่าเป็นหรือไม่
                  อย่ามีเพศสัมพันธ์รวมถึงการมีเพศสัมพันธ์ด้วยปากโดยไม่ใช้ถุงยางเพื่อป้องกันคุณและคู่นอนจนกว่าคุณจะได้รับการตรวจสุขภาพ
                  คุณอาจมีการติดเชื้อทางเพศโดยที่ไม่รู้ตัว
                  และสามารถติดเชื้อให้กับคู่รักของคุณขณะมีเพศสัมพันธ์ได้
                  อาการของการติดเชื้อทางเพศ (STI)
                  
                  <p>อาการของการติดเชื้อทางเพศอาจประกอบด้วย:</p>
                  <ul>
                    <li>
                    การมีน้ำเหลืองผิดปกติจากช่องคลอด อวัยวะเพศชาย หรือช่องก้น
                    </li>
                    <li>อาการปวดตอนขัดสะบัก</li>
                    <li>
                    ตุ่มหรือก้อนผิวหนังที่บริเวณอวัยวะเพศหรือตูด (ก้น)
                    </li>
                    <li>ผื่นผิวหนังผิดปกติ</li>
                    <li>การเลือดออกผิดปกติจากช่องคลอด</li>
                    <li>คันที่อวัยวะเพศหรือตูด</li>
                    <li>แผลเปื่อยและหรือแผลที่อวัยวะเพศหรือตูด</li>
                    <li>หูดและหรือหนองที่อวัยวะเพศหรือตูด</li>
                    <li>
                    หูดที่ปากหรือลำคอ แต่นี้เป็นเรื่องหายากมาก
                    </li>
                  </ul>
                  <p>
                  ที่สำคัญคือบางคนสามารถติดเชื้อทางเพศสัมพันธ์โดยที่ไม่รู้ตัวหรือไม่มีอาการเลย แต่สามารถแพร่ได้ ทางที่ดีควรตรวจสุขภาพทางเพศตามความเหมาะสม 
                  </p>
                </div>
              </div>
            </div>
            {/* <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_2'
                >
                  How do I prevent weight gain from hormonal birth control?
                </button>
              </h4>
              <div id='faq_row_2' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>Coming Soon</div>
              </div>
            </div>
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_3'
                >
                  How do I ask a new sexual partner to get STI tested without
                  breaching trust?
                </button>
              </h4>
              <div id='faq_row_3' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>Coming Soon</div>
              </div>
            </div>
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_4'
                >
                  Do I need to get a HPV Vaccination?
                </button>
              </h4>
              <div id='faq_row_4' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>Coming Soon</div>
              </div>
            </div>
            
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_5'
                >
                  How do you contract STI/STDs?
                </button>
              </h4>
              <div id='faq_row_5' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>Coming Soon</div>
              </div>
            </div> */}
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_6'
                >
                  โรคติดต่อทางเพศสัมพันธ์มีอาการหรือไม่?
                </button>
              </h4>
              <div id='faq_row_6' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>โรคติดต่อทางเพศหลายโรคไม่เเสดงอาการหลังได้รับเชื้อ หรืออาจใช้เวลานานก่อนมีอาการ ดังนั้น วิธีเดียวที่จะทราบได้แน่ชัดคือการตรวจหาเชื้อเมื่อมีความเสี่ยง รวมถึงใช้ถุงยางอนามันเพื่อป้องกันการติดเชื้อทุกครั้ง</div>
              </div>
            </div>
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_7'
                >
                 ความแตกต่างระหว่างการตรวจโรคติดเชื้อทางเพศด้วยปัสสาวะและเอวาคืออะไร?
                </button>
              </h4>
              <div id='faq_row_7' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>การวิจัยพบว่าการเก็บตัวอย่างเซลล์มีความแม่นยำสูงกว่าการใช้ปัสสาวะในการตรวจหาเชื้อเอชพีวี AVA ใช้วิธีการตรวจวิจัยด้วยการเก็บตัวอย่างเซลล์ซึ่งมีความแม่นยำสูงกว่าการใช้ปัสสาวะ เป็นการตรวจที่แนะนำโดย CDC สหรัฐอเมริกา เพื่อตรวจหาการติดเชื้อทางเพศสัมพันธ์โดยเฉพาะเชื้อคลามิเดีย กอนอรีและตริโคโมเนียซิส การเก็บตัวอย่างปัสสาวะอาจผลตรวจเป็นลบที่ไม่ถูกต้องและการติดเชื้อโดยที่ไม่ได้รับการรักษา</div>
              </div>
            </div>
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_8'
                >
                 ควรทุกกับคู่นอนยังไงให้ไปตรวจโรงติดต่อทางเพศสัมพันธ์โดยไม่ทำให้ผิดใจหรือมีปัญหากัน? 
                </button>
              </h4>
              <div id='faq_row_8' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'> ส่วนที่สำคัญที่สุดในการคุยกับคู่นอนเรื่องการตรวจโรคติดต่อทางเพศสัมพันธ์คือต้องพูดคุยกันด้วยความเข้าใจ
                  เอาใจเขาใส่ใจเรา และให้ทั้งคู่ต่างมองถึงสุขภาพทางเพศ
                  ความแข็งแรงของร่างกาย
                  นี้เป็นสิ่งที่ควรนึกถึงก่อนพูดคุยกับคู่ของเรา:
                  <ul>
                    <li>1.เลือกเวลาและสถานที่ให้ถูก</li>
                    <li>2. พูดอย่างจริงใจและชัดเจน</li>
                    <li>3. ให้ข้อมูลและทำให้การตรวจเป็นเรื่องปกติ</li>
                    <li>
                      4. ใช้ว่า’เรา’(ทั้งคู่) แทนคำว่า ‘เธอ’
                      (พูดถึงคู่นอนคนเดียว)
                    </li>
                    <li>5. แสดงให้ชัดว่าเราก็ตรวจด้วย</li>
                    <li>6. ให้พื้นที่หรือความเป็นส่วนตัวกับคู่</li>
                    <li>7. พูดคุยสื่งที่เป็นกังวล ความกลัวต่างๆ</li>
                    <li>8. ให้ทางเลือกต่างๆ</li>
                    <li>9. พูดคุยแบบไม่โทษกันไปมา และไม่ตัดสินกันแบบผิดๆ</li>
                  </ul>
                  เข้าไปอ่านเรื่องนี้เพิ่มเติมและละเอียดได้ ในหน้าบทความ{" "} </div>
              </div>
            </div>
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_9'
                >
                  ถุงอย่างอนามัยสามารถป้องกันโรคติดต่อทางเพศสัมพันธ์ได้หรือไม่? 
                </button>
              </h4>
              <div id='faq_row_9' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>ถุงยางอนามัยเป็นวิธีการป้องกันการติดเชื้อทางเพศสัมพันธ์ที่มีประสิทธิภาพ แต่ไม่สามารถป้องกันที่มีประสิทธิภาพ 100% ได้เสมอ เนื่องจากการติดเชื้อทางเพศสัมพันธ์สามารถเกิดขึ้นผ่านการสัมผัสผิวต่อผิว ซึ่งหมายความว่าบริเวณที่ไม่ได้ถูกคลุมโดยถุงยางอนามัย เช่น บริเวณอวัยวะเพศ ยังคงมีความเสี่ยง การเล้าโลมทางเพศก่อนการมีเพศสัมพันธ์ การมีเพศสัมพันธ์ด้วยปาก หรือการใช้ของเล่นทางเพศก็สามารถเป็นสาเหตุให้ติดเชื้อทางเพศสัมพันธ์ได้</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_10'
                >
                ความแตกต่างระหว่างการตรวจ Pap smear, ThinP prep และการตรวจ HPV คืออะไร?
                </button>
              </h4>
              <div id='faq_row_10' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>การตรวจ Pap smear หรือการตรวจความเปลี่ยนแปลงของเซลล์บนแผ่นสไลด์แก้ว ส่วนในการตรวจ ThinPrep pap test นั้น จะเก็บตัวอย่างเซลล์โดยใช้แปรงชนิดพิเศษ จากนั้นกรองเซลล์เพื่อล้างสารอื่นๆ ก่อนนำเซลล์มาวางในแผ่นสไลด์แก้วเป็นชั้นบางเพียงชั้นเดียว ในขณะเดียวกัน การคัดกรอง HPV เป็นการตรวจหาเชื้อไวรัสชนิด (HPV) ที่เป็นสาเหตุของมะเร็งปากมดลูก</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_11'
                >
                ผลการตรวจมีความแม่นยำเท่ากับการไปโรงพยาบาลหรือคลินิกหรือไม่?
                </button>
              </h4>
              <div id='faq_row_11' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>ความแม่นยำของผลตรวจขึ้นอยู่กับประสิทธิภาพในการเก็บตัวอย่าง แต่ว่าเรามีวิธีการเก็บตัวอย่างที่ชัดเจน ทำตามได้ง่ายโอกาสผิดผลาดจึงตํ่า</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_12'
                >
                 อาการของการติดเชื้อ Human papillomavirus (HPV) คืออะไร?
                </button>
              </h4>
              <div id='faq_row_12' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>ส่วนใหญ่ของผู้ติดเชื้อ HPV ไม่แสดงอาการใดๆ ดังนั้นการทำการคัดกรองเชื้อ HPV จึงเป็นสิ่งสำคัญในบุคคลที่มีประสบการณ์ทางเพศแล้ว การคัดกรองเชื้อ HPV ช่วยตรวจหาเชื้อ HPV โดยเฉพาะสายพันธุ์ที่มีความเสี่ยงสูง (16 และ 18) ซึ่งมีโอกาสเสี่ยงเป็นมะเร็งปากมดลูกได้</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_13'
                >
                 ติด HPV ได้อย่างไร?
                </button>
              </h4>
              <div id='faq_row_13' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>HPV ติดต่อผ่านทางเพศสัมพันธ์ สามารถติดต่อได้ทั้งในผู้หญิงเเละผู้ชาย ดังนั้นการคัดกรองเชื้อ HPV จึงจำเป็นสำหรับทั้งผู้ชายและผู้หญิง</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_14'
                >
                 HPV เป็นสาเหตุของมะเร็งปากมดลูก?
                </button>
              </h4>
              <div id='faq_row_14' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>เชื้อ HPV มีมากกว่า 100 ชนิดและไม่ใช่ทุกชนิดเป็นสาเหตุของมะเร็ง ซึ่งเชื้อ HPV สายพันธุ์ที่ทำให้เกิดโรคมะเร็งปากมดลูกได้สูงที่สุด 2 ชนิด คือ สายพันธุ์ที่ 16 และ 18</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_15'
                >
                 มะเร็งปากมดลูกเกิดจากพันธุกรรมหรือไม่?
                </button>
              </h4>
              <div id='faq_row_15' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>มะเร็งปากมดลูกเป็นโรคติดต่อทางเพศสัมพันธ์ ไม่ถ่ายทอดทางพันธุกรรม อย่างไรก็ตาม หากมีสมาชิกในตระกูลคนใดเคยเป็นโรคมะเร็ง อาจมีโอกาสพัฒนาเป็นมะเร็งได้ง่ายขึ้น</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_16'
                >
                ถ้าผลตรวจ HPV เป็นบวก หมายความว่าฉันเป็นมะเร็งหรือไม่?
                </button>
              </h4>
              <div id='faq_row_16' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>แม้ผลตรวจ HPV จะเป็นบวก แต่ไม่ได้หมายความว่าเป็นโรคมะเร็งเสมอไป ทั่วไปร่างกายสามารถกำจัดเชื้อ HPV บางสายพันธุ์ได้เอง ขณะเดียวกันบางสายพันธุ์อาจพัฒนาไปเป้นมะเร็ง โดยใช้เวลาสูงสุดถึง 10 ปี </div>
              </div>
            </div>
            <div className='accordion-item sti'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_17'
                >
                ความแตกต่างระหว่าง STI และ STD คืออะไร?
                </button>
              </h4>
              <div id='faq_row_17' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>STD หมายถึง “Sexually Transmitted Disease หรือ โรคที่ถ่ายทอดผ่านทางเพศสัมพันธ์” และ STI หมายถึง “Sexually Transmitted Infection หรือ การติดเชื้อทางเพศสัมพันธ์” โดยพื้นฐานแล้ว ผู้คนกำลังพูดถึงสิ่งเดียวกัน: การติดเชื้อที่ถ่ายทอดจากบุคคลหนึ่งไปยังอีกคนผ่านทางเพศสัมพันธ์</div>
              </div>
            </div> 
            <div className='accordion-item sti'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_18'
                >
                ควรตรวจหาเชื้อติดต่อทางเพศสัมพันธ์ บ่อยแค่ไหน?
                </button>
              </h4>
              <div id='faq_row_18' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>แนะนำให้ทำการตรวจสอบทุก ๆ 3 เดือนสำหรับบุคคลที่มีกิจกรรมทางเพศสม่ำเสมอหรือเปลี่ยนคู่นอนบ่อย อย่างไรก็ตามการตรวจโรคติดต่อทางเพศสัมพันธ์ ก่อนเริ่มความสัมพันธ์หรือหลังจบความสัมพันธ์ ก็เป็นเรื่องที่น่าคำนึงถึง</div>
              </div>
            </div> 
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_19'
                >
                 ตรวจหาเชื้อเอชพีวีและโรคติดต่อทางเพศสัมพันธ์พร้อมกันได้หรือไม่?
                </button>
              </h4>
              <div id='faq_row_19' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>ได้โดยซื้อกล่องเอวา กล่องสีเขียวสำหรับการตรวจเชื้อเอชพีวี และสั่งตรวจหาโรคติดต่อทางเพศสัมพันธ์เพิ่มได้บนเว็บไซต์หลังลงทะเบียนชุดตรวจ หรือตัดสินใจสั่งซื้อเพิ่มภายหลังได้รับผลตรวจเอชพีวีก็ได้เช่นกัน *วินเมดเเลปจะเก็บตัวอย่าง 30 วันหลังจากได้รับตัวอย่าง</div>
              </div>
            </div>
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_20'
                >
                 ส่งตัวอย่างไปที่วินเมดแลป ภายในกี่วัน?
                </button>
              </h4>
              <div id='faq_row_20' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>ควรส่งตัวอย่างกลับมาที่วินเมดเเลปให้เร็วที่สุด จะดีที่สุด แต่ไม่ควรเกิน 30 วันหลังจากเก็บตัวอย่าง</div>
              </div>
            </div>
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_21'
                >
                ผลการตรวจมีความแม่นยำเท่ากับการไปโรงพยาบาลหรือคลินิกหรือไม่?
                </button>
              </h4>
              <div id='faq_row_21' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>ความแม่นยำของผลตรวจขึ้นอยู่กับประสิทธิภาพในการเก็บตัวอย่าง</div>
              </div>
            </div>
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_22'
                >
                 หากเก็บตัวอย่างไม่ถูกต้อง จะเกิดอะไรขึ้น?
                </button>
              </h4>
              <div id='faq_row_22' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>ไม่ต้องกังวล วิธีการใช้เอวานั้นเข้าใจง่าย เพียงทำตามขั้นตอนที่ระบุไว้ และสามารถดูวิดีโอวิธีการใช้งานประกอบร่วมได้</div>
              </div>
            </div> 
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_23'
                >
                 ฉันจะได้รับผลตรวจเมื่อใด?
                </button>
              </h4>
              <div id='faq_row_23' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>ภายในระยะเวลา 7 วันหลังจากตัวอย่างถึงที่วินเมดเเลป</div>
              </div>
            </div>
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_24'
                >
               ความแตกต่างระหว่างการตรวจโรคติดเชื้อทางเพศด้วยปัสสาวะและเอวาคืออะไร?
                </button>
              </h4>
              <div id='faq_row_24' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>การวิจัยพบว่าการเก็บตัวอย่างเซลล์มีความแม่นยำสูงกว่าการใช้ปัสสาวะในการตรวจหาเชื้อเอชพีวี</div>
              </div>
            </div>
            
          </div>

          <div className='actions'>
            <p className='text-center'>
              <Link to='' className='link-text'>
                More FAQs
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className='faq-btn-img'>
        <img src='image/faq-bot-img.svg' alt='' />
      </div>

      {/* <!-- Start footer --> */}
      <Footer />
      {/* <!-- end footer --> */}
    </div>
  );
};

export default  FaqThai;
