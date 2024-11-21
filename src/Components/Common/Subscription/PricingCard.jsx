import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { USER_ROLE } from "../../../Constant/Constant";

export default function PricingCard({
  userType,
  isRecommended,
  active,
  plan,
  isSubscriptionPlan = false,
  handleCompletePayment,
}) {
  const { t } = useTranslation();
  const handlePayment = () => {
    handleCompletePayment(plan);
  };
  return (
    <div className={` ${active ? "active" : ""} col-md-4 col-12`}>
      <div className={`${isRecommended ? "recommended-col" : ""} pricing-col`}>
        {isRecommended && <div className="recommended">Recommended</div>}
        <h3>{t(plan.duration)}</h3>
        {/* <p>Starter StarterStarter</p> */}
        <div className="pricing-price">
          <sup>$</sup> {plan.price}
        </div>
        <Link
          to={
            !isSubscriptionPlan &&
            (userType === USER_ROLE.agency
              ? `/agency/subscriptionDetails/${plan._id}`
              : `/employer/subscriptionDetails/${plan._id}`)
          }
          className="btn-design"
          onClick={isSubscriptionPlan && handlePayment}
        >
          {t("select_plan")}
          {/* {active ? t("cancel_subscription") : t("upgrade")} */}
        </Link>
      </div>
    </div>
  );
}
