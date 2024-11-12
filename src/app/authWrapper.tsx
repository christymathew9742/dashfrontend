"use client";

import React, { useEffect, useState } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter, usePathname } from 'next/navigation';
import { configure } from "@/auth/auth";
import DashBoard from "@/component/DashBoard/DashBoard";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    const router = useRouter();
    const pathname = usePathname();
    const { accessToken } = parseCookies();

    useEffect(() => {
        if (typeof window === "undefined") return;

        configure('dl-aiapp-abc123xyz456', (token: any) => {
            console.log("Session initialized with token:", token);
        });

        if (accessToken) {
            setIsAuthenticated(true);
            if (pathname === '/') {
                router.push('/dashboard');
            }
        } else {
            setIsAuthenticated(false);
            if (pathname !== '/') {
                router.push('/');
            }
        }
        setIsLoading(false);
    }, [pathname, router,accessToken]);

    const handleLogout = () => {
        destroyCookie(null, 'accessToken');
        setIsAuthenticated(false);
        router.push('/');
    };

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    
    return isAuthenticated ? (
        <DashBoard>
            {children}
            <button onClick={handleLogout}>Logout</button>
        </DashBoard>
    ) : (
        <>{children}</>
    );
}










