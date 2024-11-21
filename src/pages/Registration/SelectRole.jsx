import React, { useState } from "react";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import "./SignUp.css";
import SimpleButton from "../../Components/Common/CommonButtons/SimpleButton";
import { ROLES } from "./Constant";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
  const [selectedRole, setSelectedRole] = useState({ role: "helper", url: "/register/helper" });
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleRoleSelection = (role) => {
    setSelectedRole({ role: role.value, url: role.url });
  };

  const handleSubmitRole = () => {
    navigate(selectedRole.url);
  };

  return (
    <>
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
            <h2>{t("select_your_role")}:</h2>
            <div className="roleCheckboxGroup">
              <RadioGroup className="mainRegister"
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
                {ROLES.map((role) => (
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
                      position: "relative",
                    }}
                  >
                    <img
                      src={role.image}
                      alt="Logo"
                      className={`${role.value}_role`}
                    />
                    <Typography variant="h6">{t(role.title_key)}</Typography>
                    <Typography variant="body1">
                      {t(role.description_key)}
                    </Typography>
                    <Radio
                      value={role.value}
                      checked={selectedRole.role === role.value}
                      onChange={() => handleRoleSelection(role)}
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
            {selectedRole.role && (
              <div className="selectedRoleContainer">
                <h3>You've selected the role: {selectedRole.role}</h3>
                <SimpleButton title={"Continue"} onClick={handleSubmitRole} />
              </div>
            )}
          </div>
        </Box>
      </div>
    </>
  );
};

export default SelectRole;
