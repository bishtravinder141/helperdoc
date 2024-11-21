import React, { Fragment, useEffect, useState } from "react";
import { Grid, IconButton, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getJobByUserId } from "../../../Services/JobsServices/JobServices";
const ADMIN_JOB_DETAIL_OPTIONS = [
  {
    label: "start_date",
    key: "basicInfo",
    subkey: "jobStartDate",
  },
  {
    label: "monthly_salary",
    key: "offerToCandidate",
    subkey: "monthlySalary",
    extra: "salaryCurrency",
  },
  // {
  //   label:"housing"
  // },
  // {
  //   label: "arrangement",
  // },
  {
    label: "day_off_on",
    key: "offerToCandidate",
    subkey: "dayOff",
  },
  // {
  //   label:"flat_size"
  // },
  {
    label: "employer_nationality",
    key: "aboutEmployer",
    subkey: "employerNationality",
  },
];

const AdminPostedJobDetails = () => {
  // this is user id and not job id
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [jobDetail, setJobDetail] = useState();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    const query = `?userId=${id}&page=1&limit=1`;

    getJobByUserId(query)
      .then((res) => {
        setJobDetail(res?.data?.jobPostings[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);
  return (
    <div>
      <Grid lg={9} md={8}>
        <Typography variant="h5">
          <strong>
            {jobDetail?.jobDetails?.jobTitle && jobDetail?.jobDetails?.jobTitle}
          </strong>
        </Typography>
        <Box className="applicantDetails">
          <div className="back">
            <IconButton onClick={() => navigate(state?.prevRoute)}>
              <ArrowBackIcon />
            </IconButton>
            {t("back")}
          </div>
          <Box className="postedDetail" mt={4}>
            <Typography variant="h5">
              {jobDetail?.jobDetails?.jobTitle &&
                jobDetail?.jobDetails?.jobTitle}
            </Typography>
            <Typography variant="body1">
              {jobDetail?.jobDetails?.jobDescription &&
                jobDetail?.jobDetails?.jobDescription}
            </Typography>
            {/* get it's ui fixed */}
            {jobDetail?.jobStatus && (
              <Typography variant="body1  status">
                {jobDetail?.jobStatus}
              </Typography>
            )}
            <Typography variant="h5">{t("job_details")}</Typography>
            <Box className="">
              <List>
                {jobDetail &&
                  ADMIN_JOB_DETAIL_OPTIONS.map(
                    ({ label, key, subkey, extra }, index) =>
                      (jobDetail[key][subkey] || jobDetail[key][extra]) && (
                        <ListItem key={index} >
                          <b>{t(label)} </b>
                          {extra ? (
                            <span>{`${jobDetail[key][subkey]} ${jobDetail[key][extra]}`}</span>
                          ) : (
                            <span>{jobDetail[key][subkey]}</span>
                          )}
                        </ListItem>
                      )
                  )}
              </List>
            </Box>
            <Box className="expectedDuties">
              {jobDetail?.requiredSkills?.mainSkills &&
                Object.keys(jobDetail.requiredSkills?.mainSkills) && (
                  <Fragment>
                    <Typography variant="h5">{t("expected_duties")}</Typography>
                    {Object.keys(jobDetail.requiredSkills?.mainSkills).map(
                      (skill, index) => (
                        <Box className="dutiesList profileDuties" key={index}>
                          <Typography variant="body1">{skill}</Typography>
                          <List>
                            {jobDetail.requiredSkills?.mainSkills[skill] &&
                              jobDetail.requiredSkills?.mainSkills[skill].map(
                                (opt) => <ListItem>{opt}</ListItem>
                              )}
                          </List>
                        </Box>
                      )
                    )}
                  </Fragment>
                )}
              {/* {jobDetail?.requiredSkills?.mainSkills &&
                Object.keys(jobDetail.requiredSkills?.mainSkills).map(
                  (skill) => (
                    <Box className="dutiesList profileDuties">
                      <Typography variant="body1">{skill}</Typography>
                      <List>
                        {jobDetail.requiredSkills?.mainSkills[skill] &&
                          jobDetail.requiredSkills?.mainSkills[skill].map(
                            (opt) => <ListItem>{opt}</ListItem>
                          )}
                      </List>
                    </Box>
                  )
                )} */}
              <Box className="dutiesList profileDuties">
                <Typography variant="body1">heading</Typography>
                <List>
                  <ListItem>qqqqqq</ListItem>
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default AdminPostedJobDetails;
