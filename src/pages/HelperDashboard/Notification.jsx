import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  getAllNotificationsList,
  removeNotification,
} from "../../Services/ProfileServices/NotificationService";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import { toastMessage } from "../../Utils/toastMessages";
import { successType } from "../../Constant/Constant";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import NotificationCard from "../../Components/Common/Notification/NotificationCard";
import { useLocation } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(true);
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const { pathname } = useLocation();
  const isHelper = pathname.includes("helper/notification");

  useEffect(() => {
    getAllNotifications(userId);
  }, [currentPage]);

  const handleRemoveNotification = (id, index) => {
    setLoader(true);
    removeNotification(userId, id)
      .then((res) => {
        setLoader(false);
        toastMessage(t("notification_deleted_success"), successType);
        getAllNotifications(userId);
      })
      .catch((err) => {
        setLoader(false);
        if (err?.response?.data?.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
        console.log(err, "error!!!!!");
      });
  };

  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };

  const getAllNotifications = (userId) => {
    setLoader(true);
    const param = `?page=${currentPage.page}&limit=${10}`;
    getAllNotificationsList(userId, param)
      .then((res) => {
        setLoader(false);
        const responseData = res.data.notifications;
        setNotifications(responseData);
        setTotalPage(res.data.totalPages);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  return (
    <>
      {loader && <PageLoader />}
      <HelperDashboardSubHeader
        title={t("all_Notification")}
        description={t("notification_sub_title")}
        progessBar={isHelper}
      />
      <Grid className="JobsListRow">
        <Grid item md={12}>
          <Typography variant="h5">{t("earlier")}</Typography>
        </Grid>
        <NotificationCard
          notifications={notifications}
          deleteNotification={handleRemoveNotification}
        />
      </Grid>
      {totalPage > 0 && (
        <div className="d-flex justify-content-center">
          <Pagination
            count={totalPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePagination}
          />
        </div>
      )}
    </>
  );
};

export default Notifications;
