import JobOfferSvg from "../Assets/SVGIcons/JobOfferSvg";
import JobRequirement from "../Assets/SVGIcons/JobRequirement";
import SubscribePublishSvg from "../Assets/SVGIcons/SubscribePublishSvg";

export const STEPPER_ROUTES = [
  "disclaimer",
  "applicant_info",
  "working_experience",
  "job_details",
  "q_&_a",
  "final",
  "complete-profile",
  "thankyou",
];

export const successType = "success";

export const AGENCY_STEP = "agency-details";

export const JOB_STATUS = {
  APPLIED: "applied",
  SAVED: "saved",
};

export const USER_ROLE = {
  helper: "helper",
  employer: "employer",
  agency: "agency",
  admin: "admin",
};

export const JOB_POST_STEP = [
  {
    step_key: "step_1",
    step_title_key: "job_post_step1_title",
    img: <JobRequirement />,
    url: "disclaimer",
    svgIcon: true,
  },
  {
    step_key: "step_2",
    step_title_key: "job_post_step2_title",
    img: <JobOfferSvg />,
    url: "applicant_info",
    svgIcon: true,
  },
  {
    step_key: "step_3",
    step_title_key: "job_post_step3_title",
    img: <SubscribePublishSvg />,
    url: "working_experience",
    svgIcon: true,
  },
];

export const MARKS = [
  {
    value: 0,
    label: "Fix",
  },
  {
    value: 24,
    label: "2 Weeks",
  },
  {
    value: 49,
    label: "1 Month",
  },
  {
    value: 74,
    label: "2 Month",
  },
  {
    value: 99,
    label: "3 Month",
  },
];

export const AGENCY_DETAIL_STEPS = [
  {
    step_key: "step_1",
    step_title_key: "agency_step1_title",
    img: <JobRequirement />,
    url: "disclaimer",
    svgIcon: true,
  },
  // uncomment in future
  // {
  //   step_key: "step_2",
  //   step_title_key: "job_post_step3_title",
  //   img: <SubscribePublishSvg />,
  //   url: "working_experience",
  //   svgIcon: true,
  // },
];

export const MIN_EXPERENCE_DISTANCE = 10;
export const MIN_AGE_DISTANCE = 5;
export const COMMON_PAGE_LIMIT = 10;

//constant for payment methods inside payment modal
export const PAYMENT_METHODS = [
  {
    title: "Paypal",
    cardNumber: "**** **** **** 2313",
    icon: "/paypal.png",
    value: "Paypal",
  },
];

export const EMPLOYEE_SIZE = [
  {
    name: "10-50",
  },
  {
    name: "50-200",
  },
  {
    name: "200+",
  },
];
export const SCHEDULE_TYPE_OPTIONS = [
  {
    name: "I need someone available for:",
  },
  {
    name: "I don't know my schedule yet",
  },
];

export const extractNameFromUrl = (url) => {
  if (url) {
    const lastIndex = url.lastIndexOf("/");
    const name = url.slice(lastIndex + 1);
    return name;
  }
};
export const getImageFromFile = (filename) => {
  if (filename) {
    const extension = filename.split(".").pop().toLowerCase();
    // switch (extension) {
    //   case "pdf":
    //     return "/Pdf.svg";
    //   case "doc" || "docx":
    //     return "/profileDoc.svg";
    //   case "png" || "jpeg" || "jpg" || "svg":
    //     return "/demo-user.png";
    //   default:
    //     return "/profileDoc.svg";
    // }
    if (extension) {
      if (extension === "pdf") {
        return "/Pdf.svg";
      } else if (extension === "doc" || extension === "docx") {
        return "/profileDoc.svg";
      } else if (
        extension === "png" ||
        extension === "jpeg" ||
        extension === "jpg" ||
        extension === "svg"
      ) {
        // return "/demo-user.png"
        return "/profileDoc.svg";
      } else {
        return "/profileDoc.svg";
      }
    }
  }
};
export const generateKey = (documentKey) => {
  switch (documentKey) {
    case "driving"||"drivingLicenseFile":
      return "drivingLicenseVerified";
    case "firstAid"||"firstAidCertificateFile":
      return "firstAidCertificateVerified";
    case "elderlyCaregiving"||"elderlyCaregivingCertificateFile":
      return "elderlyCaregivingCertificateVerified";
    case "newBornCaregiving" ||"babyCaregivingCertificateFile":
      return "babyCaregivingCertificateVerified";
    case "appliedCountryLicenseVerified" ||"appliedCountryLicenseFile":
      return "appliedCountryLicenseVerified";
  }
};
export const AboutInfo = [
  {
    title: "nationality",
    key: "HongKong",
  },
  {
    title: "marital_status",
    key: "maritalStatus",
  },
  {
    title: "religion",
    key: "religion",
  },
  {
    title: "height",
    key: "physicalAttributes",
    subKey: "height",
  },
  {
    title: "weight",
    key: "physicalAttributes",
    subKey: "weight",
  },
  {
    title: "dob",
    key: "dob",
  },
  {
    title: "current_location",
    key: "location",
  },
  {
    title: "religion",
    key: "religion",
  },
  {
    title: "passport_number",
    key: "passportOrHKID",
  },
];

// file types

// image types
export const IMAGE_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  // "image/tiff",
  // "image/bmp",
  "image/jpg",
  "image/svg",
  "image/svg+xml",
];

// document types
export const DOCUMENT_ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// language options
export const LANGUAGE_OPTIONS = [
  {
      label :"English",
      value:"en"
  },
  {
      label :"中国人",
      value:"zh"
  }
]

export const DOCUMENT_TYPE_ERROR_MESSAGE = "document_type_error_message";
export const IMAGE_TYPE_ERROR_MESSAGE = "image_type_error_message";
export const REQUIRED_MESSAGE = "required_message";
export const PASSWORD_ERROR_MESSAGE = "same_value_error"
export const WHATSAPP_TEXT = ""

