import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function SimpleCheckboxWithController({ label, control, name }) {
  return (
    <FormGroup>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label={label} />
        )}
      />
    </FormGroup>
  );
}
