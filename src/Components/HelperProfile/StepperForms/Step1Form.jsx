import React, { useEffect } from "react";
import { STEP1_QUESTIONS } from "../Constant";
import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import RadioGroupField from "../../Common/FormFields/RadioGroupField";
import CountryDropdown from "../../Common/FormFields/CountryDropdown";
import ErrorMessage from "../../Common/ErrorMessage/ErrorMessage";
import { useTranslation } from "react-i18next";

export default function Step1Form({
  setValue,
  control,
  errors,
  profile = false,
  watch,
}) {
  const { t } = useTranslation();
  useEffect(() => {
    if (profile) {
      if (watch("step1_a3736d8a-ab6f-4ed9-b98f-ced4b479b142") === "No") {
        setValue("step1_sub_que_a3736d8a-ab6f-4ed9-b98f-ced4b479b142", null);
      }
    } else {
      if (watch("a3736d8a-ab6f-4ed9-b98f-ced4b479b142") === "No") {
        setValue("sub_que_a3736d8a-ab6f-4ed9-b98f-ced4b479b142", null);
      }
    }

    if (profile) {
      if (watch("step1_a3736d8a-ab6f-4ed9-b98f-ced4b479b143") === "No") {
        setValue("step1_sub_que_a3736d8a-ab6f-4ed9-b98f-ced4b479b143", null);
      }
    } else {
      if (watch("a3736d8a-ab6f-4ed9-b98f-ced4b479b143") === "No") {
        setValue("sub_que_a3736d8a-ab6f-4ed9-b98f-ced4b479b143", null);
      }
    }

    if (profile) {
      if (watch("step1_a3736d8a-ab6f-4ed9-b98f-ced4b479b144") === "No") {
        setValue("step1_sub_que_a3736d8a-ab6f-4ed9-b98f-ced4b479b144", null);
      }
    } else {
      if (watch("a3736d8a-ab6f-4ed9-b98f-ced4b479b144") === "No") {
        setValue("sub_que_a3736d8a-ab6f-4ed9-b98f-ced4b479b144", null);
      }
    }
  }, [
    watch("a3736d8a-ab6f-4ed9-b98f-ced4b479b143"),
    watch("a3736d8a-ab6f-4ed9-b98f-ced4b479b142"),
    watch("a3736d8a-ab6f-4ed9-b98f-ced4b479b144"),
    watch("step1_a3736d8a-ab6f-4ed9-b98f-ced4b479b143"),
    watch("step1_a3736d8a-ab6f-4ed9-b98f-ced4b479b142"),
    watch("step1_a3736d8a-ab6f-4ed9-b98f-ced4b479b144"),
  ]);
  
  const getName = (ques, sub_que) => {
    if (sub_que) {
      return profile ? `step1_sub_que_${ques.id}` : `sub_que_${ques.id}`;
    } else {
      return profile ? `step1_${ques.id}` : ques.id;
    }
  };
  return (
    <>
      {STEP1_QUESTIONS.map((ques, index) => (
        <div key={ques.id} className="queRow">
          <Typography variant="body1" className="queTitle">
            {t(ques.question)}*
          </Typography>
          {ques.type === "radio" && (
            <Controller
              name={getName(ques)}
              control={control}
              defaultValue=""
              rules={{ required: t("answer_required_msg") }}
              render={({ field }) => (
                <RadioGroupField
                  radioOptions={ques.radioOption}
                  field={field}
                />
              )}
            />
          )}
          {ques.type === "text" && (
            <Controller
              name={getName(ques)}
              control={control}
              defaultValue=""
              rules={{ required: t("answer_required_msg") }}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  fullWidth
                  rows={4}
                  className="formInputFiled"
                  variant="outlined"
                  placeholder="Your answer..."
                />
              )}
            />
          )}
          {ques.subQuestion && watch(getName(ques)) === "Yes" && (
            <div>
              <Typography variant="body1">{t(ques.subQuestion)}*</Typography>
              {ques.subQuestionType === "country_dropdown" ? (
                <>
                  <CountryDropdown
                    control={control}
                    name={getName(ques, true)}
                    isRequired={true}
                    errors={errors}
                  />
                </>
              ) : (
                <>
                  <Controller
                    name={getName(ques, true)}
                    control={control}
                    defaultValue=""
                    rules={{ required: t("answer_required_msg") }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="formInputFiled"
                        multiline
                        fullWidth
                        rows={4}
                        variant="outlined"
                        label="Your answer..."
                      />
                    )}
                  />
                  {errors[getName(ques, true)] && (
                    <ErrorMessage msg={errors[getName(ques, true)]?.message} />
                  )}
                </>
              )}
            </div>
          )}
          {errors[getName(ques)] && (
            <ErrorMessage msg={errors[getName(ques)]?.message} />
          )}
        </div>
      ))}
    </>
  );
}
