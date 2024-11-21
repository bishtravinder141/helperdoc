import React, { useState } from "react";
import { Box } from "@mui/system";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";
import { REQUIRED_MESSAGE } from "../../Constant/Constant";

const Editor = ({
  content,
  setContent,
  requiredError,
  setRequiredError,
  name,
  title,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      {" "}
      <Typography variant="h5" className="mb-4">
        <strong>{t(title)}</strong>
      </Typography>
      <CKEditor
        type=""
        name={name}
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
        data={content}
        onChange={(event, editor) => {
          const value = editor.getData();
          setRequiredError(false);
          setContent(value);
        }}
      />
      {requiredError && <ErrorMessage msg={t(REQUIRED_MESSAGE)} />}
    </div>
  );
};

export default Editor;
