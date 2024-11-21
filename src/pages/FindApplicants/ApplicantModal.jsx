import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";
import { Box, Container, List, ListItem, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import NoDataFound from "../../Components/Common/NoDataFound";

const ApplicantModal = ({ showModal, toggleModal, applicantModalData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const selectedRole = localStorage.getItem("selectedRole");
  const { jobType, profilePicURL, phoneNumber, userId } = applicantModalData;
  const { fullName, location, dob, skills, gender, religion } =
    applicantModalData?.aboutYou;
  const { experience } =
    applicantModalData?.workExperiences?.length &&
    applicantModalData?.workExperiences[0];
  const handleRedirect = () => {
    switch (selectedRole) {
      case "agency":
        navigate(`/agency/view-full-profile/${userId}`);
        break;
      case "employer":
        navigate(`/applicant-profile-view/${userId}`);
        break;
      case "helper":
        navigate(`/helper/job-dashboard`);
        break;
      case "admin":
        navigate("admin/dashboard");
        break;
        default :navigate("/login")
    }
  };
  return (
    <div>
      <Container maxWidth="xl">
        <Dialog open={showModal} className="customModal">
          <Grid>
            <Box className="closeModal">
              <IconButton onClick={toggleModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className="applicantDetails shortDetailModal mb-2 ms-0">
              <Box className="employerHeader">
                <Box className="primary align-items-start mb-4">
                  <Box className="helperImg">
                    <img
                      src={profilePicURL ? profilePicURL : "/demo-user.png"}
                      alt="userimg"
                    />
                  </Box>
                  <Box className="helperContent">
                    {fullName && (
                      <Typography variant="h5">{fullName}</Typography>
                    )}
                    <Box className="locationDate align-items-center mb-2">
                      {location && <Box className="location">{location}</Box>}
                      {!isNaN(moment().diff(dob, "years")) && (
                        <Box className="date">
                          {moment().diff(dob, "years")}years
                        </Box>
                      )}{" "}
                      <Box className="nationality">{/* {location} */}</Box>
                    </Box>
                    {jobType && (
                      <Typography variant="h5" className="jobHighlight">
                        <strong>{jobType}</strong>
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box className="expectedDuties mb-4 modalDiv">
                  <Typography variant="h5" className="modalHeading">
                    {t("Description")}
                  </Typography>
                  <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                    beatae rem perspiciatis consequatur, reiciendis quod
                    laudantium fuga voluptatem quos autem aspernatur, doloremque
                    nostrum ratione accusantium molestias quae debitis
                    quibusdam. Fuga?
                  </Typography>
                </Box>
                {skills.length > 0 && (
                  <Box className="expectedDuties applicantDuties mb-4 modalDiv">
                    <>
                      <Typography variant="h5" className="modalHeading">
                        {t("Expertise")}
                      </Typography>
                      <Box className="dutiesList">
                        <List>
                          {skills.map((opt, idx) => (
                            <ListItem key={idx}>{opt}</ListItem>
                          ))}
                        </List>
                      </Box>
                    </>
                  </Box>
                )}

                {religion && (
                  <Box className="expectedDuties mb-4 modalDiv">
                    <Typography variant="h5" className="modalHeading">
                      {t("religion")}
                    </Typography>
                    <Typography variant="body1">
                      {`${fullName}'s religion is`} <b>{religion}</b>
                    </Typography>
                  </Box>
                )}

                {gender && (
                  <Box className="expectedDuties mb-4 modalDiv">
                    <Typography variant="h5" className="modalHeading">
                      {t("gender")}
                    </Typography>
                    <Typography variant="body1">
                      {`${fullName}'s gender is`} <b>{gender}</b>
                    </Typography>
                  </Box>
                )}
                {experience && (
                  <Box className="expectedDuties mb-4 modalDiv">
                    <Typography variant="h5" className="modalHeading">
                      {t("job_post_question_10")}
                    </Typography>
                    <Typography variant="body1">{`${experience}`}</Typography>
                  </Box>
                )}

                {phoneNumber && (
                  <Box className="expectedDuties mb-4 modalDiv">
                    <Typography variant="h5" className="modalHeading">
                      {t("contact_number")}
                    </Typography>
                    <Typography variant="body1">{phoneNumber}</Typography>
                  </Box>
                )}
              </Box>
              <DialogActions style={{ justifyContent: "center" }}>
                <Button
                  className="arrowButton"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleRedirect();
                    // selectedRole === "employer"
                    //   ? navigate(`/applicant-profile-view/${userId}`)
                    //   : selectedRole === "agency"
                    //   ? navigate(`/agency/view-full-profile/${userId}`)
                    //   : navigate(`/${selectedRole}/dashboard`);
                  }}
                >
                  {t("view_full_profile")}
                </Button>
              </DialogActions>
            </Box>
          </Grid>
        </Dialog>
      </Container>
    </div>
  );
};

export default ApplicantModal;
