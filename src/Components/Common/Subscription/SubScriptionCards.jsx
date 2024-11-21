import React, { useState } from "react";
import SuccessModal from "../Modals/SuccessModal";
import { PAYMENT_METHODS } from "../../../Constant/Constant";
import { Typography } from "@mui/material";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default function SubScriptionCards({
  cardDetails,
  selectPaymentMethod,
  setSelectePaymentMethod,
}) {
  return (
    <>
      <div className="roleCheckboxGroup mainRegister">
        <RadioGroup className="w-100"
          aria-label="role"
          defaultValue="Helper"
          name="role"
          sx={{
            flexDirection: "row",
            gap: 2,
            [`& .${radioClasses.checked}`]: {
              [`& .${radioClasses.action}`]: {
                inset: -1,
                border: "1px solid",
                borderColor: "#0A6259",
                borderRadius: "2%",
              },
            },
            [`& .${radioClasses.radio}`]: {
              display: "contents",
              "& > svg": {
                zIndex: 2,
                position: "absolute",
                top: "-8px",
                right: "-8px",
                bgcolor: "background.surface",
                borderRadius: "40%",
              },
            },
          }}
        >
          {PAYMENT_METHODS.map((cardDetails) => (
            <Sheet className="w-100 align-items-start"
              key={cardDetails.title}
              variant="outlined"
              sx={{
                borderRadius: "md",
                boxShadow: "sm",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                p: 2,
                minWidth: 120,
                position: "relative", // Add position relative to handle overlay icon
              }}
            >
              <Typography variant="h6" className="mb-3 mt-0 paymentTitle">{cardDetails.title} </Typography>
              <div className="paymentCardDetail d-flex align-items-center justify-content-between">
                <img
                  src={cardDetails.icon}
                  alt="Logo"
                  // className={`${role.value}_role`}
                />
                <Typography variant="body1">{cardDetails.cardNumber}</Typography>
              </div>
              <Radio
                value={cardDetails.value}
                checked={selectPaymentMethod?.value === cardDetails?.value}
                // onChange={() => handleRoleSelection(role.value)}
                onChange={()=>{setSelectePaymentMethod({
                  name:cardDetails.title,
                  value:cardDetails?.value
                })}}
                checkedIcon={<CheckCircleRoundedIcon />}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                  cursor: "pointer",
                  "&.Mui-checked": {
                    "& + span": {
                      borderColor: "#0A6259",
                    },
                  },
                }}
              />
            </Sheet>
          ))}
        </RadioGroup>
      </div>
      {/* <div className="types-col">
        <div className="payement-card">
          <div className="inputype-col">
            <input
              type="radio"
              name="login-type"
              className="radio-btn"
              id="card-selected"
              defaultChecked=""
              onChange={() =>
                setSelectePaymentMethod({
                  name: cardDetails.title,
                  value: cardDetails.value,
                })
              }
            />
          </div>
          <b className="mb-3 d-block">{cardDetails.title}</b>
          <div className="paymentCardDetail d-flex align-items-center justify-content-between">
            <div className="payement-card-img">
              <img src={cardDetails.icon} />
            </div>
            <div className="payment-card-number">{cardDetails.cardNumber}</div>
          </div>
        </div>
      </div> */}
    </>
  );
}
