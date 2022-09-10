chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // If the received message has the expected format...
  // Call the specified callback, passing
  // the web-page's DOM content as argument
  console.log("hello");
  // sendResponse(document.all[0].outerHTML);
});

export {};
