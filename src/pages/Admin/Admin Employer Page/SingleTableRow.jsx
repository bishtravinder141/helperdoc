import { Visibility } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { EMPLOYER_LIST_LIMIT } from "../constant";

const SingleTableRow = ({ rowData, index, currentPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { email, phoneNumber, fullName ,userId,nationality,planStatus,userPlan} = rowData;
  return (
    <tr>
      <td>
        <div className="jobTitle">
          <span className="strong">
            <b>#{(currentPage - 1) * EMPLOYER_LIST_LIMIT + index + 1}</b>
          </span>
        </div>
      </td>
      <td>
        <div className="count">
          <p> {fullName && fullName}</p>
        </div>
      </td>
      <td>
        <div className="count">
          <span> {email && email}</span>
        </div>
      </td>
      <td>
        <span>{phoneNumber && phoneNumber}</span>
      </td>
      <td>
        <span>
          {nationality && nationality}
        </span>
      </td>
      <td>
         {userPlan && userPlan}
      </td>
      <td>
        <span>
          {planStatus &&  (planStatus === false) ? t("inactive") : t("active")}
        </span>
      </td>
      <td>
        <div className="cursor-pointer" onClick={()=>{navigate(`/admin/employer-detail/${userId}`)}}>
          <Visibility />
        </div>
      </td>
    </tr>
  );
};

export default SingleTableRow;
