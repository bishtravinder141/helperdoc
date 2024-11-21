import {
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React, { useState } from "react";

const FilterSelect = ({
  MenuData,
  placeholder = "",
  handleONChange,
  name,
  selected,
  viewClearIcon,
  handleClearChange,
  field,
}) => {
  return (
    <FormControl fullWidth className="formInputFiled filterSort">
      {placeholder && <InputLabel>{placeholder}</InputLabel>}
      <Select
        className="formInputFiled filterSelect filterApplicantOp"
        placeholder={placeholder}
        value={selected || ""}
        onChange={(e) => {
          handleONChange(e, field, "select");
        }}
        name={name}
        sx={{
          "& .MuiSelect-iconOutlined": {
            display: viewClearIcon && selected.length > 0 ? "none" : "",
          },
          "&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
        }}
        endAdornment={
          viewClearIcon &&
          selected.length > 0 && (
            <IconButton
              sx={{ visibility: "visible" }}
              onClick={() => handleClearChange(field)}
            >
              <HighlightOffIcon />
            </IconButton>
          )
        }
      >
        {MenuData &&
          MenuData?.map((job, index) => (
            <MenuItem key={index} value={job.name}>
              {job.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
