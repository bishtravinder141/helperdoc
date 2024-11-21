import React from "react";
import { Box, Container, FormControl, Grid, Link, MenuItem, Select, Typography } from "@mui/material";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  PinterestIcon,
  InstagramIcon,
  YoutubeIcon,
} from "../SocialIcons";
import Newsletter from "./NewsLetter";
import { useTranslation } from "react-i18next";
import {
  DOWNLOAD_APP,
  FOR_CANDIDATES,
  FOR_EMPLOYEE,
  QUICK_LINKS,
} from "./Constant";

const PublicFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className="footerSection">
      <Container className="footerContainer pageContainer">
        <div className="footerTop">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <img src="/footer_logo.svg" alt="Logo" className="footerLogo" />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Social Icons */}
              <div className="social-icons">
                <Typography variant="h6">{t("follow_us")}</Typography>
                <FacebookIcon />
                <LinkedInIcon />
                <TwitterIcon />
                <PinterestIcon />
                <InstagramIcon />
                <YoutubeIcon />
                {/* Add more social icons as needed */}
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="footerBottom">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <div className="needHelp">
                <Typography variant="body1">{t("need_help")}</Typography>
                <Typography variant="body1" className="number">
                  001-1234-88888
                </Typography>
              </div>

              <Typography variant="body1">
                {t("news_letter_content")}
              </Typography>
              <Typography variant="body1" className="locationMark">
                100 E 126th St, East Hong Kong, IN 46312
              </Typography>
              <div className="footerNewsletter">
                <Newsletter />
              </div>
            </Grid>

            <Grid item xs={12} md={2}>
              {/* Quick Links */}
              <Typography variant="h6">Quick Links</Typography>
              <ul className="footer-list">
                {QUICK_LINKS.map((lnk) => (
                  <li>
                    <Link href={lnk.url}>{t(lnk.value)}</Link>
                  </li>
                ))}
              </ul>
            </Grid>

            <Grid item xs={12} md={2}>
              {/* Additional Links */}
              <Typography variant="h6">For Candidates</Typography>
              <ul className="footer-list">
                {FOR_CANDIDATES.map((lnk) => (
                  <li>
                    <Link href={lnk.url}>{t(lnk.value)}</Link>
                  </li>
                ))}
                {/* Add more links as needed */}
              </ul>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography variant="h6">For Employees</Typography>
              <ul className="footer-list">
                {FOR_EMPLOYEE.map((lnk) => (
                  <li>
                    <Link href={lnk.url}>{t(lnk.value)}</Link>
                  </li>
                ))}
                {/* Add more links as needed */}
              </ul>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography variant="h6">Download App</Typography>
              <ul className="footer-list">
                {DOWNLOAD_APP.map((lnk) => (
                  <li>
                    <Link href={lnk.url}>{t(lnk.value)}</Link>
                  </li>
                ))}
                {/* Add more links as needed */}
              </ul>
            </Grid>
          </Grid>
        </div>

        <div className="footerCopyright">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">{t("copy_right")}</Typography>
            </Grid>
            {/* <Grid item xs={12} md={2}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                    label="Age"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid> */}

            <Grid item xs={12} md={6}>
              <div className="footerLinks">
                <Link href="/terms_of_services">{t("term_of_services")}</Link> |{" "}
                <Link href="/privacy_policy">{t("privacy_policy")}</Link> |{" "}
                <Link href="/cookie_policy">{t("cookie_policy")}</Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </footer>
  );
};

export default PublicFooter;