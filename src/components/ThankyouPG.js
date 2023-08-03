import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import affiliate_img from "../assets/image/affiliate-left-img.png";


const ThankYouPG = () => {
    return (
        <div className='site-wrap thankyou-page'>
            <Header />
            <div className="thank_you_w" style={{ backgroundImage: `url(${affiliate_img})` }}>
                <div className="thank_you_content">
                    <h2 className="blue-title">Thank You For your purchase</h2>
                    <p>You will here form us</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default ThankYouPG;