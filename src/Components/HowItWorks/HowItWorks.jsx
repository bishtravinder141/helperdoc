import { Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { WORK_STEPS } from "./Constant";

const HowItWorks = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <section className="howItWorksSection">
      <Container className="howItWorksContainer pageContainer">
        <Tabs
          className="workTabsCol"
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <Tab className="tabs" label={t("maid")} />
          <Tab className="tabs" label={t("employer")} />
        </Tabs>
        <Grid className="howItWorksContent" container spacing={3}>
          <Grid item xs={12}>
            <Typography className="title" variant="h2">
              {t("how_it_works")}
            </Typography>
            <Grid className="workCounter" container spacing={3}>
              {WORK_STEPS.map((step) => (
                <Grid key={step.id} item xs={6} md={4} lg={2}>
                  <div className="work-col">
                    <div className="work-count">
                      {step.id < 10 ? `0${step.id}` : step.id}
                    </div>
                    <Typography variant="h5">{t(step.titleKey)}</Typography>
                    <Typography variant="body2">
                      {t(step.contentKey)}
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default HowItWorks;
