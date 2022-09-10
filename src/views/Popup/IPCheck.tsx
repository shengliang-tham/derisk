import React from "react";
import crossIcon from "../../assets/error.svg";

const IPCheck = ({ ipAddress }: any) => {
  return (
    <div className="p-4">
      <div className="mb-2 text-red-400 text-2xl">
        <img
          className="inline-block mr-2 h-[2rem] relative bottom-[0.1rem] "
          src={crossIcon}
          alt="verified"
        />
        <span className="font-bold text-red-500 mr-1">Error:</span>
        IP Address is not verified
      </div>

      <div className="p-4 bg-red-200 rounded-xl">
        <div className="font-semibold">IP Address : 112.5.763.216 </div>
        <div className="text-sm">
          Current IP address assigned is different from previous IP address of
          130.7.213.776 .
        </div>
      </div>
    </div>
  );
};

export default IPCheck;
