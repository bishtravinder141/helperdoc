import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useTranslation } from "react-i18next";

const TermsAndConditions = ({ data, setData, error, setError }) => {
  const { t } = useTranslation();
  return (
    <div>
      {" "}
      <Box
        // className="profileCardBox"
        border={1}
        borderRadius={8}
        borderColor="#e7e7e7"
        py={6}
        px={10}
        mb={2}
        mt={2}
      >
        <CKEditor
          type=""
          name={"terms_and_conditions"}
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
          data={data}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data })
            setError(false);
            setData(data);
          }}
        />
        {JSON.stringify(data)}
        {error && (
          <p className="text-danger" style={{ color: "red" }}>
            This field is required
          </p>
        )}
      </Box>
    </div>
  );
};

export default TermsAndConditions;
