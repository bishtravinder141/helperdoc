import { FormControl, FormLabel } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Controller } from "react-hook-form";
import { MARKS, MIN_DISTANCE } from "../../../Constant/Constant";
import { useTranslation } from "react-i18next";

export default function SliderFieldWithController({
  multiSlide = false,
  defaultValue = [0, 28],
  label,
  isRequired,
  name,
  control,
  setValue,
  options,
  errors,
  min,
  max,
  marks,
  selectedRange,
}) {
  const { t } = useTranslation();
  const handleOnChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], [1] - MIN_DISTANCE), selectedRange[1]]);
    } else {
      setValue([
        selectedRange[0],
        Math.max(newValue[1], selectedRange[0] + MIN_DISTANCE),
      ]);
    }
  };
  return (
    <>
      <FormControl className="queRow LocationAutocomplete" fullWidth>
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
          defaultValue={[0, 18]}
          rules={{ required: t("answer_required_msg") }}
          render={({ field }) => (
            <>
              {/* {multiSlide ? ( */}
                <Slider
                  {...field}
                  getAriaLabel={() => "Minimum distance"}
                  valueLabelDisplay="auto"
                  getAriaValueText={(value) => value}
                  disableSwap
                  aria-labelledby="slider-label"
                //   onChange={handleOnChange}
                min={0}
                max={40}
                //   marks={marks}
                />
              {/* ) : (
                <Slider
                  {...field}
                  aria-labelledby="discrete-slider"
                  step={25}
                  valueLabelDisplay="off"
                  marks={MARKS}
                  min={0}
                  max={100}
                />
              )} */}
            </>
          )}
        />
        {errors.jobStartDateFlexibility && (
          <ErrorMessage msg={errors.jobStartDateFlexibility?.message} />
        )}
      </FormControl>

      {/* <FormControl className="queRow LocationAutocomplete" fullWidth>
        <FormLabel className="formLabel" id="city_and_country">
          {t("job_post_question_10")} *
        </FormLabel>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={(value) => value}
          disableSwap
          aria-labelledby="slider-label"
          min={0}
          max={40}
          marks={[
            { value: 0, label: "0" },
            { value: 40, label: "40" },
          ]}
        />
      </FormControl> */}
    </>
  );
}
