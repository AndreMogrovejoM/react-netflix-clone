import React, { useState, useEffect } from 'react'
import './Navbar.css'


export default function Navbar() {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
          if (window.scrollY > 100) {
            handleShow(true);
          } else handleShow(show);
        });
        return () => {
          window.removeEventListener("scroll");
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                <img className="nav__logo"
                src="https://logos-marcas.com/wp-content/uploads/2020/04/Netflix-Logo-650x366.png" alt="" />
                <img className="nav__avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
            </div>
            
        </div>
    )
}
