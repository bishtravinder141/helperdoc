import React from "react";

const StepTitleWithIcon = ({
  isActive,
  isRoleButton,
  handleOnTabChange,
  step,
  icon,
  label,
}) => {
  return (
    <div
      role={isRoleButton ? "button" : ""}
      className="step-wrapper"
      onClick={() => handleOnTabChange(step)}
    >
      <div className={`${isActive ? "active-step" : "step-icon"}`}>
        <img height={20} width={20} src={icon} alt={`Step ${step + 1}`} />
      </div>
      <span>{label}</span>
    </div>
  );
};

export default StepTitleWithIcon;
