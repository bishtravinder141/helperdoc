import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import HelperDashboardSubHeader from "../../../Components/Common/Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import HelperProfileStepSection from "../../../Components/HelperProfile/HelperProfileStepSection";
import {
  JOB_POST_STEP,
  MARKS,
  USER_ROLE,
  SCHEDULE_TYPE_OPTIONS,
  successType,
} from "../../../Constant/Constant";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "../employeeStyle.css";
import JobPostStep1 from "../../../Components/JobPost/JobPostStep1";
import JobPostStep2 from "../../../Components/JobPost/JobPostStep2";
import JobPostStep3 from "../../../Components/JobPost/JobPostStep3";
import PageLoader from "../../../Components/Common/Loader/PageLoader";
import { toastMessage } from "../../../Utils/toastMessages";
import { setJobProfileImages } from "../../../Redux/CommonSlice";
import {
  editJobById,
  getImages,
  getJobByJobId,
  getJobByUserId,
  postJob,
  publishJob,
} from "../../../Services/JobsServices/JobServices";
import { setPostJobId } from "../../../Redux/JobSlice";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { MAX_CHILDREN_LIMIT } from "../../../Components/HelperProfile/Constant";

export default function JobPost() {
  const { t } = useTranslation();
  const params = useParams();
  const [activeStep, setActiveStep] = useState(1);
  const [step1SubStep, setStep1SubStep] = useState(0);
  const [step2SubStep, setStep2SubStep] = useState(0);
  const [pageLoader, setPageLoader] = useState(true);
  const [isJobPublished, setIsJobPublished] = useState(false);
  const [aboutFamilyInfo, setAboutFamilyInfo] = useState({
    under3Years: 0,
    between3And6: 0,
    sevenYearsAndUp: 0,
  });
  const [scheduleType, setScheduleType] = useState(
    SCHEDULE_TYPE_OPTIONS[0].name
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAgency = pathname.includes("/agency/");
  const userId = localStorage.getItem("userId");
  const { jobProfileImages, hasSubscription } = useSelector(
    (state) => state.common
  );

  const jobPostStepper = hasSubscription
    ? JOB_POST_STEP.slice(0, 2)
    : JOB_POST_STEP;

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!jobProfileImages || jobProfileImages?.length === 0) {
      getImages()
        .then((res) => {
          dispatch(setJobProfileImages(res.data));
        })
        .catch((err) => {
          console.log(err, "error!!!!!!!!");
        });
    }
    if (pathname?.includes("agency")) {
      if (params?.id) {
        getJobByJobId(params.id)
          .then((res) => {
            setPageLoader(false);
            if (res?.data?.job && Object.keys(res?.data?.job)?.length) {
              setIsJobPublished(res?.data?.job?.jobStatus === "active");
              for (const key in res.data.job) {
                // if (key === "aboutEmployer") {
                for (const subKey in res.data.job[key]) {
                  if (key === "aboutEmployer") {
                    setValue(`about_${subKey}`, res.data.job[key][subKey]);
                  } else if (key === "basicInfo") {
                    if (subKey === "mySchedulePreference") {
                      if (res.data.job[key][subKey])
                        setScheduleType(res.data.job[key][subKey]);
                    }
                    if (subKey === "mySchedule") {
                      for (let myScheduleSubKey in res.data.job[key][subKey]) {
                        setValue(
                          `mySchedule_${myScheduleSubKey}`,
                          res.data.job[key][subKey][myScheduleSubKey]
                        );
                      }
                    }
                    if (subKey === "jobStartDateFlexibility") {
                      const value = MARKS.find(
                        (mrk) => mrk.label == res.data.job[key][subKey]
                      )?.value;
                      setValue(`basicInfo_${subKey}`, value);
                    } else {
                      setValue(
                        `basicInfo_${subKey}`,
                        res.data.job[key][subKey]
                      );
                    }
                  } else if (key === "requiredSkills") {
                    setValue(
                      `required_skills_Care`,
                      res.data.job[key][subKey]["care"]
                    );
                    setValue(
                      `required_skills_Cooking`,
                      res.data.job[key][subKey]["cooking"]
                    );
                    setValue(
                      `required_skills_HouseholdChore`,
                      res.data.job[key][subKey]["householdChore"]
                    );
                    setValue(
                      `required_skills_language`,
                      res.data.job[key]["language"]
                    );
                  } else if (key === "candidatePreference") {
                    if (
                      subKey === "candidateExperience" ||
                      subKey === "candidateAge"
                    ) {
                      const tempValue = res.data.job[key][subKey]
                        .split("-")
                        .map((age) => parseInt(age, 10));
                      setValue(subKey, tempValue);
                    } else {
                      setValue(subKey, res.data.job[key][subKey]);
                    }
                  } else if (key === "familyAgeGroups") {
                    setAboutFamilyInfo(res?.data?.job[key]);
                  } else if (key === "offerToCandidate") {
                    setValue(`offer_${subKey}`, res.data.job[key][subKey]);
                  } else if (key === "jobDetails") {
                    setValue(`job_${subKey}`, res.data.job[key][subKey]);
                  }
                }
                // }
                // setValue();
              }
              setValue(
                "privilegedAndOffers",
                res.data.job["privilegedAndOffers"]
              );
              setValue(
                "subscribeToNewsletter",
                res.data.job["subscribeToNewsletter"]
              );
            }
          })
          .catch((err) => {
            setPageLoader(false);
            console.log(err, "error!!!");
          });
      }
      setPageLoader(false);
    } else {
      const query = `?userId=${userId}&page=1&limit=1`;
      getJobByUserId(query)
        .then((res) => {
          setPageLoader(false);
          if (res?.data?.jobPostings.length > 0) {
            setIsJobPublished(res?.data?.jobPostings[0].jobStatus === "active");
            for (const key in res.data.jobPostings[0]) {
              // if (key === "aboutEmployer") {
              for (const subKey in res.data.jobPostings[0][key]) {
                if (key === "aboutEmployer") {
                  setValue(
                    `about_${subKey}`,
                    res.data.jobPostings[0][key][subKey]
                  );
                } else if (key === "basicInfo") {
                  if (subKey === "mySchedulePreference") {
                    if (res.data.jobPostings[0][key][subKey])
                      setScheduleType(res.data.jobPostings[0][key][subKey]);
                  }
                  if (subKey === "mySchedule") {
                    for (let myScheduleSubKey in res.data.jobPostings[0][key][
                      subKey
                    ]) {
                      setValue(
                        `mySchedule_${myScheduleSubKey}`,
                        res.data.jobPostings[0][key][subKey][myScheduleSubKey]
                      );
                    }
                  }
                  if (subKey === "jobStartDateFlexibility") {
                    const value = MARKS.find(
                      (mrk) => mrk.label == res.data.jobPostings[0][key][subKey]
                    )?.value;
                    setValue(`basicInfo_${subKey}`, value);
                  } else {
                    setValue(
                      `basicInfo_${subKey}`,
                      res.data.jobPostings[0][key][subKey]
                    );
                  }
                } else if (key === "requiredSkills") {
                  setValue(
                    `required_skills_Care`,
                    res.data.jobPostings[0][key][subKey]["care"]
                  );
                  setValue(
                    `required_skills_Cooking`,
                    res.data.jobPostings[0][key][subKey]["cooking"]
                  );
                  setValue(
                    `required_skills_HouseholdChore`,
                    res.data.jobPostings[0][key][subKey]["householdChore"]
                  );
                  setValue(
                    `required_skills_language`,
                    res.data.jobPostings[0][key]["language"]
                  );
                } else if (key === "candidatePreference") {
                  if (
                    subKey === "candidateExperience" ||
                    subKey === "candidateAge"
                  ) {
                    const tempValue = res.data.jobPostings[0][key][subKey]
                      .split("-")
                      .map((age) => parseInt(age, 10));
                    setValue(subKey, tempValue);
                  } else {
                    setValue(subKey, res.data.jobPostings[0][key][subKey]);
                  }
                } else if (key === "familyAgeGroups") {
                  setAboutFamilyInfo(res?.data?.jobPostings[0][key]);
                } else if (key === "offerToCandidate") {
                  setValue(
                    `offer_${subKey}`,
                    res.data.jobPostings[0][key][subKey]
                  );
                } else if (key === "jobDetails") {
                  setValue(
                    `job_${subKey}`,
                    res.data.jobPostings[0][key][subKey]
                  );
                }
              }
              // }
              // setValue();
            }
            setValue(
              "privilegedAndOffers",
              res.data.jobPostings[0]["privilegedAndOffers"]
            );
            setValue(
              "subscribeToNewsletter",
              res.data.jobPostings[0]["subscribeToNewsletter"]
            );
          }
        })
        .catch((err) => {
          setPageLoader(false);
          console.log(err, "error!!!");
        });
    }
  }, []);

  const handleChildrenCounterChange = (key, type) => {
    if (type === "increment") {
      if (aboutFamilyInfo[key] < MAX_CHILDREN_LIMIT) {
        setAboutFamilyInfo({
          ...aboutFamilyInfo,
          [key]: aboutFamilyInfo[key] + 1,
        });
      }
    } else {
      if (aboutFamilyInfo[key] > 0) {
        setAboutFamilyInfo({
          ...aboutFamilyInfo,
          [key]: aboutFamilyInfo[key] - 1,
        });
      }
    }
  };

  const handleClickOnTabs = (step) => {
    if (step + 1 < 2) setActiveStep(step + 1);
  };

  const handleNext = (data) => {
    if (activeStep === 1) {
      if (step1SubStep < 2) {
        setStep1SubStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setActiveStep(2);
      }
    } else {
      if (step2SubStep < 2) {
        setStep2SubStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setPageLoader(true);
        const basicInfo = {};
        const requiredSkills = {};
        const candidatePreference = {};
        const aboutEmployer = {};
        const offerToCandidate = {};
        const mySchedule = {};
        const jobDetails = {};
        for (let key in data) {
          if (key.includes("basicInfo_")) {
            const newId = key.replace("basicInfo_", "");
            if (key === "basicInfo_jobStartDateFlexibility") {
              basicInfo[newId] = MARKS.find(
                (mrk) => mrk.value + 1 == data[key]
              )?.label;
            } else {
              basicInfo[newId] = data[key];
            }
          } else if (key.includes("required_skills_")) {
            requiredSkills["language"] = data["required_skills_language"];
            requiredSkills["mainSkills"] = {
              care: data["required_skills_Care"],
              cooking: data["required_skills_Cooking"],
              householdChore: data["required_skills_HouseholdChore"],
            };
          } else if (key.includes("mySchedule_")) {
            const newId = key.replace("mySchedule_", "");
            if (basicInfo.jobType === "Full-Time") {
              if (newId === "startDate") mySchedule[newId] = data[key];
            } else if (basicInfo.jobType === "Part-Time") {
              if (scheduleType === SCHEDULE_TYPE_OPTIONS[0].name) {
                mySchedule[newId] = data[key];
              }
            }
          } else if (key.includes("candidate")) {
            if (key === "candidateExperience" || key === "candidateAge") {
              candidatePreference[key] = `${data[key].join("-")} years`;
            } else {
              candidatePreference[key] = data[key];
            }
          } else if (key.includes("about_")) {
            const newId = key.replace("about_", "");
            aboutEmployer[newId] = data[key];
          } else if (key.includes("offer_")) {
            const newId = key.replace("offer_", "");
            offerToCandidate[newId] = data[key];
          } else if (key.includes("job_")) {
            const newId = key.replace("job_", "");
            jobDetails[newId] = data[key];
          }
        }
        const payload = {
          userId: userId,
          activePlan: true,
          basicInfo: {
            ...basicInfo,
            mySchedulePreference:
              basicInfo.jobType === "Part-Time" ? scheduleType : "",
            mySchedule: mySchedule,
          },
          requiredSkills: requiredSkills,
          candidatePreference: candidatePreference,
          aboutEmployer: aboutEmployer,
          offerToCandidate: offerToCandidate,
          jobDetails: jobDetails,
          subscribeToNewsletter: data.subscribeToNewsletter,
          privilegedAndOffers: data.privilegedAndOffers,
          familyAgeGroups: {
            ...aboutFamilyInfo,
          },
        };
        if (pathname?.includes("agency")) {
          if (params?.id) {
            delete payload.userId;
            editJobById(params.id, payload)
              .then((res) => {
                if (hasSubscription && !isJobPublished) {
                  publishJob(res.data._id)
                    .then((res) => {
                      toastMessage(
                        t("job_published_successfully"),
                        successType
                      );
                      navigate("/employer/my-job-post");
                      setPageLoader(false);
                    })
                    .catch((err) => {
                      setPageLoader(false);
                      if (err.response?.data?.message) {
                        toastMessage(err.response.data?.message);
                      } else {
                        toastMessage(t("failure_message"));
                      }
                      console.log(err, "asdasdfads");
                    });
                } else {
                  setPageLoader(false);
                  toastMessage(
                    t(
                      isJobPublished
                        ? "job_updated_successfully"
                        : "job_created_successfully"
                    ),
                    successType
                  );
                  if (hasSubscription) {
                    navigate("/employer/my-job-post");
                  }
                  dispatch(setPostJobId(res.data._id));
                  localStorage.setItem("jobId", res.data._id);
                  setActiveStep(3);
                }
              })
              .catch((error) => {
                setPageLoader(false);
                if (error?.response?.data?.message) {
                  toastMessage(error.response.data.message);
                } else {
                  toastMessage(t("failure_message"));
                }
                console.log(error, "errorr!!!!!");
              });
          } else {
            postJob(payload)
              .then((res) => {
                if (hasSubscription && !isJobPublished) {
                  publishJob(res.data._id)
                    .then((res) => {
                      toastMessage(
                        t("job_published_successfully"),
                        successType
                      );
                      navigate("/employer/my-job-post");
                      setPageLoader(false);
                    })
                    .catch((err) => {
                      setPageLoader(false);
                      if (err.response?.data?.message) {
                        toastMessage(err.response.data?.message);
                      } else {
                        toastMessage(t("failure_message"));
                      }
                      console.log(err, "asdasdfads");
                    });
                } else {
                  setPageLoader(false);
                  toastMessage(
                    t(
                      isJobPublished
                        ? "job_updated_successfully"
                        : "job_created_successfully"
                    ),
                    successType
                  );
                  if (hasSubscription) {
                    navigate("/employer/my-job-post");
                  }
                  dispatch(setPostJobId(res.data._id));
                  localStorage.setItem("jobId", res.data._id);
                  setActiveStep(3);
                }
              })
              .catch((error) => {
                setPageLoader(false);
                if (error?.response?.data?.message) {
                  toastMessage(error.response.data.message);
                } else {
                  toastMessage(t("failure_message"));
                }
                console.log(error, "errorr!!!!!");
              });
          }
        } else {
          postJob(payload)
            .then((res) => {
              if (hasSubscription && !isJobPublished) {
                publishJob(res.data._id)
                  .then((res) => {
                    toastMessage(t("job_published_successfully"), successType);
                    navigate("/employer/my-job-post");
                    setPageLoader(false);
                  })
                  .catch((err) => {
                    setPageLoader(false);
                    if (err.response?.data?.message) {
                      toastMessage(err.response.data?.message);
                    } else {
                      toastMessage(t("failure_message"));
                    }
                    console.log(err, "asdasdfads");
                  });
              } else {
                setPageLoader(false);
                toastMessage(
                  t(
                    isJobPublished
                      ? "job_updated_successfully"
                      : "job_created_successfully"
                  ),
                  successType
                );
                if (hasSubscription) {
                  navigate("/employer/my-job-post");
                }
                dispatch(setPostJobId(res.data._id));
                localStorage.setItem("jobId", res.data._id);
                setActiveStep(3);
              }
            })
            .catch((error) => {
              setPageLoader(false);
              if (error?.response?.data?.message) {
                toastMessage(error.response.data.message);
              } else {
                toastMessage(t("failure_message"));
              }
              console.log(error, "errorr!!!!!");
            });
        }
      }
    }
  };
  return (
    <>
      {pageLoader && <PageLoader />}
      <HelperDashboardSubHeader
        title={t("post_a_job")}
        description={t("update_job_detail")}
        progessBar={false}
      />
      <Grid className="JobsListRow">
        <Box
          className="profileCardBox"
          border={1}
          borderRadius={4}
          borderColor="#e7e7e7"
          py={4}
          px={4}
          mb={2}
          mt={2}
        >
          <Container maxWidth="xl" className="stepsContainer">
            <Grid container spacing={3} className="stepsRow">
              <HelperProfileStepSection
                activeStep={activeStep}
                handleClickOnTabs={handleClickOnTabs}
                stepsLists={jobPostStepper}
                isPlanActivated={hasSubscription}
              />
            </Grid>
          </Container>
          <div className="">
            <Box className="StepFormCol formDataInfo">
              <form onSubmit={handleSubmit(handleNext)}>
                {activeStep === 1 && (
                  <JobPostStep1
                    control={control}
                    watch={watch}
                    errors={errors}
                    setScheduleType={setScheduleType}
                    scheduleType={scheduleType}
                    setValue={setValue}
                    activeStep={step1SubStep}
                    setActiveStep={setStep1SubStep}
                  />
                )}
                {activeStep === 2 && (
                  <JobPostStep2
                    control={control}
                    watch={watch}
                    errors={errors}
                    setValue={setValue}
                    clearErrors={clearErrors}
                    activeStep={step2SubStep}
                    setActiveStep={setStep2SubStep}
                    isPlanActivated={hasSubscription}
                    isJobPublished={isJobPublished}
                    handleChildrenCounterChange={handleChildrenCounterChange}
                    aboutFamilyInfo={aboutFamilyInfo}
                  />
                )}
                {!hasSubscription && activeStep === 3 && (
                  <JobPostStep3
                    setPageLoader={setPageLoader}
                    userType={isAgency ? USER_ROLE.agency : USER_ROLE.employer}
                  />
                )}
              </form>
            </Box>
          </div>
        </Box>
      </Grid>
    </>
  );
}
