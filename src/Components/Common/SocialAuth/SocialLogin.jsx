import FacebookLogin from "@greatsumini/react-facebook-login";
import React from "react";
import { FacebookIcon, GoogleIcon } from "../SocialIcons";
import TransparentBackgroundButton from "../CommonButtons/TransparentBackgroundButton";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";

const SocialLogin = ({ handleSuccess }) => {
  const { t } = useTranslation();
  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const url = "/accounts/google-login/";
        // handleSocialAppLogin(tokenResponse.access_token, url);
      } catch (error) {
        console.error("Google error:", error);
      }
    },
  });
  return (
    <>
      <FacebookLogin appId="1088597931155576">
        <FacebookIcon />
        {t('login_with_facebook')}
      </FacebookLogin>
      <TransparentBackgroundButton
        title={
          <>
            <GoogleIcon /> {t('login_with_gmail')}
          </>
        }
        onClick={handleLoginWithGoogle}
      ></TransparentBackgroundButton>
      {/* <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      /> */}
    </>
  );
};

export default SocialLogin;
