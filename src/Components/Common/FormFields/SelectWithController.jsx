import React from "react";
import { Controller } from "react-hook-form";
import SingleSelectField from "./SingleSelectField";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function SelectWithController({
  name,
  control,
  options,
  errors,
  isRequired,
  label,
  placeholder
}) {
  const { t } = useTranslation();
  return (
    <>
      <FormControl fullWidth className="queRow">
        <FormLabel id="currency" className="formLabel">
          {label && (
            <FormLabel className="formLabel">
              {label}
              {isRequired && "*"}
            </FormLabel>
          )}
        </FormLabel>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{
            required: isRequired ? t("answer_required_msg") : isRequired,
          }}
          render={({ field }) => (
            <FormControl fullWidth className="formInputFiled">
              {placeholder && <InputLabel>{placeholder}</InputLabel>}
              <Select
                {...field}
                className="formInputFiled"
                placeholder="Please Select"
              >
                {options?.map((menu, index) => (
                  <MenuItem value={menu.name} key={index}>
                    {menu.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}
      </FormControl>
    </>
  );
}
