import React from "react";
import crossIcon from "../../assets/error.svg";
import tickIcon from "../../assets/tick.svg";
import { IPAddress } from "../../types";

const IPCheck = ({ detectedIpAddress, correctIpAddress, valid }: IPAddress) => {
  const validIpAddress = () => (
    <>
      <span className="font-bold text-green-500 mr-1">Success:</span>
      IP Address is verified
    </>
  );

  const invalidIpAddress = () => (
    <>
      <span className="font-bold text-red-500 mr-1">Error:</span>
      IP Address is not verified
    </>
  );

  return (
    <div className="p-4">
      <div
        className={`mb-2 ${valid ? "text-green-500" : "text-red-400"} text-2xl`}
      >
        <img
          className="inline-block mr-2 h-[2rem] relative bottom-[0.1rem] "
          src={valid ? tickIcon : crossIcon}
        />
        {valid ? validIpAddress() : invalidIpAddress()}
      </div>

      <div
        className={`p-4 ${valid ? "bg-green-200" : "bg-red-200"} rounded-xl`}
      >
        <div className="font-semibold">IP Address : {detectedIpAddress} </div>
        <div className="text-sm">
          {valid
            ? "Current IP Address is the same as the protocol's official address"
            : `Current IP address assigned is different from previous IP address of
            ${correctIpAddress}`}
        </div>
      </div>
    </div>
  );
};

export default IPCheck;
