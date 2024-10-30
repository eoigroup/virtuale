

import React, { ReactNode } from 'react'; 
import LandingHeader from "@/components/landing-header/landing-header";
import Footer from "@/components/footer/page"; 

interface LayoutProps {
  children: ReactNode; // Define the type for children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen"> {/* Flex container */}
            <LandingHeader />
            <main className="container mx-auto max-w-7xl w-full mt-[100px] flex-grow"> 
                <div className="p-4 text-left"> 
                    {children}
                </div>
            </main>
            <Footer className="p-1 md:p-0" />   
        </div>
    );
};

export default Layout;
