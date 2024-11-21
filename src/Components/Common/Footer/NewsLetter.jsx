import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FadeLoader } from "react-spinners";

const override = {
  display: "block",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9000, // Set a higher z-index value
};

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!isValidEmail(email)) {
      setModalMessage(t("valid_email_msg"));
      setOpenModal(true);
      return;
    }

    setLoading(true);

    try {
      // Make a request to your backend route for newsletter subscription
      const response = await fetch(
        "http://localhost:5000/api/newsletter/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        setModalMessage(result.message);
      } else {
        setModalMessage(`Error: ${result.error}`);
      }

      setOpenModal(true);
    } catch (error) {
      console.error("Error subscribing:", error);
      setModalMessage("An error occurred while subscribing.");
      setOpenModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEmail("");
  };
  return (
    <Grid className="newsletterForm">
      <TextField
        fullWidth
        label={t("enter_your_email")}
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubscribe}>
        Subscribe
      </Button>

      <FadeLoader
        color="#36d7b7"
        loading={loading}
        cssOverride={override}
        height={10}
      />

      
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            width: 400,
            bgcolor: "#ffff",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">{modalMessage}</Typography>
          <Button onClick={handleCloseModal}>{t("close")}</Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default NewsLetter;
