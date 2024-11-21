import React from "react";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import DocumentListing from "../../../Components/Common/DocumentListing";
import SendMessageSection from "../../../Components/Common/SendMessageSection";

const SingleJobSeekerTableRow = ({
  rowData,
  setShowVerificationModal,
  setVerificationModalData,
}) => {
  const navigate = useNavigate();
  const {
    fullName,
    phoneNumber,
    role,
    location,
    profilePicURL,
    licensesAndCertificates,
    experienceLetters,
    userId,
  } = rowData;
  //   const getImageFromFile = (filename) => {
  //     if (filename)
  //     {
  //          const extension = filename.split(".").pop().toLowerCase();
  //         // switch (extension) {
  //         //   case "pdf":
  //         //     return "/Pdf.svg";
  //         //   case "doc" || "docx":
  //         //     return "/profileDoc.svg";
  //         //   case "png" || "jpeg" || "jpg" || "svg":
  //         //     return "/demo-user.png";
  //         //   default:
  //         //     return "/profileDoc.svg";
  //         // }
  //         if(extension)
  //         {
  //             if (extension === "pdf") {
  //               return "/Pdf.svg";
  //             } else if (extension === "doc" || extension === "docx") {
  //               return "/profileDoc.svg";
  //             } else if (extension ==="png" || extension === "jpeg" || extension === "jpg" || extension === "svg") {
  //                 return "/demo-user.png"
  //             } else {
  //                 return "/profileDoc.svg"
  //             }

  //         }

  //     }
  //   };
  return (
    <tr>
      <td>
        <div className="d-flex gap-2 align-items-center">
          <Avatar sx={{ width: 100, height: 100, marginRight: "16px" }}>
            <img
              id="avatar"
              src={profilePicURL ? profilePicURL : "/demo-user.png"}
              alt="Avatar"
            />
          </Avatar>
          <p className="text-capitalize"> {fullName && fullName}</p>
        </div>
      </td>

      <td>
        <div className="count">
          <p> {phoneNumber && phoneNumber}</p>
        </div>
      </td>
      <td>
        <div className="count">
          <span> {role && role}</span>
        </div>
      </td>
      <td>
        <span>{location && location}</span>
      </td>
      {/* documents */}
      <td className="d-flex gap-2">
        <DocumentListing
          documents={licensesAndCertificates}
          setVerificationModalData={setVerificationModalData}
          setShowVerificationModal={setShowVerificationModal}
          haveToVerify={true}
          userId={userId}
        />
        {/* {licensesAndCertificates &&
          Object.keys(licensesAndCertificates).length > 0 &&
          Object.entries(licensesAndCertificates).map((curElem, index) => (
            <div>
              <Fragment key={index}>
                <img src={getImageFromFile(curElem[1])} />
                {extractNameFromUrl(curElem[1])}
              </Fragment>
            </div>
          ))} */}
      </td>
      {/* experience list */}
      <td>
        <DocumentListing
          documents={experienceLetters}
          setVerificationModalData={setVerificationModalData}
          setShowVerificationModal={setShowVerificationModal}
          isJobSeeker={true}
          userId={userId}
        />{" "}
      </td>
      {/* status */}
      <td>
        {/* <span>
          {planStatus && planStatus === false ? t("inactive") : t("active")}
        </span> */}
        <span>Active Static </span>
      </td>
      <td>
        <SendMessageSection />
      </td>
      <td>
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate(`/admin/job-seeker-detail/${userId}`);
          }}
        >
          <Visibility />
        </div>
      </td>
    </tr>
  );
};

export default SingleJobSeekerTableRow;
