import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { USER_ROLE } from "../Constant/Constant";
import SideMenuBar from "../Components/Common/SideMenubar/SideMenuBar";
import { Grid } from "@mui/material";
import PrivateHeader from "../Components/Common/Headers/PrivateHeader";
import PrivateFooter from "../Components/Common/Footer/PrivateFooter";
import PageNotFound from "../pages/PageNotFound";

const ApplicantLayout = () => {
  const isToken = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("selectedRole");
  return (
    <>
      <PrivateHeader />
      <Grid container className="dashboardRow">
        <Grid className="dashboardSidebar">
          <SideMenuBar role={USER_ROLE.employer} />
        </Grid>
        <Grid className="dashboardContentArea">
          {isToken ? (
            USER_ROLE.employer === selectedRole ? (
              <Outlet />
            ) : USER_ROLE.helper === selectedRole ? (
              <Navigate to="/helper/job-dashboard" />
            ) : USER_ROLE.agency === selectedRole ? (
              <Navigate to="/agency/dashboard" />
            ) : (
              <PageNotFound />
            )
          ) : (
            <Navigate to="/login" />
          )}
        </Grid>
      </Grid>
      <PrivateFooter />
    </>
  );
};

export default ApplicantLayout;
