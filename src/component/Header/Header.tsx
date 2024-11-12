"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  Divider,
  useMediaQuery,
  Collapse,
  Link,
  LinkProps,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { routesList } from "./Routes";
import Image from 'next/image';

const Header = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const currentPath = usePathname();
    const StyledLink = (props: LinkProps) => (
        <Link
          underline="none"
          sx={{ color: "inherit", width: "auto!important",marginLeft: "4px"}}
          {...props}
        />
    );

    return (
        <header className='sticky top-0 shadow-md font-[sans-serif] tracking-wide relative z-50 border'>
            <section
                className='flex w-full lg:items-center relative py-3 lg:px-10 px-4 border-gray-200 border-b bg-white lg:min-h-[80px] max-lg:min-h-[60px]'
            >   
                <div 
                    className="w-auto mr-10"
                >
                    <a href="javascript:void(0)" className="max-sm:w-full max-sm:mb-3 shrink-0">
                    <Image
                        src="/logo.svg"      
                        alt="Company Logo"
                        width={120}            
                        height={80}           
                        priority               
                    />
                    </a>
                </div>
                <div
                    className={`hidden flex-row items-center flex-1 md:flex`}
                >
                    {routesList.map(({ name, to }) => (
                        <StyledLink
                            key={name}
                            href={to}
                            className="w-full h-[60px] flex items-center"
                        >
                            <p
                                className={`md:text-[12px] lg:text-[16px] cursor-pointer text-center font-[600]`}
                            >
                                {name}
                            </p>
                        </StyledLink>
                    ))}
                </div>
                <div
                    className={`flex xl:w-96 max-lg:w-full lg:ml-10 bg-gray-100 px-6 py-3 rounded outline outline-transparent focus-within:outline-[#007bff] focus-within:bg-transparent ${isMobile && 'hidden'}`}
                >
                    <input 
                        type='text' 
                        placeholder='Search...'
                        className='w-full text-sm bg-transparent rounded outline-none pr-2' 
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                        className="cursor-pointer fill-gray-400">
                        <path
                            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                        </path>
                    </svg>
                </div>
                <div className={`w-1/4 items-end ${!isMobile && 'hidden'}`}>
                    <button id="toggleOpen" className="items-end">
                        <svg className="w-20 h-12" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </section>
        </header>
    )
}

export default Header

