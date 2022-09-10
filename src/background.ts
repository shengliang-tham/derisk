chrome.tabs.onUpdated.addListener(
  async (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  ) => {
    if (!tab.url || changeInfo.status !== "complete") return;

    const tabs = await getBrowserTabs();
    const filteredTabs = filterMetaMask(tabs);
    console.log(filteredTabs);

    if (filteredTabs.length > 0 && !checkExtensionPresented(tabs)) {
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
      chrome.runtime.sendMessage(
        "mfneajfhkpdhiphhfcnlkhlcjddioppl",
        { text: "report_back" },
        (data) => {
          console.log(data);
        }
      );

      chrome.tabs.sendMessage(
        tabId,
        {
          target: "app",
          type: "setMessage",
          body: "How are you",
        },
        (data) => {
          console.log(data);
        }
      );

      console.log("sendt");

      //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
      const modifyDOM = () => {
        //You can play with your DOM here or check URL against your regex
        console.log("Tab script:");
        console.log(document.body);
        return document.body.innerHTML;
      };

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

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log("Received message from " + sender + ": ", request);
    sendResponse({ received: true }); //respond however you like
  }
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("h123");
  sendResponse({});
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  chrome.tabs.executeScript(1, { file: "contentscript.js" });
});

export {};
