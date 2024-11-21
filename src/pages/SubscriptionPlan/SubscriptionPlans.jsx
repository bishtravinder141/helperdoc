import React, { Fragment, useEffect, useState } from "react";
import {
  addPayments,
  getSubscriptionPlans,
} from "../../Services/SubscriptionService/SubScriptionServices";
import { Grid, Button } from "@mui/material";
import PricingCard from "../../Components/Common/Subscription/PricingCard";
import "../../Components/JobPost/jobPost.css";
import SubScriptionCards from "../../Components/Common/Subscription/SubScriptionCards";
import { PAYMENT_METHODS, USER_ROLE } from "../../Constant/Constant";
import { useTranslation } from "react-i18next";
import PageLoader from "../../Components/Common/Loader/PageLoader";
import { toastMessage } from "../../Utils/toastMessages";
import HelperDashboardSubHeader from "../../Components/Common/Headers/HelperDashboardSubHeader";
import { useLocation } from "react-router-dom";

const SubscriptionPlans = () => {
  const { t } = useTranslation();
  const [subScriptionPlans, setSubScriptionPlans] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);
  const { pathname } = useLocation();
  const isAgency = pathname.includes("/agency/");
  const [selectPaymentMethod, setSelectPaymentMethod] = useState({
    name: "Paypal",
    value: "Paypal",
  });
  const userType = isAgency ? USER_ROLE.agency : USER_ROLE.employer;
  useEffect(() => {
    setPageLoader(true);
    getSubscriptionPlans()
      .then((response) => {
        setPageLoader(false);
        const tempResponse = response?.data.filter(
          (sub) => sub.userType === userType
        );
        setSubScriptionPlans(tempResponse);
        console.log(tempResponse);
      })
      .catch((err) => {
        setPageLoader(false);
        console.log(err, "error!!!!!!!!");
      });
  }, []);
  const handleCompletePayment = (plan) => {
    setPageLoader(true);
    const payload = {
      currency: "HKD",
      description: "Subscription Payment",
      subscriptionId: plan._id,
      paymentMethod: selectPaymentMethod.value,
    };
    console.log(payload);
    addPayments(payload)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("transactionId", res.data.payment.id);
        localStorage.setItem("subscriptionId", plan._id);
        localStorage.setItem("duration", plan.duration);
        const redirestUrl = res.data?.payment?.links.find(
          (link) => link.method === "REDIRECT"
        );
        window.location.href = redirestUrl.href;
        // setPageLoader(false);
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
  return (
    <div>
      {pageLoader && <PageLoader />}
      <HelperDashboardSubHeader
        title={t("subscription_plan")}
        // description={t("update_job_detail")}
        progessBar={false}
      />
      <Grid>
        <div className="col-12 pb-5 text-center plans-tabs">
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-monthly"
              role="tabpanel"
              aria-labelledby="nav-monthly-tab"
            >
              <div className="row pt-4">
                {subScriptionPlans.map((plan) => (
                  <PricingCard
                    active={true}
                    plan={plan}
                    isSubscriptionPlan={true}
                    setPageLoader={setPageLoader}
                    handleCompletePayment={handleCompletePayment}
                    userType={userType}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-4 added-payment-card">
          <div className="col-lg-4 col-12 flex-column">
            <h5 className="fw-bold">Payment Method</h5>
            <div className="select-types">
              {PAYMENT_METHODS.map((payment, index) => (
                <Fragment key={index}>
                  <SubScriptionCards
                    cardDetails={payment}
                    selectPaymentMethod={selectPaymentMethod}
                    setSelectePaymentMethod={setSelectPaymentMethod}
                  />
                </Fragment>
              ))}
            </div>
          </div>
          {/* <div className="col-lg-8 col-12">
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
              </div> */}
        </div>
        {/* <div className="global-table table-responsive">
          <FeatureTable features={subScriptionPlans} />
        </div> */}
      </Grid>
    </div>
  );
};

export default SubscriptionPlans;