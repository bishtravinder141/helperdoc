import { Button } from "@mui/material";
import React from "react";
import ButtonLoader from "../Loader/ButtonLoader";

const SubmitButton = ({
  contentText,
  type = "submit",
  loader,
  disabled,
  onClickCallBack,
}) => {
  return (
    <Button
      className="green-btn"
      type={type}
      variant="contained"
      disabled={disabled}
      {...(type !== "submit" && { onClick: onClickCallBack })}
      sx={{
        backgroundColor: "#55dba6",
        color: "#fff",
        mt: 2,
        py: 1,
        fontSize: "14px",
      }}
    >
      {loader && <ButtonLoader />}
      {contentText}
    </Button>
  );
};

export default SubmitButton;
