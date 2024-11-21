import React from "react";
import PrivateHeader from "../Components/Common/Headers/PrivateHeader";
import { Grid } from "@mui/material";
import SideMenuBar from "../Components/Common/SideMenubar/SideMenuBar";
import { Navigate, Outlet } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import PrivateFooter from "../Components/Common/Footer/PrivateFooter";
import { USER_ROLE } from "../Constant/Constant";
import AdminFooter from "../Components/Common/Footer/AdminFooter";

const AdminLayout = () => {
  const isToken = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("selectedRole");
  return (
    <>
      <PrivateHeader />
      <Grid container className="dashboardRow">
        <Grid className="dashboardSidebar">
          <SideMenuBar role={USER_ROLE.admin} />
        </Grid>
        <Grid className="dashboardContentArea">
          {isToken ? (
            USER_ROLE.admin === selectedRole ? (
              <Outlet />
            ) : USER_ROLE.helper === selectedRole ? (
              <Navigate to="/helper/job-dashboard" />
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
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
