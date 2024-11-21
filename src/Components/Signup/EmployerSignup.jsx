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
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ReCAPTCHA from "react-google-recaptcha";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setRole, updateFormData } from "../../redux/actions/userActions"; // Updated import path
import { FacebookIcon } from "../Common/SocialIcons";
import LocationAutocomplete from "../Common/LocationAutocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomTextField from "../Common/CustomTextField";


const EmployerSignup = ({ role }) => {
  // Define state variables for form fields
  const navigate = useNavigate();
  const location = useLocation();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [dob, setDob] = useState("");
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordConfirmationVisibility = () => {
    setShowPasswordConfirmation((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role,
    dob: "",
    gender: "",
    location: "",
  });

  const handleSelectLocation = (location) => {
    setCurrentLocation(location);
  };

  const handleInputChange = (
    e
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => {
      if (type === "checkbox") {
        return {
          ...prevData,
          [name]: !prevData[name],
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    navigate("/registration_steps/step1", { state: { formData } });
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <Container maxWidth="lg">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {`Sign Up`}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Full Name"
                name="fullName"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <DatePicker
                  showIcon
                  selected={dob ? new Date(dob) : null}
                  onChange={(date) =>
                    setDob(date ? date.toISOString().split("T")[0] : "")
                  }
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  isClearable
                  className="full-width-datepicker"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                    })
                  }
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="famale">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <LocationAutocomplete onSelect={handleSelectLocation} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleInputChange}
                required
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
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password Confirmation"
                name="passwordConfirmation"
                type={showPasswordConfirmation ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.passwordConfirmation}
                onChange={handleInputChange}
                required
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
            </Grid>
          </Grid>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChange}
          />
          <Typography variant="body1">
            By continuing you accept our standard Terms and conditions and our
            Privacy policy.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
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
            <Box sx={{ width: "40%", bgcolor: "#dcdcdc", height: "1px" }} />
            <Typography variant="body1" sx={{ mx: 2 }}>
              Or Signup With
            </Typography>
            <Box sx={{ width: "40%", bgcolor: "#dcdcdc", height: "1px" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px", // Adjust the spacing as needed
            }}
          >
            <FacebookLogin
              appId="1088597931155576"
              style={{
                backgroundColor: "#FFFFFF", // Change background color to white
                color: "#4267b2", // Change text color to Facebook blue
                fontSize: "16px",
                padding: "8px 24px", // Adjust padding for better alignment
                border: "1px solid #4267b2", // Add border for better visibility
                borderRadius: "4px",
                display: "flex", // Ensure icon and text are displayed inline
                alignItems: "center", // Align icon and text vertically
                justifyContent: "center", // Center content horizontally
              }}
            >
              <FacebookIcon />
              Log in with Facebook
            </FacebookLogin>

            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EmployerSignup;
