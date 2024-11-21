import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CheckBoxField from "./CheckBoxField";

export default function CheckBoxFieldWithController({
  label,
  name,
  control,
  isRequired,
  errors,
  checkBoxesOptions,
}) {
  const { t } = useTranslation();
  return (
    <>
      <FormGroup>
        {label && (
          <FormLabel className="formLabel">
            {label}
            {isRequired && "*"}
          </FormLabel>
        )}
        <RadioGroup className="radioCheckBtn">
          <Controller
            name={name}
            control={control}
            defaultValue={[]}
            rules={{
              required: isRequired ? t("answer_required_msg") : isRequired,
            }}
            render={({ field }) => (
              <FormGroup className="radioCheckBtn">
                {checkBoxesOptions.map((opt) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value.includes(opt.value)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          onChange(
                            isChecked
                              ? [...field.value, opt.value]
                              : field.value.filter(
                                  (value) => value !== opt.value
                                )
                          );
                        }}
                        name={opt.name}
                        value={opt.name}
                      />
                    }
                    label={opt.name}
                  />
                ))}
              </FormGroup>
            )}
          />

          {errors && errors[name] && (
            <ErrorMessage msg={errors[name].message} />
          )}
        </RadioGroup>
      </FormGroup>
    </>
  );
}
