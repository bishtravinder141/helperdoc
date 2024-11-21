import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTransactionList } from "../../../Services/AdminServices/AdminApi";
import { TRANSACTION_LIMIT, TRANSACTION_TABLE_HEADER_DATA } from "../constant";
import AdminHeaderSection from "../../../Components/Common/AdminHeaderSection";
import { Pagination } from "@mui/material";
import NoDataFound from "../../../Components/Common/NoDataFound";
import SingleTransactionTableRow from "./SingleTransactionTableRow";
import TableHeader from "../../../Components/Common/TableHeader";

const AdminTransaction = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [sortByFilter, setSortByFilter] = useState("Newest");
  const [loader, setLoader] = useState(true);
  const [transactionList, setTransactionList] = useState();
  const [totalPages,setTotalPages] = useState(null)
  useEffect(() => {
    setLoader(true);
    const query = `page=${currentPage.page}&limit=${TRANSACTION_LIMIT}&filter=${sortByFilter}`;
    getTransactionList(query) 
      .then((res) => {
        // setTransactionList(res?.data?.);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, [currentPage, sortByFilter]);

  const handleChangePagination = (event, page) => {
    setCurrentPage({ page: page });
  };

  return (
      <>
        <AdminHeaderSection
          heading={t("transaction")}
          sortByFilter={sortByFilter}
          setSortByFilter={setSortByFilter}
        />{" "}
        <div className="row">
          <div className="col-xxl-12 col-md-12 col-12">
            <div className="global-table table-responsive">
              <table className="table align-middle">
                <TableHeader data={TRANSACTION_TABLE_HEADER_DATA}/>
                <tbody>
                  {transactionList?.length ? (
                    transactionList.map((rowData, index) => (
                      <SingleTransactionTableRow
                        key={index}
                        rowData={rowData}
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
      </>
  );
};

export default AdminTransaction;
