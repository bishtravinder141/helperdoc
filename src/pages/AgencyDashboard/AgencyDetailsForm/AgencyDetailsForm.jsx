import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Box,
  Stepper,
  Step,
  StepContent,
  FormLabel,
  FormControl,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import FileUploaderField from "../../../Components/Common/FormFields/FileUploaderField";
import { useTranslation } from "react-i18next";
import CountryDropdown from "../../../Components/Common/FormFields/CountryDropdown";
import TextFieldWithController from "../../../Components/Common/FormFields/TextFieldWithController";
import SelectWithController from "../../../Components/Common/FormFields/SelectWithController";
import { getLast20Years } from "../../../Utils/commonFunctions";
import RadioGroupWithController from "../../../Components/Common/FormFields/RadioGroupWithController";
import {
  DOCUMENT_ALLOWED_TYPES,
  DOCUMENT_TYPE_ERROR_MESSAGE,
  EMPLOYEE_SIZE,
  IMAGE_ALLOWED_TYPES,
  IMAGE_TYPE_ERROR_MESSAGE,
  successType,
} from "../../../Constant/Constant";
import StepTitleWithIcon from "../../../Components/Common/StepTitleWithIcon";
import NumberField from "../../../Components/Common/FormFields/NumberField";
import { EMAIL_REGEX } from "../../../Utils/Regex";
import LocationAutocomplete from "../../../Components/Common/LocationAutocomplete";
import ErrorMessage from "../../../Components/Common/ErrorMessage/ErrorMessage";
import { handleFileUploadToS3Bucket } from "../../../Utils/CommonAPIs";
import {
  completeAgencyProfileDetail,
  getAgencyProfile,
} from "../../../Services/ProfileServices/ProfileService";
import { toastMessage } from "../../../Utils/toastMessages";
import PageLoader from "../../../Components/Common/Loader/PageLoader";
import { useNavigate } from "react-router-dom";

const AgencyDetailsForm = ({ changeStep, setPageLoader }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [previewCompanyLogo, setPreviewCompanyLogo] = useState(null);
  const [agencyLocation, setAgencyLocation] = useState({});
  const [agencyDocument, setAgencyDocument] = useState({});
  const userId = localStorage.getItem("userId");

  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setPageLoader(true);
    getAgencyProfile()
      .then((res) => {
        const response = res.data;
        if (response && Object.keys(response).length > 0) {
          setPreviewCompanyLogo(response.agencyLogoUrl);
          setCompanyLogo(response.agencyLogoUrl);
          for (const key in response) {
            if (key === "agencyContactDetails") {
              setValue("contactNumber", response[key].contactNumber);
              setValue("contactPerson", response[key].contactPerson);
              setValue("email", response[key].email);
            }
            if (key === "agencySpecification") {
              for (const subKey in response[key]) {
                if (subKey === "agencyLocation") {
                  setAgencyLocation({
                    location: response[key][subKey].location,
                    lat: response[key][subKey].lat,
                    lng: response[key][subKey].lng,
                  });
                  setValue("agencyLocation", response[key][subKey].location);
                } else {
                  setValue(subKey, response[key][subKey]);
                }
              }
              setAgencyDocument({
                businessRegistrationDocUrl:
                  response[key].businessRegistrationDocUrl,
                agencyHKIDDocumentUrl: response[key].agencyHKIDDocumentUrl,
              });
            }
          }
        }
        setPageLoader(false);
      })
      .catch((err) => {
        setPageLoader(false);
        console.log(err);
      });
  }, []);


  console.log(previewCompanyLogo,"previewlogo")
  console.log(companyLogo,"previewlogo")

  const handleProfilePhotoChange = (name, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewCompanyLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewCompanyLogo(null);
    }
    setCompanyLogo(file);
  };
  console.log(companyLogo,"company fileee")

  const handleFileUpload = (name, file) => {
    setAgencyDocument({
      ...agencyDocument,
      [name]: file,
    });
  };
  const handleLocationChange = (value, letLong) => {
    setAgencyLocation({
      location: value,
      lat: letLong.lat,
      lng: letLong.lng,
    });
    console.log(value, letLong, "letLongletLong");
  };

  const handleFileUploadField = async (uploadingFile) => {
    if (uploadingFile?.name) {
      const fileUpload = await handleFileUploadToS3Bucket(uploadingFile);
      if (!fileUpload.error) {
        return fileUpload.uploadedUrl;
      } else {
        setPageLoader(false);
        return false;
      }
    }
  };

  const steps = [
    {
      label: "agency_logo",
      icon: "/candidatePrefrenceIcon.svg",
      content: (
        <Box className="uploadPhoto employerUpload">
          <div className="imgWrap">
            <img
              src={previewCompanyLogo ? previewCompanyLogo : "/demo-user.png"}
              alt="Profile"
              style={{
                borderRadius: "50%",
                maxWidth: "150px",
                maxHeight: "150px",
                objectFit: "cover",
              }}
            />
            <div className="inputFile">
              {/* <FileUploaderField
                name="profile_photo"
                setFile={handleProfilePhotoChange}
                isSetError={true}
                setError={setError}
                clearErrors={clearErrors}
                errors={errors?.profile_photo?.message}
                errMsg={"Please upload valid file"}
                allowedTypes={[
                  "image/jpeg",
                  "image/png",
                  "image/webp",
                  "image/tiff",
                  "image/bmp",
                  "image/jpg",
                ]}
              /> */}
              <FileUploaderField
                name="profile_photo"
                setFile={handleProfilePhotoChange}
                isSetError={true}
                setError={setError}
                clearErrors={clearErrors}
                errors={errors}
                allowedTypes={IMAGE_ALLOWED_TYPES}
                errMsg={t(IMAGE_TYPE_ERROR_MESSAGE)}
                isStylesRequired={true}
              />
            </div>
          </div>
          <div>
            <span>{t("add_agency_logo")}</span>
          </div>
        </Box>
      ),
    },
    {
      label: "agency_specification",
      icon: "/logical-thinking.svg",
      content: (
        <>
          <TextFieldWithController
            control={control}
            name={"agencyName"}
            placeholder={t("agency_name_placeholder")}
            label={t("agency_name")}
            isRequired={true}
            errors={errors}
          />
          <Grid item xs={12} md={12}>
            <FormControl className="queRow LocationAutocomplete" fullWidth>
              <FormLabel
                className="workingLocation formLabel"
                id="city_and_country"
              >
                {t("agency_step2_ques1")}*
              </FormLabel>
              <Controller
                name="agencyLocation"
                control={control}
                defaultValue=""
                rules={{ required: t("location_required") }}
                render={({ field }) => (
                  <LocationAutocomplete
                    onSelect={handleLocationChange}
                    field={field}
                    setValue={setValue}
                  />
                )}
              />
              {errors.agencyLocation && (
                <ErrorMessage msg={errors.agencyLocation.message} />
              )}
            </FormControl>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CountryDropdown
                control={control}
                name={"agencyCountry"}
                label={t("agency_step2_ques1")}
                isRequired={true}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldWithController
                control={control}
                name={"agencyCity"}
                placeholder={t("city_placeholder")}
                label={t("city")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextFieldWithController
                control={control}
                name={"agencyState"}
                placeholder={t("state_placeholder")}
                label={t("state")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldWithController
                control={control}
                name={"agencyPincode"}
                placeholder={t("pin_placeholder")}
                label={t("pin_code")}
              />
            </Grid>
          </Grid>
          <SelectWithController
            control={control}
            name={"agencyEstablishmentYear"}
            options={getLast20Years()}
            errors={errors}
            isRequired={true}
            label={t("establishment_year")}
            placeholder={t("please_select")}
          />

          <RadioGroupWithController
            label={t("agency_size")}
            name={"agencySize"}
            radioOptions={EMPLOYEE_SIZE}
            control={control}
            errors={errors}
          />
          <TextFieldWithController
            control={control}
            name={"agencyWebsiteUrl"}
            placeholder={t("website_placeholder")}
            label={t("website_address")}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextFieldWithController
                control={control}
                name={"businessRegistrationNumber"}
                placeholder={t("business_registration_placeholder")}
                label={t("business_registration")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="FileUploadtion">
                <div className="inputFile">
                  <FileUploaderField
                    name={"businessRegistrationDocUrl"}
                    control={control}
                    setFile={handleFileUpload}
                    setError={setError}
                    errors={errors}
                    clearErrors={clearErrors}
                    isSetError={true}
                    allowedTypes={DOCUMENT_ALLOWED_TYPES}
                    errMsg={t(DOCUMENT_TYPE_ERROR_MESSAGE)}
                  />
                </div>
              </div>
            </Grid>
            <p>
              {typeof agencyDocument?.businessRegistrationDocUrl === "string"
                ? agencyDocument?.businessRegistrationDocUrl
                : agencyDocument?.businessRegistrationDocUrl?.name}
            </p>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextFieldWithController
                control={control}
                name={"agencyHKID"}
                placeholder={t("hkid_placeholder")}
                label={t("agency_hkid")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="FileUploadtion">
                <div className="inputFile">
                  <FileUploaderField
                    name={"agencyHKIDDocumentUrl"}
                    control={control}
                    setFile={handleFileUpload}
                    setError={setError}
                    errors={errors}
                    clearErrors={clearErrors}
                    isSetError={true}
                    allowedTypes={DOCUMENT_ALLOWED_TYPES}
                    errMsg={t(DOCUMENT_TYPE_ERROR_MESSAGE)}
                  />
                </div>
              </div>
            </Grid>
            <p>
              {typeof agencyDocument?.agencyHKIDDocumentUrl === "string"
                ? agencyDocument.agencyHKIDDocumentUrl
                : agencyDocument.agencyHKIDDocumentUrl?.name}
            </p>
          </Grid>

          <TextFieldWithController
            control={control}
            name={"agencyDescription"}
            placeholder={t("agency_description_placeholder")}
            label={t("agency_description")}
            multiline={true}
          />
        </>
      ),
    },
    {
      label: "contact_Person",
      icon: "/buildingIcon.svg",
      content: (
        <>
          <TextFieldWithController
            control={control}
            name={"contactPerson"}
            placeholder={t("person_name_placeholder")}
            label={t("person_name")}
          />
          <NumberField
            control={control}
            name={"contactNumber"}
            placeholder={t("contact_details_placeholder")}
            label={t("contact_number")}
          />
          <TextFieldWithController
            control={control}
            name={"email"}
            placeholder={t("enter_your_email")}
            label={t("email")}
            otherRule={{
              pattern: {
                value: EMAIL_REGEX,
                message: t("valid_email_msg"),
              },
            }}
          />
        </>
      ),
    },
  ];

  const handleSubmitAgencyDetails = async (data) => {
    if (activeStep < 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setPageLoader(true);
      let agencySpecification = {};
      let agencyContactDetails = {};
      let payload = {};
      for (const key in data) {
        if (["contactPerson", "contactNumber", "email"].includes(key)) {
          agencyContactDetails = {
            ...agencyContactDetails,
            [key]: data[key],
          };
          // agencySpecification = {
          //   ...agencySpecification,
          //   [key]: data[key],
          // };
        }
        // else if (["contactPerson", "contactNumber", "email"].includes(key)) {
        //   agencyContactDetails = {
        //     ...agencyContactDetails,
        //     [key]: data[key],
        //   };
        // }
        else {
          agencySpecification[key] = data[key];
        }
      }

      if (companyLogo?.name) {
        const companyLogoUrl = await handleFileUploadField(companyLogo);
        if (companyLogoUrl) {
          payload["agencyLogoUrl"] = companyLogoUrl;
        }
      }
      if (typeof companyLogo === "string" && companyLogo?.length > 0) {
        payload["agencyLogoUrl"] = companyLogo;
      }
      if (agencyDocument?.agencyHKIDDocumentUrl?.name) {
        const agencyHKIDDocumentUrl = await handleFileUploadField(
          agencyDocument.agencyHKIDDocumentUrl
        );
        if (agencyHKIDDocumentUrl) {
          agencySpecification["agencyHKIDDocumentUrl"] = agencyHKIDDocumentUrl;
        }
      }
      if (  
        typeof agencyDocument?.agencyHKIDDocumentUrl === "string" &&
        agencyDocument?.agencyHKIDDocumentUrl?.length > 0
      ) {
        payload["agencyHKIDDocumentUrl"] = agencyDocument?.agencyHKIDDocumentUrl;
      }
      if (agencyDocument?.businessRegistrationDocUrl?.name) {
        const businessRegistrationDocUrl = await handleFileUploadField(
          agencyDocument.businessRegistrationDocUrl
        );
        if (businessRegistrationDocUrl) {
          agencySpecification["businessRegistrationDocUrl"] =
            businessRegistrationDocUrl;
        }
      }
      if (
        typeof agencyDocument?.businessRegistrationDocUrl === "string" &&
        agencyDocument?.businessRegistrationDocUrl?.length > 0
      ) {
        payload["businessRegistrationDocUrl"] = agencyDocument?.businessRegistrationDocUrl;
      }
      payload["userId"] = userId;
      payload["agencySpecification"] = agencySpecification;
      payload["agencyContactDetails"] = agencyContactDetails;
      payload["agencySpecification"].agencyLocation = { ...agencyLocation };
      completeAgencyProfileDetail(payload)
        .then((res) => {
          toastMessage(t("profile_updated"), successType);
          // changeStep(2);
          navigate("/agency/dashboard");
          setPageLoader(false);
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            toastMessage(err.response.data.message);
          } else {
            toastMessage(t("failure_message"));
          }
          setPageLoader(false);
          console.log(err, "error!!!");
        });
    }
  };

  const handleChangeTab = (step) => {
    if (step < activeStep) {
      setActiveStep(step);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitAgencyDetails)}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepTitleWithIcon
                label={t(step.label)}
                isActive={index === activeStep}
                isRoleButton={index < activeStep}
                step={index}
                handleOnTabChange={handleChangeTab}
                icon={step.icon}
              />
              <StepContent className="stepperEmployer">
                {step.content}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      className="arrowButton"
                      variant="contained"
                      type="submit"
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {t("next")}
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </form>
    </>
  );
};

export default AgencyDetailsForm;
