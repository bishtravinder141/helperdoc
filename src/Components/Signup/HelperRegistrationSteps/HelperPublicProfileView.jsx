import React, { useState } from "react";
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
  Step,
  StepLabel,
  Stepper,
  Typography,
  styled,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TitleWrapper = styled("div")({
  textAlign: "center",
  color: "white",
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between", // Align items with space between
  paddingRight: "20px", // Add right padding for space
});
const HeaderBar = styled("div")({
  backgroundColor: "#0a6259",
  padding: "10px 0",
  marginBottom: "20px",
});

const HelperPublicProfileView = ({
  formData,
  setFormData,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleBack = () => {
    navigate(-1); // This will navigate back to the previous location
  };

  const handleSkillsChange = (event) => {
    const skill = event.target.name;
    if (event.target.checked) {
      setSelectedSkills((prevSelectedSkills) => [...prevSelectedSkills, skill]);
    } else {
      setSelectedSkills((prevSelectedSkills) =>
        prevSelectedSkills.filter((s) => s !== skill)
      );
    }
  };

  const experienceData = [
    {
      label: "Job 1",
      title: "Hotel Housekeeper",
      duration: "Dec 2022 - Present",
      role: "Housekeeper",
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything",
    },
    {
      label: "Job 2",
      title: "Babysitter",
      duration: "Dec 2021 - Nov 2022",
      role: "Child Care",
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything",
    },
    {
      label: "Job 3",
      title: "Chef",
      duration: "Oct 2020 - Nov 2021",
      role: "Cooking",
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything",
    },
  ];

  const educationData = [
    {
      label: "School 1",
      institute: "Harvard University",
      year: "2015 - 2017",
      study: "Master degree in Computer Science",
    },
    {
      label: "School 2",
      institute: "Harvard University",
      year: "2015 - 2017",
      study: "Master degree in Computer Science",
    },
  ];

  const knownLanguageData = [
    {
      label: "Language 1",
      title: "English",
      level: "Advance",
    },
    {
      label: "Language 2",
      title: "Chinese",
      level: "Native",
    },
  ];

  return (
    <>
      <HeaderBar className="HeaderProfile">
        <TitleWrapper>
          <Button onClick={handleBack} style={{ alignSelf: "flex-start" }}>
            <ArrowBack style={{ color: "white" }} />
          </Button>
          <Typography
            variant="h4"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            View Public Profile
          </Typography>
        </TitleWrapper>
      </HeaderBar>
      <Container maxWidth="lg" className="CvView">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 100, height: 100, marginRight: "16px" }}>
                <img id="avatar" src={`/default.png`} alt="Avatar" />
              </Avatar>
              <div style={{ marginLeft: "16px" }}>
                <Typography variant="h5">Hiroshi Nomura </Typography>
                <div className="hightlightProfile"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: "8px" }}>
                    Housekeeper
                  </Typography>
                  <Button variant="outlined">Full Time</Button>
                </div>
              </div>
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <Button variant="contained" color="primary">
              View CV
            </Button>
          </Grid> */}
        </Grid>
        <Box marginY={5}>
          <Typography className="CustomPara">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. There are many variations of passages of Lorem Ipsum
            available, but the majority have suffered alteration in some form,
            by injected humour, or randomised words which don't look even
            slightly believable.
          </Typography>
        </Box>
        <Box className="aboutProfile">
          <Typography variant="h6">About Hiroshi Noruma</Typography>
          <List>
            <ListItem><b>Nationality</b><span>HongKong</span></ListItem>
            <ListItem><b>Date of Birth</b><span>01/01/2001</span></ListItem>
            <ListItem><b>Marital Status</b><span>Single</span></ListItem>
            <ListItem><b>Current Location</b><span>HongKong</span></ListItem>
            <ListItem><b>Religion</b><span>Islamic</span></ListItem>
            <ListItem><b>Religion</b><span>Islamic</span></ListItem>
            <ListItem><b>Height</b><span>170cm</span></ListItem>
            <ListItem><b>Passport No</b><span>X123456(A)</span></ListItem>
            <ListItem><b>Weight</b><span>65kg</span></ListItem>
          </List>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined" className="profileCard">
            <CardContent>
              <Typography variant="h5">Experience</Typography>
              <Stepper orientation="vertical">
                {experienceData.map((item, index) => (
                  <Box className="expList"
                    key={index}
                    display="flex"
                    alignItems="center"
                    marginBottom={1}
                  >
                    <div className="expImgWrap">
                      <img
                        src={`/experience.svg`}
                        alt="experience"
                      />
                    </div>
                    <div>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body1" className="date">{item.duration}</Typography>
                      <Typography variant="body1" className="profileRole">{item.role}</Typography>
                      <Typography variant="body1" className="description">
                        {item.description}
                      </Typography>
                    </div>
                  </Box>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined" className="profileCard">
            <CardContent>
              <Typography variant="h5">Education</Typography>
              <Stepper orientation="vertical">
                {educationData.map((item, index) => (
                  <Box className="expList"
                    key={index}
                    display="flex"
                    alignItems="center"
                    marginBottom={1}
                  >
                    <div className="expImgWrap">
                      <img
                        src={`/graduation.svg`}
                        alt="graduation"
                      />
                    </div>
                    <div>
                      <Typography variant="h6" >{item.institute}</Typography>
                      <Typography variant="body1" className="date">{item.year}</Typography>
                      <Typography variant="body1" className="profileRole">{item.study}</Typography>
                    </div>
                  </Box>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined"  className="profileCard">
            <CardContent>
              <FormControl fullWidth>
                <Typography variant="h5" id="skills">
                  Skills
                </Typography>
                <FormGroup>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <Typography variant="body1" component="legend">
                        Care
                      </Typography>
                      <List className="profileSkillset">
                        <ListItem>Newborn(0-1)</ListItem>
                        <ListItem>Toddler(1-3)</ListItem>
                        <ListItem>Child(4-12)</ListItem>
                        <ListItem>Teen (13-17)</ListItem>
                        <ListItem>Elderly (>70)</ListItem>
                        <ListItem>Special Care</ListItem>
                        <ListItem>Pet</ListItem>
                      </List>
                    </FormGroup>
                    <FormGroup>
                      <Typography variant="body1" component="legend">
                        Cooking
                      </Typography>
                      <List className="profileSkillset">
                        <ListItem>Arabic</ListItem>
                        <ListItem>Chinese</ListItem>
                        <ListItem>Indian</ListItem>
                        <ListItem>Thai</ListItem>
                        <ListItem>Western</ListItem>
                        <ListItem>Vegetarian</ListItem>
                        <ListItem>Baking</ListItem>
                        <ListItem>Dessert</ListItem>
                      </List>
                    </FormGroup>
                    <FormGroup>
                      <Typography variant="body1" component="legend">
                        Household
                      </Typography>
                      <List className="profileSkillset">
                        <ListItem>Car Washing</ListItem>
                        <ListItem>Cleaning</ListItem>
                        <ListItem>Marketing</ListItem>
                        <ListItem>Gardening</ListItem>
                      </List>
                    </FormGroup>
                  </FormControl>
                </FormGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined"  className="profileCard">
            <CardContent>
              <Typography variant="h5">Languages Known</Typography>
              <Grid container spacing={2}>
                {knownLanguageData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index} className="LangDisplay">
                    <Box display="flex" alignItems="center" marginBottom={1} className="expList">
                      <div className="expImgWrap">
                        <img
                          src={`/language.svg`}
                          alt="language"
                        />
                      </div>
                      <div>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="body1">{item.level}</Typography>
                      </div>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
        <Box marginY={5}>
          <Card variant="outlined"  className="profileCard">
            <CardContent>
              <Typography variant="h5">Documents</Typography>
              <Grid container spacing={2}>
                <List className="docListProfile">
                  <ListItem>
                    <Link>
                        <img src="./profileDoc.svg"/>
                        <Typography>profiledoc.doc</Typography>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link>
                        <img src="./Pdf.svg"/>
                        <Typography>drivinglicense.pdf</Typography>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link>
                        <img src="./profileDoc.svg"/>
                        <Typography>profiledoc.doc</Typography>
                    </Link>
                  </ListItem>
                </List>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default HelperPublicProfileView;
