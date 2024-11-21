import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  FormLabel,
  MenuItem,
  Select,
  IconButton,
  Typography,
  List,
  ListItem,
  Tabs,
  Tab,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { useNavigate, useParams } from "react-router-dom";
import { getHelperPublicProfile } from "../../Services/ProfileServices/ProfileService";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import moment from "moment";
import { toastMessage } from "../../Utils/toastMessages";
import { useTranslation } from "react-i18next";
import { addApplicantToFavorites } from "../../Services/JobsServices/JobServices";
import { successType } from "../../Constant/Constant";
import NoDataFound from "../../Components/Common/NoDataFound";

const expectedDuties = {
  care: ["Child (4-12)"],
  cooking: ["Indian", "Vegetarian", "Chinese"],
  householdChore: ["Cleaning", "Car Washing"],
};
const ViewFullProfile = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showContactNumber, setShowContactNumber] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [helperDetails, setHelperDetails] = useState(null);
  useEffect(() => {
    handleGetHelperPublicProfile();
  }, []);
  const handleGetHelperPublicProfile = () => {
    setLoader(true);
    getHelperPublicProfile(id)
      .then((res) => {
        setHelperDetails(res?.data);
        setIsFavourite(res?.data?.isFavorite);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
      })
      .finally((res) => setLoader(false));
  };
  const saveApplicants = () => {
    setLoader(true);
    addApplicantToFavorites(id)
      .then((res) => {
        setLoader(false);
        setIsFavourite(true);
        toastMessage(t("added_favorite_success"), successType);
      })
      .catch((err) => {
        setLoader(false);
        if (err?.response?.data?.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
        console.log(err, "error!!!");
      });
  };
  return (
    <div>
      {loader && <PageLoader />}
      <Grid container spacing={3} m={0} mt={4} className="customGridW">
        <Grid md={3} className="applicantSidebar">
          <Box mt={3} className="helpder_details_dmc">
            <Button
              className="green-btn small mb-2"
              mt={1}
              onClick={() => navigate(`/employer/chat/${id}`)}
            >
              {t("send_message")}
            </Button>
            {/* <Button className="green-btn small mb-2" mt={1}>
              {t("get_phone_number")}
            </Button> */}
            <Button
              className="green-btn small mb-2 bottomDetails button.green-btn d-flex subcloseButton"
              mt={1}
              onClick={() => setShowContactNumber(!showContactNumber)}
            >
              {showContactNumber ? (
                <>
                  {helperDetails?.phoneNumber}
                  <IconButton
                    sx={{ visibility: "visible" }}
                    onClick={() => setShowContactNumber(false)}
                    className="crossButton"
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </>
              ) : (
                t("get_phone_number")
              )}
            </Button>
            <Button
              className="green-btn small mb-2"
              mt={1}
              disabled={isFavourite}
              onClick={saveApplicants}
            >
              {isFavourite
                ? t("already_added_to_favourite")
                : t("add_to_favourites")}
            </Button>
          </Box>
        </Grid>
        <Grid md={9}>
          <Box className="applicantDetails">
            <Box className="employerHeader">
              <Box className="primary">
                <Box className="helperImg">
                  <img
                    src={
                      helperDetails?.profilePicURL
                        ? helperDetails?.profilePicURL
                        : "/demo-user.png"
                    }
                    alt="userimg"
                  />
                </Box>
                <Box className="helperContent">
                  {helperDetails?.aboutYou?.fullName && (
                    <Typography variant="h5">
                      {helperDetails?.aboutYou?.fullName}
                    </Typography>
                  )}
                  {helperDetails?.aboutYou?.location && (
                    <Box className="locationDate">
                      <Box className="location">
                        {helperDetails?.aboutYou?.location}
                      </Box>
                      <Box className="date">{`${moment().diff(
                        helperDetails?.aboutYou?.dob,
                        "years"
                      )} years`}</Box>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box className="secondary"></Box>
            </Box>

            <Box className="highlightsApplicant" mt={4}>
              <Typography variant="h5">
                I am a fast learner trust worthy and honest
              </Typography>
              <Typography variant="body1">
                Good day mam I'm interested to apply
              </Typography>
              <Typography variant="body1">
                Be as precise as possible in your ad in order to get relevant
                applications. You will then be able to further discuss with
                potential applicants through direct messages and set up an
                interview. Be as precise as possible in your ad in order to get
                relevant applications. You will then be able to further discuss
                with potential applicants through direct messages and set up an
                interview.
              </Typography>
              {/* <Typography variant="h5">{t("possible_working_countries")}</Typography>
              <Typography variant="body1">
                Mery Grace is willing to go to Hong kong
              </Typography> */}

              {helperDetails?.aboutYou?.currentEmploymentStatus && (
                <>
                  <Typography variant="h5">
                    {t("current_employment_status")}
                  </Typography>
                  <Typography variant="body1">
                    {helperDetails?.aboutYou?.fullName} current employment is{" "}
                    {helperDetails?.aboutYou?.currentEmploymentStatus}
                  </Typography>
                </>
              )}
              {helperDetails?.aboutYou?.religion && (
                <>
                  <Typography variant="h5">{t("religion")}</Typography>
                  <Typography variant="body1">
                    {`${helperDetails?.aboutYou?.fullName}'s religion is ${helperDetails?.aboutYou?.religion}`}
                  </Typography>
                </>
              )}
              <Box className="expectedDuties">
                <Typography variant="h5">{t("expected_duties")}</Typography>
                {/* {Object.keys(expectedDuties).map((skill) => (
                  <Box className="dutiesList">
                    <Typography variant="body1">{skill}</Typography>
                    <List>
                      {expectedDuties[skill] &&
                        expectedDuties[skill].map((opt) => (
                          <ListItem>{opt}</ListItem>
                        ))}
                    </List>
                  </Box>
                ))} */}
                {helperDetails?.aboutYou?.skills?.length && (
                  <Box className="dutiesList">
                    {helperDetails?.aboutYou?.skills?.map((curSkill, idx) => (
                      <ListItem key={idx}>{curSkill}</ListItem>
                    ))}
                  </Box>
                )}
              </Box>

              {helperDetails?.languages?.native && (
                <>
                  <Typography variant="h5">{t("spoken_languages")}</Typography>
                  <Typography variant="body1">
                    {`${helperDetails?.aboutYou?.fullName}'s language is ${helperDetails?.languages?.native}`}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewFullProfile;
