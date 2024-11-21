// src/components/Common/SocialIcons.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faSlack,
  faTwitter,
  faLinkedinIn,
  faPinterest,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const FacebookIcon = () => <FontAwesomeIcon icon={faFacebook} />;
const GoogleIcon = () => <FontAwesomeIcon icon={faGoogle} />;
const SlackIcon = () => <FontAwesomeIcon icon={faSlack} />;
const TwitterIcon = () => <FontAwesomeIcon icon={faTwitter} />;
const LinkedInIcon = () => <FontAwesomeIcon icon={faLinkedinIn} />;
const PinterestIcon = () => <FontAwesomeIcon icon={faPinterest} />;
const InstagramIcon = () => <FontAwesomeIcon icon={faInstagram} />;
const YoutubeIcon = () => <FontAwesomeIcon icon={faYoutube} />;

export {
  FacebookIcon,
  GoogleIcon,
  SlackIcon,
  TwitterIcon,
  LinkedInIcon,
  PinterestIcon,
  InstagramIcon,
  YoutubeIcon,
};
