import { Box, FormControl, FormLabel, Grid } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Autocomplete from "react-google-autocomplete";
import { googleSearchPlaceKey } from "../../../Config/authConfig";
import SimpleSelectField from "../FormFields/SimpleSelectField";
import { useSelector } from "react-redux";

export default function HeaderFielter({ handleChange, selected }) {
  const [searchTimmer, setSearchTimmer] = useState();
  const { t } = useTranslation();

  const { jobTypes, sortBy } = useSelector((state) => state.common);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    handleChange({ ...selected, [name]: value });
  };

  const handleClearChange = (name) => {
    handleChange({ ...selected, [name]: "" });
  };

  const handleSelectLocation = (location) => {
    handleChange({ ...selected, location: location });
  };

  const onLocationChange = (value) => {
    clearTimeout(searchTimmer);
    const timer = setTimeout(() => {
      handleChange({ ...selected, location: value });
    }, 4000);
    setSearchTimmer(timer);
  };

  return (
    <Box className="topFilter">
      <Grid container spacing={3} className="formDataInfo">
        <Grid item xs={12} md={4}>
          <FormControl fullWidth className="queRow LocationAutocomplete">
            <FormLabel className="formLabel" id="location">
              {t("location")}
            </FormLabel>
            <Autocomplete
              apiKey={googleSearchPlaceKey}
              onPlaceSelected={(place) =>
                handleSelectLocation(place.formatted_address)
              }
              // value={selected.location}
              onChange={(event) => onLocationChange(event.target.value)}
              types={["(regions)"]}
              placeholder={t("current_location")}
              debounce={2000}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel" id="employeementType">
              {t("type_of_employment")}
            </FormLabel>
            <SimpleSelectField
              MenuData={jobTypes}
              name={"empType"}
              handleONChange={handleOnChange}
              selected={selected.empType}
              viewClearIcon={true}
              handleClearChange={handleClearChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel" id="sortby">
              {t("sort_by")}
            </FormLabel>
            <SimpleSelectField
              MenuData={sortBy}
              name={"sortBy"}
              handleONChange={handleOnChange}
              selected={selected.sortBy}
              viewClearIcon={true}
              handleClearChange={handleClearChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
