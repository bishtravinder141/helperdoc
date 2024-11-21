import React from "react";
import Header from "../Components/Common/Headers/PublicHeader";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import PublicFooter from "../Components/Common/Footer/PublicFooter";
import { AGENCY_STEP, STEPPER_ROUTES } from "../Constant/Constant";

const StepperLayout = () => {
  const isToken = localStorage.getItem("token");
  const { state } = useLocation();
  const { step } = useParams();
  // const isAfterSignUp =
  //   state && state?.prevRoute && STEPPER_ROUTES.includes(step);
  let isAfterSignUp;
  if (state && state?.agencyStep) {
    isAfterSignUp = state && state?.agencyStep === AGENCY_STEP;
  }
  if (state && state?.prevRoute && STEPPER_ROUTES.includes(step)) {
    isAfterSignUp = state && state?.prevRoute && STEPPER_ROUTES.includes(step);
  }
  return (
    <>
      <Header />
      {isToken && isAfterSignUp ? <Outlet /> : <Navigate to={"/login"} />}
      <PublicFooter />
    </>
  );
};

export default StepperLayout;
