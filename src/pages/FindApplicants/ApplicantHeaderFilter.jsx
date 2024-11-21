import { FormControl, FormLabel, Grid, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SimpleSelectField from "../../Components/Common/FormFields/SimpleSelectField";
import { useTranslation } from "react-i18next";
import FilterSelect from "../../Components/Common/FormFields/FilterSelect";
import { useSelector } from "react-redux";

const ApplicantHeaderFilter = ({
  selectedFilters,
  handleClearChange,
  handleSelectJobFilters,
  isFeatureJob = false,
}) => {
  useEffect(() => {
    if (!isFeatureJob) {
      if (selectedFilters.fullName.length === 0) {
        setText("");
      }
    }
  }, [selectedFilters]);
  const { t } = useTranslation();
  const [text, setText] = useState("");
  let timerId;
  const { sortBy } = useSelector((state) => state.common);
  const handleName = (e) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      handleSelectJobFilters(e, "fullName");
    }, 1000);
  };
  return (
    <Box className="topFilter applicantTopFilters">
      <Grid container spacing={3} className="formDataInfo">
        {!isFeatureJob && (
          <Grid item xs={12} md={4}>
            <FormControl fullWidth className="queRow LocationAutocomplete">
              <TextField
                onChange={(e) => {
                  handleName(e);
                  // setText(e.target.value);
                }}
                className="formInputFiled"
                // value={text}
                placeholder={t("enter_name")}
                fullWidth
                rows={4}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12} md={2}>
          <FilterSelect
            MenuData={sortBy}
            selected={selectedFilters.sortBy}
            viewClearIcon={true}
            handleONChange={handleSelectJobFilters}
            handleClearChange={handleClearChange}
            field="sortBy"
            placeholder={t("sort_by")}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicantHeaderFilter;
