import React, { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const [hostname, setHostname] = useState<string>();
  const [ipAddress, setIpAddress] = useState<string>();

  const API_URL = "http://localhost:4200";

  const urls = {
    "curve.fi": "76.76.21.21",
  };

  useEffect(() => {
    const verifyURL = async () => {
      const queryInfo = { active: true, lastFocusedWindow: true };
      const url = "http://www.curve.fi/";
      const domain = (new URL(url) as URL).hostname;
      setHostname(domain);

      const data = { domain: domain };

      const response = await fetch(`${API_URL}/ping`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setIpAddress(result.ipAddress);

      chrome.tabs &&
        chrome.tabs.query(queryInfo, async (tabs) => {
          const url = tabs[0].url as string;
          const domain = (new URL(url) as URL).hostname;
          setHostname(domain);

          console.log(domain);
          const data = { domain: domain };

          const response = await fetch(`${API_URL}/ping`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();
          setIpAddress(result.ipAddress);
        });
    };

    verifyURL();
  }, []);

  return (
    <>
      <div className="header">
        <div className="logo">
          <img src="./images/logo.png" />
        </div>
        <div className="title">DeRisk</div>
      </div>
      <div className="body">
        <div className="url">URL : {hostname} ✔️ </div>
        <div className="url">IP Address : {ipAddress} ✔️ </div>
      </div>
    </>
  );
};

export default App;
