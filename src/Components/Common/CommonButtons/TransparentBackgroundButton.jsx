import { Button } from "@mui/material";
import React from "react";

const TransparentBackgroundButton = ({ title, onClick }) => {
  return (
    <Button color="inherit" className="transparent-btn" onClick={onClick}>
      {title}
    </Button>
  );
};

export default TransparentBackgroundButton;
