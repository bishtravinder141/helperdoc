import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import ArrowButton from "../Common/ArrowButton";
import { useTranslation } from "react-i18next";
import HelperCard from "../Common/HelperCard";
import { useNavigate } from "react-router-dom";
  
const HelperSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const helpers = [
    {
      id: 1,
      title: "Hiroshi Nomura",
      location: "Hong Kong",
      image: "image_5.png",
      occupation: "Web Developer",
      date: "From 27 Feb 2024",
      availability: "Full Time",
    },
    {
      id: 2,
      title: "Yoko Aota",
      location: "Hong Kong",
      image: "image_6.png",
      occupation: "Web Developer",
      date: "From 27 Feb 2024",
      availability: "Full Time",
    },
    {
      id: 3,
      title: "Kazuya Sato",
      location: "Hong Kong",
      image: "image_7.png",
      occupation: "Web Developer",
      date: "From 27 Feb 2024",
      availability: "Full Time",
    },
    {
      id: 4,
      title: "Rika Tanaka",
      location: "Hong Kong",
      image: "image_5.png",
      occupation: "Housewife",
      date: "From 27 Feb 2024",
      availability: "Full Time",
    },

    {
      id: 5,
      title: "Momoko Ogaki",
      location: "Hong Kong",
      image: "image_7.png",
      occupation: "Web Developer",
      date: "From 27 Feb 2024",
      availability: "Full Time",
    },
    {
      id: 6,
      title: "Yumiko Yoshimoto",
      location: "Hong Kong",
      image: "image_5.png",
      occupation: "Housewife",
      date: "From 27 Feb 2024",
      availability: "Full Time",
    },
  ];
  return (
    <section className="findHelperSection">
      <Container className="findHelperContainer pageContainer">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} className="findHelperTitle" textAlign="center">
            <Typography variant="h2" className="title">
              {t("helper_section_title")}
            </Typography>
            <Typography variant="body1">
              {t("helper_section_content")}
            </Typography>
          </Grid>
          {helpers.map((helper) => (
            <Grid key={helper.id} item lg={4} md={6} xs={12}>
              <HelperCard card={helper} />
            </Grid>
          ))}
          <Grid item xs={12} textAlign="center" className="pt-4" onClick = {()=>navigate("/applicants")}>
            <ArrowButton title={t("find_more_helper")} />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default HelperSection;
