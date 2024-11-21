// JobsList.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Pagination,
} from "@mui/material";
import "react-responsive-pagination/themes/classic.css";
import "./HelperDashboard.css";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import HeaderFielter from "../../Components/Common/Filters/HeaderFielter";
import { useTranslation } from "react-i18next";
import { getJobsByStatus } from "../../Services/JobsServices/JobServices";
import JobCard from "../../Components/Common/JobCard/JobCard";
import NoDataFound from "../../Components/Common/NoDataFound";
import { JOB_STATUS } from "../../Constant/Constant";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import i18n from "../../i18n";

const MyApplication = () => {
  // Sample data for recommended jobs
  const [activeTab, setActiveTab] = useState(JOB_STATUS.APPLIED);
  const [openModal,setOpenModal] = useState(false)
  const [jobDetails, setJobDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    empType: "",
    sortBy: "",
  });
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setLoader(true);
    const param = `?jobTab=${activeTab}&page=${currentPage.page}&limit=10&location=${filters.location}&jobType=${filters.empType}&sortBy=${filters.sortBy}`;
    // const param = `?jobTab=${activeTab}&page=${currentPage.page}&limit=10`;
    getJobsByStatus(userId, param)
      .then((res) => {
        setLoader(false);
        console.log(res.data);
        const responseData =
          activeTab === JOB_STATUS.APPLIED
            ? res.data?.userActions?.appliedJobs
            : res.data?.userActions?.savedJobs;
        setJobDetails(responseData);
        setTotalPage(res.data.totalPages);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  }, [currentPage, filters, activeTab, userId]);

  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };

  return (
    <>
      {loader && <PageLoader />}
      <Box maxWidth="xl" sx={{ padding: "20px" }}>
        {/* Filter Component Placeholder */}
        <HelperDashboardSubHeader
          title={t("applications")}
          description={t("find_job_you_love")}
        />
        <HeaderFielter selected={filters} handleChange={setFilters} />
        <Tabs
          className="customTabs"
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          aria-label="tabs for applied and saved jobs"
        >
          <Tab label="Applied Jobs" value={JOB_STATUS.APPLIED} />
          <Tab label="Saved Jobs" value={JOB_STATUS.SAVED} />
        </Tabs>

        {jobDetails?.length > 0 ? (
          jobDetails.map((job) => (
            <JobCard
              jobDetails={job}
              setLoader={setLoader}
              setJobDetails={setJobDetails}
              setOpenModal = {setOpenModal}
              badge={activeTab}
            />
          ))
        ) : (
          <NoDataFound title={t("no_job_found")} />
        )}
      </Box>      
      {totalPage > 0 && <div className="d-flex justify-content-center">
        <Pagination
          count={totalPage}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePagination}
        />
      </div>}
    </>
  );
};

export default MyApplication;
