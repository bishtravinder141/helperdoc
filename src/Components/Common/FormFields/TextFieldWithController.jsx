import { FormControl, FormLabel, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useTranslation } from "react-i18next";

export default function TextFieldWithController({
  label,
  name,
  control,
  placeholder,
  isRequired,
  errors,
  clearErrors,
  multiline = false,
  otherRule,
  isFaq = false,
}) {
  const { t } = useTranslation();

  return (
    <>
      <FormControl className="queRow" fullWidth>
        {label && (
          <FormLabel className="formLabel">
            {label}
            {isRequired && "*"}
          </FormLabel>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{
            required: isRequired
              ? !isFaq
                ? t("answer_required_msg")
                : t("field_required_message")
              : isRequired,
            ...otherRule,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              className="formInputFiled"  
              placeholder={placeholder}
              // onChange={(e) => {
              //   isFaq && field.onChange(e);
              //   clearErrors(name);
              // }}
              fullWidth
              multiline={multiline}
              rows={4}
              variant="outlined"
            />
          )}
        />
        {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}
      </FormControl>
    </>
  );
}
