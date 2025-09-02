import { useState, useRef, useEffect } from 'react';
import { ConnectWallet, useActiveChain, useSwitchChain } from "@thirdweb-dev/react";
import type { Chain } from "@thirdweb-dev/chains";

const getNetworkIcon = (chainName: string) => {
  switch (chainName.toLowerCase()) {
    case 'ethereum mainnet':
    case 'ethereum':
      return <span className="text-lg">🔷</span>;
    case 'polygon mainnet':
    case 'polygon':
      return <span className="text-lg">🟣</span>;
    case 'base':
      return <span className="text-lg">🔵</span>;
    default:
      return <span className="text-lg">⚫</span>;
  }
}; 

interface HeaderProps {
  chains: Chain[];
}

const brand = {
  navy: '#0F2A4A',
  orange: '#FF8A00',
  purple: '#7A3AFF',
};

export default function Header({ chains }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeChain = useActiveChain();
  const switchChain = useSwitchChain();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white relative"
      style={{
        height: 70,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderBottom: '2px solid #e5e7eb'
      }}
    >
      <div className="flex h-full w-full items-center justify-between pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
        {/* Left: logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center" aria-label="Chain Hive home">
            <img
              src="/assets/logo.svg"
              alt="Chain Hive logo"
              className="block shrink-0"
              style={{ width: 70, height: 70, objectFit: 'contain' }}
            />
          </a>
        </div>

        {/* Right side */}
        <div className="flex items-center ml-auto gap-4 relative" ref={dropdownRef}>
          {/* Wallet icon link */}
          <a href="/wallet" aria-label="My Wallet">
            <img
              src="/assets/walletRgb.png"
              alt="Wallet"
              className="block"
              style={{ width: 36, height: 36, objectFit: 'contain' }}
            />
          </a>

          {/* Network dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
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

            {open && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                {chains.map(chain => (
                  <button
                    key={chain.slug}
                    onClick={async () => {
                      try {
                        await switchChain(chain.chainId);
                        setOpen(false);
                      } catch (error) {
                        console.error('Failed to switch chain:', error);
                      }
                    }}
                    className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {getNetworkIcon(chain.name)}
                      <span>{chain.name}</span>
                    </div>
                    {chain.slug === activeChain?.slug && <span className="ml-2">✔️</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connect button */}
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

      {/* Bottom gradient line */}
      <div
        className="h-0.5 w-full"
        style={{ backgroundImage: `linear-gradient(90deg, ${brand.orange}, ${brand.purple})` }}
      />
    </header>
  );
}

