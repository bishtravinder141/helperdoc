import React from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useSelector } from "react-redux";

const SortBySelect = ({ sortByFilter, setSortByFilter }) => {
  const { t } = useTranslation();
  const { sortBy } = useSelector((state) => state.common);
  return (
    <div>
      {" "}
      <FormControl fullWidth className="formInputFiled filterSort">
        <FormLabel className="formLabel">{t("sort_by")}</FormLabel>
        <Select
          className="formInputFiled"
          value={sortByFilter}
          onChange={(e) => setSortByFilter(e.target.value)}
          sx={{
            "& .MuiSelect-iconOutlined": {},
            "&.Mui-focused .MuiIconButton-root": {
              color: "primary.main",
            },
          }}
          //   endAdornment={
          //     sortByFilter.length ? (
          //       <IconButton
          //         sx={{ visibility: "visible" }}
          //         onClick={() => setSortByFilter("")}
          //       >
          //         <HighlightOffIcon />
          //       </IconButton>
          //     ) : (
          //       ""
          //     )
          //   }
        >
          {sortBy.map((opt) => (
            <MenuItem value={opt.name}>{opt.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SortBySelect;
