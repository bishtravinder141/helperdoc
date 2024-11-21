import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import SelectWithController from "../../Common/FormFields/SelectWithController";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileUploaderField from "../../Common/FormFields/FileUploaderField";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { MAJOR_STUDY } from "../Constant";
import { useFieldArray } from "react-hook-form";
import ErrorMessage from "../../Common/ErrorMessage/ErrorMessage";
import {
  DOCUMENT_ALLOWED_TYPES,
  DOCUMENT_TYPE_ERROR_MESSAGE,
} from "../../../Constant/Constant";
import { useTranslation } from "react-i18next";

export default function Step3AboutEducationForm({
  control,
  errors,
  setUploadFilesDetails,
  uploadFilesDetails,
  setError,
  setValue,
  clearErrors,
  otherLanguages,
  isMyProfile = false,
}) {
  const { t } = useTranslation();
  const { educationLevel, nativeLanguages, languageLevel, certificates } =
    useSelector((state) => state.common);
  const STEP_3_ABOUT_EDUCATION_QUESTIONS = [
    {
      name: isMyProfile ? "step2_education_level" : "level",
      // name: "level",
      label: "Education Level",
      options: educationLevel,
      isRequired: true,
    },
    {
      name: isMyProfile ? "step2_education_major" : "major",
      // name: "major",
      label: "What is your study major",
      options: MAJOR_STUDY,
      isRequired: true,
    },
    {
      name: isMyProfile ? "step2_education_languages" : "languages",
      // name: "languages",
      label: "Native Language",
      options: nativeLanguages,
      isRequired: true,
    },
  ];
  const { fields, append, remove } = useFieldArray({
    control,
    name: "otherLanguages",
  });
  const getCertificateListing = () => {
    // const tempCertificates = [...certificates];
    const tempCertificates = JSON.parse(JSON.stringify(certificates));
    tempCertificates.forEach((item) => {
      const label = item.name.replace(/\s+/g, ""); // Remove spaces from name
      item.label = label.charAt(0).toLowerCase() + label.slice(1); // Make first letter lowercase
    });
    return tempCertificates;
  };
  const handleFileUpload = (uploadFile, file) => {
    setUploadFilesDetails({
      ...uploadFilesDetails,
      [uploadFile]: {
        ...uploadFilesDetails[uploadFile],
        docFile: file,
        url: file,
      },
    });
  };

  // Event handlers for file uploads
  const handleCheckboxChange = (checkedFile, e) => {
    setUploadFilesDetails({
      ...uploadFilesDetails,
      [checkedFile]: {
        ...uploadFilesDetails[checkedFile],
        haveTheDoc: e.target.checked,
      },
    });
    // setState(e.target.checked);
  };
  const handleAppend = () => {
    const index = otherLanguages.findIndex(
      (curElem) => curElem.level === "" || curElem.language === ""
    );
    //if index value is less than 0 (.i.e -1) means no field is empty
    if (index < 0) {
      append({ language: "", level: "" });
    }
  };
  return (
    <>
      <>
        {STEP_3_ABOUT_EDUCATION_QUESTIONS?.map(
          ({ name, options, isRequired, label }, idx) => (
            <SelectWithController
              key={idx}
              control={control}
              name={name}
              options={options}
              label={label}
              isRequired={isRequired}
              errors={errors}
            />
          )
        )}
        <FormControl>
          <FormLabel className="formLabel" id="religion">
            {t("other_spoken_languages")}
          </FormLabel>
          <Button
            variant="contained"
            className="languageBtn"
            onClick={handleAppend}
          >
            {t("add_language")}
          </Button>
        </FormControl>

        {fields?.map((field, idx) => (
          <Fragment key={field.id}>
            <SelectWithController
              control={control}
              name={`otherLanguages.${idx}.language`}
              options={nativeLanguages}
              label={t("other_spoken_languages")}
              isRequired={true}
              errors={errors}
            />
            {errors.otherLanguages?.[idx]?.language && (
              <ErrorMessage
                msg={errors?.otherLanguages?.[idx]?.language?.message}
              />
            )}
            <SelectWithController
              control={control}
              name={`otherLanguages.${idx}.level`}
              options={languageLevel}
              label={"Level"}
              isRequired={true}
              errors={errors}
            />
            {errors?.otherLanguages?.[idx]?.level && (
              <ErrorMessage msg={errors.otherLanguages?.[idx].level.message} />
            )}
            <Button
              variant="contained"
              className="delBtn"
              onClick={() => {
                remove(idx);
              }}
            >
              <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
              {t("delete")}
            </Button>
          </Fragment>
        ))}

        {getCertificateListing().map((doc, indx) => (
          <Grid
            container
            className="queRow certificate UploadFileCustom"
            key={indx}
          >
            <Grid className="certificateCheck">
              <div className="FileUploadtion">
                <FormGroup className="radioCheckBtn">
                  <FormControlLabel
                    control={
                      <input
                        type="checkbox"
                        checked={uploadFilesDetails[doc.label]?.haveTheDoc}
                        onChange={(e) => handleCheckboxChange(doc.label, e)}
                      />
                    }
                    label={doc.name}
                  />
                </FormGroup>
                <div className="inputFile">
                  <FileUploaderField
                    name={doc.label}
                    control={control}
                    setError={setError}
                    clearErrors={clearErrors}
                    allowedTypes={DOCUMENT_ALLOWED_TYPES}
                    errMsg={t(DOCUMENT_TYPE_ERROR_MESSAGE)}
                    errors={errors}
                    isSetError={true}
                    setFile={handleFileUpload}
                    disable={!uploadFilesDetails[doc.label]?.haveTheDoc}
                  />
                </div>
              </div>
              {uploadFilesDetails[doc.label]?.docFile ? (
                <p>{uploadFilesDetails[doc.label]?.docFile?.name}</p>
              ) : (
                uploadFilesDetails[doc.label]?.url && (
                  <p>{uploadFilesDetails[doc.label]?.url}</p>
                )
              )}
            </Grid>
          </Grid>
        ))}
      </>
    </>
  );
}
