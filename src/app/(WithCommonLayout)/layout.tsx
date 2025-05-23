import { SearchProvider } from "@/components/SearchContext/SearchContext";
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Nabar";
import React from "react";
const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SearchProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SearchProvider>
    </>
  );
};

export default CommonLayout;
