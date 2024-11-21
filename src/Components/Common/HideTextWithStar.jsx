import React from "react";

const HideTextWithStar = ({ text , showText = false }) => {
  if (text?.length > 2 && !showText) {
    const firstTwoCharacters = text.substring(0, 2);
    const numAsterisks = Math.min(text.length - 2, 8);
    const hiddenText = firstTwoCharacters + '*'.repeat(numAsterisks);

    return <>{hiddenText}</>;
  } else {
    return <>{text}</>;
  }
};

export default HideTextWithStar;
