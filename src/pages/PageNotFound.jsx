import { Typography } from "@mui/material";
import React from "react";

const PageNotFound = () => {
  return (
    <>
      <div className="p-5 w-100 text-center">
        <div className="nodata">
          <img src="/noData.svg" alt="No Data Found" />
        </div>
        <Typography variant="h5">No Page Found</Typography>
      </div>
    </>
  );
};

export default PageNotFound;
