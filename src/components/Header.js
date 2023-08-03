import React, { useEffect, useState } from "react";
import "../style.css";


import logo from "../assets/image/logo.png";
import cart from "../assets/image/icons/cart.svg";
import { Link, NavLink, redirect, useLocation, useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';

function Header({productscount}){



  const [language, setLanguage] = useState('EN');
  // const history = useHistory();
  const location = useLocation();
  const navigate = useNavigate();

  const currentUrl = `${location.pathname}${location.search}${location.hash}`;
  const [url, setUrl] = useState(currentUrl);
  const [randonKey, setRandonKey] = useState(0);

  console.log(currentUrl);



  const changeLanguage = (e, lang) => {
    // e.preventDefault();
    
    console.log('as' + lang);
    localStorage.setItem('language', lang)
    setLanguage(lang)
    // const url = currentUrl;
    // const url = currentUrl;
    console.log(lang === 'EN', '++++', currentUrl)
    // const regex = /\/th/;
    // const isSubstringExist = regex.test(currentUrl);
    // console.log(isSubstringExist);
    // let url = isSubstringExist && lang === 'EN' ? currentUrl.replace('/th', '') : '/th' + currentUrl
    // console.log(url);
    setUrl(url)
    // console.log(navigate(`${url}`));
    // return navigate(url);

    // return <Navigate to={url} replace={true} />
    // return <Navigate to={'/faq'} replace />
    // history.push(url)
    // return;
    // lang == 'TH' ? history.push('/th') : history.push('/')

  }

  const handleMenuClose = () => {
    // e.preventDefault();
    document.body.classList.remove("menu_on");
  };

  // const handleLanguage = (e) => {
  //   console.log(e.target.textContent);
  //   localStorage.setItem("language", e.target.textContent);
  // }

  useEffect(() => {
    const handleClick = (e) => {
      e.preventDefault();
      document.body.classList.toggle("menu_on");
    };
    localStorage.getItem('language') == '' ? setLanguage('EN') : setLanguage(localStorage.getItem('language'))

    setRandonKey(Math.random());
    // const lang = localStorage.getItem('language')
    // const regex = /\/th/;
    // const isSubstringExist = regex.test(currentUrl);
    // console.log(isSubstringExist);
    // let url = isSubstringExist && lang === 'EN' ? currentUrl.replace('/th', '') : '/th' + currentUrl
    console.log(currentUrl);
    setUrl(url)
    // const language = localStorage.getItem('language')
    // setLanguage(localStorage.getItem('language'))
    

    document
      .querySelectorAll(".hambarger-menu-header")[0]
      .addEventListener("click", handleClick);

    document
      .querySelectorAll(".menu-close-btn")[0]
      .addEventListener("click", handleMenuClose);

    return () => {
      document
        .querySelectorAll(".hambarger-menu-header")[0]
        .removeEventListener("click", handleClick);

      document
        .querySelectorAll(".menu-close-btn")[0]
        .removeEventListener("click", handleMenuClose);
    };
  }, []);
  // useEffect(() => {
  //   setRandonKey(Math.random());
  //   return () => {
  //     // url
  //   }
  // }, [setUrl])

  return (
    <header className='site-header'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-3 col-4 brand'>
            <Link to={language == 'TH' ? '/th' : '/'}>
              <img src={logo} alt='' />
            </Link>
          </div>
          <div className='col-lg-9 col-8 header-right-column'>
            <nav className='main-nav-menu'>
              <ul className='nav-menu'>

                <li>
                  <NavLink to={language == 'TH' ? '/th/knowledge' : '/knowledge'} onClick={handleMenuClose}>

                    KNOWLEDGE
                  </NavLink>
                </li>
                <li className="has_submenu">
                  <NavLink to={language == 'TH' ? '/th/selfcollectkit' : '/selfcollectkit'} className="" onClick={handleMenuClose}>
                    SELF COLLECT KITS
                  </NavLink>
                  <ul>
                    <li><NavLink to={language == 'TH' ? '/th/selfcollectkit/hpv' : '/selfcollectkit/hpv'} onClick={handleMenuClose}>HPV</NavLink></li>
                    <li><NavLink to={language == 'TH' ? '/th/selfcollectkit/sti_open' : '/selfcollectkit/sti_open'} onClick={handleMenuClose}>STI</NavLink></li>
                  </ul>
                </li>
                <li >
                  <NavLink to={language == 'TH' ? '/th/faqs' : '/faqs'} className="" onClick={handleMenuClose}>

                    FAQs
                  </NavLink>
                </li>
                <li >
                  <NavLink to={language == 'TH' ? '/th/aboutus' : '/aboutus'} className="" onClick={handleMenuClose}>

                    ABOUT US
                  </NavLink>
                </li>
                <li >
                  <NavLink to={language == 'TH' ? '/th/affiliates' : '/affiliates'} className="" onClick={handleMenuClose}>

                    AFFILIATES
                  </NavLink>
                </li>
                <li key={randonKey}>

                  <NavLink to={language == 'TH' ? '/'+url.replace('/th/', ''): `` } className="" onClick={(e) => changeLanguage(e, 'EN')}>EN</NavLink> |
                  <NavLink to={language == 'EN' ? `/th${url}` : ``} onClick={(e) => changeLanguage(e, 'TH')}> TH </NavLink>

                </li>
                
              </ul>
              <Link to='' className='menu-close-btn'>
                &times;
              </Link>
              <div className='hambarger-menu-header-wrap'>
                <Link to='' className='hambarger-menu-header'>
                  <span className='line'></span>
                  <span className='line'></span>
                  <span className='line'></span>
                </Link>
                <span className='text'>Menu</span>
              </div>
            </nav>
            <div className='utility-links'>
            <Link to={language == 'TH' ? '/th/mycart' :'/mycart'}>
                <img src={cart} alt='' />{productscount == 0 ? '' : productscount}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
