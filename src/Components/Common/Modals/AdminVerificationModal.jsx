import React, { useState } from "react";
import {
  Dialog,
  Button,
  Typography,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const AdminVerificationModal = ({
  showModal,
  handleVerifyAction,
  verificationModalData,
  setShowVerificationModal,
}) => {
  const { t } = useTranslation();
  // const docs = [{uri:require(verificationModalData.document[1])}]
  const [isLoading, setIsLoading] = useState(true);
  console.log(verificationModalData.verificationStatus, "statsus");
  return (
    <Container maxWidth="xl">
      <Dialog open={showModal} className="customModal  adminVerificationModal">
        <Box className="closeModal">
          <IconButton onClick={() => setShowVerificationModal(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
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
          <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
            {/* {document} */}
            {/* document i.e ["drivingLicenseFile","driving.pdf"] */} 
            {/* <img src={document[1]}/> */}

            {isLoading ? "loading document..." : null}
            <iframe
              src={`https://docs.google.com/gview?url=${verificationModalData.document[1]}&embedded=true`}
              frameborder="0"
              width="300"
              height="200"
              onLoad={() => setIsLoading(false)}
            />

            {/* <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={docs}
              config={{
                header: {
                  disableHeader: false,
                  disableFileName: false,
                  retainURLParams: false,
                },
              }}
              style={{ height: 1000 }}
            /> */}
          </Typography>
          <Box style={{ display: "flex" }}>
            <Button
              variant="contained"
              className="errorButton"
              color="error"
              disabled={verificationModalData.verificationStatus === "declined" || isLoading}
              onClick={() => {
                handleVerifyAction(
                  verificationModalData.userId,
                  verificationModalData.document,
                  "decline"
                );
              }}
            >
              {verificationModalData.verificationStatus === "declined"
                ? t("already_declined")
                : t("decline")}
            </Button>
            <Button
              className="arrowButton"
              variant="contained"
              color="primary"
              disabled={verificationModalData.verificationStatus === "verified" || isLoading}
              // onClick={()=>{handleVerify(userId,document)}}
              onClick={() => {
                handleVerifyAction(
                  verificationModalData.userId,
                  verificationModalData.document,
                  "verify"
                );
              }}
            >
              {verificationModalData.verificationStatus === "verified"
                ? t("already_verified")
                : t("verify")}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default AdminVerificationModal;
