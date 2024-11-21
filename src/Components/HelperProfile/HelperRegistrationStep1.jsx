import React, { useEffect } from "react";
import { Grid, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import Step1Form from "./StepperForms/Step1Form";
import { useTranslation } from "react-i18next";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  // color: theme.palette.text.secondary,
}));

const HelperRegistrationStep1 = ({ saveStepDetails, stepDetails }) => {
  const {t} = useTranslation();
  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (stepDetails && stepDetails.answers) {
      stepDetails.answers.forEach((ans) => {
        setValue(ans.questionId, ans.answer);
        setValue(`sub_que_${ans.questionId}`, ans.subAnswer);
      });
    }
  }, [stepDetails]);

  const handleNextStep = (questAnswer) => {
    const answerArray = [];
    for (const key in questAnswer) {
      if (!key.startsWith("sub_que_")) {
        answerArray.push({
          questionId: key,
          answer: questAnswer[key],
          subAnswer: questAnswer[`sub_que_${key}`] || "",
        });
      }
    }
    const payload = {
      answers: answerArray,
    };
    saveStepDetails(payload, "applicant_info");
  };

  return (
    <Grid item xs={12} md={6} className="stepsForm formDataInfo ">
      <StyledPaper className="StepFormCol">
        <form onSubmit={handleSubmit(handleNextStep)}>
          <Step1Form control={control} errors={errors} watch={watch} setValue = {setValue} />
          <Button className="arrowButton" type="submit">
            {t("next_step")}
          </Button>
        </form>
      </StyledPaper>
    </Grid>
  );
};

export default HelperRegistrationStep1;
