import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import './Navbar.css';

export default function Navbar() {
    const [show, handleShow] = useState(false);
    const history = useHistory();
    const transitionNavBar = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", transitionNavBar);
      return () =>
       window.removeEventListener("scroll", transitionNavBar);
    }, []);

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                <img 
                className="nav__logo"
                onClick={() => history.push('/')}
                src="https://logos-marcas.com/wp-content/uploads/2020/04/Netflix-Logo-650x366.png" alt="" />
                <img 
                className="nav__avatar"
                onClick={() => history.push('/profile')}
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
            </div>
            
        </div>
    )
}

//956461807 david condori