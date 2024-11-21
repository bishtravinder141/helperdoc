import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Slider,
  Radio,
  Grid,
  Step,
  StepContent,
  FormControlLabel,
  Stepper,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import RadioGroupWithController from "../Common/FormFields/RadioGroupWithController";
import { Controller } from "react-hook-form";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";
import DatePickerWIthController from "../Common/FormFields/DatePickerWIthController";
import {
  MARKS,
  MIN_AGE_DISTANCE,
  MIN_EXPERENCE_DISTANCE,
  SCHEDULE_TYPE_OPTIONS,
} from "../../Constant/Constant";
import MultiSelecteWithController from "../Common/FormFields/MultiSelecteWithController";
import CheckBoxField from "../Common/FormFields/CheckBoxField";
import CountryDropdown from "../Common/FormFields/CountryDropdown";
import SelectWithController from "../Common/FormFields/SelectWithController";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import StepTitleWithIcon from "../Common/StepTitleWithIcon";

export default function JobPostStep1({
  control,
  errors,
  watch,
  setValue,
  activeStep,
  setActiveStep,
  scheduleType,
  setScheduleType,
}) {
  const { t } = useTranslation();

  const {
    genders,
    religion,
    skillsList,
    educationLevel,
    nativeLanguages,
    jobTypes,
    contractStatus,
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

  const isAnySkillSelected = () => {
    const tempCare = watch("required_skills_Care") || [];
    const tempCooking = watch("required_skills_Cooking") || [];
    const tempHouseholdChore = watch("required_skills_HouseholdChore") || [];
    const allSkills = [...tempCare, ...tempCooking, ...tempHouseholdChore];
    return allSkills.length === 0;
  };
  const steps = [
    {
      label: "basic_info",
      icon: "/aboutUserIcon.svg",
      content: (
        <>
          <RadioGroupWithController
            label={t("job_type")}
            name={"basicInfo_jobType"}
            radioOptions={jobTypes}
            control={control}
            isRequired={true}
            errors={errors}
          />
          {watch("basicInfo_jobType") === "Full-Time" && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* start date */}
                <FormGroup>
                  <DatePickerWIthController
                    name={"mySchedule_startDate"}
                    minDate={new Date().toISOString().split("T")[0]}
                    label={t("expected_starting_date")}
                    isRequired={true}
                    control={control}
                    errors={errors}
                    placeholder={t("select_date")}
                  />
                </FormGroup>
                {errors.mySchedule_startDate && (
                  <ErrorMessage message={errors.mySchedule_startDate.message} />
                )}
              </Grid>
            </Grid>
          )}
          {watch("basicInfo_jobType") === "Part-Time" && (
            <>
              <FormControlLabel
                value={SCHEDULE_TYPE_OPTIONS[0]}
                onClick={() => setScheduleType(SCHEDULE_TYPE_OPTIONS[0].name)}
                control={
                  <Radio
                    checked={scheduleType === SCHEDULE_TYPE_OPTIONS[0].name}
                    checkedIcon={<CheckCircleRoundedIcon />}
                  />
                }
                label={SCHEDULE_TYPE_OPTIONS[0].name}
              />
              {scheduleType === SCHEDULE_TYPE_OPTIONS[0].name && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      {/* start date */}
                      <FormGroup className="expectedstarttime">
                        <DatePickerWIthController
                          name={"mySchedule_startDate"}
                          minDate={new Date().toISOString().split("T")[0]}
                          label={t("expected_starting_date")}
                          isRequired={true}
                          control={control}
                          errors={errors}
                          placeholder={t("select_date")}
                        />
                        {errors.mySchedule_startDate && (
                          <ErrorMessage
                            message={errors.mySchedule_startDate.message}
                          />
                        )}
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormGroup className="expectedstarttime">
                        <FormLabel className="formLabel">
                          &nbsp;{t("expected_starting_time")}*
                        </FormLabel>
                        {/* start time */}
                        <Controller
                          name="mySchedule_startTime"
                          rules={{ required: t("field_required_message")}}
                          control={control}
                          render={({ field }) => (
                            <input {...field} type="time" placeholder={t("select_time")}  />
                          )}
                        />
                        {errors?.mySchedule_startTime && (
                          <ErrorMessage
                            msg={errors.mySchedule_startTime.message}
                          />
                        )}
                      </FormGroup>
                    </Grid>
                  </Grid>
                  {/* estimated time */}
                  <Grid className="hoursSlider">
                    <Controller
                      name="mySchedule_estimatedTime"
                      rules={{ required: t("field_required_message") }}
                      control={control}
                      render={({ field }) => (
                        <Slider
                          {...field}
                          className="rangeSliderC"
                          valueLabelDisplay="on"
                          aria-labelledby="slider-label"
                          valueLabelFormat={(value) => `${value}h`}
                          // getAriaLabel={() => "Minimum distance"}
                          // getAriaValueText={valuetext}
                          // getAriaValueText={(value) => `${value}Hwde`}
                          min={0}
                          max={24}
                          // marks={[
                          //   { value: 18, label: "18wwwwwwwwwww" },
                          //   { value: 60, label: "60" },
                          // ]}
                        />
                      )}
                    />
                    {errors.mySchedule_estimatedTime && (
                      <ErrorMessage
                        msg={errors.mySchedule_estimatedTime.message}
                      />
                    )}
                  </Grid>
                </>
              )}

              <FormControlLabel
                value={SCHEDULE_TYPE_OPTIONS[1]}
                onClick={() => setScheduleType(SCHEDULE_TYPE_OPTIONS[1].name)}
                control={
                  <Radio
                    checked={scheduleType === SCHEDULE_TYPE_OPTIONS[1].name}
                    checkedIcon={<CheckCircleRoundedIcon />}
                  />
                }
                label={SCHEDULE_TYPE_OPTIONS[1].name}
              />
            </>
          )}

          <CountryDropdown
            control={control}
            name={"basicInfo_jobLocation"}
            label={t("job_post_question_2")}
            isRequired={true}
            errors={errors}
          />
          {/* <DatePickerWIthController
            name={"basicInfo_jobStartDate"}
            maxDate={new Date().toISOString()}
            label={t("job_post_question_3")}
            isRequired={true}
            control={control}
            errors={errors}
            placeholder={""}
          /> */}
          {watch("basicInfo_jobType") === "Full-Time" && (
            <FormControl
              className="queRow LocationAutocomplete datestartflex"
              fullWidth
            >
              <FormLabel className="formLabel" id="city_and_country">
                {t("job_post_question_4")} *
              </FormLabel>
              <Controller
                name="basicInfo_jobStartDateFlexibility"
                control={control}
                defaultValue="0"
                rules={{ required: t("field_required_message") }}
                render={({ field }) => (
                  <Slider
                    {...field}
                    aria-labelledby="discrete-slider"
                    step={25}
                    valueLabelDisplay="off"
                    marks={MARKS}
                    min={0}
                    max={100}
                  />
                )}
              />
              {errors.jobStartDateFlexibility && (
                <ErrorMessage msg={errors.jobStartDateFlexibility?.message} />
              )}
            </FormControl>
          )}
        </>
      ),
    },
    {
      label: "required_skills_duties",
      icon: "/logical-thinking.svg",
      content: (
        <>
          <MultiSelecteWithController
            control={control}
            name={"required_skills_language"}
            options={nativeLanguages}
            label={t("language")}
            isRequired={true}
            errors={errors}
            selectOptionList={watch("required_skills_language") || []}
            setValue={setValue}
          />
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel large" id="skills">
              {t("skills")} *
            </FormLabel>
            <FormGroup>
              <FormControl component="fieldset">
                <FormGroup className="skillsCol">
                  {/* <Controller
                    name="required_skills_skills"
                    control={control}
                    defaultValue={[]}
                    rules={{ required: "Select at least one skill" }}
                    render={({ field }) => ( */}
                  <>
                    {skillsList.map((skill) => (
                      <>
                        <Controller
                          name={`required_skills_${skill.name}`}
                          control={control}
                          defaultValue={[]}
                          rules={{
                            required: isAnySkillSelected(),
                          }}
                          render={({ field }) => (
                            <>
                              <FormLabel
                                className="formLabel"
                                component="legend"
                              >
                                {skill.name}
                              </FormLabel>
                              <CheckBoxField
                                field={field}
                                checkBoxesValues={skill.skills}
                              />
                            </>
                          )}
                        />
                      </>
                    ))}
                  </>
                </FormGroup>
                {errors.required_skills_Care &&
                  errors.required_skills_Cooking &&
                  errors.required_skills_HouseholdChore && (
                    <ErrorMessage msg={t("select_one_skill")} />
                  )}
              </FormControl>
            </FormGroup>
          </FormControl>
        </>
      ),
    },
    {
      label: "candidate_pref",
      icon: "/candidatePrefrenceIcon.svg",
      content: (
        <>
          <CountryDropdown
            control={control}
            name={"candidateLocation"}
            label={t("job_post_question_5")}
            isRequired={true}
            errors={errors}
          />
          <RadioGroupWithController
            label={t("gender")}
            isRequired={true}
            name={"candidateGender"}
            radioOptions={genders}
            control={control}
            errors={errors}
          />
          <SelectWithController
            control={control}
            name={"candidateContractStatus"}
            options={contractStatus}
            placeholder={t("select_employment_status")}
            label={t("current_employment_status")}
            isRequired={true}
            errors={errors}
          />
          {/* <CountryDropdown
            control={control}
            name={"candidateContractStatus"}
            label={t("job_post_question_6")}
            isRequired={true}
            errors={errors}
          /> */}
          <CountryDropdown
            control={control}
            name={"candidateNationality"}
            label={t("job_post_question_7")}
            isRequired={true}
            errors={errors}
          />
          <SelectWithController
            control={control}
            name={"candidateReligion"}
            placeholder={t("select_religion")}
            options={religion}
            label={"Religion"}
            isRequired={true}
            errors={errors}
          />
          <SelectWithController
            control={control}
            name={"candidateEducationLevel"}
            placeholder={t("select_education_level")}
            options={educationLevel}
            label={"Education Level"}
            isRequired={true}
            errors={errors}
          />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <FormControl
                className="queRow LocationAutocomplete innerSlider"
                fullWidth
              >
                <FormLabel className="formLabel" id="city_and_country">
                  {t("job_post_question_10")} *
                </FormLabel>
                <Controller
                  name="candidateExperience"
                  control={control}
                  defaultValue={[0, 28]}
                  rules={{ required: t("field_required_message") }}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      onChange={(e, newValue, activeThumb) => {
                        const numericValue = handleOnChange(
                          e,
                          newValue,
                          activeThumb,
                          watch("candidateExperience"),
                          MIN_EXPERENCE_DISTANCE
                        );
                        field.onChange(numericValue);
                      }}
                      valueLabelDisplay="auto"
                      aria-labelledby="slider-label"
                      getAriaLabel={() => "Minimum distance"}
                      getAriaValueText={(value) => value}
                      disableSwap
                      min={0}
                      max={40}
                      marks={[
                        { value: 0, label: "0" },
                        { value: 40, label: "40" },
                      ]}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                className="queRow LocationAutocomplete innerSlider"
                fullWidth
              >
                <FormLabel className="formLabel" id="city_and_country">
                  {t("job_post_question_11")} *
                </FormLabel>
                <Controller
                  name="candidateAge"
                  control={control}
                  defaultValue={[18, 35]}
                  rules={{ required: t("field_required_message") }}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      onChange={(e, newValue, activeThumb) => {
                        const numericValue = handleOnChange(
                          e,
                          newValue,
                          activeThumb,
                          watch("candidateAge"),
                          MIN_AGE_DISTANCE
                        );
                        field.onChange(numericValue);
                      }}
                      valueLabelDisplay="auto"
                      aria-labelledby="slider-label"
                      getAriaLabel={() => "Minimum distance"}
                      getAriaValueText={(value) => value}
                      disableSwap
                      min={18}
                      max={60}
                      marks={[
                        { value: 18, label: "18" },
                        { value: 60, label: "60" },
                      ]}
                    />
                  )}
                />
                {/* <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={value1}
                  onChange={handleOnChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={(value) => value}
                  disableSwap
                  aria-labelledby="slider-label"
                  min={18}
                  max={60}
                  marks={[
                    { value: 18, label: "18" },
                    { value: 60, label: "60" },
                  ]}
                /> */}
              </FormControl>
            </Grid>
          </Grid>
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
        <Step key={index}>
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
                  {t("next")}
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}
