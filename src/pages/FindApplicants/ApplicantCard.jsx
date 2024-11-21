import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NoDataFound from "../../Components/Common/NoDataFound";
import { Fragment } from "react";

const ApplicantCard = ({ curApplicant, handleApplicantModal }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { jobType, profilePicURL } = curApplicant;
  const { fullName, location, dob, skills } = curApplicant?.aboutYou;
  return (
    <>
      <Grid>
        <Box className="applicantDetails mb-2 ms-0">
          <Box className="employerHeader d-flex align-items-start justify-content-between">
            <Box className="primary align-items-start">
              <Box className="helperImg">
                <img
                  src={profilePicURL ? profilePicURL : "/demo-user.png"}
                  alt="userimg"
                />
              </Box>
              <Box className="helperContent">
                <Typography variant="h5">{fullName}</Typography>
                <Box className="locationDate align-items-center mb-2">
                  <Box className="location">{location}</Box>
                  {!isNaN(moment().diff(dob, "years")) && (
                    <Box className="date">
                      {moment().diff(dob, "years")}years
                    </Box>
                  )}
                  <Box className="nationality">{/* {location} */}</Box>
                </Box>
                {jobType && (
                  <Typography variant="h5" className="jobHighlight">
                    <strong>{jobType}</strong>
                  </Typography>
                )}
                <Box className="expectedDuties applicantDuties">
                  {(skills?.length>0) && (
                    <Fragment>
                      <Typography variant="h5">{t("Expertise")}</Typography>
                      <Box className="dutiesList">
                        <List>
                          {skills.map((opt,index) => (
                            <ListItem key={index}>{opt}</ListItem>
                          ))}
                        </List>
                      </Box>
                    </Fragment>
                  )}
                </Box>
              </Box>
            </Box>
            <Box className="secondary">
              <Button
                className="arrowButton"
                variant="contained"
                color="primary"
                onClick={() => handleApplicantModal(curApplicant)}
              >
                View Profile
              </Button>{" "}
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default ApplicantCard;
