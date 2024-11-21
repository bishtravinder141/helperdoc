import { Container, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { paymentSuccess } from "../../Services/SubscriptionService/SubScriptionServices";
import { useDispatch, useSelector } from "react-redux";
import { setSubscriptionDetails } from "../../Redux/CommonSlice";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import { publishJob } from "../../Services/JobsServices/JobServices";
import { setPostJobId } from "../../Redux/JobSlice";
import { toastMessage } from "../../Utils/toastMessages";
import { USER_ROLE, successType } from "../../Constant/Constant";
import SubmitButton from "../../Components/Common/CommonButtons/SubmitButton";
import CheckIconSVG from "../../Assets/SVGIcons/CheckIconSVG";
import DisclaimerSVGIcon from "../../Assets/SVGIcons/DisclaimerSVGIcon";

const PaymentSuccess = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(true);
  const [pageLoader, setPageLoader] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const { postJobId } = useSelector((state) => state.job);
  const isAgency = localStorage.getItem("selectedRole") === USER_ROLE.agency;

  useEffect(() => {
    if (pathname.includes("payment-success")) {
      setIsPaymentSuccess(true);
      const subscriptionId = localStorage.getItem("subscriptionId");
      const duration = localStorage.getItem("duration");
      const PayerID = searchParams.get("PayerID");
      if (paymentId && subscriptionId && duration) {
        const query = `?paymentId=${paymentId}&PayerID=${PayerID}`;
        paymentSuccess(query)
          .then((res) => {
            // setShowResponseModal({ show: true, type: "success" });
            localStorage.setItem("hasSubscription", true);
            dispatch(setSubscriptionDetails(true));
            localStorage.removeItem("duration");
            localStorage.removeItem("subscriptionId");
            setPageLoader(false);
          })
          .catch((err) => {
            setPageLoader(false);
            // setShowResponseModal({ show: true, type: "faild" });
            console.log(err, "!error");
          });
      } else {
        if (isAgency) {
          navigate("/agency/dashboard");
        } else {
          navigate("/employer/dashboard");
        }
      }
    } else if (pathname.includes("payment-failure")) {
      localStorage.removeItem("duration");
      localStorage.removeItem("subscriptionId");
      if (isAgency) {
        navigate("/agency/subscription-plans");
      } else {
        navigate("/employer/subscription-plans");
      }
    }
  }, [paymentId]);

  const handlePublishJob = () => {
    setBtnLoader(true);
    publishJob(postJobId)
      .then((res) => {
        setBtnLoader(false);
        dispatch(setPostJobId(""));
        toastMessage(t("job_published_successfully"), successType);
        navigate("/employer/my-job-post");
        console.log(res, "res data tata");
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          toastMessage(err.response.data?.message);
        } else {
          toastMessage(t("failure_message"));
        }
        setBtnLoader(false);
        console.log(err, "asdasdfads");
      });
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }}>
      {pageLoader ? (
        <PageLoader />
      ) : (
        <>
          {isPaymentSuccess ? (
            <>
            <CheckIconSVG/>
              <Typography variant="h4" gutterBottom className="mt-4">
                Payment Successful!
              </Typography>
              <Typography variant="body1" paragraph className="mb-4">
                {t("plan_activated_job_published")}
              </Typography>
              <div className="successbuttons">  
                <Button
                  variant="contained"
                  className="green-btn"
                  component={Link}
                  to={isAgency ? "/agency/my-job-post" : "/employer/my-job-post"}
                >
                  View Jobs
                </Button>
                {postJobId.length > 0 && (
                  <SubmitButton
                    onClickCallBack={handlePublishJob}
                    type="button"
                    contentText={t("publishJob")}
                    loader={btnLoader}
                    disabled={btnLoader}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div className="disclaimer"><DisclaimerSVGIcon/></div>
              <Typography variant="h4" gutterBottom>
                Oops! Payment Cancelled
              </Typography>
              <Typography variant="body1" paragraph className="mb-4">
              We regret to inform you that your payment has been cancelled. If you need assistance or have any questions, please contact our support team.
              </Typography>
              <Button
                className="green-btn"
                variant="contained"
                color="primary"
                component={Link}
                to="/"
              >
                Contact Admin
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default PaymentSuccess;
