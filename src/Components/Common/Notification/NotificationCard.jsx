import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { calculateTimeAgo } from "../../../Utils/timeAgo";
import CloseIcon from "@mui/icons-material/Close";
import NoDataFound from "../NoDataFound";
import { useTranslation } from "react-i18next";

export default function NotificationCard({ notifications, deleteNotification }) {
  const { t } = useTranslation();
  return (
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
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
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
              <Typography variant="subtitle1">{notification.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {notification.message}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {calculateTimeAgo(notification.createdAt)}
              </Typography>
            </Box>
            <IconButton
              onClick={() => deleteNotification(notification._id, index)}
              style={{ marginLeft: "auto" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ))
      ) : (
        <NoDataFound title={t("no_notification_found")} />
      )}
    </Box>
  );
}
