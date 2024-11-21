import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  FormControl,
  FormLabel,
  TextField,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import LocationAutocomplete from "../Common/LocationAutocomplete";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { REFRENCE_LETTER, YES_NO } from "./Constant";
import CountryDropdown from "../Common/FormFields/CountryDropdown";
import moment from "moment";
import NumberField from "../Common/FormFields/NumberField";
import FileUploaderField from "../Common/FormFields/FileUploaderField";
import { handleFileUploadToS3Bucket } from "../../Utils/CommonAPIs";
import SelectWithController from "../Common/FormFields/SelectWithController";
import RadioGroupWithController from "../Common/FormFields/RadioGroupWithController";
import CheckBoxFieldWithController from "../Common/FormFields/CheckBoxFieldWithController";
import DatePickerWIthController from "../Common/FormFields/DatePickerWIthController";
import { useSelector } from "react-redux";
import {
  DOCUMENT_ALLOWED_TYPES,
  DOCUMENT_TYPE_ERROR_MESSAGE,
  extractNameFromUrl,
} from "../../Constant/Constant";

const HelperRegistrationStep3 = ({
  saveStepDetails,
  setPageLoader,
  stepDetails,
}) => {
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const [currentLocation, setCurrentLocation] = useState("");
  const [fileURL, setFileUrl] = useState(null);

  const [letterFile, setLetterFile] = useState(null);
  console.log(letterFile, "letterFile");

  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    watch,
    register,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    yourExperince,
    genders,
    requiredSpecialCare,
    currency,
    dutiesTasksList,
  } = useSelector((state) => state.common);

  useEffect(() => {
    if (stepDetails && stepDetails.workExperience?.length > 0) {
      for (let key in stepDetails?.workExperience[0]) {
        if (key !== "userId") {
          if (
            key === "familyMembers" &&
            stepDetails.workExperience[0][key].length > 0
          ) {
            stepDetails.workExperience[0][key].forEach((element, i) => {
              setValue(`familyMembers${i}_age`, element.age);
              setValue(`familyMembers${i}_gender`, element.gender);
              setValue(
                `familyMembers${i}_requireSpecialHelp`,
                element.specialNeeds
              );
            });
          }
          if (key === "compensation") {
            setValue("currency", stepDetails.workExperience[0][key].currency);
            setValue("salary", stepDetails.workExperience[0][key].salary);
          }
          if (key === "period") {
            setValue("startedDate", stepDetails.workExperience[0][key].start);
            setValue("releasedDate", stepDetails.workExperience[0][key].end);
          }
          if (key === "references") {
            setValue(
              "referenceAvailability",
              stepDetails.workExperience[0][key].available
            );
            setValue(
              "refrence_letter",
              stepDetails.workExperience[0][key].letter
                ? "Upload Letter"
                : "Provide It Later"
            );
            if (stepDetails.workExperience[0][key]?.fileUrl) {
              setFileUrl(stepDetails.workExperience[0][key]?.fileUrl);
              // setValue("refrence_letter_file",stepDetails.workExperience[0][key]?.fileUrl)
            }
          }
          if (key === "location") {
            setValue("location", stepDetails.workExperience[0][key]);
            setCurrentLocation(stepDetails.workExperience[0][key]);
          } else {
            setValue(key, stepDetails.workExperience[0][key]);
          }
        }
      }
    }
  }, [stepDetails]);

  useEffect(() => {
    if (watch("experience_letter") === "NO") {
      setLetterFile(null);
      setValue("refrence_letter_file", null);
      clearErrors("refrence_letter_file");
      setFileUrl(null);
    }
    if (watch("refrence_letter") === "Provide It Later") {
      setLetterFile(null);
      setValue("refrence_letter_file", null);
      clearErrors("refrence_letter_file");
      setFileUrl(null);
    }
    if(watch("moreWorkingExperience") === "NO"){
      setValue("moreWorkingExperienceRemark", null);
    }
  }, [watch("experience_letter"), watch("refrence_letter"),watch("moreWorkingExperience")]);
  const handleSelectLocation = (location) => {
    setCurrentLocation(location);
  };

  const handleNext = async (data) => {
    setPageLoader(true);
    const payload = { ...data };
    payload.location = currentLocation;
    let familMemberDetail = [];
    if (payload.familySize > 0) {
      for (let i = 0; i < payload.familySize; i++) {
        const familyDetail = {
          age: payload[`familyMembers${i}_age`],
          gender: payload[`familyMembers${i}_gender`],
          specialNeeds: payload[`familyMembers${i}_requireSpecialHelp`],
        };
        delete payload[`familyMembers${i}_age`];
        delete payload[`familyMembers${i}_gender`];
        delete payload[`familyMembers${i}_requireSpecialHelp`];
        familMemberDetail.push(familyDetail);
      }
      payload["familyMembers"] = familMemberDetail;
    }
    payload.period = {
      start: payload.startedDate,
      end: payload.releasedDate,
    };
    delete payload.startedDate;
    delete payload.releasedDate;
    payload.compensation = {
      currency: payload.currency,
      salary: payload.salary,
    };
    delete payload.currency;
    delete payload.salary;
    let fileUrl = "";
    if (letterFile?.name) {
      const fileUpload = await handleFileUploadToS3Bucket(letterFile);
      if (!fileUpload.error) {
        fileUrl = fileUpload.uploadedUrl;
      } else {
        setPageLoader(false);
        return;
      }
    } else if (fileURL) {
      fileUrl = fileURL;
    }
    payload.references = {
      letter: payload.refrence_letter === "Upload Letter",
      available: payload.referenceAvailability,
      fileUrl: fileUrl,
    };
    delete payload.refrence_letter;
    delete payload.referenceAvailability;
    saveStepDetails(payload, "job_details");
  };

  const handleFileUpload = (uploadFile, file) => {
    setLetterFile(file);
    setFileUrl(null);
  };
  const steps = [
    {
      label: "Working Experiences",
      content: (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* Marital Status */}
              <SelectWithController
                control={control}
                name={"experience"}
                options={yourExperince}
                label={"Experiences as Domestic Helper"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className="queRow LocationAutocomplete" fullWidth>
                <FormLabel
                  className="workingLocation formLabel"
                  id="city_and_country"
                >
                  Working Location
                </FormLabel>
                <Controller
                  name="location"
                  control={control}
                  defaultValue=""
                  // rules={{ required: t("location_required") }}
                  render={({ field }) => (
                    <LocationAutocomplete
                      onSelect={handleSelectLocation}
                      field={field}
                      setValue={setValue}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <CountryDropdown
            control={control}
            name={"employerNationality"}
            label={"Employer Nationality"}
            isRequired={true}
            errors={errors}
          />
          <NumberField
            control={control}
            name={"familySize"}
            errors={errors}
            placeholder={"1"}
            label={"Number of Family Members"}
          />
          {Array.from({ length: watch("familySize") }, (_, index) => (
            <div key={index}>
              <Box className="customAgeBox">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <NumberField
                      control={control}
                      name={`familyMembers${index}_age`}
                      errors={errors}
                      placeholder={"40"}
                      label={"Age"}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <RadioGroupWithController
                      label={t("gender")}
                      name={`familyMembers${index}_gender`}
                      radioOptions={genders}
                      control={control}
                    />
                  </Grid>
                </Grid>
                <CheckBoxFieldWithController
                  label={"Require Special Care"}
                  name={`familyMembers${index}_requireSpecialHelp`}
                  checkBoxesOptions={requiredSpecialCare}
                  control={control}
                />
              </Box>
              {/* Add more form controls for gender and special help */}
            </div>
          ))}
          <NumberField
            control={control}
            name={"houseArea"}
            placeholder={"40"}
            label={"House area (Square Feet)"}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DatePickerWIthController
                name={"startedDate"}
                maxDate={new Date().toISOString()}
                label={"Date started"}
                control={control}
                placeholder={"Select Start Date"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePickerWIthController
                name={"releasedDate"}
                minDate={
                  watch("startedDate")
                    ? moment(watch("startedDate")).toISOString()
                    : moment().toISOString()
                }
                label={"Date released"}
                control={control}
                placeholder={"Select Released Date"}
              />
            </Grid>
          </Grid>
          <FormGroup>
            <Controller
              name="isJobStillGoing"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  className="switcher"
                  control={<Switch {...field} />}
                  label="Visible to subscribed employers interested to have interview with you?"
                />
              )}
            />
          </FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SelectWithController
                control={control}
                name={"currency"}
                options={currency}
                label={"Currency"}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumberField
                control={control}
                name={"salary"}
                errors={errors}
                placeholder={"Eg. 10000"}
                label={"Salary"}
              />
            </Grid>
          </Grid>
          <NumberField
            control={control}
            name={"coHelperNumber"}
            errors={errors}
            placeholder={"Eg. 2"}
            label={"How many co helper"}
          />
          <SelectWithController
            control={control}
            name={"experience_letter"}
            options={YES_NO}
            label={
              "Can you Provide Reference/Release/Recommendation Letter from Employer with this working Experience?"
            }
            isRequired={true}
            errors={errors}
          />
          {watch("experience_letter") === "YES" && (
            <>
              <RadioGroupWithController
                name={"refrence_letter"}
                radioOptions={REFRENCE_LETTER}
                control={control}
              />
              {watch("refrence_letter") === "Upload Letter" && (
                <FormControl fullWidth className="UploadFileCustom queRow">
                  <div className="inputFile">
                    <FileUploaderField
                      name={"refrence_letter_file"}
                      control={control}
                      setError={setError}
                      setFile={handleFileUpload}
                      isSetError={true}
                      errors={errors}
                      clearErrors={clearErrors}
                      allowedTypes={DOCUMENT_ALLOWED_TYPES}
                      errMsg={t(DOCUMENT_TYPE_ERROR_MESSAGE)}
                    />
                  </div>
                  {fileURL ? (
                    <p>{extractNameFromUrl(fileURL)}</p>
                  ) : (
                    letterFile?.name && <p>{letterFile.name}</p>
                  )}
                </FormControl>
              )}
            </>
          )}
          <RadioGroupWithController
            label={"Reference Check Availability"}
            name={"referenceAvailability"}
            radioOptions={YES_NO}
            control={control}
          />
          <FormControl>
            <CheckBoxFieldWithController
              label={"Duties / other task"}
              name={`duties`}
              checkBoxesOptions={dutiesTasksList}
              control={control}
            />
          </FormControl>
          <SelectWithController
            control={control}
            name={"reasonForLeaving"}
            options={YES_NO}
            label={"Reason for Leaving"}
          />
          <FormControl fullWidth className="queRow">
            <FormLabel id="experinceRemark" className="formLabel">
              Remark of your experience
            </FormLabel>
            <TextField
              className="formInputFiled"
              name="experinceRemark"
              {...register("experinceRemark")}
              id="outlined-multiline-static"
              multiline
              rows={4}
              defaultValue=""
            />
          </FormControl>
          <RadioGroupWithController
            label={"Do you have any more working experiences?"}
            name={"moreWorkingExperience"}
            radioOptions={YES_NO}
            control={control}
          />
          {
            (watch("moreWorkingExperience") === "YES") && (
              <TextField
              className="formInputFiled"
              placeholder={t("more_experience_placeholder")}
              {...register("moreWorkingExperienceRemark")}
              id="outlined-multiline-static"
              multiline
              rows={4}
              defaultValue=""
            />
            )
          }
        </>
      ),
    },
    // Add more steps as needed
  ];

  return (
    <>
      <Grid item xs={12} md={6} className="stepsForm">
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
                          // onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Next" : "Next"}
                        </Button>
                        {/* <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button> */}
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

export default HelperRegistrationStep3;
