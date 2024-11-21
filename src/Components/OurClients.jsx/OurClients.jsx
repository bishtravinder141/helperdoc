import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { CLIENTS } from "./Constant";
import "./OurClients.css"

const OurClients = () => {
  const { t } = useTranslation();
  return (
    <section className="recruitersSection">
      <Container className="recruitersContainer pageContainer">
        <Typography variant="h6" align="center" gutterBottom>
          {t("recruiterTitle")}
        </Typography>
        <Grid container className="recrutersThumbsCol">
          {CLIENTS.map((recruiter, index) => (
            <Grid className="recrutersThumbs" item key={index}>
              <img
                src={`images/recruiters/${recruiter}`}
                alt={`Recruiters ${index}`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default OurClients;
