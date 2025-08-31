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
import type { Chain } from "@thirdweb-dev/chains"; 
import { Ethereum, Polygon, Base } from "@thirdweb-dev/chains"; 

const chains: Chain[] = [Ethereum, Polygon, Base];

function Root() {
  return (
    <ThirdwebProvider
      supportedChains={chains}
      theme="light"
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        embeddedWallet(),
      ]}
    >
      <App chains={chains} />
    </ThirdwebProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
