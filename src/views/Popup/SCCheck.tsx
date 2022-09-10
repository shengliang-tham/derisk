import React, { useState } from "react";
import infoIcon from "../../assets/info.svg";

const SCCheck = () => {
  const [scAddress, setScAddress] = useState("");

  const handleChange = (e: any) => {
    // todo
  };

  return (
    <div className="p-4">
      <div className="mb-2 text-blue-400 text-2xl">
        <img
          className="inline-block mr-2 h-[1.7rem] relative bottom-[0.1rem]"
          src={infoIcon}
          alt="verified"
        />
        <span className="font-bold text-blue-500 mr-1">Info:</span>
        Smart Contract not detected!
      </div>

      <div className="p-4 bg-blue-200 rounded-xl">
        <div className="font-semibold">Check smart contract</div>
        <div className="text-sm">
          Safeguard yourself and check before signing your wallet.
        </div>
        <label htmlFor="scAddress">
          <input
            className="w-full px-3 py-1 rounded mt-1"
            type="text"
            id="scAddress"
            name="scAddress"
            placeholder="Input Smart Contract address"
            onChange={handleChange}
            value={scAddress}
          />
        </label>
      </div>
    </div>
  );
};

export default SCCheck;
