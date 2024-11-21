import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { WHO_WE_ARE } from "./Constant";
import ArrowButton from "../Common/ArrowButton";

const WhoWeAre = () => {
  const { t } = useTranslation();
  return (
    <section className="whoWeAreSection">
      <Container className="whoWeAreContainer pageContainer">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className="whoWeImg">
              <img src="about_us.png" alt="Who We Are" />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="whoWeContent">
              <Typography variant="h6">{t("whoWeAreTitle")}</Typography>
              <Typography variant="h2" className="title">{t("whoWeAreHeader")}</Typography>
              <Typography variant="body1">{t("whoWeAreContent")}</Typography>
              <List className="whoWeAreList">
                {WHO_WE_ARE.map((title, index) => (
                  <ListItem className="whoWeAreListItem" key={index}>
                    {t(title)}
                  </ListItem>
                ))}
              </List>
              <ArrowButton title={t("readMore")} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default WhoWeAre;
