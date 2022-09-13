import { BROWSER_URL, CONTENT_URL } from "./types";

chrome.tabs.onUpdated.addListener(
  async (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  ) => {
    if (!tab.url || changeInfo.status !== "complete") return;

    const tabs = await getBrowserTabs();
    const filteredTabs = filterMetaMask(tabs);

    // chrome.tabs.sendMessage(tabId, {
    //   type: CONTENT_URL,
    // });

    if (filteredTabs.length > 0 && !checkExtensionPresented(tabs)) {
      chrome.tabs.query(
        {
          active: true,
          lastFocusedWindow: false,
        },
        (tabs) => {
          // and use that tab to fill in out title and url
          var tab = tabs[0];
          console.log(tab.url);
          alert(tab.url);

          chrome.storage.sync.set({ originUrl: tab.url });
        }
      );

      // chrome.runtime.sendMessage({
      //   type: BROWSER_URL,
      // });

      const windowOptions: chrome.windows.CreateData = {
        width: 360,
        height: 620,
        left: 1080,
        top: 25,
        type: "popup",
        url: `chrome-extension://mfneajfhkpdhiphhfcnlkhlcjddioppl/popup.html`,
      };

      await chrome.windows.create(windowOptions);

      const id = filteredTabs[0].id ? filteredTabs[0].id : 0;

      // chrome.runtime.onMessageExternal.addListener(function (
      //   request,
      //   sender,
      //   sendResponse
      // ) {
      //   console.log(request);
      //   // receive the token and refresh token from commenty
      //   if (request.credential) {
      //     // do some stuff with request.credential
      //   }
      // });
    }
  }
);

const filterMetaMask = (tabs: chrome.tabs.Tab[]) => {
  return tabs.filter(
    (tab) =>
      tab.title === "MetaMask Notification" &&
      tab.url?.includes("confirm-transaction") &&
      tab.url?.includes("send-ether")
  );
};

const checkExtensionPresented = (tabs: chrome.tabs.Tab[]) => {
  const result = tabs.filter((tab) =>
    tab.url?.includes(
      "chrome-extension://mfneajfhkpdhiphhfcnlkhlcjddioppl/popup.html"
    )
  );

  return result.length > 0;
};

const getBrowserTabs = async () => {
  return new Promise<chrome.tabs.Tab[]>((resolve, reject) => {
    try {
      chrome.tabs &&
        chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
          resolve(tabs);
        });
    } catch (e) {
      reject([]);
    }
  });
};

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(
    tab.id ? tab.id : 0,
    { text: "report_back" },
    (data) => {
      console.log(data);
    }
  );
});

export {};
