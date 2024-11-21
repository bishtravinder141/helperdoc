import React from "react";
import { adminWhatsappNumber } from "../../Config/authConfig";

export default function ThanksForRegister() {
  return (
    <>
      <section className="thankYou">
        <div className="container">
          <div className="card text-center">
            <div className="imgWrap">
              <img
                src="/thankyou.svg"
                className="m-auto mb-4"
                alt="Helper Image"
              />
            </div>
            <h2>Thank you for Registering</h2>
            <p>
              To Activate your account please send this verification code{" "}
              <b>789456</b> on our Whatsapp.
            </p>
            <a
              href={`https://wa.me/${adminWhatsappNumber}`}
              target="_blank"
              className="buttonThanks"
            >
              <img
                src="/whatsappWhite.svg"
                className="me-4"
                alt="Whatsapp Image"
              />{" "}
              Whatsapp Now
            </a>
            <p>
              Or Send us code at <span>+91 789-456-1230</span>
            </p>
            <div className="d-flex successBtns align-items-center justify-content-center">
              <a href="" className="green-btn small me-2">
                {" "}
                Back to Dashboard
              </a>
              <a href="" className="buttonThanks">
                {" "}
                Preview Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="thankYou">
        <div className="container">
          <div className="card text-center">
            <div className="imgWrap">
              <img
                src="/successGreen.svg"
                className="m-auto mb-4"
                alt="Helper Image"
              />
            </div>
            <h2>Success!</h2>
            <p>Your profile has been successfully Verified</p>
            <div className="d-flex successBtns align-items-center justify-content-center">
              <a href="" className="green-btn small me-2">
                {" "}
                Back to Dashboard
              </a>
              <a href="" className="buttonThanks">
                {" "}
                Preview Profile
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
