import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";

const StyledTextContent = styled("div")({
  textAlign: "center",
  margin: "20px auto",
  maxWidth: 900,
});

const ProfileDiscrimination = () => {
  const { t } = useTranslation();
  return (
    <Grid item xs={12}>
      <StyledTextContent>
        <Typography>
          {t("thanks_for_applying")} <a href="">{t("helper_doc")}</a>.
          {t("helper_registration_process")}
        </Typography>
        <Typography>{t("fill_working_experience")}</Typography>
        <Typography>{t("before_you_start")}:</Typography>
        <Typography>{t("do_not_hide")}</Typography>
      </StyledTextContent>
    </Grid>
  );
};

export default ProfileDiscrimination;
