import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Container,
  IconButton
} from "@mui/material";
import { useTranslation } from "react-i18next";
import SubmitButton from "../CommonButtons/SubmitButton";
import CloseIcon from "@mui/icons-material/Close";

const SuccessModal = ({
  open,
  handleContinue,
  buttonText = "Continue",
  text = "Your changes have been saved successfully!",
  secondButton,
  secondButtonText,
  handleSecondButton,
  btnLoader,
  heading = "success",
  icon = "/success.svg",
  showCloseIcon,
  onClose
}) => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl">
      <Dialog open={open} className="customModal">
        <Box
          className={`innerModal ${showCloseIcon ? "delModal" : ""}`}
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
          {showCloseIcon && (
            <Box className="closeModal">
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <Box sx={{ mb: 3 }} className="imguser">
            <img
              src={icon}
              alt="Success Image"
              style={{ maxWidth: "100%", marginBottom: "20px" }}
            />
          </Box>
          <Typography variant="h4">{t(heading)}</Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
            {text}
          </Typography>
          <DialogActions style={{ justifyContent: "center" }}>
            <SubmitButton
              onClickCallBack={handleContinue}
              type="button"
              contentText={buttonText}
              disabled={btnLoader}
            />
            {secondButton && (
              <SubmitButton
                onClickCallBack={handleSecondButton}
                type="button"
                contentText={secondButtonText}
                loader={btnLoader}
                disabled={btnLoader}
              />
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
};

export default SuccessModal;
