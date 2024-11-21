import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  getSettingDetails,
  updateNotifications,
} from "../../../Services/JobsServices/JobServices";
import PageLoader from "../../Common/Loader/PageLoader";
import { useTranslation } from "react-i18next";
import { toastMessage } from "../../../Utils/toastMessages";
import { successType } from "../../../Constant/Constant";

const NotificationSetting = () => {
  const userId = localStorage.getItem("userId");
  const [loader, setLoader] = useState(true);
  const [notifications, setNotifications] = useState({
    isJobPushNotificationOn: false,
    isJobEmailNotificationOn: false,
    isMessagePushNotificationOn: false,
    isMessageEmailNotificationOn: false,
  });
  const { t } = useTranslation();

  useEffect(() => {
    getSettingDetails()
      .then((res) => {
        console.log(res.data);
        setNotifications({
          ...res.data,
        });
      })
      .catch((err) => {
        console.log(err, "error !");
      })
      .finally(() => setLoader(false));
  }, []);
  const handleToggle = (field, value) => {
    setLoader(true);
    let payload = { ...notifications };
    payload = { ...payload, [field]: !payload[field] };
    setNotifications({ ...notifications, [field]: !notifications[field] });
    updateNotifications(userId, payload)
      .then(() => {
        toastMessage(t("notification_setting_msg"),successType);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
        console.log(err);
      })
      .finally(() => setLoader(false));
  };
  return (
    <div>
      {" "}
      {loader && <PageLoader />}
      <Box border={1} borderRadius={8} borderColor="grey.300" p={3} mb={2}>
        <Box>
          <Typography variant="h6" gutterBottom className="subHead">
            {t("notifications")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t("notification_description")}
          </Typography>
        </Box>
        <hr className="hrSetting"></hr>
        <Box>
          <FormGroup row className="pushsetting">
            <Grid className="gridsetting">
              <Grid item lg={8} md={12} className="primary">
                <Typography variant="h6" gutterBottom className="subHead">
                  {t("latest_job_posts")}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {t("latest_job_posts_desc")}
                </Typography>
              </Grid>
              <Grid item lg={4} md={12} className="secondary">
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications?.isJobPushNotificationOn}
                      onChange={(e) => {
                        handleToggle("isJobPushNotificationOn", e.target.value);
                      }}
                    />
                  }
                  label={t("push")}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications?.isJobEmailNotificationOn}
                      onChange={(e) => {
                        handleToggle(
                          "isJobEmailNotificationOn",
                          e.target.value
                        );
                      }}
                    />
                  }
                  label={t("email")}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
        <hr className="hrSetting"></hr>
        <Box>
          <FormGroup row className="pushsetting">
            <Grid className="gridsetting">
              <Grid item md={8} className="primary">
                <Typography variant="h6" gutterBottom className="subHead">
                  {t("message")}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {t("message_desc")}
                </Typography>
              </Grid>
              <Grid item md={4} className="secondary">
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications?.isMessagePushNotificationOn}
                      onChange={(e) => {
                        handleToggle(
                          "isMessagePushNotificationOn",
                          e.target.value
                        );
                      }}
                    />
                  }
                  label={t("push")}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications?.isMessageEmailNotificationOn}
                      onChange={(e) => {
                        handleToggle(
                          "isMessageEmailNotificationOn",
                          e.target.value
                        );
                      }}
                    />
                  }
                  label={t("email")}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
      </Box>
    </div>
  );
};

export default NotificationSetting;
