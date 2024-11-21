import React, { useEffect, useState } from "react";
import { getHelperPublicProfile } from "../../Services/ProfileServices/ProfileService";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import { Button, Card, CardContent, Stepper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box, Container, styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import DocumentListing from "../../Components/Common/DocumentListing";
import moment from "moment";

const TitleWrapper = styled("div")({
  textAlign: "center",
  marginTop: " 0, 20px,", // Remove margin from the top
  color: "white", // Change color to white
});

const HeaderBar = styled("div")({
  backgroundColor: "#0a6259", // Background color
  padding: "10px 0", // Padding top and bottom
  marginBottom: "20px", // Margin bottom
});

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

const StyledImageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function ProfilePreview() {
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState();
  const [pageLoader, setPageLoader] = useState(true);
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  useEffect(() => {
    getHelperPublicProfile()
      .then((res) => {
        setProfileDetails(res.data);
        setPageLoader(false);
      })
      .catch((err) => {
        setPageLoader(false);
        console.log(err);
      });
  }, []);
  return (
    <>
      {pageLoader && <PageLoader />}
      <HeaderBar className="heroBanner">
        <TitleWrapper>
          <Typography variant="h4" className="pageTitle">
            {t("domestic_helper_form")}
          </Typography>
        </TitleWrapper>
      </HeaderBar>
      <section className="profilePreview">
        <div className="container">
          <div className="topImg d-flex align-items-center justify-content-between">
            <div className="imgWrapper">
              <img
                src={
                  profileDetails?.profilePicURL
                    ? profileDetails.profilePicURL
                    : "./applicantImg.jpg"
                }
                alt="avatar"
              />
            </div>
            <div className="backToDashboard">
              {token && (
                <Button
                  className="arrowButton"
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/helper/job-dashboard")}
                >
                  {t("view_jobs")}
                </Button>
              )}
            </div>
          </div>
          <div className="profileName">
            <h2>
              {profileDetails?.aboutYou?.fullName &&
                profileDetails?.aboutYou?.fullName}
            </h2>
            <p>
              {/* Housekeeper{" "} */}
              {profileDetails?.jobType && (
                <span className="highlightedText">
                  {profileDetails?.jobType}
                </span>
              )}
            </p>
          </div>

          <div className="numberVerify">
            {profileDetails?.phoneNumber && (
              <>
                <h4 className="profileTitle">Number</h4>
                <span className="highlightedText">
                  {profileDetails?.phoneNumber}
                </span>
              </>
            )}
            <p className="description">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.
            </p>
          </div>

          <div className="profileAbout">
            {profileDetails?.aboutYou?.fullName && (
              <h4 className="profileTitle">{t("about")} {profileDetails?.fullName}</h4>
            )}
            <ul>
              <li>
                <b>{t("nationality")}</b> <span>HongKong</span>
              </li>
              <li>
                {profileDetails?.aboutYou?.dob && (
                  <>
                    <b>{t("dob")}</b>{" "}
                    <span>{profileDetails?.aboutYou?.dob}</span>
                  </>
                )}
              </li>
              <li>
                {profileDetails?.aboutYou?.maritalStatus && (
                  <>
                    <b>{t("marital_status")}</b>{" "}
                    <span>{profileDetails?.aboutYou?.maritalStatus}</span>
                  </>
                )}
              </li>
              <li>
                {profileDetails?.aboutYou?.location && (
                  <>
                    <b>{t("current_location")}</b>{" "}
                    <span>{profileDetails?.aboutYou?.location}</span>
                  </>
                )}
              </li>
              <li>
                {profileDetails?.aboutYou?.religion && (
                  <>
                    <b>{t("religion")}</b>{" "}
                    <span>{profileDetails?.aboutYou?.religion}</span>
                  </>
                )}
              </li>
              <li>
                {profileDetails?.aboutYou?.physicalAttributes?.height && (
                  <>
                    <b>{t("height")}</b>{" "}
                    <span>
                      {profileDetails?.aboutYou?.physicalAttributes?.height} {t("cm")}
                    </span>
                  </>
                )}
              </li>
              <li>
                {profileDetails?.aboutYou?.passportOrHKID && (
                  <>
                    <b>{t("passport_number")}</b>{" "}
                    <span>{profileDetails?.aboutYou?.passportOrHKID}</span>
                  </>
                )}
              </li>
              <li>
                {profileDetails?.aboutYou?.physicalAttributes?.weight && (
                  <>
                    <b>{t("weight")}</b>{" "}
                    <span>
                      {profileDetails?.aboutYou?.physicalAttributes?.weight} {t("kg")}
                    </span>
                  </>
                )}
              </li>
            </ul>
          </div>

          <Box marginY={5}>
          <Card variant="outlined" className="profileCard">
            <CardContent>
              <Typography variant="h5">{t("experience")}</Typography>
              <Stepper orientation="vertical">
                {profileDetails?.workExperiences?.length && (
                  profileDetails.workExperiences.map(
                    ({ duties, experience, period: { start, end } }, index) => (
                      <Box
                        className="expList"
                        key={index}
                        display="flex"
                        alignItems="center"
                        marginBottom={1}
                      >
                        <div className="expImgWrap">
                          <img src={`/experience.svg`} alt="experience" />
                        </div>
                        <div>
                          <Typography variant="h6">{}</Typography>
                          <Typography variant="body1" className="date">
                            {/* {moment(start).format("MMM YYYY")} - {moment(end).format("MMM YYYY")}  */}
                            {moment(start).format("MMM YYYY")}-
                            {moment(start).format("MMM YYYY") ===
                            moment(end).format("MMM YYYY")
                              ? "Present"
                              : moment(end).format("MMM YYYY")}
                          </Typography>
                          <Typography variant="body1 " className="profileRole">
                            {duties?.map((duty) => <span className="me-2">{duty}</span>)}
                          </Typography>
                          <Typography variant="body1" className="description">
                            {}
                          </Typography>
                        </div>
                      </Box>
                    )
                  )
                )}
              </Stepper>
            </CardContent>
          </Card>
        </Box>

          {/* <div className="education experiencesList">
            <h4 className="profileTitle">Education</h4>

            <div className="card profileCard">
              <div className="profileTop">
                <div className="avatar">
                  <img src="/graduation.svg" alt="experience Svg" />
                </div>
                <div className="expMain">
                  <h4>Harvard University</h4>
                  <p className="timeSpan">
                    <span>2015</span> - <span>2017</span>
                  </p>
                  <span className="role">
                    Master degree in Computer Science
                  </span>
                </div>
              </div>
            </div>

            <div className="card profileCard">
              <div className="profileTop">
                <div className="avatar">
                  <img src="/graduation.svg" alt="experience Svg" />
                </div>
                <div className="expMain">
                  <h4>Harvard University</h4>
                  <p className="timeSpan">
                    <span>2015</span> - <span>2017</span>
                  </p>
                  <span className="role">
                    Master degree in Computer Science
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          <Box marginY={5}>
            <Card variant="outlined" className="profileCard">
              <CardContent>
                <Typography variant="h5">{t("education")}</Typography>
                {profileDetails?.education?.level && (
                  <Stepper orientation="vertical">
                    <Box
                      className="expList"
                      display="flex"
                      alignItems="center"
                      marginBottom={1}
                    >
                      <div className="expImgWrap">
                        <img src={`/graduation.svg`} alt="graduation" />
                      </div>
                      <div>
                        <div className="d-flex gap-2 align-items-center">
                          <Typography variant="h6">
                            {" "}
                            {t("education_level")} :{" "}
                          </Typography>
                          <Typography variant="body1" className="mt-3">
                            {" "}
                            {profileDetails?.education?.level}{" "}
                          </Typography>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                          <Typography variant="h6">
                            {" "}
                            {t("study_major")} :{" "}
                          </Typography>
                          <Typography variant="body1" className="mt-3">
                            {" "}
                            {profileDetails?.education?.major}{" "}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </Stepper>
                )}
              </CardContent>
            </Card>
          </Box>

          <div className="skillsetList">
            <h4 className="profileTitle">{t("skills")}</h4>
            <div className="skillUInner">
              {/* <h4>Care</h4> */}
              <ul>
                {profileDetails?.aboutYou?.skills?.length > 0 &&
                  profileDetails?.aboutYou?.skills.map((skill) => (
                    <li>{skill}</li>
                  ))}
              </ul>
            </div>
            {/* <div className="skillUInner">
              <h4>Cooking</h4>
              <ul>
                <li>Arabic</li>
                <li>Chinese</li>
                <li>Indian</li>
                <li>Thai</li>
                <li>Western</li>
                <li>Vegetarian</li>
                <li>Baking</li>
                <li>Dessert</li>
              </ul>
            </div>
            <div className="skillUInner">
              <h4>Household Chore</h4>
              <ul>
                <li>Car Washing</li>
                <li>Cleaning</li>
                <li>Marketing</li>
                <li>Gardening</li>
              </ul>
            </div> */}
          </div>

          <div className="LanguageKnown experiencesList">
            <h4 className="profileTitle">{t("languages_known")}</h4>
            <div className="card profileCard">
              <div className="profileTop">
                <div className="avatar">
                  <img src="/language.svg" alt="experience Svg" />
                </div>
                <div className="expMain">
                  <h4>{profileDetails?.languages?.native}</h4>
                  <p className="timeSpan">{/* <span>Advance</span> */}</p>
                </div>
              </div>
            </div>
            {profileDetails?.languages?.other?.length &&
              profileDetails.languages.other.map(
                ({ language, level }, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className="LangDisplay"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      marginBottom={1}
                      className="expList"
                    >
                      <div className="expImgWrap">
                        <img src={`/language.svg`} alt="language" />
                      </div>
                      <div>
                        <Typography variant="h6">{language}</Typography>
                        <Typography variant="body1">{level}</Typography>
                      </div>
                    </Box>
                  </Grid>
                )
              )}
          </div>

          <div className="documentations experiencesList">
            {profileDetails?.education?.licensesAndCertificates && (
              <>
                <h4 className="profileTitle">{t("documents")}</h4>
                <DocumentListing
                  documents={profileDetails?.education?.licensesAndCertificates}
                  haveToVerify={false}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
