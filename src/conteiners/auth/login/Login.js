import React, { useState } from 'react';
/* import SignIn from '../signIn/SignIn'; */
import SignUp from '../signUp/SignUp';
import './Login.css';

export default function Login() {

    const [signIn, setSignIn] = useState(false);
    return (
        <div className="login">
            <div className="login__background">
                <img
                className="login__logo"
                src="https://logos-marcas.com/wp-content/uploads/2020/04/Netflix-Logo-650x366.png"
                alt=""
                />
                <button 
                onClick={()=> setSignIn(true)}
                className="login__button">
                    Sign In
                </button>
                <div className="login__gradient"/>

            </div>
            <div className="login__body">
                {
                    signIn? (
                        <SignUp />
                    ) : (
                        <>
                            <h1>Unlimited films, TV programmes and more.</h1>
                            <h2>Watch anywhere. Cancel at any time.</h2>
                            <h3>Ready to watch? enter your email to create or restart your membership.</h3>
                            <div className="login__input">
                                <form>
                                    <input type="email"
                                    placeholder="Email Address"
                                    />
                                    <button
                                    onClick={()=> setSignIn(true)}
                                    className="login__getStarted">
                                        GET STARTED
                                    </button>
                                    
                                </form>
                            </div>
                        </>
                    )
                }
            
            </div>
        </div>
    )
}
