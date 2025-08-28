import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { Ethereum,Polygon, Base } from "@thirdweb-dev/chains";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider
      activeChain={Ethereum}
      supportedChains={[Ethereum, Polygon, Base]}
      theme="light"
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        embeddedWallet(),
      ]}
    >
      <App />
    </ThirdwebProvider>
  </StrictMode>,
);
