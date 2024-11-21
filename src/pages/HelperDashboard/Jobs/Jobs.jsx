import React, { useEffect, useState } from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import HelperDashboardSubHeader from "../../../Components/Common/Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import HeaderFielter from "../../../Components/Common/Filters/HeaderFielter";
import JobCard from "../../../Components/Common/JobCard/JobCard";
import { getJobsList } from "../../../Services/JobsServices/JobServices";
import PageLoader from "../../../Components/Common/Loader/PageLoader";
import NoDataFound from "../../../Components/Common/NoDataFound";
import ProfileNotCompleteModal from "../../../Components/Common/Modal/ProfileNotCompleteModal";

const Jobs = () => {
  const [loader, setLoader] = useState(true);
  const [jobDetails, setJobDetails] = useState([]);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [totalPage, setTotalPage] = useState(0);
  const [filters, setFilters] = useState({
    location: "",
    empType: "",
    sortBy: "",
  });
  const [openModal, setOpenModal] = useState();

  useEffect(() => {
    setLoader(true);
    const param = `?page=${currentPage.page}&limit=10&location=${filters.location}&jobType=${filters.empType}&sortBy=${filters.sortBy}`;
    getJobsList(param)
      .then((res) => {
        setLoader(false);
        setJobDetails(res.data.jobs);
        setTotalPage(res.data.totalPages);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  }, [currentPage, filters]);

  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };

  return (
    <>
      {loader && <PageLoader />}
      <Box maxWidth="xl" className="dashboardCol">
        <HelperDashboardSubHeader
          title={t("find_jobs")}
          description={t("find_job_you_love")}
        />
        <HeaderFielter selected={filters} handleChange={setFilters} />
        <Grid className="JobsListRow">
          <Grid item md={12}>
            <Typography variant="h5">{t("recommended_job")}</Typography>
          </Grid>
          {jobDetails?.length > 0 ? (
            jobDetails.map((job) => (
              <JobCard
                jobDetails={job}
                setLoader={setLoader}
                setJobDetails={setJobDetails}
                setOpenModal={setOpenModal}
              />
            ))
          ) : (
            <NoDataFound title={t("no_job_found")} />
          )}
        </Grid>
      </Box>
      {totalPage > 0 && (
        <div className="d-flex justify-content-center">
          <Pagination
            count={totalPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePagination}
          />
        </div>
      )}
      {openModal && (
        <ProfileNotCompleteModal
          open={openModal}
          handleClose={() => setOpenModal(!openModal)}
        />
      )}
    </>
  );
};

export default Jobs;
