import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { Box } from "@mui/system";
import CustomTextField from "../../../Components/Common/InputFields/CustomTextField";
import {
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Button,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AdminHeaderSection from "../../../Components/Common/AdminHeaderSection";
import ErrorMessage from "../../../Components/Common/ErrorMessage/ErrorMessage";
import {
  PASSWORD_ERROR_MESSAGE,
  REQUIRED_MESSAGE,
  successType,
} from "../../../Constant/Constant";
import { Link, useNavigate } from "react-router-dom";
import { updatePassword } from "../../../Services/JobsServices/JobServices";
import { toastMessage } from "../../../Utils/toastMessages";
import PageLoader from "../../../Components/Common/Loader/PageLoader";

const AdminSetting = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [loader, setLoader] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const options = [{ name: "english" }, { name: "chinese" }];
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
  });
  const passwordSchema = yup.object().shape({
    newPassword: yup.string().required(t(REQUIRED_MESSAGE)),
    currentPassword: yup
      .string()
      .required(t(REQUIRED_MESSAGE))
      .test("not-equal", t(PASSWORD_ERROR_MESSAGE), function (value) {
        const { newPassword } = this.parent;
        return value !== newPassword;
      }),
  });
  const languageSchema = yup.object().shape({
    selectedLanguage: yup.string().required(t(REQUIRED_MESSAGE)),
  });
  const {
    register,
    control,
    setError,
    clearErrors,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const handleReset = () => {
    localStorage.clear();
    navigate("/forgot-password");
  }

  const {
    register: languageRegister,
    handleSubmit: handleLanguageSubmit,
    formState: { errors: languageErrors },
  } = useForm({
    resolver: yupResolver(languageSchema),
  });
  const handleChangePassword = (type, value) => {
    const currentPassword = watch("currentPassword");
    const newPassword = watch("newPassword");
    if (type === "newPassword") {
      if (value === currentPassword) {
        if (currentPassword?.length) {
          setError("currentPassword", {
            type: "manual",
            message: t(PASSWORD_ERROR_MESSAGE),
          });
        }
      } else {
        clearErrors("currentPassword");
      }
    }
  };
  // for language
  const languageSubmit = (data) => {
    console.log(data, "data");
  };
  // for old and new password
  const onSubmit = (data) => {
    setLoader(true);
    updatePassword(userId, data)
      .then(() => {
        toastMessage(t("passwrd_updated_successfully"), successType);
        setValue("currentPassword", "");
        setValue("newPassword", "");
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          toastMessage(error.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
        console.log(error);
      })
      .finally(() => setLoader(false));
  };
  return (
    <div>
      {loader && <PageLoader />}
      <AdminHeaderSection heading={t("setting")} showFilter={false} />
      <div className="languageSubmit">
        <form onSubmit={handleLanguageSubmit(languageSubmit)}>
          {/* language */}
          <FormControl>
            <FormLabel>{t("select_language")}</FormLabel>
            <Select
              className="formInputFiled mb-4"
              placeholder="Please Select"
              {...languageRegister("selectedLanguage")}
            >
              {options?.map((menu, index) => (
                <MenuItem value={menu.name} key={index}>
                  {menu.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            className="arrowButton"
            variant="contained"
            color="primary"
          >
            {t("save")}
          </Button>
        </form>
        {languageErrors?.selectedLanguage && (
          <ErrorMessage msg={languageErrors?.selectedLanguage.message} />
        )}
      </div>

      {/* <SelectWithController name = "selectedLanguage" options ={option}/> */}

      {/* password */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5">
          <strong>{t("password")}</strong>
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          className="passwordinput"
        >
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomTextField
                {...field}
                onChange={(e) => {
                  handleChangePassword("newPassword", e.target.value);
                  field.onChange(e);
                }}
                className="formInputFiled passField"
                placeholder={t("new_password")}
                type={showPassword?.newPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            newPassword: !showPassword?.newPassword,
                          })
                        }
                      >
                        {showPassword?.newPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          {errors.newPassword && (
            <ErrorMessage msg={errors.newPassword.message} />
          )}
          <Controller
            name="currentPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomTextField
                {...field}
                onChange={(e) => {
                  handleChangePassword("currentPassword", e.target.value);
                  field.onChange(e);
                }}
                className="formInputFiled passField"
                placeholder={t("current_password")}
                autoComplete="current-password"
                type={showPassword?.currentPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            currentPassword: !showPassword?.currentPassword,
                          })
                        }
                      >
                        {showPassword?.currentPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          {errors.currentPassword && (
            <ErrorMessage msg={errors.currentPassword.message} />
          )}
        </Box>
        <Typography variant="body1">
          {t("reset_password_msg")}
          {""}
          <span className="text-decoration-underline cursor-pointer" onClick={handleReset}>
            <b>{t("reset_your_password")}</b>
          </span>
        </Typography>
        <Button
          type="submit"
          className="arrowButton"
          variant="contained"
          color="primary"
        >
          {t("save_password")}
        </Button>
      </form>
    </div>
  );
};

export default AdminSetting;
