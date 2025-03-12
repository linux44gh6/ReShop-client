import Footer from '@/components/Shared/Footer';
import Navbar from '@/components/Shared/Nabar';
import React from 'react';
const CommonLayout = async({children}:{children: React.ReactNode}) => {

    return (
       <>
       <Navbar />
        <main>
            {children}
        </main>
        <Footer/>
       </>
    );
};

export default CommonLayout;