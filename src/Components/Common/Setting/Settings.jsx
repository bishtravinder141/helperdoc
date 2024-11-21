import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import HelperDashboardSubHeader from "../Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import AccountSettingsTab from "./AccountSettingsTab";
import NotificationSetting from "./NotificationSetting";
import { useLocation } from "react-router-dom";

const Setting = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isEmployerOrAgency =
    pathname.includes("employer/setting") ||
    pathname.includes("agency/setting");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Box maxWidth="xl" sx={{ padding: "20px" }}>
        <HelperDashboardSubHeader
          title={t("settings")}
          progessBar={!isEmployerOrAgency}
          description={t("Lorem Ipsum has been the industry's standard.")}
        />
        <Tabs
          className="customTabs"
          value={activeTab}
          onChange={handleTabChange}
          aria-label="settings tabs"
        >
          <Tab label={t("notification_setting")} />
          <Tab label={t("account_settings")} />
        </Tabs>
        {activeTab === 0 && <NotificationSetting />}
        {activeTab === 1 && <AccountSettingsTab />}
      </Box>
    </>
  );
};

export default Setting;
