import React from "react";
import "./footer.css";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageDropdown from "../Language Dropdown/LanguageDropdown";
import { useTranslation } from "react-i18next";

export default function PrivateFooter() {
  const {t} = useTranslation();
  const role = localStorage.getItem("selectedRole");
  const pathname = useLocation();
  const navigate = useNavigate();
  return (
    <Grid className="dashboardContentArea footerDash employerFooter">
      <Box className="copyrightArea">
        <Typography>{t("copyright_text")}</Typography>  
      </Box>
      <Box className="footerLinks">
        <List>
          <ListItem>
            {/* <Link to={`/${role}/contact-us`}>Contact Us</Link> */}
            <Link to={`/${role}/contact-us`} state={{ prevRoute: pathname }}>
              Contact Us
            </Link>
          </ListItem>
          <ListItem>
            <Link to={`/${role}/faq`} state={{ prevRoute: pathname }}>
              FAQ’s
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/">Privacy Policy</Link>
          </ListItem>
        </List>
      </Box>
      <Box className = "languageDropdown">
       <LanguageDropdown/>
      </Box>
    </Grid>
  );
}
