import React from "react";
import "./progressBar.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProfileCompletionProgressBar({ profilePercentage }) {
  const {t} = useTranslation();
  return (
    <div className="complete-profile-right text-left">
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${profilePercentage}%` }}
          aria-valuenow={`${profilePercentage}`}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <p>
        <span>{profilePercentage}%</span> {t("profile_complete_message")} {">"}{" "}
        <Link to={"/helper/my-profile"}>{t("get_verified")}</Link> +20%
      </p>
    </div>
  );
}
