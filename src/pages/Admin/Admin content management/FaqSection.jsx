import React, { useEffect, useState } from "react";
import { getFaqs } from "../../../Services/JobsServices/JobServices";
import AddFaq from "./AddFaq";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { REQUIRED_MESSAGE } from "../../../Constant/Constant";

const FaqSection = ({
  watch,
  setValue,
  clearErrors,
  control,
  setError,
  errors,
  handleGetFaqs,
  handleSaveSingleFaq,
  handlePostSingleFaq,
  handleRemoveSingleFaq,
}) => {
  const { t } = useTranslation();

  const [faqList, setFaqList] = useState([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "FAQs",
  });

  // useEffect(() => {
  //   handleGetFaqs();
  // }, []);

  const handleAddMore = () => {
    const FAQS = watch("FAQs");
    const index = FAQS.findIndex(
      (curElem) => curElem.question === "" || curElem.answer === ""
    );
    if (index === -1) {
      append({ question: "", answer: "" });
    }
  };
  const handleRemove = (idx) => {
    remove(idx);
  };
  // const handleSave = (id,payload) => {
  //   setLoader(true);
  //   editFaq().then(()=>{
  //   }).catch(console.log(err)).finally(()=>setLoader(false))
  // }

  const showAddMoreButton = () => {
    const FAQs = watch("FAQs");
    const index = FAQs.findIndex((curElem) => !curElem._id);
    if (index !== -1) {
      return false;
    } else {
      return true;
    }
  };

  return (  
    <div>
      {fields?.length > 0 &&
        fields.map((curElem, index) => (
          <AddFaq
            index={index}
            control={control}
            errors={errors}
            watch={watch}
            handlePostSingleFaq={handlePostSingleFaq}
            handleSaveSingleFaq={handleSaveSingleFaq}
            setValue={setValue}
            handleRemove={handleRemove}
            handleGetFaqs={handleGetFaqs}
            setError={setError}
            clearErrors={clearErrors}
            handleRemoveSingleFaq={handleRemoveSingleFaq}
            // handleAddMore={handleAddMore}
            // isEditAllowed={isEditAllowed}
            // setIsEditAllowed={setIsEditAllowed}
          />
        ))}
      {showAddMoreButton() && (
        <Button
          className="green-btn small text-center mt-5"
          onClick={handleAddMore}
        >
          {t("add_more")}
        </Button>
      )}
    </div>
  );
};

export default FaqSection;
