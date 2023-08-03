import React, { useState,useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../style.css";
import misc from "../../assets/image/misc.png";
import prod_add from "../../assets/image/prod_add.png";
import { Link } from "react-router-dom";

const SelfCollectKitsSTIKit = () => {
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart'))? JSON.parse(localStorage.getItem('cart')) : []);
  let [total, setTotal] = useState(0);
  const [reloadKey, setReloadKey] = useState(1)

  const products = [
    {
        id:'2',
        name: 'AVA STI Kit',
        desc: 'Take control of your sexual health with AVA’s Self-Collecting STI Kit. With simple instructions and a painless sampling swab, you can discreetly collect a sample at home. Send it to our certified laboratory using the prepaid shipping label, and within days, receive confidential and accurate results indicating the presence of high-risk HPV strains. Armed with this information, you can make informed decisions about your health and seek appropriate medical advice if necessary.',
        price: '1200'
    }];

    const handleMinusClick = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  
    const handlePlusClick = () => {
      setQuantity(quantity + 1);
    };
    // const removeCart = (e,product) => {
    //   console.log(product)
    //   setCart(localStorage.getItem('cart'));
    //   console.log(cart);
    //   cart.pop(product);
      
    //   console.log(cart);
    //   console.log(total);
    //   total = Number(total) -(quantity * Number(product.price));
    //   console.log(cart);
    //   console.log(total);
    //   console.log(cart.length+ 'length');
    //   // setReloadKey(Math.random());
      
    // }
    const addToCart = (e,product) => {
  
      console.log(product);
      console.log(cart);
      console.log(cart?.length);
        console.log(product);
        product.quantity = quantity;
        cart.push(product);
        total = Number(total) + (quantity * Number(product.price));
  
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log(cart);
      console.log(total);
      // document.querySelectorAll('.removecart_but')[0].style.display = "block";
      document.querySelectorAll('.add_tocard_opt')[0].style.display = "none";
      
    }

    useEffect(() => {
      if (cart?.length > 0) {
        const foundIndex = cart.findIndex(obj => obj.id === '2');
        // const foundObject = cart.find(obj => obj.id === value.id);
  
        if (foundIndex !== -1) {
          setQuantity(cart[foundIndex].quantity);
          // cart[foundIndex].quantity = cart[foundIndex].quantity + 1;
          // console.log('Object updated:', cart);
          // setCart(JSON.parse(JSON.stringify(cart)));
          console.log(cart);
          // localStorage.setItem('cart', JSON.stringify(cart));
          // document.querySelectorAll('.removecart_but')[0].style.display = "block";
          document.querySelectorAll('.add_tocard_opt')[0].style.display = "none";
        } else {
          console.log('Object not found');
        }
  
  
      }
  
    }, [])
  return (
    <div class='site-wrap'>
      <Header />
      <div class='inner_content_outer'>
        <div class='sep1'></div>
        <div class='bandcamp_info'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-12'>
                <div class='bandcamp_des'>
                  <ul>
                    <li>
                      <Link to='/'>Home</Link>{" "}
                      {/* <Link to=''>Home</Link>{" "} */}
                    </li>
                    <li>
                      <Link to='/selfcollectkit'>Self Collect Kits</Link>{" "}
                      {/* <Link to=''>Self Collect Kits</Link>{" "} */}
                    </li>
                    <li>
                      <Link to='/selfcollectkit/sti_open' >STI Kits</Link>{" "}
                      {/* <Link to='' >STI Kits</Link>{" "} */}
                    </li>
                    <li class='selected'>
                      <span>AVA STI Kit</span>{" "}
                    </li>
                  </ul>
                </div>
                {products.map(product => (
                <div class='prod_des'>
                  <div class='prod_add_info'>
                    <div class='prod_add_slider'>
                      <img src={prod_add} alt='' />
                    </div>
                  </div>
                  <div class='prod_add_content'>
                    <h2>
                      <span>Self-Collecting Kit</span>{product.name}
                    </h2>
                    <div class='price_info'>
                      <div class='price_text'>฿ {product.price}</div>
                    </div>
                    <div class='prod_cont_des'>
                      <h3>About the Product</h3>
                      <p>
                      {product.desc}.{" "}
                      </p>
                    </div>
                    <div class='prod_dtn_option'>
                      <div class='prod_inc'>
                        <span class='prod_inc_opt' onClick={handleMinusClick}> - </span>
                        <div class='prod_inc_inp'>
                          <input type='text' placeholder='1' value={quantity}/>
                        </div>
                        <span class='prod_inc_opt' onClick={handlePlusClick}> + </span>
                      </div>
                      <div class='add_tocard_opt'>
                        <button type='button' onClick={(e) => addToCart(e,product)} class='addtocart_but'>
                          ADD TO CART
                        </button>
                      </div>
                      {/* <div class='Remove_prod'>
                        <button type='button' onClick={(e) => removeCart(e,product)} style={{display:'none'}} class='removecart_but'>
                          Remove
                        </button>
                      </div> */}
                      <div class='buynow_opt'>
                        <Link to='/mycart' type='button' class='buynow_btn'>
                        {/* <Link to='' type='button' class='buynow_btn'> */}
                          BUY NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='hpv_continfo'>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-12'>
              <div class='inner_head_des2'>
                <h2>More about the AVA STI Kit</h2>
              </div>
              <div class='inner_cont_wrap'>
                <ul>
                  <li>
                    AVA
                    (เอวา)ใช้เก็บสิ่งตรวจเพื่อตรวจวิเคราะห์การติดเชื้อทางเพศสัมพันธ์คุณลักษณะเฉพาะ
                  </li>
                  <li>
                    {" "}
                    เป็นชุดน้ำยาเก็บสิ่งที่ตรวจจากปากมดลูกชั้นใน ในเพศหญิง
                    สำหรับใช้ทดสอบกับชุดตรวจแอพติม่าเอชพีวี คลามัยเดีย
                    ทราโคมาติส และ นีสซีเรีย โทโนเรีย{" "}
                  </li>
                  <li>
                    เป็นชุดน้ำยาเก็บสิ่งส่งตรวจแต่ละชุดประกอบด้วยหลอดเก็บสิ่งส่งตรวจที่มีน้ำยารักษาสภาพปริมาตร
                    2.9 มล.ต่อหลอด ไม้ทำความสะอาดและไม้ เก็บสิ่งส่งตรวจ
                  </li>
                  <li>
                    เป็นน้ำยาที่ผ่านการรับรองจากองค์การอาหารและยาประเทศสหรัฐอเมริกา
                    (US-FDA)
                  </li>
                </ul>
                <div class='inner_cont_view'>
                  <h3>EQUIPMENT</h3>
                  <ol>
                    <li>
                      อุปกรณ์เก็บสิ่งส่งตรวจ Sterile swab ความยาว 14.8 CM จำนวน
                      1 ชิ้น บรรจุในซองปิดสนิท
                    </li>
                    <li>
                      หลอดน้ำยาเพื่อรักษาสิ่งส่งตรวจ Transport tube
                      ประกอบด้วยน้ำยารักษาสภาพสิ่งส่ง ตรวจปริมาตร 2.9 ml
                    </li>
                    <li>คู่มือการเก็บสิ่งส่งตรวจ</li>
                    <li>ใบลงทะเบียนนำส่งตัวอย่าง</li>
                    <li>Barcode สำหรับติดบนหลอดเก็บตัวอย่าง</li>
                    <li>
                      บรรจุภัณฑ์สำหรับใส่และส่งหลอดเก็บตัว
                      อย่างไปยังห้องปฏิบัติการเพื่อตรวจวิเคราะห์
                    </li>
                  </ol>
                </div>
                <div class='inner_cont_view'>
                  <h3>CAUTION</h3>
                  <ol>
                    <li>ไม่ควรใช้อุปกรณ์ขณะตั้งครรภ์หรือมีประจำ เดือน</li>
                    <li>อุปกรณ์นี้สำหรับการใช้เพียงครั้งเดียวเท่านั้น</li>
                    <li>ห้ามใช้เมื่อบรรจุภัณฑ์มีการฉีกขาดหรือชำรุด</li>
                    <li>
                      ห้ามใช้ผลิตภัณฑ์อื่นๆ ทางช่องคลอดภายใน 48 ชั่วโมง
                      ก่อนการเก็บสิ่งส่งตรวจ
                    </li>
                    <li>
                      หากมีอาการเจ็บปวด มีเลือดออก หรือ
                      มีสารคัดหลั่งผิดปกติจากช่องคลอด ไม่ควรใช้อุปกรณ์นี้
                      และควรปรึกษาแพทย์
                    </li>
                    <li>
                      หลังเก็บสิ่งส่งตรวจแล้วต้องนำส่งภายใน 60 วัน
                      ที่อุณหภูมิห้อง
                    </li>
                    <li>
                      หากเก็บสิ่งส่งตรวจไม่ถูกวิธีอาจส่งผลกระทบต่อความแม่นยำของการทดสอบได้
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Banner ends --> */}
      <div class='howitowrk_wrap addpaddint_top'>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-12'>
              <div class='positive_info'>
                <h2>What if I test positive? </h2>
                <p>
                  Don’t worry - we got you covered. Explore a list of partner
                  medical facilities and clinics near you or call us for a
                  consultation.
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

export default SelfCollectKitsSTIKit;
