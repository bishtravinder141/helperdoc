import React from "react";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import RadioGroupField from "./RadioGroupField";
import { useTranslation } from "react-i18next";

export default function RadioButtonsWithController({
  name,
  control,
  options,
  errors,
  isRequired,
}) {
    const { t } = useTranslation();
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: isRequired ? t("answer_required_msg") : isRequired }}
        render={({ field }) => (
          <RadioGroupField radioOptions={options} field={field} />
        )}
      />{" "}
      {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}
    </>
  );
}
