import { FormControl, FormLabel } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default function DatePickerWIthController({
  name,
  control,
  options,
  errors,
  isRequired,
  label,
  placeholder,
  maxDate,
  minDate,
  haveHandleChange = false,
  handleChange,
}) {
  const { t } = useTranslation();
  return (
    <FormControl fullWidth className="queRow">
      {label && (
        <FormLabel className="formLabel">
          {label}
          {isRequired && "*"}
        </FormLabel>
      )}
      <Controller
        name={name}
        defaultValue=""
        control={control}
        rules={{ required: isRequired ? t("answer_required_msg") : isRequired }}
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker
              onChange={(date) => {
                {
                  haveHandleChange &&
                    handleChange(moment(date).format("YYYY-MM-DD"));
                }
                onChange(moment(date).format("YYYY-MM-DD"));
              }}
              maxDate={maxDate}
              minDate={minDate}
              selected={value}
              showIcon
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              // isClearable
              placeholderText={placeholder}
              className="formInputFiled full-width-datepicker"
            />
          );
        }}
      />
      {/* <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{
          required: isRequired ? t("answer_required_msg") : isRequired,
        }}
        render={({ field }) => (
          <Select
            {...field}
            className="formInputFiled"
            placeholder="Please Select"
          >
            {options.map((menu) => (
              <MenuItem value={menu.value_key}>{menu.value_key}</MenuItem>
            ))}
          </Select>
        )}
      /> */}
      {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}
    </FormControl>
  );
}
