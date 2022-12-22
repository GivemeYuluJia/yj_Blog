import React from "react";
import Footer from "components/Footer";
import Header from "components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
};

export default Layout;