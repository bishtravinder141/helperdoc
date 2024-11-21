import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PrivateFooter from "../Components/Common/Footer/PrivateFooter";
import { Grid } from "@mui/material";
import SideMenuBar from "../Components/Common/SideMenubar/SideMenuBar";
import { USER_ROLE } from "../Constant/Constant";
import PrivateHeader from "../Components/Common/Headers/PrivateHeader";
import PageNotFound from "../pages/PageNotFound";

const HelperLayout = () => {
  const isToken = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("selectedRole");

  return (
    <>
      <PrivateHeader />
      <Grid container className="dashboardRow">
        {/* Sidebar Component */}
        <Grid className="dashboardSidebar">
          <SideMenuBar role={USER_ROLE.helper} />
        </Grid>
        <Grid className="dashboardContentArea">
          {isToken ? (
            USER_ROLE.helper === selectedRole ? (
              <Outlet />
            ) : USER_ROLE.employer === selectedRole ? (
              <Navigate to="/employer/dashboard" />
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

export default HelperLayout;
