import React, { Fragment, useEffect, useState } from "react";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import { Tabs, Tab, Pagination, Grid } from "@mui/material";
import MyPostedJobCard from "../../Components/Common/JobCard/MyPostedJobCard";
import { getJobByUserId } from "../../Services/JobsServices/JobServices";
import NoDataFound from "../../Components/Common/NoDataFound";
import PostYourFirstJobView from "../../Components/Common/PostYourFirstJobView";
import { useNavigate } from "react-router-dom";

const AgencyJobPosted = () => {
  const [pageLoader, setPageLoader] = useState(false);
  const [activeTab, setActiveTab] = useState("all_jobs");
  const [jobDetails, setJobDetails] = useState([]);
  const [originalJobDetails, setOriginalJobDetails] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const navigate = useNavigate();
  const pageSize = 6;

  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const query = `?userId=${userId}&page=1&limit=${pageSize}`;
    setPageLoader(true);
    getJobByUserId(query)
      .then((res) => {
        setPageLoader(false);
        if (res?.data?.jobPostings.length > 0) {
          setJobDetails(res?.data?.jobPostings);
          setOriginalJobDetails(res?.data?.jobPostings);
          setTotalPage(res?.data.totalPages);
        }
      })
      .catch((err) => {
        setPageLoader(false);
        console.log(err, "error!!!");
      });
  }, [currentPage, userId]);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    let tempJobs = [...originalJobDetails];
    if (newValue === "active_job")
      tempJobs = tempJobs.filter((job) => job.jobStatus === "active");
    setJobDetails(tempJobs);
  };

  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };
  console.log(totalPage, "totalPagetotalPage");
  return (
    <>
      {pageLoader && <PageLoader />}
      <HelperDashboardSubHeader title={t("my_posting")} progessBar={false} />
      {originalJobDetails.length > 0 ? (
        <>
          <Tabs
            className="customTabs"
            variant="fullWidth"
            value={activeTab}
            onChange={(event, newValue) => handleTabChange(newValue)}
            textColor="primary"
            indicatorColor="primary"
            aria-label="tabs for employer dashboard"
          >
            <Tab label={t("all_jobs")} value="all_jobs" />
            <Tab label={t("active_job")} value="active_job" />
          </Tabs>
          <Grid container spacing={2}>
            {jobDetails.length > 0 ? (
              jobDetails.map((job) => (
                <Fragment key={job._id}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                  >
                    <MyPostedJobCard jobDetails={job} />
                  </Grid>
                </Fragment>
              ))
            ) : (
              <NoDataFound title={t("no_job_active")} />
            )}
          </Grid>
          <div className="d-flex justify-content-center mt-2">
            {totalPage > pageSize && (
              <Pagination
                count={totalPage}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePagination}
              />
            )}
          </div>
        </>
      ) : (
        <PostYourFirstJobView />
      )}
    </>
  );
};

export default AgencyJobPosted;
