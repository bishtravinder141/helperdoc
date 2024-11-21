import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import PageLoader from "../../../Components/Common/Loader/PageLoader";
import { useTranslation } from "react-i18next";
import { getAgencyList } from "../../../Services/AdminServices/AdminApi";
import { AGENCY_LIST_LIMIT, AGENCY_TABLE_HEADER_DATA } from "../constant";
import NoDataFound from "../../../Components/Common/NoDataFound";
import SingleAgencyTableRow from "./SingleAgencyTableRow";
import AdminHeaderSection from "../../../Components/Common/AdminHeaderSection";
import { useNavigate } from "react-router-dom";
import AdminVerificationModal from "../../../Components/Common/Modals/AdminVerificationModal";
import TableHeader from "../../../Components/Common/TableHeader";

const AdminAgencyPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [agencyList, setAgencyList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [sortByFilter, setSortByFilter] = useState("Newest");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const query = `page=${currentPage.page}&limit=${AGENCY_LIST_LIMIT}&filter=${sortByFilter}`;
    handleGetAgencyList(query);
  }, [currentPage, sortByFilter]);
  const handleGetAgencyList = (query) => {
    setLoader(true);
    getAgencyList(query)
      .then((res) => {
        setAgencyList(res?.data?.users);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };

  const handleDecline = () => {
    setShowVerificationModal((prev) => false);
  };
  const handleVerify = () => {
    // navigate(``)
  };
  return (
    <>
      {loader && <PageLoader />}
      <AdminHeaderSection
        heading={t("agency")}
        sortByFilter={sortByFilter}
        setSortByFilter={setSortByFilter}
      />
      <div>
        <div className="row">
          <div className="col-xxl-12 col-md-12 col-12">
            <div className="global-table table-responsive">
              <table className="table align-middle">
                <TableHeader data={AGENCY_TABLE_HEADER_DATA}/>
                <tbody>
                  {agencyList?.length ? (
                    agencyList.map((rowData, index) => (
                      <SingleAgencyTableRow
                        key={index}
                        rowData={rowData}
                        index={index}
                        currentPage={currentPage.page}
                        setShowVerificationModal = {setShowVerificationModal}
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
          handleDecline={handleDecline}
          handleVerify={handleVerify}
        />
      )}
    </>
  );
};

export default AdminAgencyPage;
