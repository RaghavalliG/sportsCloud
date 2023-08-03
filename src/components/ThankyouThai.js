import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import affiliate_img from "../assets/image/affiliate-left-img.png";


const ThankYouThai = () => {
    return (
        <div className='site-wrap thankyou-page'>
            <Header />
            <div className="thank_you_w" style={{ backgroundImage: `url(${affiliate_img})` }}>
                <div className="thank_you_content">
                    <h2 className="blue-title">ขอบคุณสำหรับการสมัคร</h2>
                    <p>คุณจะมาที่นี่จากเรา</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default ThankYouThai;