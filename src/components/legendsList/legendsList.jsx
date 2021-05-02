import React from "react";
import "./legendsList.scss";
const LegendsList = () => {
  return (
    <div className="legends-list">
      <span className="available">Available</span>
      <span className="confirmed">Confirmed</span>
      <span className="not-available">Not available</span>
    </div>
  );
};

export default LegendsList;
