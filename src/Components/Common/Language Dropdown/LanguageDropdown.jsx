import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGE_OPTIONS } from "../../../Constant/Constant";
import { FormControl, MenuItem, Select } from "@mui/material";

const LanguageDropdown = () => {
  const [t, i18n] = useTranslation("global");
  let lang = localStorage.getItem("language");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    if (lang) {
      setSelectedLanguage(lang);
      i18n.changeLanguage(lang);
    }
  }, []);

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    localStorage.setItem("language", lang);
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-wrapper position-relative">
      <FormControl>
        {/* <FormLabel>{t("select_language")}</FormLabel> */}
        <Select
          className="formInputFiled mb-4"
          placeholder={t("select_language")}
          onChange={(e) => {
            handleLanguageChange(e);
          }}
          value={lang}
        >
          {LANGUAGE_OPTIONS?.map(({ label, value }, index) => (
            <MenuItem value={value} key={index}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default LanguageDropdown;
