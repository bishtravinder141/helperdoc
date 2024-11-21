import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormGroup,
  FormLabel,
  FormControl,
} from "@mui/material";
import { STEP5_QUESTION } from "./Constant";
import RadioButtonsWithController from "../Common/FormFields/RadioButtonsWithController";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const HelperRegistrationStep5 = ({ saveStepDetails, stepDetails }) => {
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (stepDetails?.qna && Object.keys(stepDetails.qna).length > 0) {
      for (let key in stepDetails.qna) {
        if(key !== '_id')
        setValue(key, stepDetails.qna[key] ? "Yes" : "No");
      }
    }
  }, [stepDetails]);

  const handleNext = (data) => {
    const payload = {};
    for (let key in data) {
      payload[key] = data[key] === "Yes" ? true : false;
    }
    saveStepDetails({ qna: payload }, "final");
  };

  const steps = [
    {
      label: "Q&A",
      content: (
        <>
          <FormGroup>
            {STEP5_QUESTION.map((question, index) => (
              <FormControl
                key={index}
                component="fieldset"
                sx={{ mb: 2 }}
                className="queRow"
              >
                <FormLabel className="formLabel">
                  {t(question.question)}
                </FormLabel>
                <RadioButtonsWithController
                  control={control}
                  name={question.answer_type}
                  options={["Yes", "No"]}
                  isRequired={true}
                  errors={errors}
                />
              </FormControl>
            ))}
          </FormGroup>
        </>
      ),
    },
  ];

  return (
    <>
      <Grid item xs={12} md={6} className="workingExperienceTab">
        <Box sx={{ maxWidth: 800 }} className="StepFormCol formDataInfo">
          <form onSubmit={handleSubmit(handleNext)}>
            <Stepper activeStep={stepperActiveStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
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
    </>
  );
};

export default HelperRegistrationStep5;
