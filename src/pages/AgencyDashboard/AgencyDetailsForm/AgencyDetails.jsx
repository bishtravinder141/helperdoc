import React, { useState } from "react";
import { Container, styled } from "@mui/system";
import { Grid, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import HelperProfileStepSection from "../../../Components/HelperProfile/HelperProfileStepSection";
import { AGENCY_DETAIL_STEPS, USER_ROLE } from "../../../Constant/Constant";
import AgencyDetailsForm from "./AgencyDetailsForm";
import JobPostStep3 from "../../../Components/JobPost/JobPostStep3";
import PageLoader from "../../../Components/Common/Loader/PageLoader";

const TitleWrapper = styled("div")({
  textAlign: "center",
  marginTop: " 0, 20px,", // Remove margin from the top
  color: "white", // Change color to white
});

const HeaderBar = styled("div")({
  backgroundColor: "#0a6259", // Background color
  padding: "10px 0", // Padding top and bottoms
  marginBottom: "20px", // Margin bottom
});

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

const StyledImageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const AgencyDetails = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [pageLoader, setPageLoader] = useState(false);
  const { t } = useTranslation();

  const handleClickOnTabs = (step) => {
    if (step + 1 < 2) setActiveStep(step + 1);
  };
  return (
    <>
    {pageLoader && <PageLoader/>}
      <HeaderBar className="heroBanner">
        <TitleWrapper>
          <Typography variant="h4" className="pageTitle">
            {t("agency_form")}
          </Typography>
        </TitleWrapper>
      </HeaderBar>
      <Container maxWidth="xl" className="stepsContainer">  
        <Grid container spacing={3} className="stepsRow">
          {/* <HelperProfileStepSection
            activeStep={activeStep}
            handleClickOnTabs={handleClickOnTabs}
            stepsLists={AGENCY_DETAIL_STEPS}
          /> */}
          {activeStep === 1 && (
            <Grid container spacing={3} className="shadow-box stepsFormRow">
              <Grid item xs={12} md={6} className="stepsForm">
                <Box
                  sx={{ maxWidth: 800 }}
                  className="StepFormCol formDataInfo"
                >
                  <AgencyDetailsForm  setPageLoader = {setPageLoader} changeStep={setActiveStep} />
                </Box>
              </Grid> 
              <Grid
                item
                xs={12}
                md={6}
                component={StyledImageContainer}
                className="stepsSidebarImg"
              >
                <StyledImage src="/registration-step.svg" alt="Helper Image" />
              </Grid>
            </Grid>
          )}
          {/* {activeStep === 2 && (
            <JobPostStep3
              setPageLoader={setPageLoader}
              userType={USER_ROLE.agency}
            />
          )} */}
        </Grid>
      </Container>
    </>
  );
};

export default AgencyDetails;
