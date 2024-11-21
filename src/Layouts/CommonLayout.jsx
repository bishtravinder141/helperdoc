import React from "react";
import Header from "../Components/Common/Headers/PublicHeader";
import { Outlet } from "react-router-dom";
import PublicFooter from "../Components/Common/Footer/PublicFooter";

const CommonLayout = () => {
  const isToken = localStorage.getItem("token");
  return (
    <>
      <Header />
      <Outlet />
      {/* {isToken ? <Outlet /> : <Navigate to="/login" />} */}
      <PublicFooter />
    </>
  );
};

export default CommonLayout;
