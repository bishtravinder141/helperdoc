import React, { useState } from "react";
import { Box, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ThreeDotsSvgIcon from "../../../ThreeDotsSvgIcon";
import { useLocation, useNavigate } from "react-router-dom";

const MyPostedJobCard = ({ jobDetails }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedRole = localStorage.getItem("selectedRole");
  console.log(selectedRole,"selectedRole")

  return (
    <Box className="jobPost">
      <Box className="profileRole">
        <Typography variant="h6">DOMESTIC HELP1</Typography>
        {(selectedRole === "agency" || selectedRole === "employer") && (
          <>
            <div
              id="basic-button"
              className="cursor-pointer three-dot-icon"
              aria-controls={showMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={showMenu ? "true" : undefined}
              onClick={(e) => {
                setShowMenu((prev) => true);
                setAnchorEl(e.currentTarget);
              }}
            >
              <ThreeDotsSvgIcon />
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={showMenu}
              onClose={() => setShowMenu((prev) => false)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  selectedRole === "agency"
                    ? navigate(`/agency/job-details/${jobDetails?._id}`)
                    : selectedRole === "employer" &&
                      navigate("/employer/my-job-post");
                }}
              >
                {t("view")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  selectedRole==="agency"
                    ? navigate(`/agency/job-post/${jobDetails?._id}`)
                    : selectedRole === "employer" &&
                      navigate("/employer/job-post");
                }}
              >
                {t("edit")}
              </MenuItem>
              {/* <MenuItem>{t("reactivate")}</MenuItem> */}
            </Menu>
          </>
        )}
        {/* <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div> */}
      </Box>
      <Box className="profileInner">
        <Box>
          <Typography className="job_title">
            {jobDetails.jobDetails?.jobTitle}
          </Typography>
          <Typography className="status active">
            {jobDetails.jobStatus}
          </Typography>
        </Box>
        <Typography className="job_desc">
          {jobDetails.jobDetails?.jobDescription}
        </Typography>
      </Box>
      <Box className="profileInsights">
        <Typography className="job_title">
          <span>{jobDetails.applicants?.length}</span> New Application{" "}
        </Typography>
        <Typography className="job_desc">
          <span>0</span> Conversation
        </Typography>
      </Box>
    </Box>
  );
};

export default MyPostedJobCard;
