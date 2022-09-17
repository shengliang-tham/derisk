declare var window: any;

// const injectScript = () => {
//   const container = document.head || document.documentElement;
//   const s = document.createElement("script");
//   s.src = chrome.runtime.getURL("script.js");
//   container.insertBefore(s, container.children[0]);
//   s.onload = function () {
//     s.remove();
//   };
// };

function injectScript() {
  const container = document.head || document.documentElement;
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("/static/js/script.js");
  container.insertBefore(s, container.children[0]);
  s.onload = function () {
    s.remove();
  };
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // If the received message has the expected format...
  // Call the specified callback, passing
  // the web-page's DOM content as argument
  injectScript();
});

export {};
