import { NavBar } from '@/components/ui/NavBar';
import React from 'react';
import { Outlet } from 'react-router-dom';

// type LayoutWithNavbarProps = {
//     children: React.ReactNode;
// };

export const LayoutWithNavbar: React.FC = () => {
    return (
        <div className="h-screen flex flex-col">
            <NavBar />
            <div className="flex flex-col items-center grow z-10">
                <Outlet />
            </div>
        </div>
    );
};
