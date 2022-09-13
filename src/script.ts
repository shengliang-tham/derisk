import { MetaMaskInpageProvider } from "@metamask/providers";
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}
console.log(window.ethereum.addListener);

window.ethereum.on("eth_subscribe", (data) => {
  console.log(data);
});

export {};
