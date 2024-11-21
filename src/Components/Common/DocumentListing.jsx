import React, { Fragment } from "react";
import {
  extractNameFromUrl,
  generateKey,
  getImageFromFile,
} from "../../Constant/Constant";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const DocumentListing = ({
  haveToVerify = false,
  documents,
  setShowVerificationModal,
  setVerificationModalData,
  userId,
}) => {
  const handleDocumentClick = (document) => {
    // document i.e ["firstAidLicense","license.png"]
    // const name = document[0];
    // const fileUrl = document[1];
    setVerificationModalData({
      document: document,
      userId: userId,
      verificationStatus: documents[generateKey(document[0])]
        ? "verified"
        : documents[generateKey(document[0])] === false && "declined",
    });
    setShowVerificationModal(true);
  };
  return (
    <div className="d-flex gap-2 align-items-center">
      {Array.isArray(documents)
        ? documents.length > 0 &&
          documents.map((curDocument, index) => (
            <div key={index}>
              <img src={getImageFromFile(curDocument)} />
              {extractNameFromUrl(curDocument)}
              {/* <CheckCircleRoundedIcon /> */}
            </div>
          ))
        : documents &&
          Object.keys(documents).length > 0 &&
          Object.entries(documents).map(
            (curElem, index) =>
              typeof curElem[1] !== "boolean" && (
                <div
                  key={index}
                  style={{ position: "relative" }}  
                  // className={
                  //   documents[generateKey(curElem[0])] ? "class1" : "class2"
                  // }
                  className="file-container"
                  onClick={() => {
                    haveToVerify && handleDocumentClick(curElem);
                  }}
                >
                  <img src={getImageFromFile(curElem[1])} />
                  {extractNameFromUrl(curElem[1])}
                  {documents[generateKey(curElem[0])] ? (
                    <CheckCircleRoundedIcon className="checked-icon" />
                  ) :(documents[generateKey(curElem[0])]===false)&& (
                    documents[generateKey(curElem[0])] === false && (
                      <PriorityHighIcon className="declined-icon" />
                    )
                  )}
                </div>
              )
          )}
    </div>
  );
};

export default DocumentListing;
