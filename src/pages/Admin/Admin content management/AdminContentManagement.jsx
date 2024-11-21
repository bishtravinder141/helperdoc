import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AdminHeaderSection from "../../../Components/Common/AdminHeaderSection";
import { Box } from "@mui/system";
import { Grid, Typography, Button } from "@mui/material";
import TermsAndConditions from "./TermsAndConditions";
import {
  editPrivacyPolicy,
  editTermsAndConditions,
  getPrivacyPolicy,
  getTermsAndConditions,
  postPrivacyPolicy,
  postTermsAndConditions,
} from "../../../Services/AdminServices/AdminApi";
import {
  deleteFaq,
  editFaq,
  getFaqs,
  postFaqs,
} from "../../../Services/JobsServices/JobServices";
import { toastMessage } from "../../../Utils/toastMessages";
import Editor from "../../../Components/Editor/Editor";
import PageLoader from "../../../Components/Common/Loader/PageLoader";
import { REQUIRED_MESSAGE, successType } from "../../../Constant/Constant";
import FaqSection from "./FaqSection";
import { useForm } from "react-hook-form";

const AdminContentManagement = () => {
  const { t } = useTranslation();
  const {
    control,
    setValue,
    setError,
    watch,
    clearErrors,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      FAQs: [{ question: "", answer: "" }],
    },
  });
  const [loader, setLoader] = useState(false);
  const [sortByFilter, setSortByFilter] = useState("Newest");
  const [activeOption, setActiveOption] = useState("terms_and_conditions");
  const [content, setContent] = useState("");
  const [id, setId] = useState();
  // const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [requiredError, setRequiredError] = useState();
  const CONTENT_MANAGEMENT_OPTIONS = [
    "terms_and_conditions",
    "privacy_policy",
    "faq",
  ];
  useEffect(() => {
    if (activeOption === "faq") {
      handleGetFaqs();
    } else {
      getApi();
    }

    // activeOption === "terms_and_conditions" && handleGetTermsAndConditions();
    // activeOption === "privacy_policy" && handleGetPrivacyPolicy();
    // activeOption === "faq" && handleGetFaqs();
  }, [activeOption]);

  const getApi = () => {
    setLoader(true);
    handleSelectApi("get")
      .then((res) => {
        if (res?.data?.length) {
          setIsEdit(true);
          setContent(res?.data[0].content);
          setId(res?.data[0]?._id);
        } else {
          setIsEdit(false);
          setContent("");
          setId(null);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  const handleSelectApi = (type, payload, id) => {
    if (type === "get") {
      switch (activeOption) {
        case "terms_and_conditions":
          return getTermsAndConditions();
        case "privacy_policy":
          return getPrivacyPolicy();
      }
    } else if (type === "post") {
      switch (activeOption) {
        case "terms_and_conditions":
          return postTermsAndConditions(payload);
        case "privacy_policy":
          return postPrivacyPolicy(payload);
        case "faq":
          return postFaqs(payload);
      }
    } else {
      switch (activeOption) {
        case "terms_and_conditions":
          return editTermsAndConditions(id, payload);
        case "privacy_policy":
          return editPrivacyPolicy(id, payload);
        case "faq":
          return editFaq(id, payload);
      }
    }
  };

  const handleSave = () => {
    if (content) {
      setLoader(true);
      const payload = {
        title: t(activeOption),
        content: content,
        isVisible: true,
      };
      if (!isEdit) {
        handleSelectApi("post", payload)
          .then(() => {
            toastMessage(t(`${activeOption}_post_message`), successType);
          })
          .catch((err) => console.log(err))
          .finally(() => setLoader(false));
      } else {
        handleSelectApi("put", payload, id)
          .then(() => {
            toastMessage(t(`${activeOption}_update_message`), successType);
          })
          .catch((err) => console.log(err))
          .finally(() => setLoader(false));
      }
    } else {
      setError(true);
    }
  };

  const handleSaveChangesFaq = (data) => {
    setLoader(true);
    const payload = {
      ...data,
    };
    setLoader(true);
    postFaqs(payload)
      .then(() => {
        toastMessage(t("faq_added"), successType);
        handleGetFaqs();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  const handleSaveSingleFaq = (id) => {
    const Faqs = watch("FAQs");
    const elem = Faqs.find((curElem) => curElem._id === id);
    const payload = {
      question: elem.question,
      answer: elem.answer,
      isVisible: true,
    };
    setLoader(true);
    editFaq(id, payload)
      .then(() => {
        toastMessage(t("faq_save_message"), successType);
        handleGetFaqs();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  const handlePostSingleFaq = (index) => {
    const FAQs = watch("FAQs");
    setLoader(true);
    const payload = {
      question: FAQs[index]?.question,
      answer: FAQs[index]?.answer,
      isVisible: true,
    };
    postFaqs(payload)
      .then(() => {
        toastMessage(t("faq_add_message"), successType);
        handleGetFaqs();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  const handleRemoveSingleFaq = (id) => {
    setLoader(true);
    deleteFaq(id)
      .then(() => {
        toastMessage(t("faq_remove_message"), successType);
        handleGetFaqs();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false)); 
  };

  const handleGetFaqs = () => {
    getFaqs()
      .then((res) => {
        setValue("FAQs", res?.data);  
      })
      .catch((err) => console.log(err));
  };
 
  return (
    <>
      {loader && <PageLoader />}
      <AdminHeaderSection
        heading={t("content_management")}
        setSortByFilter={setSortByFilter}
        sortByFilter={sortByFilter}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4} className="d-flex flex-column gap-2">
            {CONTENT_MANAGEMENT_OPTIONS.map((curElem, index) => (
              <Button
                key={index}
                className="green-btn small text-center"
                onClick={() => setActiveOption(curElem)}
              >
                {t(curElem)}
              </Button>
            ))}
          </Grid>
          <Grid item xs={8}>
            {activeOption === "terms_and_conditions" && (
              // <TermsAndConditions
              //   data={data}
              //   setData={setData}
              //   error={error}
              //   setError={setError}
              // />
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
                <Editor
                  content={content}
                  setContent={setContent}
                  requiredError={requiredError}
                  setRequiredError={setRequiredError}
                  name={"terms_and_conditions"}
                  title={activeOption}
                />
              </Box>
            )}
            {activeOption === "privacy_policy" && (
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
                <Editor
                  content={content}
                  setContent={setContent}
                  requiredError={requiredError}
                  setRequiredError={setRequiredError}
                  name={"privacy_policy"}
                  title={activeOption}
                />
              </Box>
            )}
            {activeOption === "faq" && (
              <form onSubmit={handleSubmit(handleSaveChangesFaq)}>
                <FaqSection
                  setValue={setValue}
                  errors={errors}
                  handlePostSingleFaq={handlePostSingleFaq}
                  clearErrors={clearErrors}
                  setError={setError}
                  handleRemoveSingleFaq={handleRemoveSingleFaq}
                  watch={watch}
                  handleSaveSingleFaq={handleSaveSingleFaq}
                  control={control}
                  handleGetFaqs={handleGetFaqs}
                />
                <Button
                  className="green-btn small text-center mt-4"
                  type="submit"
                >
                  {isEdit ? t("save_changes") : t("save")}
                </Button>
              </form>
            )}
            <div className="actions mt-4">
              <Button
                className="green-btn small text-center"
                //   onClick={}
              >
                {t("cancel")}
              </Button>
              {activeOption !== "faq" && (
                <Button
                  className="green-btn small text-center"
                  disabled={requiredError}
                  onClick={handleSave}
                >
                  {isEdit ? t("save_changes") : t("save")}
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminContentManagement;
