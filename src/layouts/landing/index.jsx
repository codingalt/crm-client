import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/footer";

const LandingLayout = () => {
  return (
    <>
      <Header />

      <main className="w-full min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default LandingLayout;
