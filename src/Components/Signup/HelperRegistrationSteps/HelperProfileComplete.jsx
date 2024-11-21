import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Container,
  LinearProgress,
  Divider,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
// import SuccessModal from "../../Common/SuccessModal";
import ProgressBar from "@ramonak/react-progress-bar";
import HelperUserDetails from "./HelperUserDetails";

const TitleWrapper = styled("div")({
  textAlign: "center",
  marginTop: "0",
  color: "white",
});

const HeaderBar = styled("div")({
  backgroundColor: "#0a6259",
  padding: "10px 0",
  marginBottom: "20px",
});

const CompleteProfileSection = styled("div")({
  textAlign: "center",
  marginTop: "20px",
  marginBottom: "20px",
});

const HelperProfileComplete = ({
  formData,
  setFormData,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleViewPublicProfile = () => {
    navigate("/helper_public_profile", { state: location.state });
  };
  return (
    <>
      <HeaderBar>
        <TitleWrapper>
          <Typography variant="h4">Complete your Profile</Typography>
        </TitleWrapper>
      </HeaderBar>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Complete your Profile</Typography>
            <Typography variant="body1">
              Your profile is complete. Click below to view your public profile.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleViewPublicProfile}
              sx={{ mt: 2, mb: 2 }}
            >
              View Public Profile
            </Button>
            <ProgressBar completed={80} bgColor="#0a6259" />
            <Typography variant="body1">
              80% of your profile is complete {">"} Get Verified +20%
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h5">Personal Details</Typography>
        <Typography variant="body1">
          Your profile is complete. Click below to view your public profile.
        </Typography>
        <Box border={1} borderRadius={8} borderColor="grey.300" p={3} mb={2}>
          <HelperUserDetails />
        </Box>
      </Container>
    </>
  );
};

export default HelperProfileComplete;
