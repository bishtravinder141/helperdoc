import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import "react-international-phone/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { handleFileUploadToS3Bucket } from "../../Utils/CommonAPIs";
import Step2AboutUsForm from "./StepperForms/Step2AboutUsForm";
import Step2AboutFamilyForm from "./StepperForms/Step2AboutFamilyForm";
import Step3AboutEducationForm from "./StepperForms/Step3AboutEducationForm";
import { MAX_CHILDREN_LIMIT } from "./Constant";

const HelperRegistrationStep2 = ({
  saveStepDetails,
  setPageLoader,
  stepDetails,
}) => {
  const [showOtherLanguage, setOtherLanguage] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();
  const [stepperActiveStep, setStepperActiveStep] = useState(0); // For the stepper
  const [currentLocation, setCurrentLocation] = useState("");

  const [uploadFilesDetails, setUploadFilesDetails] = useState({
    driving: {
      haveTheDoc: false,
      docFile: "",
    },
  });

  useEffect(() => {
    if (
      stepDetails?.aboutYou &&
      Object.keys(stepDetails?.aboutYou).length > 0
    ) {
      for (let key in stepDetails?.aboutYou) {
        if (key === "physicalAttributes") {
          setValue("height", stepDetails.aboutYou[key].height);
          setValue("weight", stepDetails.aboutYou[key].weight);
        } else if (key === "whatsapp") {
          setValue("whatappNumber", stepDetails.aboutYou[key].number);
          // setValue(
          //   "isWhatsappNumberVisible",
          //   stepDetails.aboutYou[key].isVisible
          // );
        } else {
          setValue(key, stepDetails.aboutYou[key]);
        }
      }
    }
    if (
      stepDetails?.aboutYourFamily &&
      Object.keys(stepDetails?.aboutYourFamily).length > 0
    ) {
      for (let key in stepDetails?.aboutYourFamily) {
        if (key === "daughtersAge" || key === "sonsAge") {
          setValue(key, stepDetails?.aboutYourFamily[key].join(","));
        } else {
          setValue(key, stepDetails.aboutYourFamily[key]);
        }
      }
    }
   
    if (
      stepDetails?.education &&
      Object.keys(stepDetails?.education).length > 0
    ) {
      for (let key in stepDetails?.education) {
        if (key === "languages") {
          setValue("languages", stepDetails.education[key].native);
        } else if (key === "otherLanguages") {
          if (Object.keys(stepDetails.education[key]).length > 0) {
            setValue("otherLanguages", stepDetails.education[key]);
          }
        } else if (key === "licensesAndCertificates") {
          let temp;
          for (const licensekey in stepDetails?.education
            ?.licensesAndCertificates) {
            temp = {
              ...temp,
              [licensekey]: {
                url: stepDetails?.education?.licensesAndCertificates[
                  licensekey
                ],
                haveTheDoc: true,
              },
            };
          }
          setUploadFilesDetails(temp);
        } else {
          setValue(key, stepDetails.education[key]);
        }
      }
    }
    // if (stepDetails && stepDetails.answers) {
    //   stepDetails.answers.forEach((ans) => {
    //     setValue(ans.questionId, ans.answer);
    //     setValue(`sub_que_${ans.questionId}`, ans.subAnswer);
    //   });
    // }
  }, [stepDetails]);

  const handleSelectLocation = (location, { lat, lng }) => {
    setCurrentLocation({ location: location, lat: lat, lng: lng });
  };

  // Function to handle next button click
  const handleNext = async (data) => {
    const { otherLanguages, employmentStatus } = data;

    if (stepperActiveStep < steps.length - 1) {
      setStepperActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setPageLoader(true);
      let filePayload = {};
      for (let key in uploadFilesDetails) {
        if (
          uploadFilesDetails[key]?.haveTheDoc &&
          uploadFilesDetails[key]?.docFile?.name
        ) {
          const fileUpload = await handleFileUploadToS3Bucket(
            uploadFilesDetails[key].docFile
          );
          if (!fileUpload.error) {
            filePayload[key] = fileUpload.uploadedUrl;
          } else {
            setPageLoader(false);
            return;
          }
        } else {
          filePayload[key] = uploadFilesDetails[key]?.url;
        }
      }
      const payload = {
        aboutYou: {
          fullName: data.fullName,
          gender: data.gender,
          passportOrHKID: data.passportOrHKID,
          maritalStatus: data.maritalStatus,
          religion: data.religion,
          currentEmploymentStatus: data.currentEmploymentStatus,
          whatsapp: {
            number: data.whatappNumber,
            // isVisible: data.isWhatsappNumberVisible,
          },
          dob: data.dob,
          physicalAttributes: {
            height: data.height,
            weight: data.weight,
          },
          location: data.location,
          skills: data.skills,
        },
        aboutYourFamily: {
          age: data.age,
          occupation: data.occupation,
          brothers: data.brothers,
          sisters: data.sisters,
          familyOrder: data.familyOrder,
          sonsAge: data?.sonsAge?.length > 0 ? data.sonsAge.split(",") : [],
          daughtersAge:
            data?.daughtersAge?.length > 0 ? data.daughtersAge.split(",") : [],
        },
        education: {
          level: data?.level,
          major: data.major,
          languages: {
            native: data.languages,
          },
          otherLanguages: otherLanguages,
          licensesAndCertificates: filePayload,
        },
      };
      saveStepDetails(payload, "working_experience");
    }
  };

  // Function to handle back button click
  const handleChangeTab = (step) => {
    if (step < stepperActiveStep) {
      setStepperActiveStep(step);
    }
  };

  

  const steps = [
    {
      label: "About You",
      content: (
        <Step2AboutUsForm
          control={control}
          errors={errors}
          handleSelectLocation={handleSelectLocation}
          setValue={setValue}
        />
      ),
    },
    {
      label: "About Your Family",
      content: (
        <Step2AboutFamilyForm
         control = {control}
         errors = {errors}
        />
      ),
    },
    {
      label: "Education",
      content: (
        <Step3AboutEducationForm
          control={control}
          errors={errors}
          uploadFilesDetails={uploadFilesDetails}
          setUploadFilesDetails={setUploadFilesDetails}
          setOtherLanguage={setOtherLanguage}
          showOtherLanguage={showOtherLanguage}
          setValue={setValue}
          clearErrors={clearErrors}
          setError ={setError}
          otherLanguages={watch("otherLanguages")}
        />
      ),
    },
  ];

  return (
    <Grid item xs={12} md={6} className="stepsForm">
      <Box sx={{ maxWidth: 800 }} className="StepFormCol formDataInfo">
        <form onSubmit={handleSubmit(handleNext)}>
          <Stepper activeStep={stepperActiveStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel onClick={() => handleChangeTab(index)}>
                  {step.label}
                </StepLabel>
                <StepContent>
                  {step.content}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        className="arrowButton"
                        variant="contained"
                        type="submit"
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Next
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </form>
      </Box>
    </Grid>
  );
};

export default HelperRegistrationStep2;
