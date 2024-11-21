import React from "react";
import Header from "../Components/Common/Headers/PublicHeader";
import { Navigate, Outlet } from "react-router-dom";
import PublicFooter from "../Components/Common/Footer/PublicFooter";

const PublicLayout = () => {
  const isToken = localStorage.getItem("token");
  return (
    <>
      <Header />
      {!isToken ? <Outlet /> : <Navigate to="/helper/job-dashboard" />}
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
