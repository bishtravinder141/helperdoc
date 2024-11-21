import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./modal.css"

export default function ProfileNotCompleteModal({ open }) {
  return (
    <Container maxWidth="xl">
      <Dialog open={open} disableBackdropClick className="profilePopup">
        <Box className="text-center p-5 popupInner bg-white">
          <Box><img src="/warning.svg" alt="Success Image"/></Box>
          <Typography variant="body1">Your profile is not completed</Typography>
          <Typography variant="h4">Please complete your profile</Typography>
          <DialogActions style={{ justifyContent: "center" }}>
            <Link to={"/helper/my-profile"} className="green-btn small">
              Complete Profile
            </Link>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
}
