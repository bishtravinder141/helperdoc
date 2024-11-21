import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  const [profileComplete, setProfileComplete] = useState(false);

  const handleSubmit = () => {
    const isProfileComplete = checkProfileCompleteness();

    if (isProfileComplete) {
      navigate("/dashboard");
    } else {
      navigate("/helper_profile_complete");
    }
  };

  const checkProfileCompleteness = () => {
    // Add your logic to determine if the profile is complete
    return profileComplete;
  };

  return (
    <Container maxWidth="xl" className="Thankyouotp">
      <Box
        className="helperdocWelcome"
        sx={{
          textAlign: "center",
          mt: 8,
          mx: "auto",
          maxWidth: 600,
          padding: 3,
          borderRadius: 8,
          boxShadow: 2,
          backgroundColor: "#fff",
          pb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <img
            src="/thankyou.svg"
            alt="Helper Image"
            style={{ maxWidth: "100%", marginBottom: "20px" }}
          />
        </Box>
        <Typography variant="h4">Welcome to HelperDoc!</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <span>Thank you for your registration!</span> Please enter the
          validation code that was emailed to you to activate your account.
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          {[...Array(6)].map((_, index) => (
            <Box key={index} sx={{ mx: 1 }}>
              <TextField
                id={`otp-${index}`}
                variant="outlined"
                inputProps={{ maxLength: 1 }}
                style={{ width: "40px", textAlign: "center" }}
              />
            </Box>
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 3 }}
        >
          Continue
        </Button>
        <a href="#">I did not receive a code</a>
      </Box>
    </Container>
  );
};

export default ThankYou;
