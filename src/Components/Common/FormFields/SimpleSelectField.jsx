import { IconButton, MenuItem, Select } from "@mui/material";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function SimpleSelectField({
  MenuData,
  handleONChange,
  name,
  selected,
  viewClearIcon,
  handleClearChange,
}) {
  return (
    <Select
      className="formInputFiled"
      value={selected || ""}
      onChange={handleONChange}
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
            onClick={() => handleClearChange(name)}
          >
            <HighlightOffIcon />
          </IconButton>
        )
      }
    >
      {MenuData.map((job) => (
        <MenuItem value={job.name}>{job.name}</MenuItem>
      ))}
    </Select>
  );
}
