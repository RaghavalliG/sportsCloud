import React,{useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../style.css";
import faq_col_1 from "../assets/image/faq-col-1.jpg";
import faq_col_2 from "../assets/image/faq-col-2.png";
import faq_col_3 from "../assets/image/faq-col-3.png";
import { Link } from "react-router-dom";

const Faq = () => {

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
          KNOWLEDGE <br />
          IS POWER
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
                <h4 className='card-title'  id="hpv" >HPV</h4>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card' id="sticard" onClick={(e)=>stiConnection()}>
                <div className='graphic'>
                  <img src={faq_col_2} alt='' />
                </div>
                <h4 className='card-title'>STIs</h4>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card' id="shcard" onClick={(e)=>shConnection()}>
                <div className='graphic'>
                  <img src={faq_col_3} alt='' />
                </div>
                <h4 className='card-title'>Sexual Health</h4>
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

          <h2 className='font-1 f-36'>Frequently Asked Questions</h2>
          <p className='font-1 f-20 color-blue-light'>
            Start with the questions everyone asks
          </p>

        

          <div className='accordion mb-5 accordion-flush' id="faq_accordion_list">
            
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_1'
                >
                  What are some key symptoms of STIs?
                </button>
              </h4>
              <div id='faq_row_1' className='accordion-collapse collapse show' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>
                  If you're worried because you think you've got an STI, go for
                  a check-up at a sexual health clinic as soon as you can. Do
                  not have sex, including oral sex, without using a condom until
                  you've had a check-up. You can have an STI without knowing it
                  and infect your partner during sex.STI symptoms
                  <p>The symptoms of an STI can include:</p>
                  <ul>
                    <li>
                      an unusual discharge from the vagina, penis, or anus
                    </li>
                    <li>pain when peeing</li>
                    <li>
                      lumps or skin growths around the genitals or bottom (anus)
                    </li>
                    <li>a rash</li>
                    <li>unusual vaginal bleeding</li>
                    <li>itchy genitals or anus</li>
                    <li>blisters and sores around your genitals or anus</li>
                    <li>warts around your genitals or anus</li>
                    <li>
                      warts in your mouth or throat, but this is very rare
                    </li>
                  </ul>
                  <p>It's Important to note that not everyone shows symptoms, thus getting tested for STIs are important for your health and of others. </p>
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
                  Does everyone who has STI have symptoms?
                </button>
              </h4>
              <div id='faq_row_6' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>Many STIs have no signs or symptoms. Some people have STIs without knowing but can carry the infection to others. The only way to know for sure is to get tested.
                  However, it is also important to use protection.</div>
              </div>
            </div>
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_7'
                >
                  What’s the difference between a urine STI test and AVA?
                </button>
              </h4>
              <div id='faq_row_7' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>AVA uses swab test which is recommended by the CDC for detecting sexually transmitted infections, especially for chlamydia, gonorrhea, and trichomoniasis. Urine samples can lead to false-negative results and untreated infections. </div>
              </div>
            </div>
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_8'
                >
                  How do I tell my sexual partner to get STI tested without breaching trust?
                </button>
              </h4>
              <div id='faq_row_8' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>When discussing STI testing with your sexual partner, it's important to approach the conversation with empathy, understanding, and a focus on mutual health and well-being.
                  Here are a few things to consider:
                  <ul>
                    <li>
                      1. Choose the right time and place
                    </li>
                    <li>
                      2. Be honest and open
                    </li>
                    <li>
                      3. Educate and normalize
                    </li>
                    <li>
                      4. Use “we” instead of “you”
                    </li>
                    <li>
                      5. Share your own commitment
                    </li>
                    <li>
                      6. Respect privacy and confidentiality
                    </li>
                    <li>
                      7. Address concerns and fears
                    </li>
                    <li>
                      8. Offer resources and options
                    </li>
                    <li>
                      9. Maintain a non-judgmental attitude
                    </li>
                  </ul>
                  Read our full blog on this topic on our knowledge page for more. </div>
              </div>
            </div>
            <div className='accordion-item all-faq'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_9'
                >
                  Do condoms protect from STIs?
                </button>
              </h4>
              <div id='faq_row_9' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>While condoms are an effective form of protection against sexually transmitted infections (STIs), it's important to note that they may not provide 100% protection. STIs can be contracted through skin-to-skin contact, which means that areas not covered by condoms, such as the genital area, can still be at risk. Engaging in foreplay, oral sex, or using sex toys can also pose risks of contracting STIs. </div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_10'
                >
                 What is the difference between Pap smear, ThinPrep, and HPV screening?
                </button>
              </h4>
              <div id='faq_row_10' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>A pap smear or pap test looks for cell changes on a glass slide. In the ThinPrep pap test, cell samples are collected by a special brush then filters out the cells before depositing them in a thin monolayer on a glass slide. On the other hand, HPV screening it to look for the virus, Human papillomavirus that causes cervical cancer.</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_11'
                >
                Are the results as accurate as going to hospitals or clinics?
                </button>
              </h4>
              <div id='faq_row_11' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>The accuracy of a test depends on collection performance. However, we provide simple-to-follow steps to make sure you’re on the right track!</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_12'
                >
                 What are the symptoms of HPV infections?
                </button>
              </h4>
              <div id='faq_row_12' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>Most people who contract HPV do not show any symptoms so it’s important to get HPV primary screening once you have experienced intercourse. Primary screening can detect HPV types and looks at how High-Risk types (16 and 18) can develop into something more concerning such as cervical cancer. </div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_13'
                >
                 How is HPV transmitted?
                </button>
              </h4>
              <div id='faq_row_13' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>HPV is transmitted through sexual intercourse. It can be from male to female or vice versa. That’s why everyone should take HPV primary screening..</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_14'
                >
                 Does HPV lead to cervical cancer?
                </button>
              </h4>
              <div id='faq_row_14' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>There are over 100 types of HPV, and not all of them lead to cancer. In fact, there are only 2 main HPV types that lead to cancer which are 16 and 18.</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_15'
                >
                 Is cervical cancer from genetics?
                </button>
              </h4>
              <div id='faq_row_15' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>Cervical cancer does not come from genetics, it is considered a sexually transmitted disease. However, if members of your family tree have had cancer, your body might be more inclined to cancer, thus making it easier for HPV (if you’ve contracted it) to become cancer.</div>
              </div>
            </div>
            <div className='accordion-item hpv'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_16'
                >
                If I test positive for HPV, do I have cancer?
                </button>
              </h4>
              <div id='faq_row_16' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>No, you don’t. HPV is not cancer. HPV is only the infection that has the potential to lead to cancer. Thus, it depends on which type of HPV you contracted and if your body can eliminate the virus. It can take up to 10 years for HPV to develop into cancer, and you can do so much to prevent that with the right healthcare.  </div>
              </div>
            </div>
            <div className='accordion-item sti'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_17'
                >
                What’s the difference between STI and STD?
                </button>
              </h4>
              <div id='faq_row_17' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>STD stands for “sexually transmitted disease,” and STI stands for “sexually transmitted infections.” Simply put, they are both the same: infections that get passed from one person to another during intercourse.</div>
              </div>
            </div> 
            <div className='accordion-item sti'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_18'
                >
                How often should I get tested for STI?
                </button>
              </h4>
              <div id='faq_row_18' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>The frequency of getting tested for STI depends on the person and their relationships. For someone who has more than one partner and is sexually active, we would recommend getting tested once every three months. However, getting tested and being safe cannot hurt anyone! So even if you’re in a long-term relationship, it’s good to get you and your partner tested. Getting tested before starting a serious relationship or ending one could also be a good measure. </div>
              </div>
            </div> 
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_19'
                >
                 Can I test for HPV and STI together? 
                </button>
              </h4>
              <div id='faq_row_19' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>Yes, you can. Buy AVA green box for HPV and on our registration website you can add STIs to your cart and our lab will test your sample for both HPV and STIs. You can also decide to test for STIs later, even after you’ve received your HPV results. Our lab will collect your sample for 30 days once they’ve tested your HPV test.</div>
              </div>
            </div>
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_20'
                >
                 How fast do I need to send my sample to Winmed Lab?
                </button>
              </h4>
              <div id='faq_row_20' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>Preferably as soon as possible but within 30 days after collection is best.</div>
              </div>
            </div>
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_21'
                >
                 Are the results as accurate as going to hospitals or clinics?
                </button>
              </h4>
              <div id='faq_row_21' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>The accuracy of a test depends on collection performance. However, we provide simple-to-follow steps to make sure you’re on the right track!</div>
              </div>
            </div>
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_22'
                >
                 What if I don’t collect my sample correctly?
                </button>
              </h4>
              <div id='faq_row_22' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>We have simple directions for you to follow, there’s no need to worry.</div>
              </div>
            </div> 
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_23'
                >
                 When will I receive my results?
                </button>
              </h4>
              <div id='faq_row_23' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>Within 7 days after the sample arrives at Winmed Lab.</div>
              </div>
            </div>
            <div className='accordion-item ava'>
              <h4 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#faq_row_24'
                >
                What’s the difference between a urine STI test and AVA?
                </button>
              </h4>
              <div id='faq_row_24' className='accordion-collapse collapse' data-bs-parent="#faq_accordion_list">
                <div className='accordion-body'>AVA uses swab test which is recommended by the CDC for detecting sexually transmitted infections, especially for chlamydia, gonorrhea, and trichomoniasis. Urine samples can lead to false-negative results and untreated infections.</div>
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

export default Faq;
