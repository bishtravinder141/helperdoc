import { MenuItem, Select } from "@mui/material";
import React from "react";

const SingleSelectField = ({ field, selectMenu }) => {
  return (
    <Select {...field} className="formInputFiled" placeholder="Please Select">
      {selectMenu.map((menu) => (
        <MenuItem value={menu.value_key}>{menu.value_key}</MenuItem>
      ))}
    </Select>
  );
};

export default SingleSelectField;
