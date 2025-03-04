import Navbar from '@/components/Shared/Nabar';
import React from 'react';

const CommonLayout = ({children}:{children: React.ReactNode}) => {
    return (
       <>
       <Navbar/>
        <main>
            {children}
        </main>
       </>
    );
};

export default CommonLayout;