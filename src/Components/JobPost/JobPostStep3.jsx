import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./jobPost.css";
import PricingCard from "../Common/Subscription/PricingCard";
import FeatureTable from "../Common/Subscription/FeatureTable";
import { getSubscriptionPlans } from "../../Services/SubscriptionService/SubScriptionServices";

export default function JobPostStep3({ setPageLoader, userType }) {
  const [subScriptionPlans, setSubScriptionPlans] = useState([]);
  useEffect(() => {
    setPageLoader(true);
    getSubscriptionPlans()
      .then((response) => {
        setPageLoader(false);
        const tempResponse = response?.data.filter(
          (sub) => sub.userType === userType
        );
        setSubScriptionPlans(tempResponse);
      })
      .catch((err) => {
        setPageLoader(false);
        console.log(err, "error!!!!!!!!");
      });
  }, []);

  return (
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
                <PricingCard active={true} plan={plan} userType={userType} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="global-table table-responsive">
        <FeatureTable userType={userType} />
      </div>
    </Grid>
  );
}
