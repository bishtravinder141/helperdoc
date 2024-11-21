import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { USER_ROLE } from "../Constant/Constant";
import PrivateHeader from "../Components/Common/Headers/PrivateHeader";
import SideMenuBar from "../Components/Common/SideMenubar/SideMenuBar";
import { Grid } from "@mui/material";
import PrivateFooter from "../Components/Common/Footer/PrivateFooter";
import PageNotFound from "../pages/PageNotFound";

const AgencyLayout = () => {
  const isToken = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("selectedRole");
  return (
    <>
      <PrivateHeader />
      <Grid container className="dashboardRow">
        <Grid className="dashboardSidebar">
          <SideMenuBar role={USER_ROLE.agency} />
        </Grid>
        <Grid className="dashboardContentArea">
          {isToken ? (
            USER_ROLE.agency === selectedRole ? (
              <Outlet />
            ) : USER_ROLE.helper === selectedRole ? (
              <Navigate to="/helper/job-dashboard" />
            ) : USER_ROLE.employer === selectedRole ? (
              <Navigate to="/employer/dashboard" />
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

export default AgencyLayout;
