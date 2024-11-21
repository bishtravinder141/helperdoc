import React, { Fragment, useEffect, useState } from "react";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
  getApplicants,
  getJobByUserId,
} from "../../Services/JobsServices/JobServices";
import { Box, Grid, Typography } from "@mui/material";
import MyPostedJobCard from "../../Components/Common/JobCard/MyPostedJobCard";
import NoDataFound from "../../Components/Common/NoDataFound";
import PostYourFirstJobView from "../../Components/Common/PostYourFirstJobView";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import ApplicantCards from "../../Components/Common/Applicants/ApplicantCards";
import FoundApplicant from "../../Components/Common/FoundApplicant";

const AgencyDashboard = () => {
  const [pageLoader, setPageLoader] = useState(true);
  const [jobDetails, setJobDetails] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();

  useEffect(() => {
    const query = `?userId=${userId}&page=1&limit=3`;
    Promise.all([
      getJobByUserId(query).then((res) => {
        if (res?.data?.jobPostings.length > 0) {
          setJobDetails(res?.data?.jobPostings);
        }
      }),
      getApplicants("page=1&limit=3").then((res) => {
        setApplicants(res?.data?.applicants);
      }),
    ])
      .then(() => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setPageLoader(false);
      });
  }, []);

  return (
    <>
      <HelperDashboardSubHeader
        title={t("dashboard")}
        description={`${t("today")} ${moment(new Date()).format("MMM D YYYY")}`}
        progessBar={false}
      />
      <Box>
        {pageLoader && <PageLoader />}
        {/* <Grid container spacing={3}> */}
        <Grid container spacing={3} className="applicantsEmployer" mt={3}>
          <Grid className="findHelperTitle p-0" item xs={12} md={6}>
            {/* <Typography variant="h5" className="title employertitle_small">
              {t("job_applicants")}
            </Typography> */}
            {/* </Grid> */}
            {applicants.length > 0 ? (
              applicants.map((app, index) => (
                <Fragment key={index}>
                  <ApplicantCards
                    applicant={app}
                    setPageLoader={setPageLoader}
                  />
                </Fragment>
              ))
            ) : (
              // <NoDataFound title={t("no_applicant_found")} />
              <FoundApplicant />
            )}
          </Grid>
          <Grid className="findHelperTitle" item xs={12} md={6}>
            {/* <Typography variant="h5" className="title employertitle_small">
              {t("your_job_posting")}
            </Typography> */}
            {jobDetails.length > 0 ? (
              <Grid container spacing={2}>
                {jobDetails.map((job) => (
                  <Fragment key={job._id}>
                    <Grid item xs={12} md={12}>
                      <MyPostedJobCard jobDetails={job} />
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            ) : (
              <PostYourFirstJobView />
            )}
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          className="applicantsEmployer"
          mt={3}
        ></Grid>
      </Box>
    </>
  );
};

export default AgencyDashboard;
