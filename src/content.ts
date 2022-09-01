chrome.runtime.onMessage.addListener(
  (message: any, sender: chrome.runtime.MessageSender) => {
    // if current tab received focus, apply mark/unmark operations (if any),
    // then, if there was no mark operation, update marker stats
    // data && data.id === "tabFocusPass";
    console.log(message);
  }
);

export {};
