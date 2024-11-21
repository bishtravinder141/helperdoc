import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import {
  deletePostJob,
  getJobByJobId,
  getJobByUserId,
  publishJob,
} from "../../Services/JobsServices/JobServices";
import { toastMessage } from "../../Utils/toastMessages";
import { successType } from "../../Constant/Constant";
import NoDataFound from "../../Components/Common/NoDataFound";
import DeleteModal from "../../Components/Common/Modals/DeleteModal";
import PostYourFirstJobView from "../../Components/Common/PostYourFirstJobView";
import { useSelector } from "react-redux";

export default function PostedJobDetails() {
  const [loader, setLoader] = useState(true);
  const [jobDetails, setJobDetails] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const userId = localStorage.getItem("userId");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { hasSubscription } = useSelector((state) => state.common);
  const { id } = useParams();

  useEffect(() => {
    setLoader(true);
    const query = `?userId=${userId}&page=1&limit=1`;

    if (id) {
      getJobByJobId(id)
        .then((res) => {
          setLoader(false);
          setJobDetails(res?.data?.job);
        })
        .catch((err) => {
          setLoader(false);
          console.log(err, "error!!!");
        });
    } else {
      getJobByUserId(query)
        .then((res) => {
          setLoader(false);
          if (res?.data?.jobPostings.length > 0) {
            setJobDetails(res?.data?.jobPostings[0]);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.log(err, "error!!!");
        });
    }
  }, []);

  const handlePublishJob = () => {
    setLoader(true);
    publishJob(jobDetails._id)
      .then((res) => {
        toastMessage(t("job_published_successfully"), successType);
        setJobDetails({
          ...jobDetails,
          jobStatus: "active",
        });
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        if (err.response?.data?.message) {
          toastMessage(err.response.data?.message);
        } else {
          toastMessage(t("failure_message"));
        }
      });
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteJob = () => {
    setLoader(true);
    deletePostJob(jobDetails._id)
      .then((res) => {
        setLoader(false);
        toastMessage(t("job_delete_success"), successType);
        setJobDetails({});
        toggleDeleteModal();
        localStorage.removeItem("jobId");
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
        setLoader(false);
        toggleDeleteModal();
      });
  };
  return (
    <>
      {loader && <PageLoader />}
      {jobDetails._id ? (
        <>
          <HelperDashboardSubHeader
            title={jobDetails.jobDetails?.jobTitle}
            progessBar={false}
          />
          <Grid container spacing={3} m={0} className="customGridW">
            <Grid lg={3} md={4} className="applicantSidebar Inner">
              <Box>
                <Box className="applicantAvtr">
                  <img
                    src={
                      jobDetails.profilePicURL
                        ? jobDetails.profilePicURL
                        : "/applicantImg.jpg"
                    }
                  />
                </Box>
                <Box className="applicantInfo">
                  <Typography variant="h3">{jobDetails.fullName}</Typography>
                  <Typography variant="body1">
                    Is Looking For {jobDetails.jobDetails?.jobTitle}
                  </Typography>
                  <List>
                    <ListItem>
                      <img src="/calendar.svg" alt="calendar" />
                      <strong>{t("date_of_need")}:</strong>{" "}
                      {jobDetails.basicInfo?.jobStartDate}
                    </ListItem>
                    {/* <ListItem>
                  <img src="/hours.svg" alt="calendar" />
                  <strong>Min. hours:</strong> 10 hrs
                </ListItem> */}
                  </List>
                </Box>
              </Box>

              <Box mt={3} className="helpder_details_dmc">
                <Typography variant="h4">
                  <img src="/domesticlocation.svg" />{" "}
                  {t("domestic_helper_near_me")}
                </Typography>
                <List>
                  <NoDataFound title={t("no_data_found")} />
                  {/* {helperNearMe.map((helper) => (
                <ListItem>
                  <Typography>{helper.place}</Typography>
                  <Typography>{helper.count}</Typography>
                </ListItem>s
              ))} */}
                </List>
              </Box>
              <Box>
                <Button
                  className="green-btn small"
                  mt={1}
                  onClick={() => {
                    pathname.includes("agency")
                      ? navigate(`/agency/job-post/${jobDetails?._id}`)
                      : pathname.includes("employer") &&
                        navigate(`/employer/job-post`);
                  }}
                >
                  {t("editJob")}
                </Button>
                {hasSubscription && jobDetails.jobStatus !== "active" && (
                  <Button
                    className="green-btn small"
                    onClick={handlePublishJob}
                  >
                    {t("publishJob")}
                  </Button>
                )}
                <Button className="green-btn small" onClick={toggleDeleteModal}>
                  {t("deleteJob")}
                </Button>
              </Box>
            </Grid>
            <Grid lg={9} md={8}>
              <Box className="applicantDetails">
                <Box className="highlightsApplicant" mt={4}>
                  <Typography variant="h5">
                    {jobDetails.jobDetails?.jobTitle}
                  </Typography>
                  <Typography variant="body1">
                    {jobDetails.jobDetails?.jobDescription}
                  </Typography>
                  <Typography variant="h5">{t("job_details")}</Typography>
                  <List>
                    <ListItem>
                      <b>{t("start_date")} </b>
                      <span>{jobDetails.basicInfo?.jobStartDate}</span>
                    </ListItem>
                    <ListItem>
                      <b>{t("monthly_salary")}</b>
                      <span>
                        {jobDetails.offerToCandidate?.monthlySalary}{" "}
                        {jobDetails.offerToCandidate?.salaryCurrency}
                      </span>
                    </ListItem>
                    {/* <ListItem>
                  <b>Housing </b>
                  <span>Live in</span>
                </ListItem> */}
                    <ListItem>
                      <b>{t("arrangement")} </b>
                      <span>{jobDetails.offerToCandidate?.accommodation}</span>
                    </ListItem>
                    <ListItem>
                      <b>{t("day_off_on")} </b>
                      <span>{jobDetails.offerToCandidate?.dayOff}</span>
                    </ListItem>
                    {/* <ListItem>
                  <b>Flat size </b>
                  <span>900 square feets / square meters</span>
                </ListItem> */}
                    <ListItem>
                      <b>
                        {t("employer")} {t("nationality")}{" "}
                      </b>
                      <span>
                        {jobDetails.aboutEmployer?.employerNationality}
                      </span>
                    </ListItem>
                  </List>
                  <Box className="expectedDuties">
                    <Typography variant="h5">{t("expected_duties")}</Typography>
                    {jobDetails.requiredSkills?.mainSkills &&
                      Object.keys(jobDetails.requiredSkills?.mainSkills).map(
                        (skill) => (
                          <Box className="dutiesList profileDuties">
                            <Typography variant="body1">{skill}</Typography>
                            <List>
                              {jobDetails.requiredSkills?.mainSkills[skill] &&
                                jobDetails.requiredSkills?.mainSkills[
                                  skill
                                ].map((opt) => <ListItem>{opt}</ListItem>)}
                            </List>
                          </Box>
                        )
                      )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {showDeleteModal && (
            <DeleteModal
              showModal={showDeleteModal}
              toggleModal={toggleDeleteModal}
              handleDelete={handleDeleteJob}
              msg={t("delete_job_confirmation_msg")}
            />
          )}
        </>
      ) : (
        <PostYourFirstJobView />
      )}
    </>
  );
}
