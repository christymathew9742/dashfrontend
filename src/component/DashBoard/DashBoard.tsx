"use client";

import React, { useEffect } from "react";
import { useRouter,usePathname } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation} from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'order',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];
const setRouter = () => {
    const clientSideRouter = useRouter();
    const currentPath = usePathname();
    const router = React.useMemo(() => {
        return {
            pathname: currentPath, 
            searchParams: new URLSearchParams(),
            navigate: (path: string | URL) => {
                clientSideRouter.push(String(path));
            },
        };
    }, [currentPath, clientSideRouter]);
    return router;
};

const DashBoard = ({ children }: { children: React.ReactNode }) => {
    const router = setRouter();
    return (
    <AppProvider
        navigation={NAVIGATION}
         router={router}
    >
        <DashboardLayout>
            <PageContainer>
                {children}
            </PageContainer>
        </DashboardLayout>
    </AppProvider>
    );
}

export default DashBoard;