import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useTranslation } from "react-i18next";

const RadioGroupField = ({ radioOptions, field }) => {
  const { t } = useTranslation();
  return (
    <RadioGroup
      className="radioCheckBtn"
      {...field}
    >
      {radioOptions.map((radio) => (
        <FormControlLabel
          value={t(radio)}
          control={<Radio checkedIcon={<CheckCircleRoundedIcon />} />}
          label={t(radio)}
        />
      ))}
    </RadioGroup>
  );
};

export default RadioGroupField;
