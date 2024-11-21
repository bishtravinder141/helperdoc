import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TextFieldWithController from "../../../Components/Common/FormFields/TextFieldWithController";
import Editor from "../../../Components/Editor/Editor";
import { Controller } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { REQUIRED_MESSAGE } from "../../../Constant/Constant";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ErrorMessage from "../../../Components/Common/ErrorMessage/ErrorMessage";

const AddFaq = ({
  fields,
  // isEditAllowed,
  // setIsEditAllowed,
  handleRemoveSingleFaq,
  clearErrors,
  index,
  handlePostSingleFaq,
  control,
  data,
  setError,
  errors,
  setValue,
  handleSaveSingleFaq,
  watch,
  handleGetFaqs,
  handleRemove,
  handleAddMore,
}) => {
  const { t } = useTranslation();
  const [isEditAllowed, setIsEditAllowed] = useState(false);

  const handleEdit = () => {
    setIsEditAllowed(!isEditAllowed);
  };
  const handleSave = () => {
    handleSaveSingleFaq(watch(`FAQs.${index}._id`));
    setIsEditAllowed(!isEditAllowed);
  };
  const handleSaveOrEdit = (index) => {
    const question = watch(`FAQs.${index}.question`);
    const answer = watch(`FAQs.${index}.answer`);

    if (isEditAllowed) {
      if (question && answer) {
        setIsEditAllowed(!isEditAllowed);
        handleSaveSingleFaq(watch(`FAQs.${index}._id`));
      } else {
        if (question === "") {
          setError(`FAQs.${index}.question`, {
            type: "manual",
            message: t(REQUIRED_MESSAGE),
          });
        }
        if (answer === "") {
          setError(`FAQs.${index}.answer`, {
            type: "manual",
            message: t(REQUIRED_MESSAGE),
          });
        }
      }
    } else {
      setIsEditAllowed(!isEditAllowed);
    }
  };

  const postSingleFaq = (index) => {
    const question = watch(`FAQs.${index}.question`);
    const answer = watch(`FAQs.${index}.answer`);
    if(question && answer)
    {
      handlePostSingleFaq(index);
    }
    else{
      if(question === "")
      {
         setError(`FAQs.${index}.question`,{
          type :"manual",
          message:t(REQUIRED_MESSAGE)
         })
      }
      if(answer === ""){
        setError(`FAQs.${index}.answer`,{
          type :"manual",
          message:t(REQUIRED_MESSAGE)
         })
      }
    }
  };

  const removeFaq = (index, id) => {
    handleRemove(index);
    if (id) {
      handleRemoveSingleFaq(id);
    }
  };
  return (
    <div>
      <Grid container spacing={2} alignItems="start" className="formDataInfo">
        <Grid item xs={12} md={12}>
          {isEditAllowed || !watch(`FAQs.${index}._id`) ? (
            <TextFieldWithController
              name={`FAQs.${index}.question`}
              label={t("question")}
              control={control}
              isFaq={true}
              placeholder={t("add_question")}
              multiline={true}
              clearErrors={clearErrors}
              isRequired={true}
              errors={errors}
            />
          ) : (
            <>
              <Typography variant="body1" className="mb-4">
                <strong>{t("question")}*</strong>
              </Typography>

              <Typography variant="body1">
                {watch(`FAQs.${index}.question`)}
              </Typography>
            </>
          )}
          {errors.FAQs?.[index]?.question && (
            <ErrorMessage msg={errors.FAQs?.[index]?.question?.message} />
          )}
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="body1" className="mb-4">
            <strong>{t("answer")}*</strong>
          </Typography>
          {isEditAllowed || !watch(`FAQs.${index}._id`) ? (
            <Controller
              name={`FAQs.${index}.answer`}
              control={control}
              rules={{required:t(REQUIRED_MESSAGE)}}
              render={({ field }) => (
                <CKEditor
                  {...field}
                  type=""
                  editor={ClassicEditor}
                  config={{
                    // plugins: [ Paragraph, Bold, Italic, Essentials ],
                    toolbar: {
                      items: [
                        "undo",
                        "redo",
                        "|",
                        "heading",
                        "|",
                        "fontfamily",
                        "fontsize",
                        "fontColor",
                        "fontBackgroundColor",
                        "|",
                        "bold",
                        "italic",
                        "strikethrough",
                        "subscript",
                        "superscript",
                        "|",
                        "link",
                        "blockQuote",
                        "|",
                        "bulletedList",
                        "numberedList",
                        ,
                        "outdent",
                        "indent",
                      ],
                    },
                  }}
                  //   config={{
                  //     ckfinder: {
                  //       // Upload the images to the server using the CKFinder QuickUpload command
                  //       // You have to change this address to your server that has the ckfinder php connector
                  //       uploadUrl: "" //Enter your upload url
                  //     }
                  //   }}
                  data={watch(`FAQs.${index}.answer`)}
                  onChange={(event, editor) => {
                    clearErrors(`FAQs.${index}.answer`);
                    const value = editor.getData();
                    field.onChange(value);
                  }}
                />
              )}
            />
          ) : (
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{
                __html: watch(`FAQs.${index}.answer`),
              }}
            >
              {/* {watch(`FAQs.${index}.answer`)} */}
            </Typography>
          )}
          {errors.FAQs?.[index]?.answer && (
            <ErrorMessage msg={errors.FAQs?.[index]?.answer?.message} />
          )}

          <div className="buttons d-flex gap-2 mt-2">
            {watch(`FAQs.${index}._id`) ? (
              <Button
                className="green-btn small text-center w-25"
                onClick={() => {
                  handleSaveOrEdit(index);
                }}
              >
                {isEditAllowed ? t("save") : t("edit")}
              </Button>
            ) : (
              <Button
                className="green-btn small text-center w-25"
                onClick={() => {
                  postSingleFaq(index);
                }}
              >
                {t("save")}
              </Button>
            )}
            {watch("FAQs").length !== 1 && (
              <Button
                className="green-btn small text-center w-25"
                onClick={() => {
                  removeFaq(index, watch(`FAQs.${index}._id`));
                }}
              >
                {t("remove")}
              </Button>
            )}
          </div>
          {/* <Editor /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default AddFaq;
