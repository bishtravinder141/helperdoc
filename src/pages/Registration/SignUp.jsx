import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Box,
  Container,
  Link as MuiLink,
} from "@mui/material";
import { styled } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../../Components/Common/ErrorMessage/ErrorMessage";
import CustomTextField from "../../Components/Common/InputFields/CustomTextField";
import SocialLogin from "../../Components/Common/SocialAuth/SocialLogin";
import { registerUser } from "../../Services/AuthServices/AuthService";
import { googleCaptchaID } from "../../Config/authConfig";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../Utils/Regex";
import { useTranslation } from "react-i18next";
import SubmitButton from "../../Components/Common/CommonButtons/SubmitButton";
import { toastMessage } from "../../Utils/toastMessages";
import {
  getAllSeadersData,
  setSubscriptionDetails,
} from "../../Redux/CommonSlice";
import { useDispatch } from "react-redux";
import { AGENCY_STEP, USER_ROLE } from "../../Constant/Constant";

const StyledImageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [selectCaptcha, setSelectedCaptcha] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const { pathname } = useLocation();
  const [showErrorMsg, setShowErrorMsg] = useState({
    show: false,
    msg: "",
  });
  const dispatch = useDispatch();
  const captchaRef = useRef();
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    fullName: yup.string().required(t("name_required")),
    email: yup
      .string()
      .required(t("email_required"))
      .matches(EMAIL_REGEX, t("valid_email_msg")),
    phoneNumber: yup
      .string()
      .required(t("mobile_required"))
      .min(10, t("mobile_min_msg"))
      .max(15, t("mobile_max_msg")),
    password: yup
      .string()
      .required(t("password_required"))
      .min(6, t("password_min_msg"))
      .matches(PASSWORD_REGEX, t("strong_password_msg")),
    passwordConfirmation: yup
      .string()
      .required(t("confirm_password_required"))
      .oneOf([yup.ref("password"), undefined], t("confirm_password_match")),
  });

  const {
    handleSubmit,
    watch,
    setError,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordConfirmationVisibility = () => {
    setShowPasswordConfirmation((prev) => !prev);
  };

  const onSubmit = (data) => {
    const captchaValue = captchaRef?.current?.getValue();
    if (captchaValue?.length <= 0) {
      setShowErrorMsg({ show: true, msg: t("captcha_select_msg") });
      return;
    }
    if (!selectCaptcha) {
      setShowErrorMsg({ show: true, msg: t("captcha_select_msg") });
      return;
    }
    const role = pathname.split("/")[2];
    const payload = { ...data, role };
    delete payload.passwordConfirmation;
    // dispatch(setPageLoader(true));
    setButtonLoader(true);
    registerUser(payload)
      .then(async (res) => {
        // dispatch(setPageLoader(false));
        await dispatch(getAllSeadersData());
        setButtonLoader(false);
        localStorage.setItem("token", res.data.user.accessToken);
        localStorage.setItem("refresh_token", res.data.user.refreshToken);
        localStorage.setItem("selectedRole", res.data.user.user.role);
        localStorage.setItem("userId", res.data.user.user.id);
        if (USER_ROLE.helper === role) {
          navigate("/register/helper/profile-steps/disclaimer", {
            state: { prevRoute: "/register/helper" },
          });
        } else if (USER_ROLE.employer === role) {
          dispatch(setSubscriptionDetails(false));
          navigate("/employer/dashboard");
        } else if (USER_ROLE.agency === role) {
          navigate("/agency/agency-details", {
            state: { agencyStep: AGENCY_STEP },
          });
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400 || err?.response?.status === 409) {
          setShowErrorMsg({ show: true, msg: err.response.data?.message });
        }
        if (err?.response?.data?.message) {
          toastMessage(err.response.data?.message);
        } else {
          toastMessage(t("failure_message"));
        }
        setButtonLoader(false);
      });
    // setTermsAndConditions(true);
    // Dispatch the updateFormData action
    // registerUser(data)
    // dispatch(updateFormData(data));
  };

  const handleChange = (type, value) => {
    const password = watch("password");
    const passwordConfirmation = watch("passwordConfirmation");
    if (type === "password") {
      if (value === passwordConfirmation) {
        setError("passwordConfirmation", {
          type: "manual",
          message: "", // Clear the error message
        });
      } else {
        if (passwordConfirmation.length > 0) {
          setError("passwordConfirmation", {
            type: "manual",
            message: t("confirm_password_match"),
          });
        }
      }
    }
    if (type === "passwordConfirmation") {
      if (password === value) {
        setError("passwordConfirmation", {
          type: "manual",
          message: "", // Clear the error message
        });
      }
    }
    if (showErrorMsg.show) {
      setShowErrorMsg({ show: false, msg: "" });
    }
  };

  const onChange = (value) => {
    setSelectedCaptcha(true);
    setShowErrorMsg({ show: false, msg: "" });
  };

  return (
    <>
      <Container
        className="main-outer helperSignUpForm"
        maxWidth="lg"
        sx={{ padding: "20px" }}
      >
        <Paper
          className="shadow-box"
          elevation={5}
          style={{
            padding: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={3} className="helperRegister">
            <Grid
              item
              xs={12}
              lg={6}
              md={4}
              component={StyledImageContainer}
              className="imgWrap"
            >
              <StyledImage src="/helper-signup.png" alt="HelperImage" />
            </Grid>
            <Grid className="formLoginSignup" xs={12} lg={6} md={8}>
              <Typography variant="h4" gutterBottom>
                {pathname.includes("agency") && t("agency")} {t("signup")}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} className="formDataInfo">
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      onChange={(e) => {
                        handleChange("fullName", e.target.value);
                        field.onChange(e);
                      }}
                      placeholder={
                        pathname.includes("agency")
                          ? t("agency_name")
                          : t("full_name")
                      }
                      className="formInputFiled"
                    />
                  )}
                />
                {errors?.fullName && (
                  <ErrorMessage msg={errors?.fullName?.message} />
                )}
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      onChange={(e) => {
                        handleChange("phoneNumber", e.target.value);
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        field.onChange(numericValue);
                      }}
                      placeholder={
                        pathname.includes("agency")
                          ? t("agency_number")
                          : t("phone_number")
                      }
                      type="text"
                      className="formInputFiled"
                    />
                  )}
                />
                {errors?.phoneNumber && (
                  <ErrorMessage msg={errors?.phoneNumber?.message} />
                )}
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      onChange={(e) => {
                        handleChange("email", e.target.value);
                        field.onChange(e);
                      }}
                      placeholder={
                        pathname.includes("agency")
                          ? t("agency_email")
                          : t("email")
                      }
                      type="text"
                      className="formInputFiled"
                    />
                  )}
                />
                {errors?.email && <ErrorMessage msg={errors?.email?.message} />}
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      onChange={(e) => {
                        handleChange("password", e.target.value);
                        field.onChange(e);
                      }}
                      placeholder={t("password")}
                      className="formInputFiled"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {errors?.password && (
                  <ErrorMessage msg={errors?.password?.message} />
                )}
                <Controller
                  name="passwordConfirmation"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      onChange={(e) => {
                        handleChange("passwordConfirmation", e.target.value);
                        field.onChange(e);
                      }}
                      placeholder={t("confirm_password")}
                      className="formInputFiled"
                      type={showPasswordConfirmation ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordConfirmationVisibility}
                            >
                              {showPasswordConfirmation ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {errors?.passwordConfirmation && (
                  <ErrorMessage msg={errors?.passwordConfirmation?.message} />
                )}
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={googleCaptchaID}
                  onChange={onChange}
                />
                <Typography variant="body1">{t("term_condition")}</Typography>
                {showErrorMsg.show && <ErrorMessage msg={showErrorMsg.msg} />}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <SubmitButton
                    contentText={t("signup")}
                    loader={buttonLoader}
                    disabled={showErrorMsg.show || buttonLoader}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    my: 2, // Adjust margin as needed
                  }}
                >
                  <Box
                    sx={{ width: "35%", bgcolor: "#dcdcdc", height: "1px" }}
                  />
                  <Typography
                    className="loginWith"
                    variant="body1"
                    sx={{ mx: 2 }}
                  >
                    {t("sign_up_with")}
                  </Typography>
                  <Box
                    sx={{ width: "35%", bgcolor: "#dcdcdc", height: "1px" }}
                  />
                </Box>
                <Box
                  className="socialLogin"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <SocialLogin />
                </Box>
                <Box
                  className="mt-4"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px", // Adjust the spacing as needed
                  }}
                >
                  {t("already_have_ac")}?{" "}
                  <MuiLink color="inherit" component={Link} to="/login">
                    {t("login")}
                  </MuiLink>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default SignUp;
