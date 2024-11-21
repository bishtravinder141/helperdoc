// steps={["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"]}

import {
  faBicycle,
  faCar,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import ApplicantBriefcaseSVGIcon from "../../Assets/SVGIcons/ApplicantBriefcaseSVGIcon";
import DisclaimerSVGIcon from "../../Assets/SVGIcons/DisclaimerSVGIcon";
import FinalTickSVGOIcon from "../../Assets/SVGIcons/FinalTickSVGOIcon";
import InformationSVGIcon from "../../Assets/SVGIcons/InformationSVGIcon";
import JobSVGIcon from "../../Assets/SVGIcons/JobSVGIcon";
import QASVGIcon from "../../Assets/SVGIcons/QASVGIcon";

export const HELPER_STEP_DETAILS = [
  {
    step_key: "step_1",
    step_title_key: "step1_title",
    img: <DisclaimerSVGIcon />,
    url: "disclaimer",
    svgIcon: true,
  },
  {
    step_key: "step_2",
    step_title_key: "step2_title",
    img: <InformationSVGIcon />,
    url: "applicant_info",
    svgIcon: true,
  },
  {
    step_key: "step_3",
    step_title_key: "step3_title",
    img: <ApplicantBriefcaseSVGIcon />,
    url: "working_experience",
    svgIcon: true,
  },
  {
    step_key: "step_4",
    step_title_key: "step4_title",
    img: <JobSVGIcon />,
    url: "job_details",
    svgIcon: true,
  },
  {
    step_key: "step_5",
    step_title_key: "step5_title",
    img: <QASVGIcon />,
    url: "q_&_a",
    svgIcon: true,
  },
  {
    step_key: "step_6",
    step_title_key: "step6_title",
    img: <FinalTickSVGOIcon />,
    svgIcon: true,
  },
];

export const STEP1_QUESTIONS = [
  {
    id: "a3736d8a-ab6f-4ed9-b98f-ced4b479b141",
    question: "step1_question_1",
    type: "radio",
    radioOption: ["yes", "no"],
    required: true,
  },
  {
    id: "a3736d8a-ab6f-4ed9-b98f-ced4b479b143",
    question: "step1_question_2",
    type: "radio",
    radioOption: ["yes", "no"],
    subQuestion: "if_yes_country_question",
    subQuestionType: "country_dropdown",
    required: true,
    subQuestionRequired: true,
  },
  {
    id: "a3736d8a-ab6f-4ed9-b98f-ced4b479b142",
    question: "step1_question_3",
    type: "radio",
    radioOption: ["yes", "no"],
    subQuestion: "if_yes_country_question",
    subQuestionType: "country_dropdown",
    required: true,
    subQuestionRequired: true,
  },
  {
    id: "a3736d8a-ab6f-4ed9-b98f-ced4b479b144",
    question: "step1_question_4",
    type: "radio",
    radioOption: ["yes", "no"],
    subQuestion: "step1_question_4_sub_question",
    subQuestionType: "text",
    required: true,
    subQuestionRequired: true,
  },
  {
    id: "a3736d8a-ab6f-4ed9-b98f-ced4b479b145",
    question: "step1_question_5",
    type: "text",
    required: true,
  },
];

export const ABOUT_FAMILY_QUESTION = [
  {
    question: "about_family_question1",
    answer_type: "number",
    placeholder: "e.g 25",
    name: "age",
  },
  {
    question: "about_family_question2",
    answer_type: "text",
    name: "occupation",
    placeholder: "",
  },
  {
    question: "about_family_question3",
    answer_type: "number",
    placeholder: "e.g 2",
    name: "brothers",
  },
  {
    question: "about_family_question4",
    answer_type: "number",
    placeholder: "e.g 2",
    name: "sisters",
  },
  {
    question: "about_family_question5",
    answer_type: "number",
    placeholder: "e.g 2",
    name: "familyOrder",
  },
  {
    question: "about_family_question6",
    answer_type: "number",
    placeholder: "e.g 12",
    name: "sonsAge",
  },
  {
    question: "about_family_question7",
    answer_type: "number",
    placeholder: "e.g 13",
    name: "daughtersAge",
  },
];

export const FAMILY_OPTIONS = [
  {
    // icon: faCartShopping,
    icon: "/under3year.png",
    title: "family_card_title1",
    key: "under3Years",
  },
  {
    // icon: faCar,
    icon :"/3-6years.png",
    title: "family_card_title2",
    key: "between3And6",
  },
  {
    // icon: faBicycle,
    icon: "/7+years.png",
    title: "family_card_title3",
    key: "sevenYearsAndUp",
  },
];
export const MAX_CHILDREN_LIMIT = 10;
export const MAJOR_STUDY = [
  {
    name: "Elementary",
  },
  {
    name: "Junior High School<",
  },
  {
    name: "Senior High School",
  },
  {
    name: "College",
  },
  {
    name: "Undergraduate",
  },
  {
    name: "Graduate",
  },
];

export const YES_NO = [
  {
    name: "YES",
  },
  {
    name: "NO",
  },
];

export const REFRENCE_LETTER = [
  {
    name: "Upload Letter",
  },
  {
    name: "Provide It Later",
  },
];

export const STEP5_QUESTION = [
  {
    question: "step4_question_1",
    type: "radio",
    answer_type: "smoke",
  },
  {
    question: "step4_question_2",
    type: "radio",
    answer_type: "drinkAlcohol",
  },
  {
    question: "step4_question_3",
    type: "radio",
    answer_type: "vaccinatedCovid19",
  },
  {
    question: "step4_question_4",
    type: "radio",
    answer_type: "hasTattoo",
  },
  {
    question: "step4_question_5",
    type: "radio",
    answer_type: "comfortableWithPets",
  },
  {
    question: "step4_question_6",
    type: "radio",
    answer_type: "comfortableWithCoHelper",
  },
  {
    question: "step4_question_7",
    type: "radio",
    answer_type: "willingToWorkOnNonSundayDayOff",
  },
  {
    question: "step4_question_8",
    type: "radio",
    answer_type: "willingToAcceptMonetaryCompensationOnHolidays",
  },
  {
    question: "step4_question_9",
    type: "radio",
    answer_type: "agreeToHouseCameraSurveillance",
  },
  {
    question: "step4_question_10",
    type: "radio",
    answer_type: "willingToReturnHomeByEmployerSetTime",
  },
];
