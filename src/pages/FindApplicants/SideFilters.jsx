import React, { Fragment, useEffect, useState } from "react";
import { Slider, Typography, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import FilterCheckbox from "../../Components/Common/FormFields/FilterCheckbox";
import FilterRadio from "../../Components/Common/FormFields/FilterRadio";
import FilterSelect from "../../Components/Common/FormFields/FilterSelect";

const SideFilters = ({
  handleSelectJobFilters,
  handleClearChange,
  selectedFilters,
  resetFilters,
}) => {
  const { t } = useTranslation();
  const {
    jobTypes,
    genders,
    skillsList,
    yourExperince,
    nativeLanguages,
    nationality,
    contractStatus,
    countriesList,
  } = useSelector((state) => state.common);
  useEffect(() => {
    if (!selectedFilters.ageMin && !selectedFilters.ageMax) {
      setSliderValue([18, 35]);
    } 
  }, [selectedFilters]);
  const languagesKnown = nativeLanguages.filter((_, idx) => idx < 10);
  const countries = countriesList.filter((_, idx) => idx < 10);
  const [sliderValue, setSliderValue] = useState([]);
  return (
    <div>
      {" "}
      <Typography variant="h5" className="mb-3 d-flex justify-content-between">
        <strong>{t("filters")}</strong>
          <div className="resetFilters ">
            <Tooltip title={t("reset_filters")} placement="top-start">
              <div className="cursor-pointer filterIcon" onClick={resetFilters}>
                <img src="/filter-reset.svg" />
              </div>
            </Tooltip>
          </div>
      </Typography>
      <div className="side-filters customapplicants">
        <div className="row">
          <div className="InlineFilters">
            <Typography variant="h5">
              <strong>{t("location")}</strong>
            </Typography>
            <FilterSelect
              MenuData={countries}
              selected={selectedFilters?.location}
              viewClearIcon={true}
              handleONChange={handleSelectJobFilters}
              handleClearChange={handleClearChange}
              field="location"
            />
          </div>
          <div className="InlineFilters ">
            <Typography variant="h5">
              <strong>{t("type_of_employment")}</strong>
            </Typography>
            <div className="radioChecks">
              {jobTypes.map(({ name }, index) => (
                // <FilterCheckbox
                //   title={name}
                //   id={name}
                //   value={name}
                //   handleSelectJobFilters={handleSelectJobFilters}
                //   field={"gender"}
                //   checked={selectedFilters?.gender?.includes(name)}
                // />
                <Fragment key={index}>
                  <FilterRadio
                    title={name}
                    value={name}
                    id={name}
                    field={"jobType"}
                    checked={selectedFilters.jobType === name}
                    handleChangeFilter={handleSelectJobFilters}
                  />
                </Fragment>
              ))}
            </div>
          </div>
          <div className="InlineFilters">
            <Typography variant="h5">
              <strong>{t("gender")}</strong>
            </Typography>
            <div className="radioChecks">
              {genders.map(({ name }, index) => (
                // <FilterCheckbox
                //   title={name}
                //   id={name}
                //   value={name}
                //   handleSelectJobFilters={handleSelectJobFilters}
                //   field={"gender"}
                //   checked={selectedFilters?.gender?.includes(name)}
                // />
                <Fragment key={index}>
                  <FilterRadio
                    title={name}
                    value={name}
                    id={name}
                    field={"gender"}
                    checked={selectedFilters.gender === name}
                    handleChangeFilter={handleSelectJobFilters}
                  />
                </Fragment>
              ))}
            </div>
          </div>
          <div className="InlineFilters">
            <Typography variant="h5">
              <strong>{t("languages_known")}</strong>
            </Typography>
            <div className="radioChecks">
              {languagesKnown.map(({ name }, index) => (
                <FilterCheckbox
                  key={index}
                  title={name}
                  id={name}
                  value={name}
                  field={"language"}
                  checked={selectedFilters?.language.includes(name)}
                  handleSelectJobFilters={handleSelectJobFilters}
                />
              ))}
            </div>
          </div>
          <div className="InlineFilters">
            <Typography variant="h5">
              <strong>{t("main_skills")}</strong>
            </Typography>
            <div className="radioChecks">
              {skillsList.map(({ name }, index) => (
                <FilterCheckbox
                  key={index}
                  title={name}
                  id={name}
                  value={name}
                  field={"skills"}
                  checked={selectedFilters?.skills.includes(name)}
                  handleSelectJobFilters={handleSelectJobFilters}
                />
              ))}
            </div>
          </div>
          <div className="InlineFilters">
            <Typography variant="h5">
              <strong>{t("job_post_question_11")}</strong>
            </Typography>
            <Slider
              className="rangeSliderC"
              onChange={(e) => {
                setSliderValue(e.target.value);
                handleSelectJobFilters(e, null, "slider");
              }}
              valueLabelDisplay="auto"
              aria-labelledby="slider-label"
              getAriaLabel={() => "Minimum distance"}
              value={sliderValue}
              getAriaValueText={(value) => value}
              disableSwap
              min={18}
              max={60}
              defaultValue={[18, 35]}
              marks={[
                { value: 18, label: "18" },
                { value: 60, label: "60" },
              ]}
            />
          </div>

          <div className="InlineFilters">
            <Typography variant="h5">
              <strong>{t("working_experience")}</strong>
            </Typography>
            <FilterSelect
              MenuData={countriesList}
              selected={selectedFilters.workExperienceLocation}
              viewClearIcon={true}
              handleONChange={handleSelectJobFilters}
              handleClearChange={handleClearChange}
              field="workExperienceLocation"
            />
          </div>
          <div className="InlineFilters">
            <Typography variant="h5">
              <strong>{t("experience")}</strong>
            </Typography>
            <FilterSelect
              MenuData={yourExperince}
              selected={selectedFilters.workExperience}
              viewClearIcon={true}
              handleONChange={handleSelectJobFilters}
              handleClearChange={handleClearChange}
              field="workExperience"
            />
          </div>
          {/* <div className="InlineFilters">
            <Typography variant="h5">
              <strong>{t("working_experience_location")}</strong>
            </Typography>
            <FilterSelect
              MenuData={countriesList}
              selected={selectedFilters.workExperienceLocation}
              viewClearIcon={true}
              handleONChange={handleSelectJobFilters}
              handleClearChange={handleClearChange}
              field="workExperienceLocation"
            />
          </div> */}
          <div className="InlineFilters">
            <Typography variant="h5">
              <strong>{t("nationality")}</strong>
            </Typography>
            <FilterSelect
              MenuData={nationality}
              selected={selectedFilters.nationality}
              viewClearIcon={true}
              handleONChange={handleSelectJobFilters}
              handleClearChange={handleClearChange}
              field="nationality"
            />
          </div>
          <div className="InlineFilters">
            <Typography variant="h5">
              <strong>{t("job_post_question_6")}</strong>
            </Typography>
            <FilterSelect
              MenuData={contractStatus}
              selected={selectedFilters?.contractStatus}
              viewClearIcon={true}
              handleONChange={handleSelectJobFilters}
              handleClearChange={handleClearChange}
              field="contractStatus"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideFilters;
