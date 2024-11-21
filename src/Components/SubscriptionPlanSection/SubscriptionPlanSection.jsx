import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import PillsTabs from "../Common/PillsTabs";
import { TABS } from "./Constant";
import ArrowButton from "../Common/ArrowButton";
import { useTranslation } from "react-i18next";

const SubscriptionPlanSection = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const plans = [
    {
      title: "basic_plan",
      price: "$19.99/month",
      features: [
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
      ],
      buttonText: "Purchase Now",
    },
    {
      title: "regular_plan",
      price: "$39.99/month",
      features: [
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
      ],
      buttonText: "Purchase Now",
    },
    {
      title: "basic_plan",
      price: "$59.99/month",
      features: [
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
        "Lorem ipsum dolor consectetur",
      ],
      buttonText: "Purchase Now",
    },
  ];

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
    const totalPrice = Math.floor(numericPrice);
    const cents = (numericPrice - totalPrice).toFixed(2).substring(1);
    return (
      <div className="pricingPrice">
        <sup>US$</sup>
        {totalPrice}
        <sub>
          {cents} <span>/ month</span>
        </sub>
      </div>
    );
  };
  return (
    <section className="subscriptionPlanSection">
      <Container className="subscriptionPlanContainer pageContainer">
        <Grid container justifyContent="center" item xs={12}>
          <Typography className="title" variant="h2">
            Flexible Pricing Packages
          </Typography>
        </Grid>
        <PillsTabs
          selectedTab={selectedTab}
          handleChange={handleChange}
          tabs={TABS}
        />
        <Grid container spacing={3}>
          {plans.map((plan, index) => (
            <Grid key={index} item xs={12} md={4}>
              <div className={`plan-col plan-${index}`}>
                <Typography className="title" variant="h2">
                  {t(plan.title)}
                </Typography>
                <p>
                  Ipsum dolor sit amet consectetur adipiscing elit sed eiusmod.
                </p>
                {formatPrice(plan.price)}
                <ul className="plan-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
                <Button className="simpleButton">{t("purchase_now")}</Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default SubscriptionPlanSection;
