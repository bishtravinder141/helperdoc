import React, { useState, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Avatar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SuccessModal from "../../Common/Modals/SuccessModal";
// import "../HelperSignup.css";

const HelperUserDetails= ({}) => {
  const [errors, setErrors] = useState([]); // State to manage errors
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
//   const [skills, setSkills] = useState<{ label: string; value: string }[]>([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [jobType, setJobType] = useState("");
  const [isMoreWorkExperince, setIsMoreWorkExperince] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [avatar, setAvatar] = useState("default-avatar.jpg");
  const inputRef = useRef(null);
  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSaveChanges = () => {
    // Your logic to save changes and handle errors
    const hasErrors = false; // Assume no errors for now
    if (!hasErrors) {
      setIsModalOpen(true);
    }
  };

  const handleContinue = () => {
    navigate("/helper_dashboard"); // Navigate to dashboard
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  const handleViewPublicProfile = () => {
    navigate("/helper_public_profile", { state: location.state });
  };
  const handleJobType = (event) => {
    setJobType(event.target.value);
  };

  const handleMoreWorkExperinceChange = (
    event
  ) => {
    setIsMoreWorkExperince(event.target.value);
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

  return (
    <>
      <Grid container spacing={3} alignItems="center" className="formDataInfo">
        <Grid item xs={12} md={6}>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel">Name *</FormLabel>
            <TextField variant="outlined" className="formInputFiled" value="John Smith" fullWidth/>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel">Email *</FormLabel>
            <TextField variant="outlined" className="formInputFiled" value="contact@gmail.com" fullWidth/>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel">Phone Number *</FormLabel>
            <TextField variant="outlined" className="formInputFiled" fullWidth value="+63 9867432567"/>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel">Current Location *</FormLabel>
            <TextField variant="outlined" className="formInputFiled" fullWidth value="Hong Kong"/>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth className="queRow">
            <FormLabel id="educationLevel" className="formLabel">Current job last day *</FormLabel>
            <input type="date" variant="outlined" className="formInputFiled customInput" fullWidth value="Select from calendar"/>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} className="workingExp">
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel" id="moreWorkExperince">Working experiences?</FormLabel>
            <RadioGroup className="radioCheckBtn"
              row
              aria-labelledby="moreWorkExperince"
              name="row-radio-buttons-group"
              value={isMoreWorkExperince}
              onChange={handleMoreWorkExperinceChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth className="queRow">
            <FormLabel id="educationLevel" className="formLabel">Highest Degree *</FormLabel>
            <Select className="formInputFiled">
              <MenuItem value="o-level">O-level</MenuItem>
              <MenuItem value="a-level">A-level</MenuItem>
              <MenuItem value="1-university-year">1 university year</MenuItem>
              <MenuItem value="2-university-years">2 university years</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel">Age *</FormLabel>
            <TextField variant="outlined" className="formInputFiled" fullWidth value="e.g. 25"/>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel">Study Major</FormLabel>
            <Select className="formInputFiled">
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel">Gender</FormLabel>
            <Select className="formInputFiled">
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel">Region they would like to serve into *</FormLabel>
            <Select className="formInputFiled">
              <MenuItem value="male">Region 1</MenuItem>
              <MenuItem value="female">Region 2</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel">Native Language</FormLabel>
            <Select className="formInputFiled">
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel" id="passportNumber">Passport Number / HKID *</FormLabel>
            <TextField className="formInputFiled" fullWidth variant="outlined" />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel" id="marital_status">Marital Status</FormLabel>
            <Select className="formInputFiled"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel" id="jobType">Choose the type of employment *</FormLabel>
            <RadioGroup className="radioCheckBtn"
              row
              aria-labelledby="jobType"
              name="row-radio-buttons-group"
              value={jobType}
              onChange={handleJobType}
            >
              <FormControlLabel
                value="full_time"
                control={<Radio />}
                label="Full Time"
              />
              <FormControlLabel
                value="part_time"
                control={<Radio />}
                label="Part Time"
              />
            </RadioGroup>
          </FormControl>
        </Grid> */}
        <Grid item xs={12}>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel" id="skills">Skills</FormLabel>
            <FormGroup>
              <FormControl component="fieldset" >
                <FormGroup className="skillsCol">
                  <FormLabel component="legend" className="formLabel">Care</FormLabel>
                  <FormGroup className="radioCheckBtn">
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("New Born")} onChange={handleSkillsChange} name="New Born"/>
                      }
                      label="Newborn(0-1)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Toddler")} onChange={handleSkillsChange} name="Toddler"/>
                      }
                      label="Toddler(1-3)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Child")} onChange={handleSkillsChange} name="Child"/>
                      }
                      label="Child(4-12)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Teen")} onChange={handleSkillsChange} name="Teen"/>
                      }
                      label="Teen (13-17)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Elderly")} onChange={handleSkillsChange} name="Elderly"/>
                      }
                      label="Elderly (>70)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Special Care")} onChange={handleSkillsChange} name="Special Care"/>
                      }
                      label="Special Care"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Pet")} onChange={handleSkillsChange} name="Pet"/>
                      }
                      label="Pet"
                    />
                  </FormGroup>
                </FormGroup>
                <FormGroup className="skillsCol">
                  <FormLabel component="legend" className="formLabel">Cooking</FormLabel>
                  <FormGroup className="radioCheckBtn">
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Arabic")} onChange={handleSkillsChange} name="Arabic"/>
                      }
                      label="Arabic"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Chinese")} onChange={handleSkillsChange} name="Chinese"/>
                      }
                      label="Chinese"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Indian")} onChange={handleSkillsChange} name="Indian"/>
                      }
                      label="Indian"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Thai")} onChange={handleSkillsChange} name="Thai"/>
                      }
                      label="Thai"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Western")} onChange={handleSkillsChange} name="Western"/>
                      }
                      label="Western"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Vegetarian")} onChange={handleSkillsChange} name="Vegetarian"/>
                      }
                      label="Vegetarian"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Baking")} onChange={handleSkillsChange} name="Baking"/>
                      }
                      label="Baking"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Dessert")} onChange={handleSkillsChange} name="Dessert"/>
                      }
                      label="Dessert"
                    />
                  </FormGroup>
                </FormGroup>
                <FormGroup className="skillsCol">
                    <FormLabel className="formLabel" component="legend">Household</FormLabel>
                  <FormGroup className="radioCheckBtn">
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Car Washing")} onChange={handleSkillsChange} name="Car Washing"/>
                      }
                      label="Car Washing"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Cleaning")} onChange={handleSkillsChange} name="Cleaning"/>
                      }
                      label="Cleaning"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Marketing")} onChange={handleSkillsChange} name="Marketing"/>
                      }
                      label="Marketing"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedSkills.includes("Gardening")} onChange={handleSkillsChange} name="Gardening"/>
                      }
                      label="Gardening"
                    />
                  </FormGroup>
                </FormGroup>
              </FormControl>
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel id="profilePic" className="formLabel">
              Upload a photo of yourself which shows your face clearly with
              smile, wearing clean white shirt and with clean background. No
              heavy make-up, no sunglasses, no children
            </FormLabel>
            <div className="profile-section">
              <div className="avatar-section">
                <Avatar sx={{ width: 160, height: 160 }}>
                  <img id="avatar" src={`/default.png`} alt="Avatar" />
                </Avatar>
              </div>
              <div className="file-input" onClick={handleBoxClick}>
                <label htmlFor="avatar-upload" className="file-upload-label">
                  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.48172 36.397L1.43922 36.4395C0.865469 35.1857 0.504219 33.762 0.355469 32.1895C0.504219 33.7407 0.907969 35.1432 1.48172 36.397Z" fill="#55DBA6"/>
                    <path d="M15.1259 18.0569C17.9191 18.0569 20.1833 15.7926 20.1833 12.9994C20.1833 10.2062 17.9191 7.94189 15.1259 7.94189C12.3327 7.94189 10.0684 10.2062 10.0684 12.9994C10.0684 15.7926 12.3327 18.0569 15.1259 18.0569Z" fill="#55DBA6"/>
                    <path d="M30.4038 0.25H12.5963C4.86125 0.25 0.25 4.86125 0.25 12.5963V30.4038C0.25 32.72 0.65375 34.7388 1.44 36.4388C3.2675 40.4763 7.1775 42.75 12.5963 42.75H30.4038C38.1388 42.75 42.75 38.1388 42.75 30.4038V25.5375V12.5963C42.75 4.86125 38.1388 0.25 30.4038 0.25ZM39.2863 22.5625C37.6288 21.1388 34.9513 21.1388 33.2938 22.5625L24.4538 30.1488C22.7963 31.5725 20.1188 31.5725 18.4613 30.1488L17.7388 29.5538C16.23 28.2363 13.8288 28.1088 12.1288 29.2563L4.18125 34.59C3.71375 33.4 3.4375 32.0188 3.4375 30.4038V12.5963C3.4375 6.60375 6.60375 3.4375 12.5963 3.4375H30.4038C36.3963 3.4375 39.5625 6.60375 39.5625 12.5963V22.7963L39.2863 22.5625Z" fill="#55DBA6"/>
                  </svg>
                  <span>Please upload image here 10 MB maximum</span>
                </label>
                <input
                  ref={inputRef}
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="profile-info">
                {/* Other profile information goes here */}
              </div>
            </div>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="queRow">
            <FormLabel id="introVideo" className="formLabel">Self intro video link*</FormLabel>
            <TextField className="formInputFiled" fullWidth variant="outlined" placeholder="e.g. https://www.youtube.com/Self-intro-video-link"/>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel id="profilePic" className="formLabel">What caregiver/maid related qualification and certificates you have? (Like Caregiver NCII, Nurse Training etc) </FormLabel>
            <div className="profile-section">
              <div className="file-input" onClick={handleBoxClick}>
                <label htmlFor="avatar-upload" className="file-upload-label">
                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_624_4631)">
                      <path d="M22.1983 7.99443H26.5035L19.9141 1.0625V5.70124C19.9141 6.95778 20.9332 7.99443 22.1983 7.99443Z" fill="#55DBA6"/>
                      <path d="M15.0567 25.4786H7.42169C7.03518 25.4786 6.71889 25.1626 6.71889 24.7758C6.71889 24.3892 7.03518 24.073 7.42169 24.073H15.5224C15.9702 22.931 16.5677 21.9642 17.3059 20.9978H7.42169C7.03518 20.9978 6.71889 20.6818 6.71889 20.295C6.71889 19.9085 7.03518 19.5922 7.42169 19.5922H18.6413C20.7497 17.7471 23.5436 16.57 26.5923 16.57C26.8821 16.57 27.1195 16.5962 27.4709 16.6227V9.40067H22.1993C20.1611 9.40067 18.5094 7.73143 18.5094 5.70187V0H5.0321C3.29235 0 1.9043 1.42316 1.9043 3.17154V29.9858C1.9043 31.7342 3.29235 33.1222 5.0321 33.1222H15.6188C15.0127 31.7166 14.6788 30.1352 14.6788 28.4835C14.6699 27.4468 14.8106 26.445 15.0567 25.4786ZM7.42169 15.1992H16.3219C16.7084 15.1992 17.0247 15.5155 17.0247 15.9023C17.0247 16.2889 16.7084 16.6051 16.3219 16.6051H7.42169C7.03518 16.6051 6.71889 16.2889 6.71889 15.9023C6.71889 15.5155 7.03518 15.1992 7.42169 15.1992Z" fill="#55DBA6"/>
                      <path d="M26.5829 18.002C20.7932 18.002 16.084 22.7109 16.084 28.5009C16.084 34.2905 20.7932 38.9998 26.5829 38.9998C32.3728 38.9998 37.0821 34.2905 37.0821 28.5009C37.0821 22.7109 32.3728 18.002 26.5829 18.002ZM32.1973 28.6589C32.0655 28.782 31.8896 28.8436 31.7227 28.8436C31.5382 28.8436 31.3537 28.7645 31.213 28.6237L27.2946 24.4066V34.4399C27.2946 34.8267 26.9783 35.143 26.5918 35.143C26.2053 35.143 25.889 34.8267 25.889 34.4399V24.398L21.9531 28.6151C21.6895 28.8963 21.2324 28.9139 20.9512 28.6502C20.6704 28.3866 20.6525 27.9385 20.9161 27.6573L26.0646 22.131C26.1964 21.9906 26.3809 21.9114 26.5829 21.9114C26.7852 21.9114 26.9608 21.9906 27.1015 22.131L32.25 27.6573C32.496 27.9474 32.4782 28.3955 32.1973 28.6589Z" fill="#55DBA6"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_624_4631">
                        <rect width="39" height="39" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Please upload Multiple Files here 10 MB maximum</span>
                </label>
                <input
                  ref={inputRef}
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="profile-info">
                {/* Other profile information goes here */}
              </div>
            </div>
          </FormControl>
        </Grid>

        <Grid className="noteSpecified">
          <Typography variant="body1">NOTE: ALL THE DETAILS WILL SHOW HERE IN DEVELOPMENT MODE</Typography>
        </Grid>
        
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button className="green-btn small"
              variant="contained"
              onClick={handleViewPublicProfile}
              sx={{ mt: 2, mb: 2 }}
            >
              View Public Profile
            </Button>
          </Grid>
          <Grid item>
            <Button className="arrowButton"
              variant="contained"
              onClick={handleSaveChanges}
              sx={{ mt: 2, mb: 2 }}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* Modal for success message */}
      {isModalOpen && (
        <SuccessModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          handleContinue={handleContinue}
        />
      )}
    </>
  );
};

export default HelperUserDetails;
