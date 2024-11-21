import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export default function PostYourFirstJobView({
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
        {title}{" "}
      </Typography>
      <Typography variant="body1">{msg}</Typography>
      <Link
        to={`/${isAgency ? "agency" : "employer"}/job-post`}
        className="green-btn small text-center"
      >
        {t("post_a_job")}
      </Link>
    </div>
  );
}
