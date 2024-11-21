import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import ErrorMessage from "../../Components/Common/ErrorMessage/ErrorMessage";
import SubmitButton from "../../Components/Common/CommonButtons/SubmitButton";
import ReCAPTCHA from "react-google-recaptcha";
import { googleCaptchaID } from "../../Config/authConfig";
import CustomTextField from "../../Components/Common/InputFields/CustomTextField";
import { Box } from "@mui/system";
import { EMAIL_REGEX } from "../../Utils/Regex";
import { useTranslation } from "react-i18next";
import {
  forgotPassword,
  verifyOtp,
} from "../../Services/AuthServices/AuthService";
import ResetPassword from "./ResetPassword";
import VerifyOTP from "./VerifyOtp";
import { toastMessage } from "../../Utils/toastMessages";
import { successType } from "../../Constant/Constant";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState("Forgot");
  const [loader, setLoader] = useState();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState({
    show: false,
    msg: "",
  });
  const [otp, setOtp] = useState(null);
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required(t("email_required"))
      .matches(EMAIL_REGEX, t("valid_email_msg")),
  });
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    setLoader(true);
    setEmail(data?.email);
    forgotPassword(data)
      .then((res) => {
        toastMessage(res?.data?.message, successType);
        setStep("otp");
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
      })
      .finally(() => setLoader(false));
  };
  const afterAPISuccess = () => {};
  const onChange = (value) => {
    setShowErrorMsg({ show: false, msg: "" });
    console.log("Captcha value:", value);
  };
  const handleChange = () => {
    if (showErrorMsg.show) {
      setShowErrorMsg({ show: false, msg: "" });
    }
  };
  const handleVerifyOtp = (otp) => {
    setLoader(true);
    setOtp(otp);
    const payload = {
      otp: otp,
      email: email,
      type: "resetPassword",
    };
    verifyOtp(payload)
      .then((res) => {
        setStep("resetPassword");
        toastMessage("Otp verified successfully", successType);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage(t("failure_message"));
        }
      })
      .finally(() => setLoader(false));
  };

  return (
    <div>
      <section className="login-process-sec py-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {step === "Forgot" && (
                <div className="login-process-wrap">
                  <h3>Forgot your Password?</h3>

                  <div className="form-wrap pt-4">
                    <form
                      aria-label="form-main"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="fieldset">
                        <Controller
                          name="email"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              onChange={(e) => {
                                handleChange();
                                field.onChange(e);
                              }}
                              className="form-control email"
                              placeholder="E-Mail Id"
                              aria-invalid="true"
                              aria-errormessage="error-message-phone"
                            />
                          )}
                        />
                        {errors.email && (
                          <ErrorMessage
                            id="error-message-phone"
                            msg={errors.email.message}
                          />
                        )}
                      </div>
                      {showErrorMsg.show && (
                        <ErrorMessage msg={showErrorMsg.msg} />
                      )}
                      <Box
                        className="fieldset mb-3"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <SubmitButton
                          loader={loader}
                          contentText={"Continue"}
                          disabled={loader}
                        />
                      </Box>

                      <p>
                        {/* Enter the phone number associated with your account and
                        we'll send you a One Time Password. */}
                        Enter the email associated with your account and we'll
                        send you a One Time Password.
                      </p>
                    </form>
                  </div>
                </div>
              )}
              {/* commented for future use */}
              {step === "otp" && (
                <VerifyOTP
                  // afterAPISuccess={afterAPISuccess}
                  // mobileNo={watch("phone_number")}
                  // APIUrl={RESET_PASSWORD_VERIFY_OTP}
                  // setUserId={setUserId}
                  // setStep={setStep}
                  // email={email}
                  handleVerifyOtp={handleVerifyOtp}
                  buttonLoader={loader}
                />
              )}
              {step === "resetPassword" && (
                //have to send otp inside it
                <ResetPassword email={email} setStep={setStep} otp={otp} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
