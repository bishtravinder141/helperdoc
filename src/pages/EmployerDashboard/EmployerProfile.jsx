import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import TextFieldWithController from "../../Components/Common/FormFields/TextFieldWithController";
import { Controller, useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../Utils/Regex";
import NumberField from "../../Components/Common/FormFields/NumberField";
import RadioGroupWithController from "../../Components/Common/FormFields/RadioGroupWithController";
import { useSelector } from "react-redux";
import CountryDropdown from "../../Components/Common/FormFields/CountryDropdown";
import SubmitButton from "../../Components/Common/CommonButtons/SubmitButton";
import FileUploaderField from "../../Components/Common/FormFields/FileUploaderField";
import { toastMessage } from "../../Utils/toastMessages";
import DatePickerWIthController from "../../Components/Common/FormFields/DatePickerWIthController";
import { PhoneInput } from "react-international-phone";
import {
  getUserId,
  getUserProfile,
  updateUserProfile,
} from "../../Services/ProfileServices/ProfileService";
import moment from "moment";
import { successType } from "../../Constant/Constant";
import PhoneInputWithController from "../../Components/Common/FormFields/PhoneInputWithController";
import { handleFileUploadToS3Bucket } from "../../Utils/CommonAPIs";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import i18n from "../../i18n";

export default function EmployerProfile() {
  const { t } = useTranslation();
  const { genders } = useSelector((state) => state.common);
  const [loader, setLoader] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [years, setYears] = useState(null);
  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    getUserProfile(getUserId())
      .then((res) => {
        if (res?.data) {
          Object.entries(res?.data).map((curElem) => {
            if (curElem[0] === "profileImageUrl") setImagePreview(curElem[1]);
            if (curElem[0] === "age") {
              setYears(curElem[1]);
              const yearsAndMonths = getYearsAndMonthsFromDate(
                res?.data?.dateOfBirth
              );
              setValue(
                "age",
                `${yearsAndMonths?.years} years ${yearsAndMonths?.months} months`
              );
            }
            else{
              setValue(curElem[0], curElem[1]);
            }
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);
  const handleOnSubmit = async (data) => {
    setLoader(true);
    let fileUrl = "";
    if (profilePhoto?.name) {
      const fileUpload = await handleFileUploadToS3Bucket(profilePhoto);
      if (!fileUpload.error) {
        fileUrl = fileUpload.uploadedUrl;
      } else {
        setBtnLoader(false);
        return;
      }
    }
    const payload = {
      ...data,
      age:years,
      profileImageUrl: fileUrl ? fileUrl : null,
    };
    updateUserProfile(getUserId(), payload)
      .then((res) => toastMessage(t("profile_updated"), successType))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  const handleProfilePhotoChange = async (name, file) => {
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      toastMessage(t("img_upload_error_msg"));
    } else {
      setProfilePhoto(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const handleDateChange = (date) => {
    const yearsAndMonth = getYearsAndMonthsFromDate(date);
    setValue(
      "age",
      `${yearsAndMonth?.years} years ${yearsAndMonth?.months} months`,
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
    setYears(yearsAndMonth?.years);
  };
  const getYearsAndMonthsFromDate = (date) => {
    const years = moment().diff(date, "years");
    const months = moment().diff(date, "months") % 12;
    return { years: years, months: months };
  };
  return (
    <>
      {loader && <PageLoader />}
      <Box maxWidth="xl">
        <HelperDashboardSubHeader
          title={t("profile")}
          description={t("manage_or_update_profile")}
          progessBar={false}
        />
        <Box
          className="profileCardBox"
          border={1}
          borderRadius={8}
          borderColor="#e7e7e7"
          py={6}
          px={10}
          mb={2}
          mt={2}
        >
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Grid
              container
              spacing={2}
              alignItems="start"
              className="formDataInfo"
            >
              <Grid item xs={12} md={12}>
                <FormControl component="fieldset" className="queRow">
                  {/* <FormLabel component="legend" className="formLabel">
                    {t("upload_photo_label")}
                  </FormLabel> */}
                  <Box className="uploadPhoto employerUpload align-items-center justify-content-center">
                    <div className="imgWrap">
                      <img
                        src={imagePreview ? imagePreview : "/demo-user.png"}
                        alt="Profile"
                        style={{
                          borderRadius: "50%",
                          maxWidth: "150px",
                          maxHeight: "150px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="inputFile">
                        <FileUploaderField
                          name="profile_photo"
                          setFile={handleProfilePhotoChange}
                        />
                      </div>
                      {/* <StyledImage src="/default.png" alt="Default Image" /> */}
                    </div>
                  </Box>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldWithController
                  isRequired={true}
                  label={t("name")}
                  name={"fullName"}
                  errors={errors}
                  control={control}
                  placeholder={t("John Smith")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldWithController
                  label={t("email")}
                  name={"email"}
                  control={control}
                  isRequired={true}
                  errors={errors}
                  placeholder={t("contact@gmail.com")}
                  otherRule={{
                    pattern: {
                      value: EMAIL_REGEX,
                      message: t("valid_email_msg"),
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <NumberField
                  control={control}
                  name={"phoneNumber"}
                  errors={errors}
                  isRequired={true}
                  placeholder={"+63 986-743-2567"}
                  label={t("phone_number")}
                /> */}
                <PhoneInputWithController
                  name="phoneNumber"
                  control={control}
                  errors={errors}
                  label={t("phone_number")}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CountryDropdown
                  control={control}
                  name={"region"}
                  label={t("region_country_state")}
                  isRequired={true}
                  errors={errors}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePickerWIthController
                  name={"dateOfBirth"}
                  label={t("dob")}
                  isRequired={true}
                  control={control}
                  errors={errors}
                  maxDate={new Date().toISOString().split("T")[0]}
                  placeholder={"mm/dd/yyyy"}
                  haveHandleChange={true}
                  handleChange={handleDateChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* may be need to convert in text  field in future */}
                <NumberField
                  readOnly={true}
                  control={control}
                  name={"age"}
                  errors={errors}
                  isRequired={true}
                  placeholder={"23"}
                  label={t("Age")}
                />
                {/* <TextFieldWithController
                  readOnly={true}
                  control={control}
                  name={"age"}
                  errors={errors}
                  isRequired={true}
                  placeholder={"23"}
                  label={t("Age")}
                /> */}
              </Grid>

              <Grid item xs={12} md={12}>
                <RadioGroupWithController
                  label={t("gender")}
                  name={"gender"}
                  radioOptions={genders}
                  isRequired={true}
                  errors={errors}
                  control={control}
                />
              </Grid>
            </Grid>
            <Grid item className="d-flex justify-content-center">
              <SubmitButton
                loader={loader}
                contentText={t("save_changes")}
                disabled={loader}
              />
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
}
