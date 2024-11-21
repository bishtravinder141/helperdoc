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
} from "@mui/material";
import { adminWhatsappNumber } from "../../../Config/authConfig";
import { useNavigate } from "react-router-dom"

const ThankyouModal = ({
  showModal,
  toggleModal,
  handleDelete,
  modalDetail,
}) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Dialog open={showModal} className="customModal">
        <Box
          className="innerModal"
          sx={{
            textAlign: "center",
            mt: 8,
            mx: "auto",
            maxWidth: 500,
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
          <div className="imgWrap">
            <img
              src="/thankyou.svg"
              className="m-auto mb-4"
              alt="Helper Image"
            />
          </div>
          <h2>Thank you for Registering</h2>
          <p>
            To Activate your account please send this verification code{" "}
            <b>{modalDetail.otp}</b> on our Whatsapp.
          </p>
          <a
            href={`https://wa.me/${adminWhatsappNumber}?text=${modalDetail?.otp}`}
            target="_blank"
            className="buttonThanks"
          >
            <img
              src="/whatsappWhite.svg"
              className="me-4"
              alt="Whatsapp Image"
            />{" "}
            Whatsapp Now
          </a>
          <p>
            Or Send us code at <span>{adminWhatsappNumber}</span>
          </p>
          <Box style={{ display: "flex" }}>
            <Button
              variant="contained"
              className=" customPRofilebtn"
              color="error"
              onClick={() => navigate(`/helper/job-dashboard`)}
            >
              Back to Dashboard
            </Button>
            <Button
              className="customPRofilebtn "
              variant="contained"
              color="primary"
              onClick={() => navigate("/helper/profile-preview")}
            >
              Preview Profile
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default ThankyouModal;
