import { Container, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowButton from "../../Components/Common/ArrowButton";
import { useTranslation } from "react-i18next";
import HelperCard from "../../Components/Common/HelperCard";
import { JOBS } from "./Constant";
import FeatureJobsSideFilter from "./FeatureJobsSideFilter";
import ApplicantHeaderFilter from "../FindApplicants/ApplicantHeaderFilter";
import { getFeatureJobs } from "../../Services/JobsServices/JobServices";
import NoDataFound from "../../Components/Common/NoDataFound";
import { buildQueryFromSelectedFilters } from "../FindApplicants/constant";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import { CloseFullscreen } from "@mui/icons-material";
import MyPostedJobCard from "../../Components/Common/JobCard/MyPostedJobCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllSeadersData } from "../../Redux/CommonSlice";

const FeatureJobs = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.common);
  const JOBS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [loader, setLoader] = useState(true);
  const [totalPages, setTotalPages] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    jobType: "",
    startDate: "",
    requiredLanguage: [],
    requiredMainSkill: [],
    sortBy: "",
  });

  useEffect(() => {
    if (!state?.religion?.length) {
      getSeeders();
    }
    const queryFromSelectedFilters =
      buildQueryFromSelectedFilters(selectedFilters);
    const query = `${queryFromSelectedFilters}&page=${currentPage.page}&limit=${JOBS_PER_PAGE}`;
    handleGetFeatureJobs(query);
  }, [selectedFilters, currentPage]);

  const handleGetFeatureJobs = (query) => {
    setLoader(true);
    getFeatureJobs(query)
      .then((res) => {
        setJobList(res?.data?.jobs);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  const getSeeders = async () => {
    await dispatch(getAllSeadersData());
  };
  const handleSelectJobFilters = (e, field, type) => {
    let value;
    if (e.target) {
      value = e.target.value;
    }
    if (type === "radio") {
      if (selectedFilters[field] === value || !selectedFilters[field] === "") {
        setSelectedFilters({
          ...selectedFilters,
          [field]: "",
        });
        return;
      }
      setSelectedFilters({
        ...selectedFilters,
        [field]: value,
      });
    } else if (type === "checkbox") {
      if (e.target.checked) {
        const temp = selectedFilters[field];
        temp.push(value);
        setSelectedFilters({
          ...selectedFilters,
          [field]: [...temp],
        });
      } else {
        const temp = selectedFilters[field].filter(
          (curElem) => curElem !== value
        );
        setSelectedFilters({
          ...selectedFilters,
          [field]: [...temp],
        });
      }
    } else if (type === "date") {
      //for date e.target is not working and inside e we are actually getting date
      setSelectedFilters({
        ...selectedFilters,
        [field]: e,
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [field]: value,
      });
    }
  };
  const handleClearChange = (field) => {
    setSelectedFilters({
      ...selectedFilters,
      [field]: "",
    });
  };
  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };

  const resetFilters = () => {
    // setSelectedFilters({})
    const index = Object.entries(selectedFilters)?.findIndex(
      (curElem) => curElem[1].length || typeof curElem[1] === "number"
    );
    if (index > -1) {
      setSelectedFilters({
        location: "",
        jobType: "",
        startDate: "",
        requiredLanguage: [],
        requiredMainSkill: [],
        sortBy: "",
      });
    }
  };

  return (
    <>
      {loader && <PageLoader />}
      <section className="jobsSection">
        <div className="container">
          <Grid item xs={12} className="findHelperTitle mb-5" textAlign="center">
            <Typography variant="h2" className="title">
              {t("job_public_title")}
            </Typography>
            <Typography variant="body1">
              {t("job_public_content")}
            </Typography>
          </Grid>{" "}
          <div className="row">
            <div className="col-md-3">
              <div className="mainSorting">
                <ApplicantHeaderFilter
                  className="applicantHeader w-100"
                  handleSelectJobFilters={handleSelectJobFilters}
                  handleClearChange={handleClearChange}
                  selectedFilters={selectedFilters}
                  isFeatureJob={true}
                />
              </div>
              <FeatureJobsSideFilter
                selectedFilters={selectedFilters}
                handleSelectJobFilters={handleSelectJobFilters}
                handleClearChange={handleClearChange}
                resetFilters={resetFilters}
              />
            </div>
            <div className="col-md-9">
              <div className="applicants">
                <Typography variant="h5" className="mb-3">
                  <strong>{t("feature_job_section_title")}</strong>
                </Typography>
                <div className="row">
                  {jobList?.length ? (
                    jobList?.map((jobDetail, index) => (
                      <div className="col-md-6 mb-4">
                        <MyPostedJobCard jobDetails={jobDetail} />
                      </div>
                      // <Grid key={index} item lg={4} md={6} xs={12}>
                      // </Grid>
                    ))
                  ) : (
                    <NoDataFound title={t("no_job_found")} />
                  )}
                </div>
                {totalPages > 0 && (
                  <div className="d-flex justify-content-center">
                    <Pagination
                      count={totalPages}
                      variant="outlined"
                      shape="rounded"
                      onChange={handleChangePagination}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <Container className="jobsContainer pageContainer">
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
          <Grid item xs={12} textAlign="center" className="pt-4">
            <ArrowButton title={t("find_more_jobs")} />
          </Grid>
        </Container> */}
      </section>
    </>
  );
};

export default FeatureJobs;
