import React from "react";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import SideMenuBar from "./SideMenubar/SideMenuBar";
import { useLocation } from "react-router-dom";
import EmpSideBar from "./SideMenubar/EmpSideBar";
// import NotificationItem from "./NotificationItem"; // Import NotificationItem component

const notifications = [
  {
    id: 1,
    title: "New Message",
    message:
      "The responsibilities and duties section is the most important part of the job description. Here you should outline the functions this position will perform on a regular basis, how the job functions within the organization and the title of the manager the person will report to",
    time: "12:30 PM",
  },
  {
    id: 2,
    title: "Reminder",
    message:
      "Don't forget your appointment tomorrow, how the job functions within the organization and the title of the manager the person will report to",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "Friend Request",
    message:
      "You have a new friend request.The responsibilities and duties section is the most important part of the job description. Here you should outline the functions this position will perform on a regular basis, how the job functions within the organization and the title of the manager the person will report to",
    time: "2 days ago",
  },
];

const Notifications = () => {
  const { pathname } = useLocation();
  const handleRemoveNotification = (id) => {
    // Add logic to remove notification by ID
  };
  return (
    <>
      <Grid container className="dashboardRow">
        {/* Sidebar Component */}
        <Grid className="dashboardSidebar">
          {pathname === '/employee/notification' ? <EmpSideBar /> : <SideMenuBar />}
        </Grid>
        {/* Main Content */}
        <Grid className="dashboardContentArea">
          <Box maxWidth="xl" sx={{ padding: "20px" }}>
            <Box display="flex" alignItems="center" mb={2}>
              {/* <NotificationsIcon fontSize="large" color="primary" /> */}
              <Box ml={2}>
                <Typography variant="h2" className="commonTitle">
                  All Notifications
                </Typography>
                <Typography variant="body1">
                  Every job notification you've ever received.
                </Typography>
              </Box>
            </Box>

            <Grid className="JobsListRow">
              <Grid item md={12}>
                <Typography variant="h5">Earlier</Typography>
              </Grid>
              <Box
                className="profileCardBox"
                border={1}
                borderRadius={8}
                borderColor="#e7e7e7"
                py={3}
                px={3}
                mb={2}
                mt={2}
              >
                {notifications.map((notification) => (
                  <Box
                    className="notificationList"
                    key={notification.id}
                    display="flex"
                    alignItems="center"
                    mb={2}
                  >
                    <NotificationsIcon
                      fontSize="large"
                      color="primary"
                      className="notificationIcon"
                    />
                    <Box ml={2}>
                      <Typography variant="subtitle1">
                        {notification.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {notification.time}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => handleRemoveNotification(notification.id)}
                      style={{ marginLeft: "auto" }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Notifications;
