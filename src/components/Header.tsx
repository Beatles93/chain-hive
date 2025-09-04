import { useState } from 'react';
import { ConnectWallet, useActiveChain, useSwitchChain } from "@thirdweb-dev/react";
import type { Chain } from "@thirdweb-dev/chains";

interface HeaderProps {
  chains: Chain[];
  favoritesCount: number;
  onToggleFavorites: () => void;
  showFavoritesOnly: boolean;
}

const getNetworkIcon = (chainName: string) => {
  switch (chainName.toLowerCase()) {
    case 'ethereum':
    case 'ethereum mainnet':
      return <span className="text-lg">🔷</span>;
    case 'polygon':
    case 'polygon mainnet':
      return <span className="text-lg">🟣</span>;
    case 'base':
      return <span className="text-lg">🔵</span>;
    default:
      return <span className="text-lg">⚫</span>;
  }
};

export default function Header({ chains, favoritesCount, onToggleFavorites, showFavoritesOnly }: HeaderProps) {
  const [openChainDropdown, setOpenChainDropdown] = useState(false);
  const activeChain = useActiveChain();
  const switchChain = useSwitchChain();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between h-18 px-6">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/assets/logo.png" alt="logo" className="w-16 h-16 object-contain" />
        </a>

        <div className="flex items-center gap-4">
{/* Favorite button */}
<button
  onClick={onToggleFavorites}
  className="relative px-4 py-2 rounded-md bg-white text-[#213547] font-medium shadow-md flex items-center gap-1 overflow-hidden transition-all duration-200
    before:absolute before:-inset-1 before:bg-gradient-to-r before:from-[#FF8A00] before:to-[#7A3AFF]
    before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100"
  style={{
    border: "2px solid transparent",
    backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #FF8A00, #7A3AFF)",
    backgroundOrigin: "padding-box, border-box",
    backgroundClip: "padding-box, border-box",
  }}
>
  <span className="relative z-10">
    ⭐ {showFavoritesOnly ? 'Favorites On' : 'Favorites'} ({favoritesCount})
  </span>
</button>

          {/* Wallet icon */}
          <a href="/wallet">
            <img src="/assets/walletRgb.png" alt="Wallet" className="w-9 h-9 object-contain" />
          </a>

          {/* Network dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenChainDropdown(!openChainDropdown)}
              className="px-4 py-2 rounded-md bg-white text-[#213547] font-medium shadow-md flex items-center gap-2"
              style={{
                border: '2px solid transparent',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF8A00, #7A3AFF) border-box'
              }}
            >
              {activeChain?.name && getNetworkIcon(activeChain.name)}
              <span>{activeChain?.name || 'Loading...'}</span>
              <span>▼</span>
            </button>
            {openChainDropdown && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                {chains.map(chain => (
                  <button
                    key={chain.slug}
                    onClick={async () => { await switchChain(chain.chainId); setOpenChainDropdown(false); }}
                    className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <div className="flex items-center gap-2">{getNetworkIcon(chain.name)}<span>{chain.name}</span></div>
                    {chain.slug === activeChain?.slug && <span>✔️</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connect wallet */}
          <ConnectWallet
            theme="light"
            btnTitle="Connect"
            className="px-6 py-2 rounded-md font-semibold shadow-md bg-white text-[#213547]"
            style={{
              border: '2px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF8A00, #7A3AFF) border-box',
            }}
          />
        </div>
      </div>
    </header>
  );
}



