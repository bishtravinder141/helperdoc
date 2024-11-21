import React, { useEffect, useState } from "react";
import "./SubscriptionOrder.css";
import SubScriptionCards from "./SubScriptionCards";
import { PAYMENT_METHODS, successType } from "../../../Constant/Constant";
import { useTranslation } from "react-i18next";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  addPayments,
  getSubscriptionPlansByID,
  paymentSuccess,
} from "../../../Services/SubscriptionService/SubScriptionServices";
import PageLoader from "../Loader/PageLoader";
import { toastMessage } from "../../../Utils/toastMessages";
import { Button } from "@mui/material";
import SuccessModal from "../Modals/SuccessModal";
import { publishJob } from "../../../Services/JobsServices/JobServices";
import { useDispatch, useSelector } from "react-redux";
import { setPostJobId } from "../../../Redux/JobSlice";
import { setSubscriptionDetails } from "../../../Redux/CommonSlice";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SubscriptionOrderSummery() {
  const [pageLoader, setPageLoader] = useState(true);
  const [subScriptionPlans, setSubScriptionPlans] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [selectPaymentMethod, setSelectePaymentMethod] = useState({
    name: "Paypal",
    value: "Paypal",
  });
  const [showResponseModal, setShowResponseModal] = useState({
    show: false,
    type: "",
  });
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { postJobId } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (pathname.includes("paymentSucess")) {
    //   const subscriptionId = localStorage.getItem("subscriptionId");
    //   const duration = localStorage.getItem("duration");
    //   const PayerID = searchParams.get("PayerID");
    //   if (paymentId && subscriptionId && duration) {
    //     const query = `?paymentId=${paymentId}&PayerID=${PayerID}`;
    //     paymentSuccess(query)
    //       .then((res) => {
    //         setShowResponseModal({ show: true, type: "success" });
    //         localStorage.setItem("hasSubscription", res.data.hasSubscription);
    //         dispatch(setSubscriptionDetails(true));
    //         localStorage.removeItem("duration");
    //         localStorage.removeItem("subscriptionId");
    //       })
    //       .catch((err) => {
    //         setShowResponseModal({ show: true, type: "faild" });
    //         console.log(err, "!error");
    //       });
    //   } else {
    //     navigate("/employer/dashboard");
    //   }
    // }
    if (id) {
      setPageLoader(true);
      getSubscriptionPlansByID(id)
        .then((response) => {
          setPageLoader(false);
          setSubScriptionPlans(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          setPageLoader(false);
          navigate(-1);
        });
    }
  }, [id, paymentId]);

  const handleOnSuccessModal = () => {
    navigate("/employer/my-job-post");
  };

  const handleCompletePayment = () => {
    setPageLoader(true);
    const payload = {
      currency: "HKD",
      description: "Subscription Payment",
      subscriptionId: id,
      paymentMethod: selectPaymentMethod.value,
    };
    addPayments(payload)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("transactionId", res.data.payment.id);
        localStorage.setItem("subscriptionId", id);
        localStorage.setItem("duration", subScriptionPlans.duration);
        const redirestUrl = res.data?.payment?.links.find(
          (link) => link.method === "REDIRECT"
        );
        window.location.href = redirestUrl.href;
      })
      .catch((err) => {
        setPageLoader(false);
        if (err.response?.data?.message) {
          toastMessage(err.response.data?.message);
        } else {
          toastMessage(t("failure_message"));
        }
      });
  };

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
    <>
      <section className="subscription-plans py-60">
        {pageLoader && <PageLoader />}
        <div className="container">
          <div className="pb-4">
            <div className="row">
              <div className="col-12 pb-4">
                <div className="back-arrow-heading d-flex font-weight-bold align-items-center">
                  {/* <Link
                    to="/subscription-plans" className="subscription"
                    aria-label="select subscription plan"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />{" "}
                  </Link> */}
                  <h3 className="ms-3 fw-bold">
                    Select For Payment{" "}
                    <span className="fw-normal">
                      We offer great price plan for the application
                    </span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="row pt-4 added-payment-card">
              <div className="col-lg-4 col-12 flex-column">
                <h5 className="fw-bold">Payment Method</h5>
                <div className="select-types">
                  {PAYMENT_METHODS.map((payment) => (
                    <SubScriptionCards
                      cardDetails={payment}
                      selectPaymentMethod={selectPaymentMethod}
                      setSelectePaymentMethod={setSelectePaymentMethod}
                    />
                  ))}
                </div>
              </div>
              <div className="col-lg-8 col-12">
                <div className="orderSummary">
                  <h5 className="fw-bold">Order Summary</h5>
                  <ul>
                    <li>
                      {t("selected_plan")}{" "}
                      <span>{subScriptionPlans.duration}</span>
                    </li>
                    <li>
                      {t("payment_method")}{" "}
                      <span>{selectPaymentMethod.name}</span>
                    </li>
                  </ul>

                  <ul className="subtotal">
                    <li>
                      {t("total")} <span>${subScriptionPlans.price}</span>
                    </li>
                  </ul>
                  <div className="col-12 text-center">
                    <Button
                      className="green-btn small"
                      onClick={handleCompletePayment}
                    >
                      {t("subscribe_now")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showResponseModal.show && (
        <SuccessModal
          open={showResponseModal.show}
          handleContinue={handleOnSuccessModal}
          buttonText={t("view_job")}
          text={t("plan_activated_job_published")}
          secondButton={postJobId.length > 0}
          secondButtonText={t("publishJob")}
          handleSecondButton={handlePublishJob}
          btnLoader={btnLoader}
        />
      )}
    </>
  );
}
