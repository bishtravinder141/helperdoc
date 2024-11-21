import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

const CheckBoxField = ({ checkBoxesValues, field }) => {
  return (
    <FormGroup className="radioCheckBtn">
      {checkBoxesValues.map((opt, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              {...field}
              checked={field.value.includes(opt.name)}
              onChange={(e) => {
                const isChecked = e.target.checked;
                field.onChange(
                  isChecked
                    ? [...field.value, opt.name]
                    : field.value.filter((value) => value !== opt.name)
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
  );
};

export default CheckBoxField;
