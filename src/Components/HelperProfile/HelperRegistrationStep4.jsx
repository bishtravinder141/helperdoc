import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Stepper,
  TextField,
  Step,
  StepLabel,
  StepContent,
  FormGroup,
  FormLabel,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import NumberField from "../Common/FormFields/NumberField";
import SelectWithController from "../Common/FormFields/SelectWithController";
import CountryDropdown from "../Common/FormFields/CountryDropdown";
import RadioGroupWithController from "../Common/FormFields/RadioGroupWithController";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CheckBoxField from "../Common/FormFields/CheckBoxField";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";

const HelperRegistrationStep4 = ({ saveStepDetails, stepDetails }) => {
  const { t } = useTranslation();
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const {
    livingArrangement,
    daysOff,
    currency,
    jobTypes,
    shareRoomCoWorker,
    skillsList,
    dutiesTasksList,
  } = useSelector((state) => state.common);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (
      stepDetails.jobPreferences &&
      Object.keys(stepDetails.jobPreferences).length > 0
    ) {
      for (let key in stepDetails.jobPreferences) {
        if (key === "introduceYourself") {
          for (let subkey in stepDetails.jobPreferences?.introduceYourself) {
            setValue(
              subkey,
              stepDetails.jobPreferences?.introduceYourself[subkey]
            );
          }
        } else {
          setValue(key, stepDetails.jobPreferences[key]);
        }
      }
    }
  }, [stepDetails]);

  const handleNext = (data) => {
    const formattedData = {
      ...data,
      introduceYourself: {
        specialAboutYou: data.specialAboutYou,
        experienceHighlights: data.experienceHighlights,
      },
    };
    delete formattedData.specialAboutYou;
    delete formattedData.experienceHighlights;
    if (stepperActiveStep === steps.length - 1) {
      saveStepDetails({ jobPreferences: formattedData }, "q_&_a");
    } else {
      setStepperActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleChangeTab = (step) => {
    if (step < stepperActiveStep) {
      setStepperActiveStep(step);
    }
  };

  const steps = [
    {
      label: "Contract",
      content: (
        <>
          <RadioGroupWithController
            label={"Choose the type of employment"}
            name={"jobType"}
            radioOptions={jobTypes}
            control={control}
            isRequired={true}
            errors={errors}
          />
          <FormGroup>
            <FormLabel className="formLabel">{t("preffered_job")}*</FormLabel>
            <FormControl component="fieldset">
              <FormGroup className="skillsCol">
                <Controller
                  name="preferredJobs"
                  control={control}
                  defaultValue={[]}
                  rules={{ required: "Select at least one " }}
                  render={({ field }) => (
                    <>
                      {skillsList.map((skill) => (
                        <>
                          <FormLabel className="formLabel" component="legend">
                            {skill.name}
                          </FormLabel>
                          <CheckBoxField
                            field={field}
                            checkBoxesValues={skill.skills}
                          />
                        </>
                      ))}
                    </>
                  )}
                />
              </FormGroup>
              {errors.preferredJobs && (
                <ErrorMessage msg={errors.preferredJobs?.message} />
              )}
            </FormControl>
          </FormGroup>
        </>
      ),
    },
    {
      label: "Job Offer",
      content: (
        <>
          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <NumberField
                  control={control}
                  name={"expectedSalary"}
                  errors={errors}
                  placeholder={"Eg. 10000"}
                  label={"Salary"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectWithController
                  control={control}
                  name={"currency"}
                  options={currency}
                  label={"Currency"}
                />
              </Grid>
            </Grid>
          </FormGroup>
          <SelectWithController
            control={control}
            name={"preferredDayOff"}
            options={daysOff.map((dy) => {
              return { name: dy.day };
            })}
            errors={errors}
            isRequired={true}
            label={"Preferred Day Off"}
          />
          <SelectWithController
            control={control}
            name={"sleepingArrangement"}
            options={shareRoomCoWorker}
            errors={errors}
            isRequired={true}
            label={"Sleeping Arrangement"}
          />
          <SelectWithController
            control={control}
            name={"shareWork"}
            options={shareRoomCoWorker}
            errors={errors}
            isRequired={true}
            label={"Share work with co-worker"}
          />
          <SelectWithController
            control={control}
            name={"livingArrangement"}
            options={livingArrangement}
            errors={errors}
            isRequired={true}
            label={"Living arrangement"}
          />
          <CountryDropdown
            control={control}
            name={"preferredLocation"}
            label={"Preferred working Location"}
            isRequired={true}
            errors={errors}
          />
        </>
      ),
    },
    {
      label: "Introduce Yourself",
      content: (
        <>
          <FormGroup>
            <Controller
              name={"specialAboutYou"}
              control={control}
              defaultValue=""
              rules={{ required: t("answer_required_msg") }}
              render={({ field }) => (
                <>
                  <FormLabel className="formLabel" component="legend">
                    {t("step4_introduction_question1")}*
                  </FormLabel>
                  <TextField
                    {...field}
                    multiline
                    fullWidth
                    rows={4}
                    className="formInputFiled"
                    variant="outlined"
                    placeholder="Your answer..."
                  />
                </>
              )}
            />
            {errors?.specialAboutYou?.message && (
              <ErrorMessage msg={errors?.specialAboutYou?.message} />
            )}
            <Controller
              name={"experienceHighlights"}
              control={control}
              defaultValue=""
              rules={{ required: t("answer_required_msg") }}
              render={({ field }) => (
                <>
                  <FormLabel className="formLabel" component="legend">
                    {t("step4_introduction_question2")}*
                  </FormLabel>
                  <TextField
                    {...field}
                    multiline
                    fullWidth
                    rows={4}
                    className="formInputFiled"
                    variant="outlined"
                    placeholder="Your answer..."
                  />
                </>
              )}
            />
            {errors?.specialAboutYou?.message && (
              <ErrorMessage msg={errors?.experienceHighlights?.message} />
            )}
          </FormGroup>
        </>
      ),
    },
    // Add more steps as needed
  ];

  return (
    <>
      <Grid item xs={12} md={6} className="workingExperienceTab">
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
                          // onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Next" : "Next"}
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </form>
          {stepperActiveStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
            </Paper>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default HelperRegistrationStep4;
