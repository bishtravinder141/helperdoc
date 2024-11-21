import { Tooltip } from "bootstrap";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import FilterSelect from "../../Components/Common/FormFields/FilterSelect";
import { FormGroup, Typography } from "@mui/material";
import FilterCheckbox from "../../Components/Common/FormFields/FilterCheckbox";
import DatePicker from "react-datepicker";
import FilterRadio from "../../Components/Common/FormFields/FilterRadio";
import { useForm } from "react-hook-form";
import DatePickerWIthController from "../../Components/Common/FormFields/DatePickerWIthController";
import moment from "moment";

const FeatureJobsSideFilter = ({
  selectedFilters,
  handleSelectJobFilters,
  resetFilters,
  handleClearChange,
}) => {
  const { t } = useTranslation();
  const { countriesList, jobTypes, nativeLanguages, skillsList } = useSelector(
    (state) => state.common
  );
  const state = useSelector((state)=>state.common);
  const countries = countriesList.filter((_, idx) => idx < 10);
  const languagesKnown = nativeLanguages.filter((_, idx) => idx < 10);

  return (
    <div>
      {" "}
      <Typography variant="h5" className="mb-3 d-flex justify-content-between">
        <strong>{t("filters")}</strong>
          <div className="resetFilters ">
            {/* <Tooltip title={t("reset_filters")} placement="top-start"> */}
            <div className="cursor-pointer filterIcon" onClick={resetFilters}>
              <img src="/filter-reset.svg" />
            </div>
            {/* </Tooltip> */}
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

          <div className="InlineFilters">
            <Typography variant="h5">
              <strong>{t("start_date")}</strong>
            </Typography>
            <div className="queRow">
              <DatePicker
                onChange={(date) => {
                  handleSelectJobFilters(
                    moment(date).format("YYYY-MM-DD"),
                    "startDate",
                    "date"
                  );
                }}
                maxDate={new Date().toISOString().split("T")[0]}
                selected={selectedFilters.startDate}
                showIcon
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                // isClearable
                placeholderText={"dd-mm-yyyy"}
                className="formInputFiled full-width-datepicker"
              />
            </div>
          </div>
          <div className="InlineFilters ">
            <Typography variant="h5">
              <strong>{t("type_of_employment")}</strong>
            </Typography>
            <div className="radioChecks">
              {jobTypes.map(({ name }, index) => (
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

          {/* strt date */}
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
                  field={"requiredLanguage"}
                  checked={selectedFilters?.requiredLanguage.includes(name)}
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
                  field={"requiredMainSkill"}
                  checked={selectedFilters?.requiredMainSkill.includes(name)}
                  handleSelectJobFilters={handleSelectJobFilters}
                />
              ))}
            </div>
          </div>

          {/* <div className="InlineFilters">
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
          </div> */}

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
        </div>
      </div>
    </div>
  );
};

export default FeatureJobsSideFilter;
