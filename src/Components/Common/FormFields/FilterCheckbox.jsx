import React from "react";
import { FormGroup, Checkbox, FormControlLabel } from "@mui/material";

const FilterCheckbox = ({
  handleSelectJobFilters,
  checked,
  title,
  id,
  field,
  value,
}) => {
  return (
    <div className="col-md-12 col-xl-6 col-sm-6 col-xs-6">
      {/* <FormGroup className="radioCheckBtn">
        <Checkbox
          checked={checked}
          onChange={(e) => handleSelectJobFilters(e, field, "checkbox")}
        />
        <span>{title}</span>
      </FormGroup>  */}
      <FormGroup> 
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              value={value}
              onChange={(e) => handleSelectJobFilters(e, field, "checkbox")}
            />
          }
          label={title}
        />
      </FormGroup>
    </div>
  );
};

export default FilterCheckbox;
