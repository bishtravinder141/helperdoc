import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SearchByLocation = () => {
  const [location, setLocation] = useState("");
  const { t } = useTranslation();

  const handleSearch = ({ onSearch }) => {
    // Pass the location to the parent component or perform the search logic here
    onSearch(location);
  };
  return (
    <Grid
      className="searchByLocation"
      container
      spacing={2}
      alignItems="center"
    >
      <Grid className="searchInput">
        <TextField
          fullWidth
          label={t("city_or_postcode")}
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Grid>
      <Grid className="searchButton">
        <Button variant="contained" onClick={handleSearch}>
          {t("find_jobs")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchByLocation;
