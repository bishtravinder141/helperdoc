import {
  FormControl,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import SubmitButton from "../CommonButtons/SubmitButton";
import CustomTextField from "../InputFields/CustomTextField";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import DeleteModal from "../Modals/DeleteModal";
import { toastMessage } from "../../../Utils/toastMessages";
import {
  PASSWORD_ERROR_MESSAGE,
  REQUIRED_MESSAGE,
  successType,
} from "../../../Constant/Constant";
import {
  deleteAccount,
  updatePassword,
} from "../../../Services/JobsServices/JobServices";
import PageLoader from "../Loader/PageLoader";
import persistStore from "redux-persist/es/persistStore";

const AccountSettingsTab = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
  });
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const schema = yup.object().shape({
    new_password: yup.string().required(t("new_password_required")),
    old_password: yup
      .string()
      .required(t("old_password_required"))
      .test("not-equal", t(PASSWORD_ERROR_MESSAGE), function (value) {
        const { new_password } = this.parent;
        return value !== new_password;
      }),
  });
  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleDeleteAccountModal = () => {
    setShowDeleteAccountModal(!showDeleteAccountModal);
  };

  const handleDelete = () => {
    const userId = localStorage.getItem("userId");
    deleteAccount(userId)
      .then(() => {
        localStorage.clear();
        // persistStore(reduxStore).purge();
        //verify
        toastMessage(t("account_delete_msg"), successType);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        //verify
        toastMessage("something went wrong");
        toggleDeleteAccountModal();
      });
  };
  const onSubmit = (data) => {
    const payload = {
      newPassword: data?.new_password,
      currentPassword: data?.old_password,
    };
    setLoader(true);
    console.log(payload, "payload");
    updatePassword(userId, payload)
      .then((res) => {
        console.log(res?.data?.data);
        toastMessage(t("passwrd_updated_successfully"), successType);
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

  const handleChangePassword = (type, value) => {
    const old_password = watch("old_password");
    const new_password = watch("new_password");
    if (type === "new_password") {
      if (value === old_password) {
        if (old_password?.length) {
          setError("old_password", {
            type: "manual",
            message: t(PASSWORD_ERROR_MESSAGE),
          });
        }
      } else {
        clearErrors("old_password");
      }
    }
  };
  return (
    <>
      {" "}
      {loader && <PageLoader />}
      <Box border={1} borderRadius={8} borderColor="#e7e7e7" p={3} mb={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" gutterBottom className="subHead">
            {t("account_settings")}
          </Typography>
          <hr className="hrSetting"></hr>

          {/* Change Password Section */}
          <Box mb={4} className="passwordUpdate">
            <Typography variant="subtitle1" gutterBottom>
              {t("password")}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              mb={2}
              className="passwordinput"
            >
              <Controller
                name="old_password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    onChange={(e) => {
                      handleChangePassword("old_password", e.target.value);
                      field.onChange(e);
                    }}
                    className="formInputFiled passField"
                    placeholder={t("old_password")}
                    autoComplete="current-password"
                    type={showPassword?.old_password ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                old_password: !showPassword?.old_password,
                              })
                            }
                          >
                            {showPassword?.old_password ? (
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
              {errors?.old_password && (
                <ErrorMessage msg={errors.old_password.message} />
              )}
              <Controller
                name="new_password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    onChange={(e) => {
                      handleChangePassword("new_password", e.target.value);
                      field.onChange(e);  
                    }}
                    className="formInputFiled passField"
                    // placeholder={t("password")}
                    placeholder={t("new_password")}
                    autoComplete="current-password"
                    type={showPassword?.new_password ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                new_password: !showPassword?.new_password,
                              })
                            }
                          >
                            {showPassword?.new_password ? (
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
            </Box>
            {errors?.new_password && (
              <ErrorMessage msg={errors.new_password.message} />
            )}
            <Box mt={2}>
              <SubmitButton type="submit" contentText={t("change_password")} />
            </Box>
          </Box>
        </form>

        <hr className="hrSetting"></hr>
        <Box mb={2} className="editEmail">
          <Typography variant="h6" gutterBottom className="subHead">
            <strong>{t("delete_account")}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t("delete_ac_desc1")}
            <br />
            {t("delete_ac_desc2")}
          </Typography>
          <Box mt={2}>
            <Button
              className="delLink"
              variant="text"
              color="error"
              style={{
                textDecoration: "underline",
                textTransform: "none",
              }}
              onClick={toggleDeleteAccountModal}
            >
              {t("want_delete_ac")}
            </Button>
          </Box>
        </Box>
      </Box>
      {showDeleteAccountModal && (
        <DeleteModal
          showModal={showDeleteAccountModal}
          toggleModal={toggleDeleteAccountModal}
          handleDelete={handleDelete}
          msg={t("delete_ac_confirmation_msg")}
        />
      )}
    </>
  );
};

export default AccountSettingsTab;
