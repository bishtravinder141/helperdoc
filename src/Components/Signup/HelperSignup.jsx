import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ReCAPTCHA from "react-google-recaptcha";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
// import { useDispatch } from "react-redux";
// import { setRole, updateFormData } from "../../redux/actions/userActions"; // Updated import path
import { FacebookIcon } from "../Common/SocialIcons";
// import StyledGoogleLogin from "../Common/StyledGoogleLogin";
// import CustomTextField from "../Common/CustomTextField";
import { useForm, SubmitHandler } from "react-hook-form";
// import { registerUser } from "../../services/authServices";
// import { HelperFormData, RegisterUser } from "../../Models/authUserInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";
import CustomTextField from "../Common/InputFields/CustomTextField";

// const StyledRoot = styled("div")(({ theme }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(2),
// }));

const validationSchema = yup.object().shape({
  fullName: yup.string().required('Name is required'),
  role: yup.string(),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Mobile number must contain only digits")
    .min(10, "Mobile number must be at least 10 digits long")
    .max(15, "Mobile number can be at most 15 digits long"),
    password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 digits long.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/g,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
    passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), undefined],
      "Passwords and confirm password must match"
    )
    .required("Confirm Password is required"),
});

const StyledImageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

const StyledFormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledOrSignupWith = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  textAlign: "center",
}));

const HelperSignup = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  // useEffect(() => {
  //   console.log("Role received in HelperSignup:", role);
  //   // alert(`Role received in HelperSignup: ${role}`);
  //   // Dispatch the setRole action
  //   setValue("role", role)
  //   dispatch(setRole(role));
  // }, [role, dispatch]);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    termsAndConditions: false,
    role,
    workExperience: {
      workingExperience: "",
      workingLocation: "",
      employerNationality: "",
      numberOfFamilyMembers: 0,
      houseArea: 0,
      startedDate: "",
      releasedDate: "",
      currency: "",
      salary: 0,
      coHelperNumber: 0,
      isAnyLetter: false,
      experinceRemark: "",
      familyMembers: [
        {
          age: 0,
          gender: "",
          requireSpecialHelp: [],
        },
      ],
    },
  });

  // const handleInputChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  // ) => {
  //   const { name, value, type } = e.target;
  //   setFormData((prevData) => {
  //     if (type === "checkbox") {
  //       return {
  //         ...prevData,
  //         [name]: !prevData[name as keyof HelperFormData],
  //       };
  //     } else {
  //       return {
  //         ...prevData,
  //         [name]: value,
  //       };
  //     }
  //   });
  // };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("Form Data:", formData);
  //   setTermsAndConditions(true);

  //   // Dispatch the updateFormData action
  //   dispatch(updateFormData(formData));

  //   navigate("/registration_steps/step1", { state: { formData } });
  // };
  const onSubmit = (data) => {
    console.log(data);
    setTermsAndConditions(true);
    navigate("/registration_steps/step1", { state: { formData } });
    // Dispatch the updateFormData action
    // registerUser(data)
    // dispatch(updateFormData(data));
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} component={StyledImageContainer}>
            <StyledImage src="/helper-signup.png" alt="Helper Image" />
          </Grid>
          <Grid className="formLoginSignup">
            <Typography variant="h4" gutterBottom>
              {`Sign Up`}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="formDataInfo">
              <CustomTextField
                placeholder="Full Name"
                // name="fullName"
                className="formInputFiled"
                // value={formData.fullName}
                // onChange={handleInputChange}
                {...register("fullName")}
              />
              {errors?.fullName && <ErrorMessage msg={errors?.fullName?.message} />}
              <CustomTextField
                placeholder="Phone Number"
                type="number"
                // name="phoneNumber"
                className="formInputFiled"
                // value={formData.phoneNumber}
                // onChange={handleInputChange}
                {...register("phoneNumber")}
              />
              {errors?.phoneNumber && <ErrorMessage msg={errors?.phoneNumber?.message} />}
              <CustomTextField
                placeholder="Email"
                // name="email"
                type="email"
                className="formInputFiled"
                // value={formData.email}
                // onChange={handleInputChange}
                {...register("email")}
              />
              {errors?.email && <ErrorMessage msg={errors?.email?.message} />}
              <CustomTextField
                placeholder="Password"
                // name="password"
                className="formInputFiled"
                type={showPassword ? "text" : "password"}
                // value={formData.password}
                // onChange={handleInputChange}
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors?.password && <ErrorMessage msg={errors?.password?.message} />}
              <CustomTextField
                placeholder="Password Confirmation"
                // name="passwordConfirmation"
                className="formInputFiled"
                type={showPasswordConfirmation ? "text" : "password"}
                // value={formData.passwordConfirmation}
                // onChange={handleInputChange}
                {...register("passwordConfirmation")}
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
              {errors?.passwordConfirmation && <ErrorMessage msg={errors?.passwordConfirmation?.message} />}
              {/* <FormControlLabel
                control={
                  <Checkbox
                    name="termsAndConditions"
                    checked={formData.termsAndConditions}
                    onChange={handleInputChange}
                  />
                }
                label="I accept the terms and conditions"
                required
              /> */}
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
              />
              <Typography variant="body1">
                By continuing you accept our standard Terms and conditions and
                our Privacy policy.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className="green-btn"
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#55dba6",
                    color: "#fff",
                    mt: 2,
                    py: 1,
                    fontSize: "14px",
                  }}
                >
                  Sign Up
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  my: 2, // Adjust margin as needed
                }}
              >
                <Box sx={{ width: "35%", bgcolor: "#dcdcdc", height: "1px" }} />
                <Typography
                  className="loginWith"
                  variant="body1"
                  sx={{ mx: 2 }}
                >
                  Or Signup With
                </Typography>
                <Box sx={{ width: "35%", bgcolor: "#dcdcdc", height: "1px" }} />
              </Box>
              <Box
                className="socialLogin"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px", // Adjust the spacing as needed
                }}
              >
                <FacebookLogin appId="1088597931155576">
                  <FacebookIcon />
                  Log in with Facebook
                </FacebookLogin>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    navigate("/registration_steps/step1", { state: { formData } });
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  useOneTap
                />
              </Box>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HelperSignup;

function setSocialLoginResponse(response) {
  throw new Error("Function not implemented.");
}
