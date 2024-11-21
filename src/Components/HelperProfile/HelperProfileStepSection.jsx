import { Step, Stepper } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const HelperProfileStepSection = ({
  activeStep,
  handleClickOnTabs,
  stepsLists,
}) => {
  const { t } = useTranslation();
  return (
    <div className="stepperNavigation">
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepsLists.map((step, index) => (
          <Step key={step.step_key} completed={index + 1 === activeStep}>
            <div className="step-wrapper">
              <div
                className={`${
                  index + 1 <= activeStep ? "active-step" : "step-icon"
                }`}
                onClick={() => handleClickOnTabs(index, step.url)}
              >
                {step.svgIcon ?  step.img :<img src={step.img} alt={`Step ${index + 1}`} />}
              </div>
              <span>{t(step.step_key)}</span>
              <h4>{t(step.step_title_key)}</h4>
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default HelperProfileStepSection;
