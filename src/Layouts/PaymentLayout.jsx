import React from "react";
import PrivateHeader from "../Components/Common/Headers/PrivateHeader";
import PrivateFooter from "../Components/Common/Footer/PrivateFooter";
import { Grid } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PaymentLayout = () => {
  const isToken = localStorage.getItem("token");
  const {pathname} = useLocation();
  console.log(pathname)

  return (
    <>
      <PrivateHeader />
      <Grid
        container
        className={`dashboardRow paymentSuccess ${
          !pathname.includes("payment") && ""
        }`}
      >
        <Grid
          container
          className={`dashboardContentArea d-flex align-items-center ${
            !pathname.includes("payment") && "faqCon justify-content-center m-0 "
          }`}
        >
          {isToken ? <Outlet /> : <Navigate to="/login" />}
        </Grid>
      </Grid>
      <div className="fullFooter">
        <PrivateFooter />
      </div>
    </>
  );
};

export default PaymentLayout;
