import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../Language Dropdown/LanguageDropdown";

const AdminFooter = () => {
  const { t } = useTranslation();
  return (
    <Grid className="dashboardContentArea footerDash employerFooter adminFooter">
      <Box className="copyrightArea">
        <Typography>{t("copyright_text")}</Typography>
      </Box>
      <div className="languageDropdown">
        <LanguageDropdown />
      </div>
    </Grid>
  );
};

export default AdminFooter;
