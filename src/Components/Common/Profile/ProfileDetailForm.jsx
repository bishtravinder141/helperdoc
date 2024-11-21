import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextFieldWithController from "../FormFields/TextFieldWithController";
import { useTranslation } from "react-i18next";
import {
  MAJOR_STUDY,
  REFRENCE_LETTER,
  STEP5_QUESTION,
  YES_NO,
} from "../../HelperProfile/Constant";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CountryDropdown from "../FormFields/CountryDropdown";
import RadioGroupWithController from "../FormFields/RadioGroupWithController";
import SelectWithController from "../FormFields/SelectWithController";
import { isPhoneValid } from "../../../Utils/MobileNumberValidation";
import { PhoneInput } from "react-international-phone";
import DatePickerWIthController from "../FormFields/DatePickerWIthController";
import NumberField from "../FormFields/NumberField";
import LocationAutocomplete from "../LocationAutocomplete";
import CheckBoxField from "../FormFields/CheckBoxField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { handleFileUploadToS3Bucket } from "../../../Utils/CommonAPIs";
import PageLoader from "../Loader/PageLoader";
import FileUploaderField from "../FormFields/FileUploaderField";
import CheckBoxFieldWithController from "../FormFields/CheckBoxFieldWithController";
import moment from "moment";
import RadioButtonsWithController from "../FormFields/RadioButtonsWithController";
import { toastMessage } from "../../../Utils/toastMessages";
import ImageLogoIcon from "../../../Assets/SVGIcons/ImageLogoIcon";
import { YOUTUBE_LINK_REGEX } from "../../../Utils/Regex";
import {
  completeProfileData,
  getProfileData,
} from "../../../Services/ProfileServices/ProfileService";
import ThankyouModal from "../Modal/ThankyouModal";
import { useLocation, useNavigate } from "react-router-dom";
import "react-international-phone/style.css";
import {
  DOCUMENT_ALLOWED_TYPES,
  DOCUMENT_TYPE_ERROR_MESSAGE,
  IMAGE_ALLOWED_TYPES,
  IMAGE_TYPE_ERROR_MESSAGE,
  extractNameFromUrl,
  successType,
} from "../../../Constant/Constant";
import { useSelector } from "react-redux";
import Step1Form from "../../HelperProfile/StepperForms/Step1Form";
import Step3AboutEducationForm from "../../HelperProfile/StepperForms/Step3AboutEducationForm";
import PhoneInputWithController from "../FormFields/PhoneInputWithController";

export default function ProfileDetailForm() {
  const [profilePic, setProfilePic] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState({
    error: false,
    msg: "",
    number: "",
  });
  const [currentLocation, setCurrentLocation] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [fileURL, setFileUrl] = useState(null);
  const [showOtherLanguage, setOtherLanguage] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoError, setProfilePhotoError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [letterFile, setLetterFile] = useState(null);
  const [uploadFilesDetails, setUploadFilesDetails] = useState({
    drivingLicense: {
      haveTheDoc: false,
      docFile: "",
    },
  });
  const [avatar, setAvatar] = useState("default-avatar.jpg");
  const [thankoyuPageDetails, setThankyouModalDetails] = useState({});
  const [showThankyouModal, setShowThankyouModal] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { pathname } = useLocation();
  const {
    yourExperince,
    genders,
    requiredSpecialCare,
    currency,
    dutiesTasksList,
    maritalStatus,
    religion,
    skillsList,
    educationLevel,
    nativeLanguages,
    languageLevel,
    certificates,
    daysOff,
    livingArrangement,
    jobTypes,
    shareRoomCoWorker,
  } = useSelector((state) => state.common);

  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    watch,
    register,
    setError,
    trigger,
    clearErrors,
    setValue,
    resetField,
    formState: { errors },
  } = useForm();
  //for other languages
  // const [otherLanguages, setOtherLanguages] = useState([]);

  const userId = localStorage.getItem("userId");
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    getProfileDetails();
  }, []);
  useEffect(() => {
    if (watch("step_3_experience_letter") === "NO") {
      setLetterFile(null);
      setValue("step_3_refrence_letter_file", null);
      clearErrors("step_3_refrence_letter_file");
      setFileUrl(null);
    }
    if (watch("step_3_refrence_letter") === "Provide It Later") {
      setLetterFile(null);
      setValue("step_3_refrence_letter_file", null);
      clearErrors("step_3_refrence_letter_file");
      setFileUrl(null);
    }
    if (watch("moreWorkingExperience") === "NO") {
      setValue("moreWorkingExperienceRemark", null);
    }
  }, [
    watch("step_3_experience_letter"),
    watch("step_3_refrence_letter"),
    watch("step_3_moreWorkingExperience"),
  ]);

  const getProfileDetails = () => {
    setPageLoader(true);
    getProfileData(userId)
      .then((res) => {
        setPageLoader(false);
        const response = res?.data;
        if (response?.registrationStep2Data?.aboutYou?.fullName)
          setFullName(response?.registrationStep2Data?.aboutYou?.fullName);
        if (
          response?.registrationStep1Data?.answers &&
          response.registrationStep1Data?.answers.length > 0
        ) {
          response.registrationStep1Data.answers.forEach((ques) => {
            setValue(`step1_${ques.questionId}`, ques.answer);
            setValue(`step1_sub_que_${ques.questionId}`, ques.subAnswer);
          });
        }

        // Object.entries(response?.registrationStep3Data[0]).map((curElem) => {
        //   //curElem[0] is for key and curElem[1] is for value
        //   if (curElem[0] === "familyMembers") {
        //     setValue(`step_3_familySize`, curElem[1]?.length);
        //     response.registrationStep3Data.workExperience[0]?.familyMembers.forEach(
        //       (element, i) => {
        //         setValue(`step_3_familyMembers${i}_age`, element.age);
        //         setValue(`step_3_familyMembers${i}_gender`, element.gender);
        //         setValue(
        //           `step_3_familyMembers${i}_requireSpecialHelp`,
        //           element.specialNeeds
        //         );
        //       }
        //     );

        //   }
        //   if (curElem[0] === "period") {
        //     setValue("step_3_startedDate", curElem[1]?.start);
        //     setValue("step_3_releasedDate", curElem[1]?.end);
        //   }
        //   if (curElem[0] === "compensation") {
        //     setValue("step_3_salary", curElem[1]?.salary);
        //     setValue("step_3_currency", curElem[1]?.currency);
        //   } else {
        //     setValue(`step_3_${curElem[0]}`, curElem[1]);
        //   }
        // });

        if (
          response?.registrationStep3Data &&
          response?.registrationStep3Data?.length > 0
        ) {
          for (let key in response?.registrationStep3Data[0]) {
            if (
              key === "familyMembers" &&
              response.registrationStep3Data[0][key].length > 0
            ) {
              response.registrationStep3Data[0][key].forEach((element, i) => {
                setValue(`step_3_familyMembers${i}_age`, element.age);
                setValue(`step_3_familyMembers${i}_gender`, element.gender);
                setValue(
                  `step_3_familyMembers${i}_requireSpecialHelp`,
                  element.specialNeeds
                );
              });
            } else if (key === "compensation") {
              setValue(
                "step_3_currency",
                response.registrationStep3Data[0][key]?.currency
              );
              setValue(
                "step_3_salary",
                response.registrationStep3Data[0][key]?.salary
              );
            } else if (key === "period") {
              setValue(
                "step_3_startedDate",
                response.registrationStep3Data[0][key]?.start
              );
              setValue(
                "step_3_releasedDate",
                response.registrationStep3Data[0][key]?.end
              );
            } else if (key === "references") {
              setValue(
                "step_3_referenceAvailability",
                response.registrationStep3Data[0][key]?.available
              );
              response.registrationStep3Data[0][key]?.fileUrl &&
                setFileUrl(response.registrationStep3Data[0][key]?.fileUrl);

              setValue(
                "step_3_refrence_letter",
                response.registrationStep3Data[0][key]?.letter
                  ? "Upload Letter"
                  : "Provide It Later"
              );
            } else {
              setValue(`step_3_${key}`, response.registrationStep3Data[0][key]);
            }
          }
        }

        if (
          response?.registrationStep4Data?.jobPreferences &&
          Object.keys(response.registrationStep4Data.jobPreferences).length > 0
        ) {
          for (let key in response.registrationStep4Data.jobPreferences) {
            setValue(
              `step4_${key}`,
              response.registrationStep4Data.jobPreferences[key]
            );
          }
        }
        if (
          response?.registrationStep5Data?.qna &&
          Object.keys(response?.registrationStep5Data?.qna).length > 0
        ) {
          for (let key in response?.registrationStep5Data?.qna) {
            setValue(
              `step5_${key}`,
              response?.registrationStep5Data?.qna[key] ? "Yes" : "No"
            );
          }
        }
        setValue(
          "introVideoLink",
          response.registrationStep6Data.introVideoLink
        );
        setAvatar(response.registrationStep6Data.profilePicURL);
        setProfilePhoto(response.registrationStep6Data.profilePicURL);
        if (
          response?.registrationStep2Data &&
          Object.keys(response.registrationStep2Data).length > 0
        ) {
          for (let key in response?.registrationStep2Data) {
            if (key === "aboutYou") {
              for (let subKey in response?.registrationStep2Data.aboutYou) {
                if (subKey === "physicalAttributes") {
                  setValue(
                    "step2_about_height",
                    response?.registrationStep2Data.aboutYou[subKey].height
                  );
                  setValue(
                    "step2_about_weight",
                    response?.registrationStep2Data.aboutYou[subKey].weight
                  );
                } else if (subKey === "whatsapp") {
                  setWhatsappNumber({
                    ...whatsappNumber,
                    number:
                      response?.registrationStep2Data.aboutYou[subKey].number,
                  });
                  setValue(
                    "isWhatsappNumberVisible",
                    response?.registrationStep2Data.aboutYou[subKey].isVisible
                  );
                  setValue(
                    "whatsappNumber",
                    response?.registrationStep2Data.aboutYou[subKey].number
                  );
                } else if (subKey === "location") {
                  setValue(
                    "step_2_about_location",
                    response?.registrationStep2Data.aboutYou[subKey]
                  );
                } else {
                  setValue(
                    `step2_about_${subKey}`,
                    response?.registrationStep2Data.aboutYou[subKey]
                  );
                }
              }
            }
            if (key === "aboutYourFamily") {
              for (let subKey in response?.registrationStep2Data
                ?.aboutYourFamily) {
                if (subKey === "daughtersAge" || subKey === "sonsAge") {
                  if (
                    response?.registrationStep2Data?.aboutYourFamily[subKey]
                  ) {
                    setValue(
                      `step2_family_${subKey}`,
                      response?.registrationStep2Data?.aboutYourFamily[
                        subKey
                      ].join(",")
                    );
                  }
                } else {
                  setValue(
                    `step2_family_${subKey}`,
                    response?.registrationStep2Data?.aboutYourFamily[subKey]
                  );
                }
              }
            }
            if (key === "education") {
              for (let subKey in response?.registrationStep2Data?.education) {
                if (subKey === "languages") {
                  setValue(
                    `step2_education_${subKey}`,
                    response?.registrationStep2Data?.education[subKey].native
                  );
                } else if (subKey === "otherLanguages") {
                  setValue(
                    "otherLanguages",
                    response?.registrationStep2Data?.education[subKey]
                  );

                  //   if (
                  //     Object.keys(
                  //       response?.registrationStep2Data?.education[subKey]
                  //     ).length > 0
                  //   ) {
                  //     setOtherLanguage(true);
                  //     setValue(
                  //       `step2_education_otherLanguage`,
                  //       response?.registrationStep2Data?.education[subKey]
                  //         .language
                  //     );
                  //     setValue(
                  //       "step2_education_otherLanguageLevel",
                  //       response?.registrationStep2Data?.education[subKey].level
                  //     );
                  //   }
                  // } else {
                  //   setValue(
                  //     `step2_education_${subKey}`,
                  //     response?.registrationStep2Data?.education[subKey]
                  //   );
                } else if (subKey === "licensesAndCertificates") {
                  let temp;
                  for (const licensekey in response?.registrationStep2Data
                    ?.education?.licensesAndCertificates) {
                    temp = {
                      ...temp,
                      [licensekey]: {
                        url: response?.registrationStep2Data?.education
                          ?.licensesAndCertificates[licensekey],
                        haveTheDoc: true,
                      },
                    };
                  }
                  setUploadFilesDetails(temp);
                } else {
                  setValue(
                    `step2_education_${subKey}`,
                    response?.registrationStep2Data?.education[subKey]
                  );
                }
              }
            }
          }
        }
      })
      .catch((err) => {
        setPageLoader(false);
        console.log(err);
      });
  };
  const handleProfileSubmit = async (data) => {
    console.log(data.step_3_refrence_letter, "reference letter");
    const { otherLanguages, whatsappNumber } = data;
    setPageLoader(true);
    let filePayload = {};
    const payload = {};
    const answerArray = [];
    const aboutYou = {};
    const aboutYourFamily = {};
    const education = {};
    const step3Data = {};
    const step4Data = {};
    const step5Data = {};
    const step6Data = {};
    for (let key in data) {
      if (key.includes("step1_a3736d8a")) {
        let newId = key.replace("step1_", "");
        answerArray.push({
          questionId: newId,
          answer: data[key],
          subAnswer: data[`step1_sub_que_${newId}`] || "",
        });
      } else if (key.includes("step2_")) {
        if (key.includes("step2_about_")) {
          const aboutKey = key.replace("step2_about_", "");
          if (aboutKey === "height" || aboutKey === "weight") {
            aboutYou["physicalAttributes"] = {
              ...aboutYou["physicalAttributes"],
              [aboutKey]: data[key],
            };
          } else {
            aboutYou[aboutKey] = data[key];
          }
        } else if (key.includes("step2_family_")) {
          const familyKey = key.replace("step2_family_", "");
          if (familyKey === "sonsAge") {
            aboutYourFamily["sonsAge"] =
              data[key].length > 0 ? data[key].split(",") : [];
          } else if (familyKey === "daughtersAge") {
            aboutYourFamily["daughtersAge"] =
              data[key].length > 0 ? data[key].split(",") : [];
          } else {
            aboutYourFamily[familyKey] = data[key];
          }
        } else if (key.includes("step2_education_")) {
          const educationKey = key.replace("step2_education_", "");
          if (educationKey === "languages") {
            education["languages"] = {
              native: data[key],
            };
            // } else if (
            //   // educationKey === "otherLanguageLevel" ||
            //   // educationKey === "otherLanguage"
            //   educationKey.includes("otherLanguageLevel") || educationKey.includes("otherLanguageLevel")
            // ) {
            //   // education["otherLanguages"] = {
            //   //   ...aboutYou["otherLanguages"],
            //   //   [educationKey === "otherLanguageLevel" ? "language" : "level"]:
            //   //     data[key],
            //   console.log("first")
            //   };
          } else {
            education[educationKey] = data[key];
          }
        }
      } else if (key.includes("step_3")) {
        let fileUrl = "";
        let newId = key.replace("step_3_", "");
        if (key === "step_3_familySize" && data.step_3_familySize > 0) {
          let familMemberDetail = [];
          for (let i = 0; i < data.step_3_familySize; i++) {
            const familyDetail = {
              age: data[`step_3_familyMembers${i}_age`],
              gender: data[`step_3_familyMembers${i}_gender`],
              specialNeeds: data[`step_3_familyMembers${i}_requireSpecialHelp`],
            };
            familMemberDetail.push(familyDetail);
          }
          step3Data["familyMembers"] = familMemberDetail;
        } else if (
          key === "step_3_releasedDate" ||
          key === "step_3_startedDate"
        ) {
          step3Data["period"] = {
            ...step3Data["period"],
            [key === "step_3_releasedDate" ? "start" : "end"]: data[key],
          };
        } else if (key.includes("step_3_refrence_")) {
          if (letterFile?.name) {
            const fileUpload = await handleFileUploadToS3Bucket(letterFile);
            if (!fileUpload.error) {
              fileUrl = fileUpload.uploadedUrl;
            } else {
              setPageLoader(false);
              return;
            }
          } else if (fileURL) {
            fileUrl = fileURL;
          }
          console.log(
            data?.step_3_refrence_letter === "Upload Letter",
            "true or false"
          );
          step3Data["references"] = {
            letter: data?.step_3_refrence_letter === "Upload Letter",
            available: data.step_3_referenceAvailability,
            fileUrl: fileUrl,
          };
        } else {
          step3Data[newId] = data[key];
        }
      } else if (key.includes("step4_")) {
        const jobPrefrence = key.replace("step4_", "");
        step4Data[jobPrefrence] = data[key];
      } else if (key.includes("step5_")) {
        const QAKeys = key.replace("step5_", "");
        step5Data[QAKeys] = data[key] === "Yes" ? true : false;
      }

      aboutYou["whatsapp"] = {
        number: whatsappNumber,
        isVisible: data.isWhatsappNumberVisible,
      };
      aboutYou["location"] = currentLocation?.location || "sd";
      aboutYou["lat"] = currentLocation?.lat;
      aboutYou["lng"] = currentLocation?.lng;

      delete aboutYou.isVisible;
    }

    for (let key in uploadFilesDetails) {
      if (
        uploadFilesDetails[key]?.haveTheDoc &&
        uploadFilesDetails[key]?.docFile?.name
      ) {
        const fileUpload = await handleFileUploadToS3Bucket(
          uploadFilesDetails[key].docFile
        );
        if (!fileUpload.error) {
          filePayload[key] = fileUpload.uploadedUrl;
        } else {
          setPageLoader(false);
          return;
        }
      } else {
        // filePayload = {
        //   ...filePayload,
        //   [key]:{
        //     url: uploadFilesDetails[key]?.url
        //   }
        // }
        filePayload[key] = uploadFilesDetails[key]?.url;
      }
    }
    if (profilePhoto) {
      if (profilePhoto.name) {
        const fileUpload = await handleFileUploadToS3Bucket(profilePhoto);
        if (!fileUpload.error) {
          step6Data["profilePicURL"] = fileUpload.uploadedUrl;
        } else {
          setPageLoader(false);
          return;
        }
      } else {
        step6Data["profilePicURL"] = profilePhoto;
      }
    }
    payload["step1Data"] = {
      userId: userId,
      answers: answerArray,
    };
    payload["step2Data"] = {
      userId: userId,
      aboutYou: {
        ...aboutYou,
      },
      aboutYourFamily: {
        ...aboutYourFamily,
      },
      education: {
        ...education,
        otherLanguages,
        licensesAndCertificates: filePayload,
      },
    };
    payload["step3Data"] = {
      ...step3Data,
      employerNationality: [...step3Data?.employerNationality],
    };
    payload["step4Data"] = {
      userId: userId,
      // jobPreferences: step4Data,
      jobPreferences: {
        ...step4Data,
        // shareWork: "Yes",
      },
    };
    delete step5Data?._id;
    payload["step5Data"] = {
      userId: userId,
      qna: step5Data,
    };
    payload["step6Data"] = {
      userId: userId,
      introVideoLink: data.introVideoLink,
      ...step6Data,
    };
    delete payload.step_3_refrence_letter;

    completeProfileData(userId, payload)
      .then((res) => {
        setShowThankyouModal(true);
        if (pathname === "/helper/my-profile") {
          toastMessage("Profile Update successfully", successType);
          setThankyouModalDetails(res.data);
        } else {
          setThankyouModalDetails(res.data);
        }
        setPageLoader(false);
      })
      .catch((error) => {
        setPageLoader(false);
        if (error?.response?.data?.message) {
          toastMessage(error.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
        console.log(error);
      });
  };

  const handleProfilePicUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePic(event.target.files[0]);
    }
  };

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnBlurWhatsappNumber = () => {
    if (whatsappNumber.number.length === 0) {
      setWhatsappNumber({
        ...whatsappNumber,
        error: true,
        msg: t("whatsapp_required"),
      });
    } else if (isPhoneValid(whatsappNumber.number)) {
      setWhatsappNumber({
        ...whatsappNumber,
        error: false,
      });
    } else {
      setWhatsappNumber({
        ...whatsappNumber,
        error: true,
        msg: t("valid_mobile_number_msg"),
      });
    }
  };

  const handleSelectLocation = (location, { lat, lng }) => {
    setCurrentLocation({ location: location, lat: lat, lng: lng });
  };
  const handleStep3SelectLocation = (location, { lat, lng }) => {
    setWorkLocation({ location: location, lat: lat, lng: lng });
  };


  const handleBeforeSubmit = (e) => {
    e.preventDefault();
    // if (whatsappNumber.number.length === 0) {
    //   setWhatsappNumber({
    //     ...whatsappNumber,
    //     error: true,
    //     msg: t("valid_mobile_number_msg"),
    //   });
    // } else if (!isPhoneValid(whatsappNumber.number)) {
    //   setWhatsappNumber({
    //     ...whatsappNumber,
    //     error: true,
    //     msg: t("valid_mobile_number_msg"),
    //   });
    // }
    if(!profilePhotoError)
    {
      handleSubmit(handleProfileSubmit)();
    }
  };

  // Event handlers for file uploads
  const handleCheckboxChange = (checkedFile, e) => {
    setUploadFilesDetails({
      ...uploadFilesDetails,
      [checkedFile]: {
        ...uploadFilesDetails[checkedFile],
        haveTheDoc: e.target.checked,
      },
    });
  };

  const handleFileUpload = (uploadFile, file) => {
    setUploadFilesDetails({
      ...uploadFilesDetails,
      [uploadFile]: {
        ...uploadFilesDetails[uploadFile],
        docFile: file,
      },
    });
  };

  const handleReferenceFileUpload = (uploadFile, file) => {
    setLetterFile(file);
    setFileUrl(null);
  };

  // const handleProfilePhotoChange = (name, file) => {
  //   // if (!file?.name?.match(/\.(jpg|jpeg|png)$/)) {
  //   //   toastMessage(t("img_upload_error_msg"));
  //   // } else {
  //     if (file) {
  //       setProfilePhoto(file);
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setAvatar(e.target.result);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   // }
  // };

  const getCertificateListing = () => {
    // const tempCertificates = [...certificates];
    const tempCertificates = JSON.parse(JSON.stringify(certificates));
    tempCertificates.forEach((item) => {
      const label = item.name.replace(/\s+/g, ""); // Remove spaces from name
      item.label = label.charAt(0).toLowerCase() + label.slice(1); // Make first letter lowercase
    });
    return tempCertificates;
  };

  const handleProfilePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (IMAGE_ALLOWED_TYPES.includes(file.type)) {
        setProfilePhotoError("");
        if (file?.size < 10 * 1024 * 1024) {
          setProfilePhoto(file);
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              setAvatar(reader.result);
            }
          };
          reader.readAsDataURL(file);
        } else {
          setProfilePhotoError("image_size_error");
          setAvatar(null);
          setProfilePhoto(null);
        }
      } else {
        setProfilePhotoError(IMAGE_TYPE_ERROR_MESSAGE);
        setAvatar(null);
        setProfilePhoto(null);
      }
    }
  };

  return (
    <Box
      className="profileCardBox completeProfileView"
      border={1}
      borderRadius={8}
      borderColor="#e7e7e7"
      py={6}
      px={10}
      mb={2}
      mt={2}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        className="profileTop"
      >
        <Box display="flex" alignItems="center">
          <label htmlFor="profile-pic-upload" className="profileUpload">
            <Box position="relative">
              <IconButton component="span">
                {avatar && avatar !== "default-avatar.jpg" ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    style={{
                      borderRadius: "50%",
                      maxWidth: "130px",
                      maxHeight: "130px",
                      minWidth: "130px",
                      minHeight: "130px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Avatar sx={{ width: 130, height: 130 }}>
                    <AccountCircleIcon />
                  </Avatar>
                )}
              </IconButton>
            </Box>
          </label>
          <Box ml={2} className="TopDesc">
            <Typography variant="h5">
              <strong>{fullName}</strong>
            </Typography>
            {/* <Box display="flex" alignItems="center">
              <Box
                width={8}
                height={8}
                borderRadius="50%"
                bgcolor="success.main"
                mr={1}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginBottom: 0 }}
              >
                Available
              </Typography>
            </Box> */}
            {/* <Typography variant="body2" color="textSecondary">
              <strong>Status:</strong> <span className="dangerText">Weak</span>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Recently Updated on <span>19/01/2024</span>
            </Typography> */}
          </Box>
        </Box>
        <Button
          className="arrowButton"
          variant="contained"
          color="primary"
          onClick={() => navigate("/helper/profile-preview")}
        >
          {t("view_profile")}
        </Button>
      </Box>
      {pageLoader && <PageLoader />}
      <form onSubmit={handleBeforeSubmit}>
        <Grid container spacing={5} alignItems="start" className="formDataInfo">
          <Grid item xs={12} md={6}>
            {/* ==========================step1 start ===========================================*/}
            <Step1Form
              control={control}
              setValue={setValue}
              errors={errors}
              watch={watch}
              profile={true}
            />
            {/* ==========================step1 end ===========================================*/}
            {/* ==========================step3 ===========================================*/}
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  {/* Marital Status */}
                  <SelectWithController
                    control={control}
                    name={"step_3_experience"}  
                    options={yourExperince}
                    label={"Experiences as Domestic Helper"}
                    isRequired={true}
                    errors={errors}
                  />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                  <FormControl
                    className="queRow LocationAutocomplete"
                    fullWidth
                  >
                    <FormLabel
                      className="workingLocation formLabel"
                      id="city_and_country"
                    >
                      Working Location*
                    </FormLabel>
                    <Controller
                      name="step_3_location"
                      control={control}
                      defaultValue=""
                      rules={{ required: t("location_required") }}
                      render={({ field }) => (
                        <LocationAutocomplete
                          onSelect={handleStep3SelectLocation}
                          field={field}
                          setValue={setValue}
                        />
                      )}
                    />
                    {errors?.step_3_location && (
                      <ErrorMessage msg={errors?.step_3_location?.message} />
                    )}
                  </FormControl>
                </Grid> */}
              </Grid>
              <FormControl className="queRow LocationAutocomplete" fullWidth>
                <FormLabel
                  className="workingLocation formLabel"
                  id="city_and_country"
                >
                  {t("working_location")}*
                </FormLabel>
                <Controller
                  name="step_3_location"
                  control={control}
                  defaultValue=""
                  rules={{ required: t("location_required") }}
                  render={({ field }) => (
                    <LocationAutocomplete
                      onSelect={handleStep3SelectLocation}
                      field={field}
                      setValue={setValue}
                    />
                  )}
                />
                {errors?.step_3_location && (
                  <ErrorMessage msg={errors?.step_3_location?.message} />
                )}
              </FormControl>
              <CountryDropdown
                control={control}
                name={"step_3_employerNationality"}
                label={"Employer Nationality"}
                isRequired={true}
                errors={errors}
              />
              <NumberField
                control={control}
                name={"step_3_familySize"}
                errors={errors}
                placeholder={"1"}
                label={"Number of Family Members"}
              />
              {Array.from(
                { length: watch("step_3_familySize") },
                (_, index) => (
                  <div key={index}>
                    <Box className="customAgeBox">
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <NumberField
                            control={control}
                            name={`step_3_familyMembers${index}_age`}
                            errors={errors}
                            placeholder={"40"}
                            label={"Age"}
                          />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <RadioGroupWithController
                            label={t("gender")}
                            name={`step_3_familyMembers${index}_gender`}
                            radioOptions={genders}
                            control={control}
                          />
                        </Grid>
                      </Grid>
                      <CheckBoxFieldWithController
                        label={"Require Special Care"}
                        name={`step_3_familyMembers${index}_requireSpecialHelp`}
                        checkBoxesOptions={requiredSpecialCare}
                        control={control}
                      />
                    </Box>
                  </div>
                )
              )}
              <NumberField
                control={control}
                name={"step_3_houseArea"}
                placeholder={"40"}
                label={"House area (Square Feet)"}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DatePickerWIthController
                    name={"step_3_startedDate"}
                    maxDate={new Date().toISOString()}
                    label={"Date started"}
                    control={control}
                    placeholder={"Select Start Date"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePickerWIthController
                    name={"step_3_releasedDate"}
                    minDate={
                      watch("step_3_startedDate")
                        ? moment(watch("step_3_startedDate")).toISOString()
                        : moment().toISOString()
                    }
                    label={"Date released"}
                    control={control}
                    placeholder={"Select Released Date"}
                  />
                </Grid>
              </Grid>
              <FormGroup>
                <Controller
                  name="step_3_isJobStillGoing"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel
                      className="switcher"
                      control={<Switch {...field} />}
                      label="Visible to subscribed employers interested to have interview with you?"
                    />
                  )}
                />
              </FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <SelectWithController
                    control={control}
                    name={"step_3_currency"}
                    options={currency}
                    label={"Currency"}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <NumberField
                    control={control}
                    name={"step_3_salary"}
                    errors={errors}
                    placeholder={"Eg. 10000"}
                    label={"Salary"}
                  />
                </Grid>
              </Grid>
              <NumberField
                control={control}
                name={"step_3_coHelperNumber"}
                errors={errors}
                placeholder={"Eg. 2"}
                label={"How many co helper"}
              />

              <SelectWithController
                control={control}
                name={"step_3_experience_letter"}
                options={YES_NO}
                label={
                  "Can you Provide Reference/Release/Recommendation Letter from Employer with this working Experience?"
                }
                isRequired={true}
                errors={errors}
              />
              {watch("step_3_experience_letter") === "YES" && (
                <>
                  <RadioGroupWithController
                    name={"step_3_refrence_letter"}
                    radioOptions={REFRENCE_LETTER}
                    control={control}
                  />
                  {watch("step_3_refrence_letter") === "Upload Letter" && (
                    <FormControl fullWidth className="UploadFileCustom queRow">
                      <div className="inputFile">
                        <FileUploaderField
                          name={"step_3_refrence_letter_file"}
                          control={control}
                          errors={errors}
                          setFile={handleReferenceFileUpload}
                          setError={setError}
                          allowedTypes={DOCUMENT_ALLOWED_TYPES}
                          errMsg={t(DOCUMENT_TYPE_ERROR_MESSAGE)}
                          isSetError={true}
                          clearErrors={clearErrors}
                        />
                        {fileURL ? (
                          <p>{extractNameFromUrl(fileURL)}</p>
                        ) : (
                          letterFile?.name && <p>{letterFile.name}</p>
                        )}
                      </div>
                    </FormControl>
                  )}
                </>
              )}
              <RadioGroupWithController
                label={"Reference Check Availability"}
                name={"step_3_referenceAvailability"}
                radioOptions={YES_NO}
                control={control}
              />
              <div className="duties mb-4">
              <CheckBoxFieldWithController
                label={"Duties / other task"}
                name={`step_3_duties`}
                checkBoxesOptions={dutiesTasksList}
                control={control}
              />
              </div>
              <SelectWithController
                control={control}
                name={"step_3_reasonForLeaving"}
                options={YES_NO}
                label={"Reason for Leaving"}
              />
              <FormControl fullWidth className="queRow">
                <FormLabel id="experinceRemark" className="formLabel">
                  {t("remark_of_your_experience")}
                </FormLabel>
                <TextField
                  className="formInputFiled"
                  name="step_3_experinceRemark"
                  {...register("step_3_experinceRemark")}
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  defaultValue=""
                />
              </FormControl>
              <RadioGroupWithController
                label={"Do you have any more working experiences?"}
                name={"step_3_moreWorkingExperience"}
                radioOptions={YES_NO}
                control={control}
              />
              {watch("step_3_moreWorkingExperience") === "YES" && (
                <TextField
                  className="formInputFiled"
                  placeholder={t("more_experience_placeholder")}
                  {...register("step_3_moreWorkingExperienceRemark")}
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  defaultValue=""
                />
              )}
            </>
            {/* ==========================step3 ===========================================*/}
            {/* ==========================step 4 start ===========================================*/}
            <RadioGroupWithController
              label={"Choose the type of employment"}
              name={"step4_jobType"}
              radioOptions={jobTypes}
              control={control}
              isRequired={true}
              errors={errors}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <NumberField
                  control={control}
                  name={"step4_expectedSalary"}
                  errors={errors}
                  placeholder={"Eg. 10000"}
                  label={"Salary"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectWithController
                  control={control}
                  name={"step4_currency"}
                  options={currency}
                  label={"Currency"}
                />
              </Grid>
            </Grid>
            <SelectWithController
              control={control}
              name={"step4_preferredDayOff"}
              options={daysOff.map((dy) => {
                return { name: dy.day };
              })}
              errors={errors}
              isRequired={true}
              label={"Preferred Day Off"}
            />

            <SelectWithController
              control={control}
              name={"step4_sleepingArrangement"}
              options={shareRoomCoWorker}
              errors={errors}
              isRequired={true}
              label={"Sleeping Arrangement"}
            />
            <SelectWithController
              control={control}
              name={"step4_shareWork"}
              options={shareRoomCoWorker}
              errors={errors}
              isRequired={true}
              label={"Share work with co-worker"}
            />

            <SelectWithController
              control={control}
              name={"step4_livingArrangement"}
              options={livingArrangement}
              errors={errors}
              isRequired={true}
              label={"Living arrangement"}
            />
            <CountryDropdown
              control={control}
              name={"step4_preferredLocation"}
              label={"Preferred working Location"}
              isRequired={true}
              errors={errors}
            />
            {/* ==========================step 4 end ===========================================*/}

            {/* ==========================step 5 start ===========================================*/}
            {STEP5_QUESTION.map((question, index) => (
              <FormControl
                key={index}
                component="fieldset"
                sx={{ mb: 2 }}
                className="queRow"
              >
                <FormLabel className="formLabel">
                  {t(question.question)}
                </FormLabel>
                <RadioButtonsWithController
                  control={control}
                  name={`step5_${question.answer_type}`}
                  options={["Yes", "No"]}
                  isRequired={true}
                  errors={errors}
                />
              </FormControl>
            ))}

            {/* ==========================step 5 end ===========================================*/}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldWithController
              isRequired={true}
              label={"Name"}
              name={"step2_about_fullName"}
              errors={errors}
              control={control}
              placeholder={t("enter_your_name")}
            />
            <RadioGroupWithController
              label={t("gender")}
              isRequired={true}
              name={"step2_about_gender"}
              radioOptions={genders}
              control={control}
              errors={errors}
            />
            <TextFieldWithController
              isRequired={true}
              label={t("pasport_or_HKID")}
              name={"step2_about_passportOrHKID"}
              errors={errors}
              control={control}
              placeholder={"e.g. X123456(A)"}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* Marital Status */}
                <SelectWithController
                  control={control}
                  name={"step2_about_maritalStatus"}
                  options={maritalStatus}
                  label={"Marital Status"}
                  isRequired={true}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* Religion */}
                <SelectWithController
                  control={control}
                  name={"step2_about_religion"}
                  options={religion}
                  label={"Religion"}
                  isRequired={true}
                  errors={errors}
                />
              </Grid>
            </Grid>
            <FormControl className="queRow" fullWidth>
              <FormLabel className="formLabel" id="whatsappNumber">
                {/* Whatsapp Number * */}
              </FormLabel>
              <PhoneInputWithController
                name="whatsappNumber"
                control={control}
                label={t("whatsapp_number")}
                isRequired={true}
                errors={errors}
              />

              {/* <PhoneInput
                className="phone-input"
                value={whatsappNumber.number}
                onChange={(phone) =>
                  setWhatsappNumber({ ...whatsappNumber, number: phone })
                }
                onBlur={handleOnBlurWhatsappNumber}
                defaultCountry="hk"
                placeholder="Enter phone number"
                inputStyle={{ width: "100%" }}
              />
              {whatsappNumber.error && (
                <ErrorMessage msg={whatsappNumber.msg} />
              )} */}
            </FormControl>
            <FormGroup>
              <Controller
                name="isWhatsappNumberVisible"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    className="switcher"
                    control={<Switch {...field} />}
                    label="Visible to subscribed employers interested to have interview with you?"
                  />
                )}
              />
            </FormGroup>
            <DatePickerWIthController
              name={"step2_about_dob"}
              maxDate={new Date().toISOString()}
              label={"Date of Birth"}
              isRequired={true}
              control={control}
              errors={errors}
              placeholder={"Select Date of Birth"}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <NumberField
                  control={control}
                  name={"step2_about_height"}
                  errors={errors}
                  placeholder={"170"}
                  label={"Height (CM)"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <NumberField
                  control={control}
                  name={"step2_about_weight"}
                  errors={errors}
                  placeholder={"170"}
                  label={" Weight (KG)"}
                />
              </Grid>
            </Grid>
            {/* Current Location */}
            <FormControl className="queRow LocationAutocomplete" fullWidth>
              <FormLabel className="formLabel" id="city_and_country">
                Your Current location: city and country *
              </FormLabel>
              <Controller
                name="step_2_about_location"
                control={control}
                defaultValue=""
                // rules={{ required: t("location_required") }}
                render={({ field }) => (
                  <LocationAutocomplete
                    onSelect={handleSelectLocation}
                    field={field}
                    setValue={setValue}
                  />
                )}
              />
              {errors.location && (
                <ErrorMessage msg={errors.location?.message} />
              )}
              {/* <img src={LocationSvg}/> */}
            </FormControl>
            {/* Skills */}
            <FormControl className="queRow" fullWidth>
              <FormLabel className="formLabel large" id="skills">
                Skills
              </FormLabel>
              <FormGroup>
                <FormControl component="fieldset">
                  <FormGroup className="skillsCol">
                    <Controller
                      name="step2_about_skills"
                      control={control}
                      defaultValue={[]}
                      rules={{ required: "Select at least one skill" }}
                      render={({ field }) => (
                        <>
                          {skillsList.map((skill) => (
                            <>
                              <FormLabel
                                className="formLabel"
                                component="legend"
                              >
                                {skill.name}
                              </FormLabel>
                              <CheckBoxField
                                field={field}
                                checkBoxesValues={skill.skills}
                              />
                            </>
                          ))}
                        </>
                      )}
                    />
                  </FormGroup>
                  {errors.skills && (
                    <ErrorMessage msg={errors.skills?.message} />
                  )}
                </FormControl>
              </FormGroup>
            </FormControl>
            <NumberField
              control={control}
              name={"step2_family_age"}
              errors={errors}
              placeholder={"e.g 25"}
              label={"Spouse Age(If Any)"}
            />
            <TextFieldWithController
              label={"Spouse Occupation (If any)"}
              name={"step2_family_occupation"}
              control={control}
              placeholder={""}
            />
            <NumberField
              control={control}
              name={"step2_family_brothers"}
              errors={errors}
              placeholder={"e.g 2"}
              label={"Number of Brother(s)"}
            />
            <NumberField
              control={control}
              name={"step2_family_sisters"}
              errors={errors}
              placeholder={"e.g 2"}
              label={"Number of Sister(s)"}
            />
            <NumberField
              control={control}
              name={"step2_family_familyOrder"}
              errors={errors}
              placeholder={"e.g 2"}
              label={"Order in your family (1st 2nd 3rd"}
            />
            <NumberField
              control={control}
              name={"step2_family_sonsAge"}
              placeholder={"e.g 12"}
              label={"Children age son(s)"}
            />
            <NumberField
              control={control}
              name={"step2_family_daughtersAge"}
              placeholder={"e.g 11"}
              label={"Children age daughter(s)"}
            />
            {/*step 2 education data start*/}
            <Step3AboutEducationForm
              isMyProfile={true}
              resetField={resetField}
              setError={setError}
              control={control}
              errors={errors}
              otherLanguages={watch("otherLanguages")}
              clearErrors={clearErrors}
              setValue={setValue}
              uploadFilesDetails={uploadFilesDetails}
              setUploadFilesDetails={setUploadFilesDetails}
            />
            {/* <SelectWithController
              control={control}
              name={"step2_education_level"}
              options={educationLevel}
              label={"Education Level"}
              isRequired={true}
              errors={errors}
            />
            <SelectWithController
              control={control}
              name={"step2_education_major"}
              options={MAJOR_STUDY}
              label={"What is your study major"}
              isRequired={true}
              errors={errors}
            />
            <SelectWithController
              control={control}
              name={"step2_education_languages"}
              options={nativeLanguages}
              label={"Native Language"}
              isRequired={true}
              errors={errors}
            />
            <FormControl>
              <FormLabel className="formLabel" id="religion">
                Other Spoken Languages
              </FormLabel>
              <Button
                variant="contained"
                className="languageBtn"
                onClick={() => setOtherLanguage(true)}
              >
                Add Language
              </Button>
            </FormControl>
            {showOtherLanguage && (
              <>
                <SelectWithController
                  control={control}
                  name={"step2_education_otherLanguage"}
                  options={nativeLanguages}
                  label={"Other Spoken Language"}
                  isRequired={true}
                  errors={errors}
                />
                <SelectWithController
                  control={control}
                  name={"step2_education_otherLanguageLevel"}
                  options={languageLevel}
                  label={"Level"}
                  isRequired={true}
                  errors={errors}
                />
                <Button
                  variant="contained"
                  className="delBtn"
                  onClick={handleDeleteOtherLanguage}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
                  Delete
                </Button>
              </>
            )}
           

            {getCertificateListing().map((doc) => (
              <Grid container className="queRow certificate UploadFileCustom">
                <Grid className="certificateCheck">
                  <div className="FileUploadtion">
                    <FormGroup className="radioCheckBtn">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={uploadFilesDetails[doc.label]?.haveTheDoc}
                            onChange={(e) => handleCheckboxChange(doc.label, e)}
                          />
                        }
                        label={doc.name}
                      />
                    </FormGroup>
                    <div className="inputFile">
                      <FileUploaderField
                        name={doc.label}
                        control={control}
                        setFile={handleFileUpload}
                        disable={!uploadFilesDetails[doc.label]?.haveTheDoc}
                      />
                    </div>
                  </div>
                  {uploadFilesDetails[doc.label]?.docFile && (
                    <p>{uploadFilesDetails[doc.label]?.docFile?.name}</p>
                  )}
                </Grid>
              </Grid>
            ))} */}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel className="formLabel">
                {t("upload_photo_label")}
              </FormLabel>
              <div className="profile-section">
                <div className="avatar-section">
                  <Avatar sx={{ width: 160, height: 160 }}>
                    <img
                      id="avatar"
                      src={avatar ? avatar : `/default.png`}
                      alt="Avatar"
                    />
                  </Avatar>
                </div>
                <div className="file-input" onClick={handleBoxClick}>
                  <label htmlFor="avatar-upload" className="file-upload-label">
                    <ImageLogoIcon />
                    {/* <span>Please upload image here 10 MB maximum</span> */}
                    <span>{t("image_msg")}</span>
                  </label>
                  {/* <FileUploaderField
                    setError={setError} 
                    clearErrors={clearErrors}
                    isSetError = {true}
                    errors={errors}
                    setFile={handleProfilePhotoChange}
                    allowedTypes={IMAGE_ALLOWED_TYPES}
                    errMsg={t(IMAGE_TYPE_ERROR_MESSAGE)}
                  /> */}

                  <input
                    // ref={inputRef}
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                  />
                </div>
                <div className="profile-info"></div>
              </div>
            </FormControl>
            {profilePhotoError && (
                <ErrorMessage  alignText={true} msg={t(profilePhotoError)} />
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className="queRow">
              <FormLabel className="formLabel">
                {t("upload_self_intro_video")}
              </FormLabel>
              <TextField
                {...register("introVideoLink", {
                  required: t("video_link_required"),
                  pattern: {
                    value: YOUTUBE_LINK_REGEX,
                    message: t("invalid_youtube_link"),
                  },
                })}
                className="formInputFiled"
                placeholder="https://youtu.be/introvideohere"
                variant="outlined"
              />
              {errors.introVideoLink && (
                <ErrorMessage msg={errors.introVideoLink?.message} />
              )}
            </FormControl>
          </Grid>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button
                className="arrowButton"
                variant="contained"
                type="submit"
                sx={{ mt: 2, mb: 2 }}
              >
                {t("save_changes")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {showThankyouModal && (
        <ThankyouModal
          showModal={showThankyouModal}
          modalDetail={thankoyuPageDetails}
        />
      )}
    </Box>
  );
}
