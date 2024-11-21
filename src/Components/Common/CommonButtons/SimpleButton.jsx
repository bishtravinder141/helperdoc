import { Button } from "@mui/material";
import React from "react";
import './CommonButtons.css';

const SimpleButton = ({ title, onClick }) => {
  return (
    <Button color="inherit" className="simple-btn" onClick={onClick}>
      {title}
    </Button>
  );
};

export default SimpleButton;
