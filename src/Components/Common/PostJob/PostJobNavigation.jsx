import React, { FC } from "react";
import styled from "styled-components";
import { Container, Step, Stepper, Typography } from "@mui/material";

const StepWrapper = styled("div")({
  cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // color: ${({ completed }) =>
    //   completed ? "#000" : "inherit"}, /* Change text color to black */
})
const StepperWrapper = styled("div")({
  width: "100%",
  paddingBottom: "20px", /* Add bottom padding for space */
  backgroundColor: "#f5f5f5",
  marginTop: "20px",
})

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});


const StepIcon = styled("div")({
  width: "50px",
  height: "50px",
  bordeRadius: "50%",
  // backgroundColor: ${({ completed, active }) =>
  //   completed ? "#0a6259" : active ? "#4caf50" : "#ccc"},
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "8px", /* Add margin to separate the image and text */
  position: "relative",
  zIndex: 1,
})
const IconImage = styled("img")({
    width: "30px",
    // filter: ${({ completed }) =>
    //     completed ? "brightness(0) invert(1)" : "brightness(0) invert(0)"};
})
const PostJobNavigation = ({
  activeStep,
  steps,
  titles,
  stepIcons,
}) => {
  return (
    <StepperWrapper>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={index <= activeStep}>
            <StepWrapper
              completed={index <= activeStep}
              active={index === activeStep}
            >
              <StepIcon
                completed={index <= activeStep}
                active={index === activeStep}
              >
                <IconImage
                  src={stepIcons[index]}
                  alt={`Step ${index + 1}`}
                  completed={index <= activeStep}
                />
              </StepIcon>
              <span>
                {label}
              </span>
                <h4>{titles[index]}</h4>
            </StepWrapper>
          </Step>
        ))}
      </Stepper>
    </StepperWrapper>
  );
};

export default PostJobNavigation;