import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setRole } from "../../redux/actions";
// import rootReducer, { RootState } from "../../redux/reducers";
// import Avatar from "@mui/joy/Avatar";
// import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FormControlLabel, Box, Link as MuiLink } from "@mui/material";
import "./SignUp.css"; // Import your CSS file

const RegistrationPage = () => {
  //   const dispatch = useDispatch();
  //   const selectedRole = useSelector((state) => state.role);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isChecked && selectedRole) {
      navigate(`/signup/${selectedRole}?role=${selectedRole}`);
    }
  }, [isChecked, selectedRole, navigate]);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const roles = [
    {
      value: "helper",
      label: "Helper",
      description:
        "Get a chance to freely choose your future employer and be hired.",
      image: "/helper_role.svg",
    },
    {
      value: "employer",
      label: "Employer",
      description:
        "Be in touch with thousands of candidates and connect with the right one.",
      image: "/employer_role.svg",
    },
    {
      value: "agency",
      label: "Agency",
      description:
        "Be in touch with thousands of candidates and connect with the right one.",
      image: "/agency_role.svg",
    },
  ];

  return (
    <div className="registrationPageContainer">
      <Box
        className="outerBox"
        sx={{
          backgroundColor: "#f2f2f2",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="registrationPageContent">
          <h2>Select Your Role:</h2>
          <div className="roleCheckboxGroup">
            <RadioGroup
              aria-label="role"
              defaultValue="Helper"
              name="role"
              sx={{
                flexDirection: "row",
                gap: 2,
                [`& .${radioClasses.checked}`]: {
                  [`& .${radioClasses.action}`]: {
                    inset: -1,
                    border: "1px solid",
                    borderColor: "#0A6259",
                    borderRadius: "2%",
                  },
                },
                [`& .${radioClasses.radio}`]: {
                  display: "contents",
                  "& > svg": {
                    zIndex: 2,
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    bgcolor: "background.surface",
                    borderRadius: "40%",
                  },
                },
              }}
            >
              {roles.map((role) => (
                <Sheet
                  key={role.value}
                  variant="outlined"
                  sx={{
                    borderRadius: "md",
                    boxShadow: "sm",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.5,
                    p: 2,
                    minWidth: 120,
                    position: "relative", // Add position relative to handle overlay icon
                  }}
                >
                  <img
                    src={role.image}
                    alt="Logo"
                    className={`${role.value}_role`}
                  />
                  <Typography variant="h6">{role.label}</Typography>
                  <Typography variant="body1">{role.description}</Typography>
                  <Radio
                    value={role.value}
                    checked={selectedRole === role.value}
                    onChange={() => handleRoleSelection(role.value)}
                    checkedIcon={<CheckCircleRoundedIcon />}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                      cursor: "pointer",
                      "&.Mui-checked": {
                        "& + span": {
                          borderColor: "#0A6259",
                        },
                      },
                    }}
                  />
                </Sheet>
              ))}
            </RadioGroup>
          </div>
          {selectedRole && (
            <div className="selectedRoleContainer">
              <h3>You've selected the role: {selectedRole}</h3>
              <MuiLink
                color="inherit"
                component={Link}
                to={`/signup/${selectedRole}`}
                className="green-btn"
              >
                Continue
              </MuiLink>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
};

export default RegistrationPage;
