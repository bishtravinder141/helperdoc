import React from "react";
import { AGENCY_LIST_LIMIT } from "../constant";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

const SingleAgencyTableRow = ({
  rowData,
  index,
  currentPage,
  setShowVerificationModal,
}) => {
  const navigate = useNavigate();
  const { email, phoneNumber, fullName, userId, planStatus, userPlan } =
    rowData;
  return (
    <tr>
      <td>
        <div>
          <span className="strong">
            #{(currentPage - 1) * AGENCY_LIST_LIMIT + index + 1}
          </span>
        </div>
      </td>
      <td>
        <div>
          <span className="strong">{fullName}</span>
        </div>
      </td>
      <td>
        <div>
          <span className="strong">{email}</span>
        </div>
      </td>
      <td>
        <div>
          <span className="strong">{phoneNumber}</span>
        </div>
      </td>
      <td>
        <div>
          <span className="strong">Invoice</span>
        </div>
      </td>
      <td>  
        <div>
          <span className="strong">{userPlan}</span>
        </div>
      </td>
      <td>
        <div>
          <span className="strong">
            {planStatus ? t("active") : planStatus === false && t("inactive")}
          </span>
        </div>
      </td>
      <td>
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate(`/admin/agency-detail/${userId}`);
          }}
        >
          <Visibility />
        </div>
      </td>
    </tr>
  );
};

export default SingleAgencyTableRow;
