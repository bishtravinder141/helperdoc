import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function RadioGroupWithController({
  label,
  name,
  control,
  placeholder,
  isRequired,
  errors,
  radioOptions,
}) {
  const { t } = useTranslation();
  return (
    <>
      <FormControl className="queRow" fullWidth>
        {label && (
          <FormLabel className="formLabel">
            {label}
            {isRequired && " *"}
          </FormLabel>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{
            required: isRequired ? t("answer_required_msg") : isRequired,
          }}
          render={({ field }) => (
            <RadioGroup className="radioCheckBtn" {...field}>
              {radioOptions.map((radio, index) => (
                <FormControlLabel
                  key={index}
                  value={radio.name}
                  control={<Radio checkedIcon={<CheckCircleRoundedIcon />} />}
                  label={radio.name}
                />
              ))}
            </RadioGroup>
          )}
        />
        {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}
      </FormControl>
    </>
  );
}
