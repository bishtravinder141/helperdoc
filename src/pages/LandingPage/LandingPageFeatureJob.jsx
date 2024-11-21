import React from "react";
import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import HelperCard from "../../Components/Common/HelperCard";
import { useTranslation } from "react-i18next";
import ArrowButton from "../../Components/Common/ArrowButton";
import { JOBS } from "../FeatureJobs/Constant";
import { useNavigate } from "react-router-dom";

const LandingPageFeatureJob = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
  return (
    <Container className="jobsContainer pageContainer">
      <Grid className="findHelperTitle" textAlign="center" item xs={12}>
        <Typography variant="h2" className="title">
          {t("feature_job_section_title")}
        </Typography>
        <Typography variant="body1">
          {t("feature_job_section_content")}
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        {JOBS.map((job, index) => (
          <Grid key={index} item lg={4} md={6} xs={12}>
            <HelperCard card={job} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} textAlign="center" className="pt-4" onClick = {()=>{navigate("/feature-jobs")}}>
        <ArrowButton title={t("find_more_jobs")} />
      </Grid>
    </Container>
  );
};

export default LandingPageFeatureJob;
