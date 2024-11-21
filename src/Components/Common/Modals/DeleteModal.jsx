import React from "react";
import { Dialog, Button, Typography, Box, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import DeleteBin from "../../../Assets/SVGIcons/DeleteBin";

const DeleteModal = ({ showModal, toggleModal, handleDelete, msg }) => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl">
      <Dialog open={showModal} className="customModal DeleteModal">
        <Box
          className="innerModal"
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
          <DeleteBin />

          <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
            {msg}
          </Typography>
          <Box style={{ display: "flex" }}>
            <Button
              onClick={handleDelete}
              variant="contained"
              className="errorButton"
              color="error"
            >
              {t("confirm")}
            </Button>
            <Button onClick={toggleModal} color="primary" variant="contained">
              {t("cancel")}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default DeleteModal;
