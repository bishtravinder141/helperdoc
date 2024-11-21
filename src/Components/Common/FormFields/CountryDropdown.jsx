import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useSelector } from "react-redux";


const CountryDropdown = ({ label, name, control, isRequired, errors }) => {
  const { t } = useTranslation();
  const { countriesList } = useSelector((state) => state.common);
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
          type="text"
          rules={{
            required: isRequired ? t("answer_required_msg") : isRequired,
          }}
          defaultValue={""}
          render={({ field }) => (
            <FormControl fullWidth className="formInputFiled">
              <InputLabel>{t("select_country")}</InputLabel>
              <Select
                {...field}
                defaultValue={[]}
                renderValue={(selected) => selected}
              >
                {countriesList?.length > 0 &&
                  countriesList.map((country) => (
                    <MenuItem key={country.name} value={country.name}>
                      {country.name}
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
};

export default CountryDropdown;
