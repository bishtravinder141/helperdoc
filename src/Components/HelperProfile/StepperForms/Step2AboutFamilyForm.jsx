import React, { useState } from "react";
import NumberField from "../../Common/FormFields/NumberField";
import TextFieldWithController from "../../Common/FormFields/TextFieldWithController";
import {
  ABOUT_FAMILY_QUESTION,
  FAMILY_OPTIONS,
  MAX_CHILDREN_LIMIT,
} from "../Constant";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useTranslation } from "react-i18next";

export default function Step2AboutFamilyForm({
  control,
  errors
}) {
  const { t } = useTranslation();
  return (
    <>
      {ABOUT_FAMILY_QUESTION.map((que) => (
        <>
          {que.answer_type === "number" ? (
            <NumberField
              control={control}
              name={que.name}
              placeholder={que.placeholder}
              label={t(que.question)}
            />
          ) : (
            <TextFieldWithController
              control={control}
              name={que.name}
              placeholder={que.placeholder}
              label={t(que.question)}
            />
          )}
        </>
      ))}
    </>
  );
}
