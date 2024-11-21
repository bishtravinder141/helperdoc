// src/components/Common/Contact.tsx
import {
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TextFieldWithController from "./FormFields/TextFieldWithController";
import { EMAIL_REGEX } from "../../Utils/Regex";
import SubmitButton from "./CommonButtons/SubmitButton";
import { SendContactInfo } from "../../Services/JobsServices/JobServices";
import { toastMessage } from "../../Utils/toastMessages";
import { successType } from "../../Constant/Constant";
import { useLocation, useNavigate } from "react-router-dom";
import PageLoader from "./Loader/PageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "./SocialIcons";

const Contact = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {state} = useLocation();
  const role = localStorage.getItem("selectedRole");
  const [loader, setLoader] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBack = () => {
    if(state?.prevRoute)
    {
      navigate(state?.prevRoute)
    }
  }

  const handleOnSubmit = (data) => {
    setLoader(true);
    SendContactInfo(data)
      .then((res) => {
        toastMessage(t("contact_us_success_msg"),successType);
        navigate(`/${role}/dashboard`);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  return (
    <>
      {loader && <PageLoader />}
      <section className="contactAgency">
        <div className="container">
          <div className="d-flex align-items-start">
          <IconButton onClick = {handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <h2 className="fw-bold">Contact Us <span className="d-block subText fw-normal">Reach out to us for any query</span></h2>
          </div>
          <Box
            className="profileCardBox"
            border={1}
            borderRadius={8}
            borderColor="#e7e7e7"
            py={2}
            px={2}
            mb={2}
            mt={2}
          >
            <div className="row m-0">
              <div className="col-md-4 p-4 greenCard d-flex justify-content-between flex-column position-relative">
                  <div className="uppertouch">
                    <Typography variant="h3">Contact Information</Typography>
                    <Typography variant="body1">Fill up the form and our Team will get back to you within 24 hours.</Typography>
                    <ul className="m-0 p-0 mt-5 d-flex flex-column">
                      <li><a className="d-flex gap-2 align-items-center" href="tel:2025550146"><div className="imgCon"><img src="/contactPhone.svg" alt="Phone"/></div> 202-555-0146</a></li>
                      <li><a className="d-flex gap-2 align-items-center" href="mailto:contact@helperdoc.com"><div className="imgCon"><img src="/ContactEmail.svg" alt="Email"/></div> contact@helperdoc.com</a></li>
                      <li><a className="d-flex gap-2 align-items-center"><div className="imgCon"><img src="/ContactLocation.svg" alt="Location"/></div> 102 street 2715 Don</a></li>
                    </ul>
                  </div>
                  <div className="lowerTouch">
                    <ul className="m-0 p-0 mt-5 d-flex">
                      <li><Link><InstagramIcon/></Link></li>
                      <li><Link><FacebookIcon/></Link></li>
                      <li><Link><TwitterIcon/></Link></li>
                      <li><Link><LinkedInIcon/></Link></li>
                    </ul>
                  </div>
              </div>
              <div className="col-md-8 p-5">
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                <Grid
                  container
                  spacing={2}
                  alignItems="start"
                  className="formDataInfo"
                >
                  {/* name */}
                  <Grid item xs={12} md={12}>
                    <TextFieldWithController
                      isRequired={true}
                      name={"name"}
                      errors={errors}
                      control={control}
                      placeholder={t("your_full_name")}
                    />
                  </Grid>
                  {/* email */}
                  <Grid item xs={12} md={12}>
                    <TextFieldWithController
                      name={"email"}
                      control={control}
                      isRequired={true}
                      errors={errors}
                      placeholder={t("email")}
                      otherRule={{
                        pattern: {
                          value: EMAIL_REGEX,
                          message: t("valid_email_msg"),
                        },
                      }}
                    />
                  </Grid>
                  {/* subject */}
                  <Grid item xs={12} md={12}>
                    <TextFieldWithController
                      isRequired={true}
                      name={"subject"}
                      errors={errors}
                      control={control}
                      placeholder={t("subject")}
                    />
                  </Grid>
                  {/* message */}
                  <Grid item xs={12} md={12}>
                    <TextFieldWithController
                      isRequired={true}
                      name={"message"}
                      errors={errors}
                      multiline={true}
                      control={control}
                      placeholder={t("write_your_message")}
                    />
                  </Grid>
                </Grid>
                <Grid item className="d-flex justify-content-center">
                  <SubmitButton
                    loader={loader}
                    contentText={t("send_message")}
                    disabled={loader}
                  />
                </Grid>
              </form>
              </div>
            </div>
            
          </Box>
        </div>
      </section>
    </>
  );
};

export default Contact;
