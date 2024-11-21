import React, { useState } from "react";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import { Grid, Box } from "@mui/material";
import { Container } from "@mui/system";
import HelperProfileStepSection from "../../Components/HelperProfile/HelperProfileStepSection";
import { AGENCY_DETAIL_STEPS, USER_ROLE } from "../../Constant/Constant";
import AgencyDetailsForm from "./AgencyDetailsForm/AgencyDetailsForm";
import JobPostStep3 from "../../Components/JobPost/JobPostStep3";
import { useSelector } from "react-redux";

const AgencyProfile = () => {
  const [pageLoader, setPageLoader] = useState(true);
  const [activeStep, setActiveStep] = useState(1);

  const { hasSubscription } = useSelector((state) => state.common);

  const { t } = useTranslation();

  const handleClickOnTabs = (step) => {
    if (step + 1 < 2) setActiveStep(step + 1);
  };
  const agencyProfile = hasSubscription
    ? AGENCY_DETAIL_STEPS.slice(0, 2)
    : AGENCY_DETAIL_STEPS;

  return (
    <>
      {pageLoader && <PageLoader />}
      <HelperDashboardSubHeader
        title={t("complete_agency_profile")}
        description={t("agency_profile_subtitle")}
        progessBar={false}
      />
      <Grid className="JobsListRow">
        <Box
          className="profileCardBox"
          border={1}
          borderRadius={4}
          borderColor="#e7e7e7"
          py={4}
          px={4}
          mb={2}
          mt={2}
        >
          <Container maxWidth="xl" className="stepsContainer">
            <Grid container spacing={3} className="stepsRow">
              {/* <HelperProfileStepSection
                activeStep={activeStep}
                handleClickOnTabs={handleClickOnTabs}
                stepsLists={agencyProfile}
              /> */}
              <div className="">
                <Box className="StepFormCol formDataInfo">
                  {activeStep === 1 && (
                    <AgencyDetailsForm
                      changeStep={setActiveStep}
                      setPageLoader={setPageLoader}
                      pageLoader = {pageLoader}
                    />
                  )}
                  {!hasSubscription && activeStep === 2 && (
                    <JobPostStep3
                      setPageLoader={setPageLoader}
                      userType={USER_ROLE.agency}
                    />
                  )}
                </Box>
              </div>
            </Grid>
          </Container>
        </Box>
      </Grid>
    </>
  );
};

export default AgencyProfile;
