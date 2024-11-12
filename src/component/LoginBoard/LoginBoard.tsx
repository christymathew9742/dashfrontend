"use client";

import React, {useState } from "react";
import Login from "./login";
import SignUp from "./signUp";


const LoginBoard = () => {
    const [isSign, setIsSign] = useState(false)
    const handleSignInClick = () => {
        setIsSign(true); 
    };
    const handleSignUpClick = () => {
        setIsSign(false); 
    };

    return (
        <div className="flex w-full h-screen  bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/signIn/signIn.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="hidden sm:block w-1/2 h-svh"></div>
            <div className="flex flex-col items-center justify-center w-full sm:w-1/2 h-svh bg-[rgb(90,90,90)] bg-opacity-50 p-8">
                {isSign ? <SignUp /> : <Login />}
                <div className="text-center mt-4 text-white">
                    Don&apos;t have an account?{' '}
                    {isSign ? (
                        <span className="text-white cursor-pointer" onClick={handleSignUpClick}>
                            Sign In
                        </span>
                    ):(
                        <span className="text-white cursor-pointer" onClick={handleSignInClick}>
                            Sign Up
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginBoard;

