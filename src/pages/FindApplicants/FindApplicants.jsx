import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import SideFilters from "./SideFilters";
import ApplicantHeaderFilter from "./ApplicantHeaderFilter";
import {
  getAllUsersList,
  getApplicants,
  getJobByUserId,
} from "../../Services/JobsServices/JobServices";
import ApplicantCard from "./ApplicantCard";
import { Pagination, Typography } from "@mui/material";
import ApplicantModal from "./ApplicantModal";
import { buildQueryFromSelectedFilters } from "./constant";
import PostYourFirstJobView from "../../Components/Common/PostYourFirstJobView";
import NoDataFound from "../../Components/Common/NoDataFound";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSeadersData } from "../../Redux/CommonSlice";
import { useLocation } from "react-router-dom";

const FindApplicants = () => {
  const { t } = useTranslation();
  const {pathname} = useLocation();
  const token = localStorage.getItem("token");
  const state = useSelector((state) => state.common);
  const dispatch = useDispatch();
  // const jobId = localStorage.getItem("jobId");
  const userId = localStorage.getItem("userId");
  const APPLICANTS_PER_PAGE = 5;
  const [pageLoader, setPageLoader] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [jobId, setJobId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    jobType: "",
    gender: "",
    language: [],
    skills: [],
    workExperience: [],
    nationality: "",
    workExperienceLocation: "",
    ageMin: "",
    ageMax: "",
    fullName: "",
    sortBy: "",
    contractStatus: "",
  });
  const [showApplicantModal, setShowApplicantModal] = useState({
    show: false,
    applicantModalData: null,
  });
  const handleApplicantModal = (data) => {
    setShowApplicantModal({
      show: !showApplicantModal.show,
      applicantModalData: data,
    });
  };

  useEffect(() => {
    const queryFromSelectedFilters =
      buildQueryFromSelectedFilters(selectedFilters);
    const query = `${queryFromSelectedFilters}&page=${currentPage.page}&limit=${APPLICANTS_PER_PAGE}`;
    handleGetApplicants(query);
  }, [currentPage, selectedFilters]);

  useEffect(() => {
    if (token) {
      handleGetJobByUserId();
    }
    if (state?.religion) {
      getSeeders();
    }
  }, []);
  const handleGetApplicants = (query) => {
    setPageLoader(true);
    getAllUsersList(query)
      .then((res) => {
        const response = res?.data;
        setTotalPages(response?.totalPages);
        setApplicants(response?.profiles);
      })
      .catch((err) => console.log(err))
      .finally(() => setPageLoader(false));
  };
  const handleGetJobByUserId = () => {
    setPageLoader(true);
    const query = `?userId=${userId}&page=1&limit=1`;
    getJobByUserId(query)
      .then((res) => {
        setPageLoader(false);
        if (res?.data?.jobPostings.length > 0) {
          setJobId(true);
        }
      })
      .catch((err) => {
        setPageLoader(false);
        console.log(err, "error!!!");
      })
      .finally(() => setPageLoader(false));
  };
  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };

  const getSeeders = async () => {
    await dispatch(getAllSeadersData());
  };

  const handleSelectJobFilters = (e, field, type) => {
    const { value, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
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
    } else if (type === "select") {
      setSelectedFilters({
        ...selectedFilters,
        [field]: value,
      });
    } else if (type === "slider") {
      setSelectedFilters({
        ...selectedFilters,
        ageMin: value[0],
        ageMax: value[1],
      });
    } else if (type === "radio") {
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
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [field]: value,
      });
    }
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
        gender: "",
        language: [],
        skills: [],
        workExperience: [],
        nationality: "",
        workExperienceLocation: "",
        ageMin: "",
        ageMax: "",
        fullName: "",
        sortBy: "",
        contractStatus: "",
      });
    }
  };
  const handleClearChange = (field) => {
    setSelectedFilters({
      ...selectedFilters,
      [field]: "",
    });
  };
  return (
    <>
      {pageLoader && <PageLoader />}
      {!jobId && !pathname === "/applicants" ? (
        <PostYourFirstJobView
          title="No applicants found"
          msg="Post Your fist job to view applicants"
        />
      ) : (
        <div>
          {" "}
          <HelperDashboardSubHeader
            title={t("find_applicant")}
            description={t("find_applicant_you_love")}
            progessBar={false}
          />
          <ApplicantHeaderFilter
            className="applicantHeader"
            handleSelectJobFilters={handleSelectJobFilters}
            handleClearChange={handleClearChange}
            selectedFilters={selectedFilters}
          />
          <div className="row">
            <div className="col-md-3">
              <SideFilters
                handleSelectJobFilters={handleSelectJobFilters}
                handleClearChange={handleClearChange}
                selectedFilters={selectedFilters}
                resetFilters={resetFilters}
              />
            </div>
            <div className="col-md-9">
              <div className="applicants">
                <Typography variant="h5" className="mb-3">
                  <strong>{t("applicants")}</strong>
                </Typography>
                {applicants?.length ? (
                  applicants?.map((curApplicant, index) => (
                    <Fragment key={index}>
                      <ApplicantCard
                        curApplicant={curApplicant}
                        handleApplicantModal={handleApplicantModal}
                      />
                    </Fragment>
                  ))
                ) : (
                  <NoDataFound title={t("no_applicant_found")} />
                )}
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
      )}
      {showApplicantModal.show && (
        <ApplicantModal
          showModal={showApplicantModal.show}
          applicantModalData={showApplicantModal?.applicantModalData}
          toggleModal={handleApplicantModal}
        />
      )}
    </>
  );
};

export default FindApplicants;
