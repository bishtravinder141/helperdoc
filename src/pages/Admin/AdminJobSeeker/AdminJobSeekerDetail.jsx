import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  List,
  ListItem,
  Menu,
  MenuItem,
  Stepper,
  Typography,
  styled,
} from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faShare } from "@fortawesome/free-solid-svg-icons";
import { getHelperPublicProfile } from "../../Services/ProfileServices/ProfileService";
import { toastMessage } from "../../Utils/toastMessages";
import { useTranslation } from "react-i18next";
import moment from "moment";
import NoDataFound from "../../Components/Common/NoDataFound";
import { AboutInfo, extractNameFromUrl } from "../../Constant/Constant";

const AdminJobSeekerDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const [loader, setLoader] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [helperDetails, setHelperDetails] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    handleGetHelperPublicProfile();
  }, []);
  const handleGetHelperPublicProfile = () => {
    setLoader(true);
    // 64238957-34dc-443f-9ac4-58bee7d8938e
    // "64238957-34dc-443f-9ac4-58bee7d8938e"
    getHelperPublicProfile(id)
      .then((res) => {
        setHelperDetails(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
        navigate("/agency/find-applicant");
      })
      .finally(() => setLoader(false));
  };

  return (
    <>
      {loader && <PageLoader />}
      <Container
        maxWidth={pathname.includes("/agency/view-full-profile") ? "xl" : "lg"}
        className="CvView"
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 100, height: 100, marginRight: "16px" }}>
                <img
                  id="avatar"
                  src={
                    helperDetails?.profilePicURL
                      ? helperDetails?.profilePicURL
                      : "/demo-user.png"
                  }
                  alt="Avatar"
                />
              </Avatar>
              <div style={{ marginLeft: "16px" }}>
                <Typography variant="h5" className="text-capitalize">
                  {" "}
                  {helperDetails?.aboutYou?.fullName ? (
                    helperDetails?.aboutYou?.fullName
                  ) : (
                    <NoDataFound title={t("no_name_msg")} />
                  )}{" "}
                </Typography>
                <div
                  className="hightlightProfile"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {/* <Typography variant="body1" style={{ marginRight: "8px" }}>
                    HouseKeeper
                  </Typography> */}
                  {helperDetails?.jobType && (
                    <Button variant="outlined">{helperDetails.jobType}</Button>
                  )}
                </div>
              </div>
            </Box>
          </Grid>
          {pathname.includes("/agency/view-full-profile") ? (
            <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
              <span
                id="basic-button"
                className="cursor-pointer"
                aria-controls={showMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={showMenu ? "true" : undefined}
                onClick={(e) => {
                  setShowMenu((prev) => true);
                  setAnchorEl(e.currentTarget);
                }}
              >
                <FontAwesomeIcon
                  icon={faDownload}
                  className="me-3 cursor-pointer"
                />
              </span>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={showMenu}
                onClose={() => setShowMenu((prev) => false)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {/* create handlers for these menu items */}
                <MenuItem>{t("copy_link")}</MenuItem>
                <MenuItem>Whatsapp</MenuItem>
                <MenuItem>{t("other")}</MenuItem>
              </Menu>
              <FontAwesomeIcon icon={faShare} className="me-3 cursor-pointer" />
              <Button className="green-btn small text-center">
                {t("send_message")}
              </Button>
            </Grid>
          ) : (
            <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
              {/* make this dynamic  */}
              <Typography variant="h5">WiredWave</Typography>
            </Grid>
          )}
        </Grid>
        <Box marginY={5}>
          {/* <Typography className="CustomPara">
              There are many variations of passages of Lorem Ipsum available, but
              the majority have suffered alteration in some form, by injected
              humour, or randomised words which don't look even slightly
              believable. If you are going to use a passage of Lorem Ipsum, you
              need to be sure there isn't anything embarrassing hidden in the
              middle of text. There are many variations of passages of Lorem Ipsum
              available, but the majority have suffered alteration in some form,
              by injected humour, or randomised words which don't look even
              slightly believable.
            </Typography> */}
        </Box>
        <Box className="aboutProfile">
          <Typography variant="h6" className="text-capitalize">
            {helperDetails?.aboutYou?.fullName &&
              `${t("about")} ${helperDetails?.aboutYou?.fullName}`}
          </Typography>
          <List>
            {helperDetails &&
              Object.keys(helperDetails)?.length &&
              AboutInfo.map(({ key, title, subKey }, idx) => (
                <ListItem>
                  {subKey
                    ? helperDetails[key] &&
                      helperDetails[key][subKey] && (
                        <>
                          <b>{t(title)}</b>
                          <span>
                            {subKey === "height" ? (
                              <span>
                                {console.log(helperDetails?.aboutYou[key], key)}
                                {helperDetails?.aboutYou[key][subKey] &&
                                  `${helperDetails?.aboutYou[key][subKey]} cm`}
                              </span>
                            ) : (
                              <span>
                                {" "}
                                {helperDetails?.aboutYou[key][subKey] &&
                                  `${helperDetails?.aboutYou[key][subKey]} kg`}
                              </span>
                            )}
                          </span>
                        </>
                      )
                    : helperDetails?.aboutYou[key] && (
                        <>
                          <b>{t(title)}</b>
                          <span>{helperDetails?.aboutYou[key]}</span>
                        </>
                      )}
                  {/* <span>{helperDetails?.aboutYou[key]}</span> */}
                </ListItem>
              ))}
          </List>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined" className="profileCard">
            <CardContent>
              <Typography variant="h5">{t("experience")}</Typography>
              <Stepper orientation="vertical">
                {helperDetails?.workExperiences?.length ? (
                  helperDetails.workExperiences.map(
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
                          <Typography variant="body1" className="profileRole">
                            {duties?.map((duty) => duty)}
                          </Typography>
                          <Typography variant="body1" className="description">
                            {}
                          </Typography>
                        </div>
                      </Box>
                    )
                  )
                ) : (
                  <NoDataFound title={t("no_expereince_msg")} />
                )}
              </Stepper>
            </CardContent>
          </Card>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined" className="profileCard">
            <CardContent>
              <Typography variant="h5">{t("education")}</Typography>
              {helperDetails?.education?.level &&
              helperDetails?.education?.level ? (
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
                          {helperDetails?.education?.level}{" "}
                        </Typography>
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <Typography variant="h6">
                          {" "}
                          {t("study_major")} :{" "}
                        </Typography>
                        <Typography variant="body1" className="mt-3">
                          {" "}
                          {helperDetails?.education?.major}{" "}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                </Stepper>
              ) : (
                <NoDataFound title={t("no_education_msg")} />
              )}
            </CardContent>
          </Card>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined" className="profileCard">
            <CardContent>
              <FormControl fullWidth>
                <Typography variant="h5" id="skills">
                  {t("skills")}
                </Typography>
                {helperDetails?.aboutYou?.skills?.length ? (
                  <FormGroup>
                    <FormControl component="fieldset">
                      <FormGroup>
                        <List className="profileSkillset">
                          {helperDetails?.aboutYou?.skills.map(
                            (curSkill, idx) => (
                              <ListItem key={idx}>{curSkill}</ListItem>
                            )
                          )}
                        </List>
                      </FormGroup>
                    </FormControl>
                  </FormGroup>
                ) : (
                  <NoDataFound title={t("no_skills_msg")} />
                )}
              </FormControl>
            </CardContent>
          </Card>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined" className="profileCard">
            <CardContent>
              <Typography variant="h5">{t("languages_known")}</Typography>
              {helperDetails?.languages?.native ||
              helperDetails?.languages?.other ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4} className="LangDisplay">
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
                        <Typography variant="h6">
                          {helperDetails?.languages?.native}
                        </Typography>
                        <Typography variant="body1">native</Typography>
                      </div>
                    </Box>
                  </Grid>
                  {helperDetails?.languages?.other?.length &&
                    helperDetails.languages.other.map(
                      ({ language, level }, index) => (
                        <Grid
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
                </Grid>
              ) : (
                <NoDataFound title={t("no_language_msg")} />
              )}
            </CardContent>
          </Card>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined" className="profileCard">
            <CardContent>
              <Typography variant="h5">{t("documents")}</Typography>
              {helperDetails?.education?.licensesAndCertificates &&
              Object.keys(helperDetails?.education?.licensesAndCertificates)
                ?.length ? (
                Object.entries(
                  helperDetails?.education?.licensesAndCertificates
                ).map((curElem, index) => (
                  <Fragment key={index}>
                    <img src="/profileDoc.svg" />
                    {extractNameFromUrl(curElem[1])}
                  </Fragment>
                ))
              ) : (
                <NoDataFound title={t("no_documents_msg")} />
              )}
              {/* <Grid container spacing={2}>
                <List className="docListProfile">
                  <ListItem>
                    <Link>
                      <img src="/profileDoc.svg" />
                      <Typography>profiledoc.doc</Typography>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link>
                      <img src="/Pdf.svg" />
                      <Typography>drivinglicense.pdf</Typography>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link>
                      <img src="/profileDoc.svg" />
                      <Typography>profiledoc.doc</Typography>
                    </Link>
                  </ListItem>
                </List>
              </Grid> */}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default AdminJobSeekerDetail;
