import React, { useState } from "react";
import infoIcon from "../../assets/info.svg";
import { PYTHON_BACKEND_API_URL } from "../../constants";

const SCCheck = () => {
  const [scAddress, setScAddress] = useState("");
  const [alerts, setAlerts] = useState([]);

  const handleChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    setScAddress(target.value);
  };

  const validateSmartContract = async () => {
    const body = {
      contractAddress: scAddress,
    };
    const response = await fetch(`${PYTHON_BACKEND_API_URL}/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    console.log(result);
    setAlerts(result);
  };

  const scAlert = (alert: any, index: number) => {
    return (
      <div className="border rounded bg-gray-200 my-2 p-1">
        <div className="text-xs font-bold break-words">
          Alert {index + 1}: {alert[0]?.check} ({alert[0]?.confidence})
        </div>
        <div className="text-xs break-words">{alert[0]?.description}</div>
      </div>
    );
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
        <label htmlFor="scAddress" className="grid grid-cols-12 gap-4 ">
          <input
            className="w-full px-3 py-1 rounded mt-1 col-span-8"
            type="text"
            id="scAddress"
            name="scAddress"
            placeholder="Input Smart Contract address"
            onChange={handleChange}
            value={scAddress}
          />
          <button
            type="button"
            className="col-span-4 text-center inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={validateSmartContract}
          >
            Validate
          </button>
        </label>

        {alerts.map((alert, index) => scAlert(alert, index))}
      </div>
    </div>
  );
};

export default SCCheck;
