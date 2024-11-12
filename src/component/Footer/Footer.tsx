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

const Footer = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 font-sans tracking-wide">
            <div className="py-8 px-8">
                <a className="text-gray-300" href='javascript:void(0)'>My Logo</a>
                <p className='text-gray-300 text-base mt-4'>© 2024 Bundl Technologies Pvt. Ltd</p>
            </div>
        </footer>
    )
}

export default Footer;