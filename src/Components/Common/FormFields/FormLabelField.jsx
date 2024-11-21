import { FormLabel } from "@mui/material";
import React from "react";

export default function FormLabelField({ label, isRequired }) {
  return (
    <FormLabel className="formLabel">
      <FormLabel className="formLabel">
        {label}
        {isRequired && "*"}
      </FormLabel>
    </FormLabel>
  );
}
