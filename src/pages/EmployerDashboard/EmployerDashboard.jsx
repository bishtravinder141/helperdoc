import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import ApplicantCards from "../../Components/Common/Applicants/ApplicantCards.jsx";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader.jsx";
import PageLoader from "../../Components/Common/Loader/PageLoader.jsx";
import { useTranslation } from "react-i18next";
import EmployerApplicantSideBar from "../../Components/Applicant/EmployerApplicantSideBar.jsx";
import {
  declineApplicant,
  getApplicants,
  getFavoritesApplicants,
  getJobByUserId,
} from "../../Services/JobsServices/JobServices.js";
import Chat from "../../Components/Common/Chat/chat.jsx";
import SuccessModal from "../../Components/Common/Modals/SuccessModal.jsx";
import { Fragment } from "react";
import NoDataFound from "../../Components/Common/NoDataFound.jsx";
import { useNavigate } from "react-router-dom";
import PostYourFirstJobView from "../../Components/Common/PostYourFirstJobView.jsx";
import moment from "moment/moment.js";
import MyPostedJobCard from "../../Components/Common/JobCard/MyPostedJobCard.jsx";

const EmployerDashboard = () => {
  const savedprofiles = [
    {
      title: "dummy456789",
      age: "28",
      description: "Description for Job Title 1.",
      location: "Hong Kong",
      date: "From 27 Feb 2024",
      type: "Full Time",
      image: "image_5.png",
      jobrole: "DOMESTIC HELP",
      jobtitle: "Need a office boy",
      jobdescription:
        "Be as precise as possible in your ad in order to get relevant applications. You will then be able to further discuss with potential applicants through direct me...",
      application: "05",
      conversation: "03",
      status: "Active",
      jobOfferby: "Hiroshi Nomura",
      addedDate: "January 30, 2024",
    },
  ];
  const { t } = useTranslation();
  const [pageLoader, setPageLoader] = useState(true);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPage, setTotalPage] = useState(0);
  const jobId = localStorage.getItem("jobId");
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState({});
  const [jobDetails, setJobDetails] = useState({});
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [favoritesApplicants, setFavoritesApplicants] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoader(true);
    if (activeTab !== "chat") {
      const query = `?userId=${userId}&page=1&limit=1`;
      setPageLoader(true);
      getJobByUserId(query)
        .then((res) => {
          setPageLoader(false);
          if (res?.data?.jobPostings.length > 0) {
            setJobDetails(res?.data?.jobPostings[0]);
          }
        })
        .catch((err) => {
          setPageLoader(false);
          console.log(err, "error!!!");
        });
    } else {
      setPageLoader(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab !== "chat" && activeTab !== "favorite_profiles") {
      const param = `page=${currentPage.page}&limit=${3}`;
      getApplicants(param)
        .then((res) => {
          const response = res?.data;
          setTotalPage(response?.totalPages);
          setApplicants([...applicants, ...response?.applicants]);
          if (response?.applicants?.length > 0 && pageLoader) {
            setSelectedApplicant(response?.applicants[0]);
          }
          setPageLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setPageLoader(false);
        });
    } else if (activeTab === "favorite_profiles") {
      const param = `?page=${currentPage.page}&limit=${6}`;
      getFavoritesApplicants(param)
        .then((res) => {
          setPageLoader(false);
          setTotalPage(res?.data?.totalPages);
          setFavoritesApplicants(res?.data?.users);
        })
        .catch((err) => {
          setPageLoader(false);
          console.log(err, "error!!!");
        });
    } else {
      setPageLoader(false);
    }
  }, [currentPage]);

  const handleTabChange = (newValue) => {
    setPageLoader(true);
    setApplicants([]);
    setCurrentPage({ page: 1 });
    setActiveTab(newValue);
  };

  const handleDeclineJob = () => {
    setButtonLoader(true);
    console.log(selectedApplicant, "selectedApplicantselectedApplicant");
    declineApplicant(selectedApplicant.jobId, selectedApplicant.userId)
      .then((res) => {
        setButtonLoader(false);
      })
      .catch((err) => {
        setButtonLoader(false);
      });
  };

  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };

  return (
    <>
      {jobDetails.jobDetails ? (
        <>
          {pageLoader && <PageLoader />}
          <HelperDashboardSubHeader
            title={t(activeTab)}
            description={t("emp_dashboard_desc")}
            progessBar={false}
          />
          <Box>
            <Tabs
              className="customTabs"
              variant="fullWidth"
              value={activeTab}
              onChange={(event, newValue) => handleTabChange(newValue)}
              textColor="primary"
              indicatorColor="primary"
              aria-label="tabs for employer dashboard"
            >
              <Tab label={t("dashboard")} value="dashboard" />
              <Tab label={t("new_applications")} value="new_applications" />
              <Tab label={t("conversations")} value="chat" />
              <Tab label={t("favorite_profiles")} value="favorite_profiles" />
            </Tabs>
            {activeTab === "dashboard" && (
              <>
                {/* <Grid className="findHelperTitle" item xs={12}>
              <Typography variant="h5" className="title employertitle_small">
                Can we help you?
              </Typography>
            </Grid> */}
                <Grid container spacing={3}>
                  {/* Plans Detailing */}
                  {/* <Grid>
                <Grid container spacing={3} className="subscriptionPlans_ds">
                  <Grid item md={4}>
                    <Box className="planName premium">
                      <img
                        src="./diamond-gem-icon.svg"
                        alt="Diamond Gen Icon"
                      />
                      <Typography variant="h3">Premium Subscription</Typography>
                      <Typography variant="body1">
                        You can search and find helpers for free, but only
                        Premium users can contact them. Discover all the
                        advantages of HelperDoc Premium.
                      </Typography>
                      <Button className="arrowButton whitebtn">
                        Upgrade to Premium
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box className="planName visaServices">
                      <img src="./visaService.svg" alt="Diamond Gen Icon" />
                      <Typography variant="h3">
                        VC Visa Service for Filipino
                      </Typography>
                      <Typography variant="body1">
                        We can process or renewl visa for your Filipino domestic
                        helper in Hong Kong, even if you have found someone
                        outside of HelperDoc.
                      </Typography>
                      <Button className="arrowButton whitebtn">
                        Process / Renew Visa
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid> */}

                  {/* Job Applicants */}
                  <Grid
                    lg={12}
                    md={12}
                    xs={12}
                    container
                    spacing={3}
                    className="applicantsEmployer"
                    mt={3}
                  >
                    <Grid className="findHelperTitle" item xs={12}>
                      <Typography
                        variant="h5"
                        className="title employertitle_small"
                      >
                        {t("job_applicants")}
                      </Typography>
                    </Grid>
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
                      <NoDataFound title={t("no_applicant_found")} />
                    )}
                  </Grid>
                  {/* Your Job Posting */}
                  <Grid
                    container
                    spacing={3}
                    className="applicantsEmployer"
                    mt={3}
                  >
                    <Grid className="findHelperTitle" item xs={12}>
                      <Typography
                        variant="h5"
                        className="title employertitle_small"
                      >
                        {t("your_job_posting")}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <MyPostedJobCard jobDetails={jobDetails} />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
            {activeTab === "new_applications" && (
              <>
                {applicants.length > 0 ? (
                  <>
                    <Grid
                      container
                      spacing={3}
                      m={0}
                      mt={4}
                      className="customGridW"
                    >
                      <EmployerApplicantSideBar
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPage={totalPage}
                        applicants={applicants}
                        selectedApplicant={selectedApplicant}
                        setSelectedApplicant={setSelectedApplicant}
                      />
                      <Grid md={9}>
                        <Box className="applicantDetails">
                          <Box className="employerHeader">
                            <Box className="primary">
                              <Box className="helperImg">
                                <img
                                  src={
                                    selectedApplicant.profilePicURL
                                      ? selectedApplicant.profilePicURL
                                      : "/demo-user.png"
                                  }
                                  alt="userimg"
                                />
                              </Box>
                              <Box className="helperContent">
                                <Typography variant="h5">
                                  {selectedApplicant.fullName}
                                </Typography>
                                <Box className="locationDate">
                                  <Box className="location">
                                    {selectedApplicant.location}
                                  </Box>
                                  <Box className="date">
                                    {selectedApplicant.age &&
                                      `${selectedApplicant.age} ${t("years")}`}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                            <Box className="secondary"></Box>
                          </Box>

                          <Box className="applicantRespond" mt={3}>
                            <Button
                              className="green-btn small dangerbtn"
                              onClick={() => setConfirmationModal(true)}
                            >
                              
                              {t("decline")}
                            </Button>
                            <Button
                              className="green-btn small"
                              onClick={() =>
                                navigate(
                                  `/employer/chat/${selectedApplicant?.userId}`
                                )
                              }
                            >
                              {t("respond")}
                            </Button>
                          </Box>

                          <Box className="highlightsApplicant" mt={4}>
                            {/* <Typography variant="h5">
                      {t("application_of")} {selectedApplicant.fullName}
                    </Typography> */}
                            {/* <Typography variant="body1">
                      Good day mam I'm interested to apply
                    </Typography>
                    <Typography variant="body1">
                      Be as precise as possible in your ad in order to get
                      relevant applications. You will then be able to further
                      discuss with potential applicants through direct messages
                      and set up an interview. Be as precise as possible in your
                      ad in order to get relevant applications. You will then be
                      able to further discuss with potential applicants through
                      direct messages and set up an interview.
                    </Typography> */}
                            <Typography variant="h5">
                              {t("about")} {selectedApplicant.fullName}
                            </Typography>
                            <List>
                              <ListItem>
                                <b>{t("nationality")}</b>
                                <span>Filipino</span>
                              </ListItem>
                              <ListItem>
                                <b>{t("monthly_salary")}</b>
                                <span>{selectedApplicant.expectedSalary}</span>
                              </ListItem>
                              <ListItem>
                                <b>{t("experience")}</b>
                                <span>
                                  {selectedApplicant.experience &&
                                    `${selectedApplicant.experience} ${t(
                                      "years"
                                    )}`}
                                </span>
                              </ListItem>
                              <ListItem>
                                <b>{t("language")}</b>
                                <span>
                                  {selectedApplicant.languages?.length > 0 &&
                                    selectedApplicant.languages.join(",")}
                                </span>
                              </ListItem>
                            </List>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <NoDataFound title={t("no_applicant_found")} />
                )}
              </>
            )}
            {activeTab === "chat" && <Chat />}
            {activeTab === "favorite_profiles" && (
              <>
                <Grid container className="favProfileListing">
                  {favoritesApplicants && favoritesApplicants.length > 0 ? (
                    favoritesApplicants.map((job, index) => (
                      <Grid item key={index} lg={4} md={6} xs={12}>
                        <Box className="helpersCol employerapplicant savedProfile">
                          <Box className="profileUpper">
                            <Box className="helperImg">
                              <img
                                src={
                                  job.profilePicURL
                                    ? job.profilePicURL
                                    : "/demo-user.png"
                                }
                                alt={`Helpers ${index}`}
                              />
                            </Box>
                            <Box className="helperContent">
                              <Box
                                className="wishlistIcon"
                                onClick={() => setConfirmationModal(true)}
                              >
                                <img src="/cross.svg" alt="unsave" />
                              </Box>
                              <Typography variant="h5">
                                {job.fullName}
                              </Typography>
                              <Box className="locationDate">
                                <Box className="location">{job.location}</Box>
                                {job.age && (
                                  <Box className="applicant_age">
                                    {job.age} years
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          </Box>
                          <Box className="work_Profile">
                            <Typography className="jobOfferby">
                              Jobs offered by {job.fullName}
                            </Typography>
                            <Typography className="job_role">
                              DOMESTIC HELP
                            </Typography>
                            <Typography className="job_date">
                              Added on{" "}
                              {moment(job.addedToFavoriteAt).format(
                                "MMMM DD YYYY"
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <NoDataFound title={t("no_applicant_found")} />
                  )}
                </Grid>
                <div className="d-flex justify-content-center">
                  {totalPage > 0 && (
                    <Pagination
                      count={totalPage}
                      variant="outlined"
                      shape="rounded"
                      onChange={handleChangePagination}
                    />
                  )}
                </div>
              </>
            )}
          </Box>
          {confirmationModal && (
            <SuccessModal
              open={confirmationModal}
              handleContinue={handleDeclineJob}
              buttonText={t("decline")}
              text={t("decline_job_confirmation_detail")}
              secondButton={true}
              secondButtonText={t("back_to_profile")}
              heading={t(`decline_job_confirmation`)}
              icon={
                selectedApplicant.profilePicURL
                  ? selectedApplicant.profilePicURL
                  : "/demo-user.png"
              }
              handleSecondButton={() => setConfirmationModal(false)}
              btnLoader={buttonLoader}
              onClose={() => setConfirmationModal(false)}
              showCloseIcon={true}
            />
          )}
        </>
      ) : (
        <PostYourFirstJobView />
      )}
    </>
  );
};

export default EmployerDashboard;
