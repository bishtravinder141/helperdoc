import React from "react";
import TextFieldWithController from "../../Common/FormFields/TextFieldWithController";
import RadioGroupWithController from "../../Common/FormFields/RadioGroupWithController";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FormControl, FormGroup, FormLabel, Grid } from "@mui/material";
import SelectWithController from "../../Common/FormFields/SelectWithController";
import ErrorMessage from "../../Common/ErrorMessage/ErrorMessage";
import { Controller } from "react-hook-form";
import DatePickerWIthController from "../../Common/FormFields/DatePickerWIthController";
import NumberField from "../../Common/FormFields/NumberField";
import LocationAutocomplete from "../../Common/LocationAutocomplete";
import CheckBoxField from "../../Common/FormFields/CheckBoxField";
import PhoneInputWithController from "../../Common/FormFields/PhoneInputWithController";

export default function Step2AboutUsForm({
  control,
  errors,
  handleSelectLocation,
  setValue,
}) {
  const { t } = useTranslation();
  const { genders, maritalStatus, religion, skillsList, contractStatus } =
    useSelector((state) => state.common);
  return (
    <>
      <TextFieldWithController
        isRequired={true}
        label={t("full_name")}
        name={"fullName"}
        errors={errors}
        control={control}
        placeholder={t("enter_your_name")}
      />
      <RadioGroupWithController
        label={t("gender")}
        isRequired={true}
        name={"gender"}
        radioOptions={genders}
        control={control}
        errors={errors}
      />
      {/* Passport Number / HKID */}
      <TextFieldWithController
        isRequired={true}
        label={t("pasport_or_HKID")}
        name={"passportOrHKID"}
        errors={errors}
        control={control}
        placeholder={"e.g. X123456(A)"}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/* Marital Status */}
          <SelectWithController
            control={control}
            name={"maritalStatus"}
            options={maritalStatus}
            label={"Marital Status"}
            isRequired={true}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Marital Status */}
          <SelectWithController
            control={control}
            name={"religion"}
            options={religion}
            label={t("religion")}
            isRequired={true}
            errors={errors}
          />
        </Grid>
      </Grid>

      {/* Whatsapp Number */}

      <PhoneInputWithController
        name="whatappNumber"
        control={control}
        errors={errors}
        label={t("whats_app_no")}
        required={true}
      />

      {/* Current Employment status */}
      <SelectWithController
        control={control}
        name={"currentEmploymentStatus"}
        options={contractStatus}
        label={t("current_employment_status")}
        placeholder={t("current_employment_status")}
        isRequired={true}
        errors={errors}
      />
      {/* Date of Birth */}
      <DatePickerWIthController
        name={"dob"}
        maxDate={new Date().toISOString()}
        label={"Date of Birth"}
        isRequired={true}
        control={control}
        errors={errors}
        placeholder={"Select Date of Birth"}
      />
      {/* Height (CM) and Weight (KG) */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <NumberField
            control={control}
            name={"height"}
            errors={errors}
            placeholder={"170"}
            label={"Height (CM)"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <NumberField
            control={control}
            name={"weight"}
            errors={errors}
            placeholder={"170"}
            label={" Weight (KG)"}
          />
        </Grid>
      </Grid>
      {/* Current Location */}
      <FormControl className="queRow LocationAutocomplete" fullWidth>
        <FormLabel className="formLabel" id="city_and_country">
          Your Current location: city and country *
        </FormLabel>
        <Controller
          name="location"
          control={control}
          defaultValue=""
          rules={{ required: t("location_required") }}
          render={({ field }) => (
            <LocationAutocomplete
              onSelect={handleSelectLocation}
              field={field}
              setValue={setValue}
            />
          )}
        />
        {errors.location && <ErrorMessage msg={errors.location?.message} />}
        {/* <img src={LocationSvg}/> */}
      </FormControl>
      {/* Skills */}
      <FormControl className="queRow" fullWidth>
        <FormLabel className="formLabel large" id="skills">
          Skills
        </FormLabel>
        <FormGroup>
          <FormControl component="fieldset">
            <FormGroup className="skillsCol">
              <Controller
                name="skills"
                control={control}
                defaultValue={[]}
                rules={{ required: "Select at least one skill" }}
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
            {errors.skills && <ErrorMessage msg={errors.skills?.message} />}
          </FormControl>
        </FormGroup>
      </FormControl>
    </>
  );
}
