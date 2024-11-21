import React from "react";
import DocumnetIcon from "../../../Assets/SVGIcons/DocumentIcon";
import { Controller } from "react-hook-form";
import { Input } from "@mui/material";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function FileUploaderField({
  name,
  errors,
  isStylesRequired = false,
  setFile,
  disable = false,
  isSetError = false,
  setError,
  errMsg,
  allowedTypes,
  clearErrors,
}) {
  const handleUploadedFile = (e) => {
    if (!e?.target?.files || e?.target?.files?.length === 0) {
      return;
    }
    const filePath = e.target.files[0];
    if (isSetError) {
      if (filePath && !allowedTypes.includes(filePath.type)) {
        setError(name, {
          type: "manual",
          message: errMsg,
        });
        setFile(e.target.name,null)
        return;
      } else {
        clearErrors(name);
      }
    }
    const file = e.target.files[0];
    setFile(e.target.name, file);
  };
  return (
    <>
      <>
        <DocumnetIcon />
        <Input
          name={name}
          disabled={disable}
          type="file"
          onChange={handleUploadedFile}
        />
      </>
      {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}{" "}
    </>
  );
}
