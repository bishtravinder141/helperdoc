import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Step,
  StepContent,
  CardMedia,
  Card,
  Stepper,
  Switch,
  CardContent,
  FormLabel,
  FormGroup,
  TextField,
  Typography,
  CardActions,
} from "@mui/material";
import React, { useState } from "react";
import RadioGroupWithController from "../Common/FormFields/RadioGroupWithController";
import { Controller } from "react-hook-form";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";
import CountryDropdown from "../Common/FormFields/CountryDropdown";
import SelectWithController from "../Common/FormFields/SelectWithController";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import TextFieldWithController from "../Common/FormFields/TextFieldWithController";
import NumberField from "../Common/FormFields/NumberField";
import SimpleCheckboxWithController from "../Common/FormFields/SimpleCheckboxWithController";
import FormLabelField from "../Common/FormFields/FormLabelField";
import StepTitleWithIcon from "../Common/StepTitleWithIcon";

import {
  FAMILY_OPTIONS,
  MAX_CHILDREN_LIMIT,
  YES_NO,
} from "../HelperProfile/Constant";
import {
  faBicycle,
  faCartShopping,
  faMinus,
  faPlus,
  faTeddyBear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomTextField from "../Common/InputFields/CustomTextField";
import PhoneInputWithController from "../Common/FormFields/PhoneInputWithController";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
export default function JobPostStep2({
  control,
  errors,
  activeStep,
  setActiveStep,
  clearErrors,
  isPlanActivated,
  watch,
  handleChildrenCounterChange,
  aboutFamilyInfo,
  isJobPublished,
}) {
  const { t } = useTranslation();

  const {
    genders,
    religion,
    accommodation,
    jobTypes,
    daysOff,
    currency,
    livingArrangement,
    jobProfileImages,
  } = useSelector((state) => state.common);

  const handleOnChange = (
    event,
    newValue,
    activeThumb,
    fieldName,
    distance
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      return [Math.min(newValue[0], fieldName[1] - distance), fieldName[1]];
    } else {
      return [fieldName[0], Math.max(newValue[1], fieldName[0] + distance)];
    }
  };

  const steps = [
    {
      label: "about_you",
      icon: "/aboutUserIcon.svg",
      content: (
        <>
          <RadioGroupWithController
            label={t("employer_type")}
            name={"about_employerType"}
            radioOptions={jobTypes}
            control={control}
            isRequired={true}
            errors={errors}
          />
          {/* <SelectWithController
            label={t("family_type")}
            name={"about_familyType"}
            control={control}
            options={familyTypes}
            isRequired={true}
            errors={errors}
            placeholder={t("please_select")}
          /> */}
          {/* family counter */}
          <div className="family-options-container d-flex justify-content-between flex-column">
            <FormLabel className="formLabel">{t("family_type")}</FormLabel>
            <div className="familySelect">
              {FAMILY_OPTIONS.map(({ title, icon, key }, index) => (
                <Card className="w-100 cardFamily" key={index}>
                  {/* <CardMedia image={curElem.image} title="green iguana" />   */}
                  <CardContent className="text-center p-0">
                    <img src={icon} alt="" />
                    {/* <FontAwesomeIcon icon={icon} className="mb-2" /> */}
                    <h5 gutterBottom variant="h5" component="div" className="m-0">
                      {t(title)}
                    </h5>
                    <div className="counterDiv ">
                      <div className="decreement" onClick={() => handleChildrenCounterChange(key, "decrement")}>
                        <FontAwesomeIcon icon={faMinus} />
                      </div>
                      <div className="count-display">{aboutFamilyInfo[key]}</div>
                      <div className="increement" onClick={() => handleChildrenCounterChange(key, "increment")}>
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* family counter */}
          {/* <CardContent sx={border}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              belent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
          <RadioGroupWithController
            label={t("job_post_question_12")}
            name={"about_havePets"}
            radioOptions={YES_NO}
            control={control}
            isRequired={true}
            errors={errors}
          />
          {/* <SelectWithController
            label={t("job_post_question_12")}
            name={"about_havePets"}
            control={control}
            options={YES_NO}
            isRequired={true}
            errors={errors}
            placeholder={t("please_select")}
          /> */}
          <CountryDropdown
            label={t("nationality")}
            name={"about_employerNationality"}
            control={control}
            isRequired={true}
            errors={errors}
          />
          {/* <TextFieldWithController
            label={t("employer_email")}
            name={"about_employerEmail"}
            control={control}
            isRequired={true}
            errors={errors}
            placeholder={t("enter_your_email")}
            otherRule={{
              pattern: {
                value: EMAIL_REGEX,
                message: t("valid_email_msg"),
              },
            }}
          /> */}
          {/* <RadioGroupWithController
            label={t("gender")}
            isRequired={true}
            name={"about_employerGender"}
            radioOptions={genders}
            control={control}
            errors={errors}
          /> */}

          <FormGroup>
            <Controller
              name="about_flatOrHouseSize"
              control={control}
              defaultValue=""
              rules={{
                required: t("field_required_message"),
              }}
              render={({ field }) => (
                <>
                  <FormLabel className="formLabel" component="legend">{t("flat_size")}*</FormLabel>
                  <CustomTextField
                    {...field}
                    placeholder={t("enter_flat_house_size")}
                    // placeholder={t("flat_size")}
                    type="text"
                    className="formInputFiled"
                  />
                </>
              )}
            />
            {errors?.about_flatOrHouseSize && (
              <ErrorMessage msg={errors?.about_flatOrHouseSize?.message} />
            )}{" "}
          </FormGroup>

          <FormGroup>
            <Controller
              name={"about_address"}
              control={control}
              defaultValue=""
              rules={{ required: t("field_required_message") }}
              render={({ field }) => (
                <>
                  <FormLabel className="formLabel" component="legend">
                    {t("address")}*
                  </FormLabel>
                  <TextField
                    {...field}
                    multiline
                    fullWidth
                    rows={4}
                    className="formInputFiled"
                    variant="outlined"
                    placeholder={t("add_your_address")}
                  />
                </>
              )}
            />
            {errors?.about_address?.message && (
              <ErrorMessage msg={errors?.about_address?.message} />
            )}
          </FormGroup>
          {/* <PhoneInputWithController
            name="about_phoneNumber"
            control={control}
            errors={errors}
            label={t("phone_number")}
            required={true}
          />
          <FormGroup>
            <Controller
              name="about_isNumberVisiableToAll"
              control={control}
              // defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  className="switcher"
                  control={<Switch {...field} checked = {watch("about_isNumberVisiableToAll")}/>}
                  label={t("number_visible_to_all")}
                />
              )}
            />
          </FormGroup> */}
        </>
      ),
    },
    {
      label: "required_skills_duties",
      icon: "/logical-thinking.svg",
      content: (
        <>
          <SelectWithController
            control={control}
            name={"offer_dayOff"}
            options={daysOff.map((dy) => {
              return { name: dy.day };
            })}
            errors={errors}
            isRequired={true}
            label={t("day_off")}
            placeholder={t("please_select")}
          />
          <SelectWithController
            control={control}
            name={"offer_accommodation"}
            options={accommodation}
            errors={errors}
            isRequired={true}
            label={t("accomodation")}
            placeholder={t("please_select")}
          />
          <Grid container spacing={2} className="requiredPostJob">
            <Grid item xs={12} md={6}>
              <NumberField
                control={control}
                name={"offer_monthlySalary"}
                errors={errors}
                placeholder={"Eg. 10000"}
                label={t("monthly_salary_offer")}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectWithController
                control={control}
                name={"offer_salaryCurrency"}
                options={currency}
                label={t("currency")}
                placeholder={t("please_select")}
                isRequired={true}
                errors={errors}
              />
            </Grid>
          </Grid>
          <SelectWithController
            control={control}
            name={"offer_livingArrangement"}
            options={livingArrangement}
            label={t("living_arrangements")}
            placeholder={t("please_select")}
            isRequired={true}
            errors={errors}
          />
        </>
      ),
    },
    {
      label: "job_details",
      icon: "/candidatePrefrenceIcon.svg",
      content: (
        <>
          <FormControl className="queRow" fullWidth>
            <FormLabelField
              label={t("select_suitable_picture")}
              isRequired={true}
            />
            <Controller
              name={"job_jobImage"}
              control={control}
              defaultValue=""
              rules={{
                required: t("img_required_msg"),
              }}
              render={({ field }) => (
                <RadioGroup {...field} className="jobPostRadio">
                  <Grid container spacing={2}>
                    {jobProfileImages &&
                      jobProfileImages?.map((profile, index) => (
                        <Grid item key={index}>
                          <FormControlLabel
                            className="radioCheckBtn"
                            value={profile}
                            control={
                              <Radio
                                className="radio"
                                checked={watch("job_jobImage") === profile}
                              />
                            }
                            label={
                              <img src={profile} alt={`job-profile-${index}`} />
                            }
                          />
                        </Grid>
                      ))}
                  </Grid>
                </RadioGroup>
              )}
            />
            {errors && errors.job_jobImage && (
              <ErrorMessage msg={errors.job_jobImage.message} />
            )}
          </FormControl>
          <TextFieldWithController
            label={t("job_title")}
            name={"job_jobTitle"}
            control={control}
            isRequired={true}
            clearErrors={clearErrors}
            errors={errors}
            placeholder={t("job_title_placeholder")}
          />
          <TextFieldWithController
            label={t("job_description")}
            name={"job_jobDescription"}
            control={control}
            isRequired={true}
            clearErrors={clearErrors}
            errors={errors}
            multiline={true}
            placeholder={t("job_discription_placholder")}
          />
          {/* <SimpleCheckboxWithController
            label={t("subscribe_to_tips_and_newsletters")}
            name={"subscribeToNewsletter"}
            control={control}
          /> */}
          {/* <SimpleCheckboxWithController
            label={t("receive_privileged_and_discount")}
            name={"privilegedAndOffers"}
            control={control}
          /> */}
        </>
      ),
    },
  ];

  const handleChangeTab = (step) => {
    if (step < activeStep) {
      setActiveStep(step);
    }
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepTitleWithIcon
            label={t(step.label)}
            isActive={index === activeStep}
            isRoleButton={index < activeStep}
            step={index}
            handleOnTabChange={handleChangeTab}
            icon={step.icon}
          />
          <StepContent className="stepperEmployer">
            {step.content}
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  className="arrowButton"
                  variant="contained"
                  type="submit"
                  sx={{ mt: 1, mr: 1 }}
                >
                  {t(
                    isPlanActivated && activeStep === 2
                      ? isJobPublished
                        ? "updateJob"
                        : "publishJob"
                      : "next"
                  )}
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}
