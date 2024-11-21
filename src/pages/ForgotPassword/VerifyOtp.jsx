import { useState } from "react";
import OtpInput from "react-otp-input";
import SubmitButton from "../../Components/Common/CommonButtons/SubmitButton";
import ErrorMessage from "../../Components/Common/ErrorMessage/ErrorMessage";
import { verifyOtp } from "../../Services/AuthServices/AuthService";
import { toastMessage } from "../../Utils/toastMessages";
import { useNavigate } from "react-router-dom";

const VerifyOTP = ({ handleVerifyOtp,btnLoader }) => {
  const navigate = useNavigate();
  const [otp, setOtpValue] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState({
    show: false,
    msg: "",
  });

  const handleOtpInputChange = (otp) => {
    if (isNaN(otp)) return;
    setOtpValue(otp);
    if (showErrorMsg.show) {
      setShowErrorMsg({ show: false, msg: "" });
    }
  };

  const handleSubmitOTP = () => {
      handleVerifyOtp(otp);
  };

  const handleResetOTP = () => {};

  return (
    <>
      <section class="login-process-sec py-100">
        <div class="container"> 
          <div class="row">
            <div class="col-12">
              <div className="login-process-wrap">
                {/* {loader && <PageLoader />} */}
                <h3>Verify your Otp</h3>
                <p>
                  Enter the verification code we sent to your email.{" "}
                  <span
                    className="highlightedText"
                    // onClick={mobileNumberScreen}
                    onClick={()=>navigate("/register")}
                  >
                    Wrong email?
                  </span>
                </p>

                <div className="form-wrap">
                  <form>
                    <div className="fieldset">
                      <OtpInput
                        value={otp}
                        onChange={handleOtpInputChange}
                        numInputs={6}
                        renderInput={(props) => (
                          <input
                            {...props}
                            placeholder="-"
                            className="otpInput"
                          />
                        )}
                        isInputNum={true}
                        containerStyle="OTPInputContainer"
                      />
                      {showErrorMsg.show && (
                        <ErrorMessage msg={showErrorMsg.msg} />
                      )}
                    </div>
                    <div className="fieldset mb-2">
                      <SubmitButton
                        loader={btnLoader}
                        type="button"
                        disabled={
                          otp.length !== 6 || btnLoader || showErrorMsg.show
                        }
                        contentText={"Verify"}
                        onClickCallBack={handleSubmitOTP}
                      />
                      {/* <button
              type="button"
              className={`${
                otp.length !== 4 || btnLoader ? "btn-on-loading" : "btn-design"
              }`}
              disabled={otp.length !== 4 || btnLoader}
              onClick={handleSubmitOTP}
            >
              {btnLoader && <ButtonLoader />}
              Verify
            </button> */}
                    </div>

                    <p>
                      {/* <span
                        className="highlightedText"
                        onClick={handleResetOTP}
                      >
                        Resend code
                      </span> */}
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyOTP;
