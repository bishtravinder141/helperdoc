import React from "react";
import { Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import { isPhoneValid } from "../../../Utils/MobileNumberValidation";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useTranslation } from "react-i18next";
import { FormControl, FormLabel } from "@mui/material";
import 'react-international-phone/style.css';

const PhoneInputWithController = ({
  name,
  control,
  defaultValue,
  placeholder = "Enter phone number",
  errors,
  label,
  isRequired,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <FormControl fullWidth className="queRow">
        {label && (
          <FormLabel className="formLabel">
            {label}
            {isRequired && "*"}
          </FormLabel>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={{
            required: t("answer_required_msg"),
            validate: {
              checkValidMobileNumber: (v) =>
                isPhoneValid(v) || t("valid_mobile_number_msg"),
            },
          }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              className="phone-input"
              defaultCountry="hk"
              placeholder={placeholder}
              inputStyle={{ width: "100%", height: "3.1rem"}}
            />
          )}
        />
      </FormControl>
      {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}
    </>
  );
};

export default PhoneInputWithController;
