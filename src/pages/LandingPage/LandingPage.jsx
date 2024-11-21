import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SearchByLocation from "../../Components/SearchByLocation/SearchByLocation";
import OurClients from "../../Components/OurClients.jsx/OurClients";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import WhoWeAre from "../../Components/WhoWeAre/WhoWeAre";
import WhyChooseUs from "../../Components/WhyUs/WhyChooseUs";
import HelperSection from "../../Components/HelperSection/HelperSection";
import JobsSection from "../FeatureJobs/FeatureJobs";
import SubscriptionPlanSection from "../../Components/SubscriptionPlanSection/SubscriptionPlanSection";
import TestimonialSection from "../../Components/TestimonialSection/TestimonialSection";
import LandingPageFeatureJob from "./LandingPageFeatureJob";

const LandingPage = () => {
  const { t } = useTranslation();

  const handleLocationSearch = (searchValue) => {
    console.log(searchValue);
  };
  return (
    <div>
      <div className="homeBannerSection">
        <Container className="homeContainer pageContainer">
          <Grid className="homePageMain" container spacing={3}>
            <Grid className="homePageContent" item xs={12} sm={6}>
              <Typography variant="h2">{t("welcome")}</Typography>
              <Typography variant="body1">{t("welcomeContent")}</Typography>
              <SearchByLocation onSearch={handleLocationSearch} />
            </Grid>
            <Grid className="homePageBanner" item xs={12} sm={6}>
              <div className="banner-img">
                <img src="banner-img.png" alt="Banner" />
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <OurClients />

      <HowItWorks />

      <WhoWeAre />

      <HelperSection />

      <WhyChooseUs />

      {/* Assuming Jobs and SubscriptionPlan components are also TypeScript */}
      {/* <JobsSection /> */}
      <LandingPageFeatureJob/>

      <SubscriptionPlanSection />

      <TestimonialSection />
    </div>
  );
};

export default LandingPage;
