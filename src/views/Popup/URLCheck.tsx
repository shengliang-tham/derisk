import React from "react";
import tickIcon from "../../assets/tick.svg";

const UrlCheck = ({ hostname }: any) => {
  return (
    <div className="p-4">
      <div className="mb-2 text-green-400 text-2xl">
        <img
          className="inline-block mr-2 h-[2rem] relative bottom-[0.1rem]"
          src={tickIcon}
          alt="verified"
        />
        <span className="font-bold text-green-500 mr-1">Success:</span>
        URL is verified
      </div>

      <div className="p-4 bg-green-200 rounded-xl">
        <div className="font-semibold">
          URL :{" "}
          <a
            className="underline hover:text-blue-700 transition-all "
            href={hostname}
          >
            {hostname}
          </a>{" "}
          ✔️{" "}
        </div>
        <div className="text-sm">
          Alphabets are not manipulated. Website has noted a heavy traffic and
          unproblematic transactions.
        </div>
      </div>
    </div>
  );
};

export default UrlCheck;
