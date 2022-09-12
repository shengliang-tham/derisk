import React, { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const OverallRating = () => {
  const [risk, setRisk] = useState(26);

  return (
    <div className="flex items-center p-4 mb-4 bg-gradient-to-r from-[#eaafb1] to-white rounded-xl shadow-2xl">
      <div className="p-4 mr-4">
        <CircularProgressbar
          value={risk}
          text={`${risk}%`}
          styles={buildStyles({
            pathColor: "#f05331",
            textColor: "#f05331",
            textSize: "24px",
          })}
        />
      </div>

      <div className="mt-3">
        <h2 className="text-3xl font-bold text-[#f05331]">High Risk</h2>
        <p className="mt-1 font-light">
          Multiple risks are identified on this website, please do due
          dilligence before transacting on this website.
        </p>
      </div>
    </div>
  );
};

export default OverallRating;
