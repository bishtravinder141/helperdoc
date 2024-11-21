// JobsList.tsx
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import BookmarkedJobs from "./BookmarkedJobs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "react-responsive-pagination/themes/classic.css";
import "./HelperDashboard.css"; // Import the CSS file
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideMenuBar from "../../Components/Common/SideMenubar/SideMenuBar";
import HelperUserDetails from "../../Components/Signup/HelperRegistrationSteps/HelperUserDetails";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import { getProfileData } from "../../Services/ProfileServices/ProfileService";
import ProfileDetailForm from "../../Components/Common/Profile/ProfileDetailForm";
import JobCard from "../../Components/Common/JobCard/JobCard";

const MyProfile = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [loader, setLoader] = useState(true);
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getProfileData(userId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProfilePicUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePic(event.target.files[0]);
    }
  };
  const handleViewPublicProfile = () => {
    navigate("/helper_public_profile", { state: location.state });
  };

  const recommendedJobsSaved = [
    {
      id: 4,
      start_date: "3/3/24",
      language: "English",
      experience: "Expert",
      title: "Nanny / Housekeeper",
      titleRight: "Nanny / Housekeeper",
      description: "Lebanese family searching for a nanny / housekeeper",
      location: "Hong Kong",
      date: "From 27 Feb 2024",
      type: "Full Time",
      image: "image_5.png",
      map_location: "3km, hong kong",
    },
  ];
  const isBookmarked = (jobId) => {
    return bookmarkedJobs.includes(jobId);
  };

  const handleBookmarkToggle = (jobId) => {
    setBookmarkedJobs((prevBookmarkedJobs) => {
      if (prevBookmarkedJobs.includes(jobId)) {
        return prevBookmarkedJobs.filter((id) => id !== jobId);
      } else {
        return [...prevBookmarkedJobs, jobId];
      }
    });
  };
  return (
    <>
      <Box maxWidth="xl" sx={{ padding: "20px" }}>
        <HelperDashboardSubHeader
          title={t("profile")}
          description={t("manage_or_update_profile")}
        />
        <ProfileDetailForm />
        
        {/* <BookmarkedJobs
          jobs={recommendedJobsSaved}
          handleBookmarkToggle={handleBookmarkToggle}
          isBookmarked={isBookmarked}
        /> */}
        {/* <JobCard /> */}
      </Box>
    </>
  );
};

export default MyProfile;
