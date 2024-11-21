import { Typography } from "@mui/material";
import React from "react";

const NoDataFound = ({ title }) => {
  return <div className="p-5 w-100 text-center">
          <div className="nodata">
            <img src="/noData.svg" alt="No Data Found"/>
          </div>
          <Typography variant="h6">{title}</Typography>
        </div>;
};

export default NoDataFound;
