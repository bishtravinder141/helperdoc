import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export default function FoundApplicant({
  title = "Post Your First Job",
  msg = "Post your first job to find best talents",
}) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isAgency = pathname.includes("/agency/");
  return (
    <div className="postJobfirst d-flex align-items-center justify-content-center flex-column">
      <Typography variant="h5" className="fw-bold mb-2">
        {" "}
        Not Found Applicant?
      </Typography>
      <Typography variant="body1" className="text-center">Find candidate who perfectly matches your job needs.</Typography>
      <Link
        to={`/${isAgency ? "agency" : "employer"}/find-applicant`}
        className="green-btn small text-center"
      >
        {t("find_applicant")}
      </Link>
    </div>
  );
}
