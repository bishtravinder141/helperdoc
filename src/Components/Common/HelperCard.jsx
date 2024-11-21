import { Typography } from "@mui/material";
import React from "react";

const HelperCard = ({ card }) => {
  return (
    <div className="helpersCol">
      <div className="helperImg">
        <img src={`images/users/${card.image}`} alt={`Helpers ${card.id}`} />
      </div>
      <div className="helperContent">
        <div className="wishlistIcon">
          <img src="wishlist-icon.svg" alt="Wishlist Icon" />
        </div>
        <Typography variant="h5">{card.title}</Typography>
        <div className="locationDate">
          <div className="location">{card.location}</div>
          <div className="date">{card.date}</div>
        </div>
        <div className="availabilityTag">{card.availability}</div>
      </div>
    </div>
  );
};

export default HelperCard;
