import React from "react";
import SortBySelect from "./FormFields/SortBySelect";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const AdminHeaderSection = ({
  heading,
  sortByFilter,
  setSortByFilter,
  showFilter = true,
}) => {
  return (
    <Box className="topFilter topFilter applicantTopFilters ">
      <Grid container spacing={3} className="formDataInfo ">
        <Grid item xs={12} md={4}>
          <Typography variant="h5">
            <strong>{heading}</strong>
          </Typography>
        </Grid>
        {showFilter && (
          <Grid item xs={12} md={2}>
            <SortBySelect
              sortByFilter={sortByFilter}
              setSortByFilter={setSortByFilter}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AdminHeaderSection;
