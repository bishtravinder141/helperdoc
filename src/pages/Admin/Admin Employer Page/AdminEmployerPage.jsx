import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getEmployersList } from "../../../Services/AdminServices/AdminApi";
import {
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TableRow,
  Typography,
} from "@mui/material";
import NoDataFound from "../../../Components/Common/NoDataFound";
import SingleTableRow from "./SingleTableRow";
import { Box } from "@mui/system";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { useSelector } from "react-redux";
import PageLoader from "../../../Components/Common/Loader/PageLoader";
import SortBySelect from "../../../Components/Common/FormFields/SortBySelect";
import { EMPLOYER_LIST_LIMIT, EMPLOYER_TABLE_HEADER_DATA } from "../constant";
import AdminHeaderSection from "../../../Components/Common/AdminHeaderSection";
import TableHeader from "../../../Components/Common/TableHeader";

const AdminEmployerPage = () => {
  const { t } = useTranslation();
  const [employerList, setEmployerList] = useState([]);
  const [sortByFilter, setSortByFilter] = useState("Newest");
  const [totalPages, setTotalPages] = useState(null);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const { sortBy } = useSelector((state) => state.common);

  useEffect(() => {
    const query = `page=${currentPage?.page}&limit=${EMPLOYER_LIST_LIMIT}&filter=${sortByFilter}`;
    handleGetEmployerList(query);
  }, [currentPage, sortByFilter]);
  const handleGetEmployerList = (query) => {
    setLoader(true);
    getEmployersList(query)
      .then((res) => {
        setEmployerList(res?.data?.users);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };

  return (
    <div>
      {loader && <PageLoader />}
      <AdminHeaderSection
        setSortByFilter={setSortByFilter}
        sortByFilter={sortByFilter}
        heading={t("employer")}
      />
      <div className="row">
        <div className="col-xxl-12 col-md-12 col-12">
          <div className="global-table table-responsive">
            <table className="table align-middle">
              <TableHeader data = {EMPLOYER_TABLE_HEADER_DATA}/>
              <tbody>
                {employerList?.length ? (
                  employerList.map((curEmployer, index) => (
                    <SingleTableRow
                      key={index}
                      rowData={curEmployer}
                      index={index}
                      currentPage={currentPage?.page}
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
  );
};

export default AdminEmployerPage;
