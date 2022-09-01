chrome.tabs.onUpdated.addListener(
  async (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  ) => {
    if (!tab.url || changeInfo.status !== "complete") return;

    const tabs = await getBrowserTabs();
    const filteredTabs = filterMetaMask(tabs);

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
export {};
