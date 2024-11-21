import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const PillsTabs = ({ handleChange, selectedTab, tabs }) => {
  const { t } = useTranslation();
  return (
    <Tabs
      className="workTabsCol"
      value={selectedTab}
      onChange={handleChange}
      indicatorColor="primary"
    >
      {tabs.map((tb, index) => (
        <Tab className="tabs" label={t(tb)} key={index} />
      ))}
    </Tabs>
  );
};

export default PillsTabs;
