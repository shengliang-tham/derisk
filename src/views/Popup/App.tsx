import React, { useEffect, useState } from "react";
import "./App.css";
import IPCheck from "./IPCheck";
import OverallRating from "./OverallRating";
import SCCheck from "./SCCheck";
import URLCheck from "./URLCheck";
import deriskLogo from "../../assets/derisk-logo.png";
import { NODE_BACKEND_API_URL } from "../../constants";

export const App = () => {
  const [hostname, setHostname] = useState<string>();
  const [ipAddress, setIpAddress] = useState<string>();

  const urls = {
    "curve.fi": "76.76.21.21",
  };

  async function getLocalStorageValue(key: string) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(key, function (value) {
          resolve(value);
        });
      } catch (ex) {
        reject(ex);
      }
    });
  }

  useEffect(() => {
    const verifyURL = async () => {
      const url = ((await getLocalStorageValue("originUrl")) as any)
        .originUrl as string;
      const formattedUrl = (new URL(url) as URL).hostname;
      setHostname(formattedUrl);

      const body = { url: formattedUrl };

      const response = await fetch(`${NODE_BACKEND_API_URL}/ping`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      setIpAddress(result.ipAddress);
    };

    verifyURL();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-6">
        <img className="inline-block mr-4" src={deriskLogo} alt="derisk logo" />

        <h1 className="inline-block font-sans text-lg tracking-widest font-semibold">
          DeRisk
        </h1>
      </div>

      <div>
        <OverallRating />
        <URLCheck hostname={hostname} />
        <IPCheck ipAddress={ipAddress} />
        <SCCheck />
      </div>
    </div>
  );
};

export default App;
