import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../style.css";
import knowlage_title from "../assets/image/knowlage_title.png";
import Blog_Highlight from "../assets/image/Blog-Highlight.png";
import blog_img from "../assets/image/blog-img.png";
import imag_blog2 from "../assets/image/image_blog2.jpg";


const Knowledge = () => {

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
            From our team

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
          What’s on your mind?

        </h2>
        <div className='search-wrap-block'>
          <form action='' className='search-form-w'>
            <input
              type='text'
              name=''
              className='form-control'
              placeholder='Search for anything'
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

            Browse
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
                    Isn&#39;t it safe to wear a condom?

                  </h2>
                  <div className='post-meta'>Pedsupab Team 17 July 2023 </div>
                  <p>

                    Many people wonder if the &quot;skin-to-skin&quot; feeling is better than using actual
                    condoms for protection. And if there is frequent &quot;skin-to-skin&quot; contact, does it

                    immediately increase the risk of sexually transmitted diseases? Today, we will
                    discuss this topic.
                    The issue of protection through condom usage depends on the agreement of
                    both parties involved. Whether it is a woman or a man, it is important for both
                    parties to have mutual consent, whether they choose to use a condom or not.
                    In general, we often hear many people believe that the sensation without
                    using condoms is better. However, the use of condoms is crucial for protection
                    against sexually transmitted infections. Condoms act as a barrier, reducing the
                    risk of transmitting diseases during sexual intercourse. While it is true that
                    some individuals may perceive a difference in sensation when using condoms,
                    it is important to prioritize safe sex practices to maintain sexual health.
                    However, this may not always be true because modern condoms are designed
                    to compete in terms of thinness, almost mimicking the feeling of not wearing
                    one. They provide a skin-to-skin sensation and even contain natural-feeling
                    lubricants. Many brands advertise the smoothness of their lubricants, claiming
                    they feel natural. However, there are some people who prefer to engage in
                    unprotected sex for various reasons, such as latex allergies or a sense of trust
                    when in a committed relationship.
                  </p>

                  <p>

                    Engaging in sexual activities outside of penetrative intercourse, such as mutual
                    masturbation or oral sex, also carries a risk of contracting sexually transmitted
                    diseases. Some individuals have a strong immune system that can fight off
                    infections, while others may be more susceptible to contracting diseases if
                    their immune system is compromised. Today, we will provide examples of
                    various diseases that can occur.
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

                    Debunking Common Misconceptions about HPV
                  </h2>
                  <div className='post-meta'>Pedsupab Team 17 July 2023</div>
                  <p>

                    In this blog, we will address common misconceptions surrounding HPV (Human Papillomavirus) and HPV testing. By dispelling myths and providing accurate information, we aim to equip you with the knowledge needed to take control of your sexual health. Let's dive in! Understanding HPV and its Link to Cervical Cancer:

                    HPV is a common sexually transmitted infection that affects both men and women. Contrary to popular belief, HPV is not limited to a specific group or age range. It can be transmitted through various sexual activities, including vaginal, anal, and oral sex, as well as through intimate skin-to-skin contact. One of the most significant misconceptions about HPV is its association with cervical cancer.
                  </p>

                  <p>

                    While it is true that certain high-risk strains of HPV can increase the risk of developing cervical cancer, it's important to note that not all HPV infections lead to cancer. Most HPV infections clear up on their own without causing any long-term health issues.
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

                    E-Cigarettes and Cervical Cancer
                  </h2>
                  <div className='post-meta'>Pedsupab Team 17 July 2023</div>
                  <p>

                    How can smoking increase the risk of cervical cancer? You might be wondering, given that smoke only enters the lungs, not the uterus or the vagina… wouldn’t it cause other cancers like oral, throat, or lung cancer? Seems more logical, right? With how e-cigarettes are readily available, let’s consider this.

                    Here me out, girls, smoking e-cigarettes can increase your chances of cervical cancer.

                    Not to blame the men in our lives, but studies illustrate that most men carry HPV without realizing it; thus, sexual intercourse accounts for 90% of transmission (other factors contribute the remaining 10%, such as public restrooms). It’s important to note that whatever sexual activities you involve may lead to cancer or warts due to HPV.
                  </p>

                  <p>

                    Even though vaping doesn't create combustion like rolled cigarettes or contain harmful substances like gamma radiation, carbon monoxide, rat poison, etc., however, one substance: e-cigarettes contain nicotine, which is also a carcinogen. Toxicologically, nicotine is considered toxic compared to other substances. It also potentially causes Alzheimer's and Parkinson's diseases.
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

                  The Rise of Cervical Cancer Infections
                  </h2>
                  <div className='post-meta'>Pedsupab Team 17 July 2023</div>
                  <p>

                  In more than 90% of individuals infected with HPV, their bodies can clear the infection on their own. However, according to the World Health Organization (WHO) survey in 2020, there were up to 60,400 new cases of cervical cancer and 34,200 deaths. Moreover, many cases remain untreated, with 90% of new infections and deaths occurring in low-income countries. Notably, over 90% of infections are attributed to sexual intercourse.
                  </p>

                  <p>

                  It has also been found that individuals infected with HIV are up to 6 times more likely to develop cervical cancer than those without HIV.
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

                  Can Sexual Activity Caause Stress
                  </h2>
                  <div className='post-meta'>Pedsupab Team 17 July 2023</div>
                  <p>

                  Sexual intercourse includes masturbation. Both goals are inevitable to climax. or making the other person feel good But some couples feel bad, stressed, depressed, anxious, feeling not doing well enough. Aggressive arguing with a partner attitudes about sex Knot from being abused Post-coital tristesse (PCT) symptoms of sadness or loneliness that occur after sex Most people can experience these conditions. and often disappears on its own Or for some people it may be longer than normal, which is a condition in which brain chemistry is involved.
                  </p>

                  <p>

                  The main cause of Post-coital tristesse (PCT) is hormones in the body. at the climax The body will release hormones such as dopamine.and oxytocin If reaching orgasm, including other hormones will be released quickly. and rapidly decreasing This is what is known as the hormonal instability. This causes post-coital tristesse (PCT) symptoms.
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

export default Knowledge;
