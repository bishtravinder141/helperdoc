import { Container, Grid, List, ListItem, Typography } from "@mui/material";
import React from "react";
import ArrowButton from "../Common/ArrowButton";
import { useTranslation } from "react-i18next";
import { CHOICES } from "./Constant";

const WhyChooseUs = () => {
  const { t } = useTranslation();
  return (
    <section className="whyChooseUsSection">
      <Container className="whyChooseUsContainer pageContainer">
        <Grid className="row-reverse" container spacing={3}>
          {/* Right side: Image */}
          <Grid item xs={12} md={6}>
            <div className="whoWeImg">
              <img src="whyChooseUs.png" alt="Why Choose Us" />
            </div>
          </Grid>

          {/* Left side: Content in List */}
          <Grid item xs={12} md={6}>
            <div className="whoWeContent">
              <Typography className="title" variant="h2">
                Why Choose HelperDoc
              </Typography>
              <List className="whoWeAreList">
                {CHOICES.map((choice, index) => (
                  <ListItem className="whoWeAreListItem" key={index}>
                    <span>
                      <strong>{choice.title}</strong>
                    </span>
                    {choice.content}
                  </ListItem>
                ))}
              </List>
              <ArrowButton title={t("getStarted")} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
