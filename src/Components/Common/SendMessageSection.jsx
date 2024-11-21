import React from "react";
import { Grid, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const SendMessageSection = () => {
  const { t } = useTranslation();
  return (
    <div>
      {" "}
      <Grid item xs={12} md={6} className="d-flex gap-2">
        <img src="/whatsapp.svg" />
        <Button className="green-btn small text-center">
          {t("send_message")}
        </Button>
      </Grid>
    </div>
  );
};

export default SendMessageSection;
