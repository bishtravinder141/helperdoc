import React, { useEffect, useState } from "react";
import { Container, styled } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import HelperProfileStepSection from "../../Components/HelperProfile/HelperProfileStepSection";
import HelperRegistrationStep1 from "../../Components/HelperProfile/HelperRegistrationStep1";
import { useTranslation } from "react-i18next";
import ProfileDiscrimination from "../../Components/HelperProfile/ProfileDiscrimination";
import "./helper.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  addStepperData,
  getStepperData,
} from "../../Services/ProfileServices/StepperServices";
import HelperRegistrationStep2 from "../../Components/HelperProfile/HelperRegistrationStep2";
import HelperRegistrationStep3 from "../../Components/HelperProfile/HelperRegistrationStep3";
import HelperRegistrationStep4 from "../../Components/HelperProfile/HelperRegistrationStep4";
import HelperRegistrationStep5 from "../../Components/HelperProfile/HelperRegistrationStep5";
import HelperRegistrationStep6 from "../../Components/HelperProfile/HelperRegistrationStep6";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import { toastMessage } from "../../Utils/toastMessages";
import ThanksForRegister from "./ThanksForRegister";
import ProfileDetailForm from "../../Components/Common/Profile/ProfileDetailForm";
import { HELPER_STEP_DETAILS } from "../../Components/HelperProfile/Constant";

const TitleWrapper = styled("div")({
  textAlign: "center",
  marginTop: " 0, 20px,", // Remove margin from the top
  color: "white", // Change color to white
});

const HeaderBar = styled("div")({
  backgroundColor: "#0a6259", // Background color
  padding: "10px 0", // Padding top and bottom
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

const HelperProfileDetailsSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepDetails, setStepDetails] = useState({});
  const [pageLoader, setPageLoader] = useState(false);
  const { t } = useTranslation();
  const { step } = useParams();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState({
    page: "",
  });

  useEffect(() => {
    let currentStep = 1;
    if (step === "thankyou" || step === "complete-profile") {
      setActivePage({
        page: step,
      });
    } else {
      setActivePage({ page: "" });
      switch (step) {
        case "disclaimer":
          currentStep = 1;
          break;
        case "applicant_info":
          currentStep = 2;
          break;
        case "working_experience":
          currentStep = 3;
          break;
        case "job_details":
          currentStep = 4;
          break;
        case "q_&_a":
          currentStep = 5;
          break;
        case "final":
          currentStep = 6;
          break;
        default:
          currentStep = 1;
      }
      setActiveStep(currentStep);
    }
  }, [step]);

  useEffect(() => {
    if (activeStep !== 0) {
      getStepperData(activeStep, userId)
        .then((res) => {
          setStepDetails(res.data);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  }, [activeStep]);

  const saveStepDetails = (answer, nextStep) => {
    const payload = {
      userId: userId,
      ...answer,
    };
    setPageLoader(true);
    addStepperData(activeStep, payload, userId)
      .then((res) => {
        navigate(`/register/helper/profile-steps/${nextStep}`, {
          state: { prevRoute: "/register/helper" },
        });
        setPageLoader(false);
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          toastMessage(error.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
        setPageLoader(false);
        console.log(error);
      });
  };
  const handleClickOnTabs = (index, url) => {
    if (index + 1 <= activeStep) {
      navigate(`/register/helper/profile-steps/${url}`, {
        state: { prevRoute: "/register/helper" },
      });
    }
  };
  return (
    <>
      <HeaderBar className="heroBanner">
        <TitleWrapper>
          <Typography variant="h4" className="pageTitle">
            {t("domestic_helper_form")}
          </Typography>
        </TitleWrapper>
      </HeaderBar>
      {activePage.page === "thankyou" ? (
        <ThanksForRegister />
      ) : activePage.page === "complete-profile" ? (
        <ProfileDetailForm />
      ) : (
        <Container maxWidth="xl" className="stepsContainer">
          <Grid container spacing={3} className="stepsRow">
            <HelperProfileStepSection
              activeStep={activeStep}
              handleClickOnTabs={handleClickOnTabs}
              stepsLists={HELPER_STEP_DETAILS}
            />
            {activeStep === 1 && <ProfileDiscrimination />}
            <Grid container spacing={3} className="shadow-box stepsFormRow">
              {pageLoader && <PageLoader />}
              {activeStep === 1 && (
                <HelperRegistrationStep1
                  saveStepDetails={saveStepDetails}
                  stepDetails={stepDetails}
                  setPageLoader={setPageLoader}
                />
              )}
              {activeStep === 2 && (
                <HelperRegistrationStep2
                  saveStepDetails={saveStepDetails}
                  stepDetails={stepDetails}
                  setPageLoader={setPageLoader}
                />
              )}
              {activeStep === 3 && (
                <HelperRegistrationStep3
                  saveStepDetails={saveStepDetails}
                  stepDetails={stepDetails}
                  setPageLoader={setPageLoader}
                />
              )}
              {activeStep === 4 && (
                <HelperRegistrationStep4
                  saveStepDetails={saveStepDetails}
                  stepDetails={stepDetails}
                  setPageLoader={setPageLoader}
                />
              )}
              {activeStep === 5 && (
                <HelperRegistrationStep5
                  saveStepDetails={saveStepDetails}
                  stepDetails={stepDetails}
                />
              )}
              {activeStep === 6 && (
                <HelperRegistrationStep6
                  saveStepDetails={saveStepDetails}
                  stepDetails={stepDetails}
                  setPageLoader={setPageLoader}
                />
              )}
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
          </Grid>
        </Container>
      )}
    </>
  );
};

export default HelperProfileDetailsSteps;
