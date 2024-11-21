import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FeatureIcon from "../../../Assets/SVGIcons/FeatureIcon";
import ArrowButton from "../ArrowButton";
import { useTranslation } from "react-i18next";
import {
  applyJob,
  getProfilePercentage,
  saveJob,
  unSaveJob,
} from "../../../Services/JobsServices/JobServices";
import { JOB_STATUS, successType } from "../../../Constant/Constant";
import { toastMessage } from "../../../Utils/toastMessages";
import { calculateTimeAgo } from "../../../Utils/timeAgo";
import { useSelector } from "react-redux";
import AppliedBadgeIcon from "../../../Assets/SVGIcons/AppliedBadgeIcon";
import SaveBadgeIcon from "../../../Assets/SVGIcons/SaveBadgeIcon";
import HideTextWithStar from "../HideTextWithStar";

export default function JobCard({
  jobDetails,
  setLoader,
  setJobDetails,
  setOpenModal,
  badge,
}) {
  const navigate = useNavigate();
  const handleBookmarkToggle = () => {};
  const { t } = useTranslation();
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const userId = localStorage.getItem("userId");
  const { profilePercentage } = useSelector((state) => state.common);
  useEffect(() => {
    if (profilePercentage === 100) {
      setIsProfileCompleted(true);
    }
  }, []);

  const hadleApplyJob = (jobId) => {
    if (profilePercentage == 100) {
      setOpenModal(true);
      return;
    }
    setLoader(true);
    const payload = {
      jobId: jobId,
    };
    applyJob(userId, payload)
      .then((res) => {
        setLoader(false);
        console.log(res);
        toastMessage(t("apply_job_success_msg"), successType);
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(t("failure_message"));
        console.log(err);
      });
  };
  const hadleSaveJob = (jobId) => {
    if (profilePercentage == 100) {
      setOpenModal(true);
      return;
    }
    setLoader(true);
    const payload = {
      jobId: jobId,
    };
    saveJob(userId, payload)
      .then((res) => {
        setLoader(false);
        toastMessage(t("job_saved_success_msg"), successType);
        console.log(res);
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(t("failure_message"));
        console.log(err);
      });
  };
  const handleUnsaveJob = (jobId) => {
    if (profilePercentage !== 100) {
      setOpenModal(true);
      return;
    }
    setLoader(true);
    unSaveJob(userId, jobId)
      .then((res) => {
        setLoader(false);
        toastMessage(t("job_unsaved_success_msg"), successType);
        console.log(res);
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(t("failure_message"));
        console.log(err);
      });
  };
  const handleNavigateToJobDetail = () => {
    if (!isProfileCompleted) {
      setOpenModal(true);
      return;
    }
    navigate(`/helper/job-detail/${jobDetails._id}`)

  };

  return (
    <Grid item md={12}>
      <Box className="JobBox">
        <Box className="JobInfoBox">
          <Box className="jobsFlex">
            <img src="/work.svg" alt="Logo" className="work" />
            <Box className="JobTitle" onClick={handleNavigateToJobDetail}>
              <Typography variant="h6">
                <HideTextWithStar
                  showText={isProfileCompleted}
                  text={jobDetails?.jobDetails?.jobTitle}
                />
              </Typography>
              <Typography variant="body1">
                <HideTextWithStar
                  showText={isProfileCompleted}
                  text={jobDetails?.basicInfo?.jobLocation}
                />
              </Typography>
            </Box>
          </Box>
          <Box className="JobdetailBottom">
            <List className="jobDescMini">
              <ListItem>
                <strong>{t("start_date")}:</strong>{" "}
                {jobDetails?.basicInfo?.jobStartDate}
              </ListItem>
              <ListItem>
                <strong>{t("type")}:</strong>
                {jobDetails?.basicInfo?.jobType}
              </ListItem>
              <ListItem>
                <strong>{t("experience")}:</strong> Expert
              </ListItem>
              <ListItem>
                <strong>{t("location")}:</strong>{" "}
                <HideTextWithStar
                  showText={isProfileCompleted}
                  text={jobDetails?.basicInfo?.jobLocation}
                />
              </ListItem>
              <ListItem>
                <strong>{t("language")}:</strong>{" "}
                {jobDetails?.requiredSkills?.language?.length > 0
                  ? jobDetails?.requiredSkills?.language.join(", ")
                  : ""}
              </ListItem>
              <ListItem>
                <strong>{t("map_location")}:</strong>{" "}
                <span>
                  <i>3km, hong kong</i>{" "}
                  <a
                    target="_blank"
                    href={`http://maps.google.com/?q=${jobDetails?.basicInfo?.jobLocation}`}
                  >
                    {t("see_map")}
                  </a>
                </span>
              </ListItem>
            </List>
            <Typography className="postedTime">
              {t("posted")} {calculateTimeAgo(jobDetails?.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Box className="JobInfoRight">
          <IconButton
            onClick={() => handleBookmarkToggle(2)}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            {jobDetails?.isSavedByUser || badge === JOB_STATUS.SAVED? (
              <BookmarkIcon
                style={{ color: "#0A6259" }}
                onClick={() => handleUnsaveJob(jobDetails._id)}
              />
            ) : (
              <BookmarkBorderIcon
                style={{ color: "#0A6259" }}
                onClick={() => hadleSaveJob(jobDetails._id)}
              />
            )}
          </IconButton>
          {badge === JOB_STATUS.APPLIED && <AppliedBadgeIcon />}
          {badge === JOB_STATUS.SAVED && <SaveBadgeIcon />}

          {jobDetails?.isFeatured && (
            <div className="featuredTag">
              <FeatureIcon />
              {t("featured")}
            </div>
          )}

          <Typography variant="h6">
            <HideTextWithStar
              showText={isProfileCompleted}
              text={jobDetails?.jobDetails?.jobTitle}
            />
          </Typography>
          <Typography variant="body1">
            {jobDetails?.jobDetails?.jobDescription}
          </Typography>
          <Box className="buttonFlex">
            <Button
              className="green-btn small"
              onClick={() => navigate("/helper/chat")}
            >
              {t("contact")}
            </Button>
            {badge ? (
              <ArrowButton
                title={t("view_job")}
                onClick={() => navigate(`/helper/job-detail/${jobDetails._id}`)}
              />
            ) : (
              <ArrowButton
                title={t("apply_job")}
                onClick={() => hadleApplyJob(jobDetails._id)}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
