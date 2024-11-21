import { Button } from "@mui/material";
import React from "react";

const ArrowButton = ({ title, onClick }) => {
  return (
    <Button color="primary" className="arrowButton" onClick={onClick}>
      {title}
    </Button>
  );
};

export default ArrowButton;
