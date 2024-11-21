import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  VerifyUser,
  getJobSeekerList,
} from "../../../Services/AdminServices/AdminApi";
import PageLoader from "../../../Components/Common/Loader/PageLoader";
import AdminHeaderSection from "../../../Components/Common/AdminHeaderSection";
import { Pagination, Tabs, Tab } from "@mui/material";
import {
  JOB_SEEKER_LIST_LIMIT,
  JOB_SEEKER_TABLE_HEADER_DATA,
} from "../constant";
import NoDataFound from "../../../Components/Common/NoDataFound";
import SingleJobSeekerTableRow from "./SingleJobSeekerTableRow";
import AdminVerificationModal from "../../../Components/Common/Modals/AdminVerificationModal";
import { generateKey, successType } from "../../../Constant/Constant";
import { toastMessage } from "../../../Utils/toastMessages";
import TableHeader from "../../../Components/Common/TableHeader";
const JOB_SEEKER_TABS = {
  newRequest: "new_request",
  activeUser: "active_user",
  inactiveUser: "inactive_user",
};
const JOB_SEEKER_HEADER_DATA = [];
const AdminJobSeeker = () => {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(true);
  const [sortByFilter, setSortByFilter] = useState("Newest");
  const [totalPages, setTotalPages] = useState(null);
  const [activeTab, setActiveTab] = useState(JOB_SEEKER_TABS.newRequest);
  const [jobSeekerList, setJobSeekerList] = useState([]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState({
    page: 1,
  });
  const [verificationModalData, setVerificationModalData] = useState({
    document: null,
    userId: null,
  });

  useEffect(() => {
    setLoader(true);
    handleGetJobSeekerList();
  }, [currentPage, sortByFilter, activeTab]);

  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };

  const handleGetJobSeekerList = () => {
    const query = `page=${currentPage?.page}&limit=${JOB_SEEKER_LIST_LIMIT}&filter=${sortByFilter}&tab=${activeTab}`;

    getJobSeekerList(query)
      .then((res) => {
        setJobSeekerList(res?.data?.users);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  const handleVerifyAction = (userId, document, action) => {
    setLoader(true);
    const generatedKey = generateKey(document[0]);
    const payload = {
      [generatedKey]: action === "verify" ? true : false,
    };
    setShowVerificationModal(false);
    VerifyUser(userId, payload)
      .then((res) => {
        setShowVerificationModal(false);
        {
          action === "verify"
            ? toastMessage(t("verified_msg"), successType)
            : toastMessage(t("decline_msg"), successType);
        }
        handleGetJobSeekerList();
      })
      .catch((err) => {
        if (err.response.data.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
      })
      .finally(() => setLoader(false));
  };
  return (
    <>
      {loader && <PageLoader />}
      <div>
        <AdminHeaderSection
          heading={t("job_seeker")}
          sortByFilter={sortByFilter}
          setSortByFilter={setSortByFilter}
        />
        <Tabs
          className="customTabs"
          variant="fullWidth"
          value={activeTab}
          onChange={(event, newValue) => {
            setActiveTab(newValue);
            setCurrentPage({ page: 1 });
          }}
          textColor="primary"
          indicatorColor="primary"
          aria-label="tabs for employer dashboard"
        >
          {Object.entries(JOB_SEEKER_TABS).map((curElem, index) => (
            <Tab key={index} label={t(curElem[1])} value={curElem[1]} />
          ))}
        </Tabs>
        <div className="row">
          <div className="col-xxl-12 col-md-12 col-12">
            <div className="global-table table-responsive">
              <table className="table align-middle">
                <TableHeader data = {JOB_SEEKER_TABLE_HEADER_DATA}/>
                <tbody>
                  {jobSeekerList?.length ? (
                    jobSeekerList.map((rowData, index) => (
                      <SingleJobSeekerTableRow
                        key={index}
                        rowData={rowData}
                        setVerificationModalData={setVerificationModalData}
                        setShowVerificationModal={setShowVerificationModal}
                        // setShowVerificationModal = {setShowVerificationModal}
                      />
                    ))
                  ) : (
                    <NoDataFound title={t("no_data_found")} />
                  )}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center mt-2">
              {totalPages > 0 && (
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChangePagination}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showVerificationModal && (
        <AdminVerificationModal
          showModal={showVerificationModal}
          handleVerifyAction={handleVerifyAction}
          verificationModalData={verificationModalData}
          setShowVerificationModal={setShowVerificationModal}
        />
      )}
    </>
  );
};

export default AdminJobSeeker;
