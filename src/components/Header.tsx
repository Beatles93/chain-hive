import { useState, useRef, useEffect } from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";
import type { Chain } from "@thirdweb-dev/chains"; 

interface HeaderProps {
  chains: Chain[];
  activeChain: Chain;
  setActiveChain: (chain: Chain) => void;
}

const brand = {
  navy: '#0F2A4A',
  orange: '#FF8A00',
  purple: '#7A3AFF',
}

export default function Header({ chains, activeChain, setActiveChain }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

        {/* Right: network switch + connect button */}
        <div className="flex items-center ml-auto gap-4 relative" ref={dropdownRef}>
          {/* Network dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="px-4 py-2 border rounded-md bg-white text-[#213547] border-[#213547] font-medium shadow-md"
            >
              {activeChain.name} ▼
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                {chains.map(chain => (
                  <button
                    key={chain.slug}
                    onClick={() => {
                      setActiveChain(chain);
                      setOpen(false);
                    }}
                    className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <span>{chain.name}</span>
                    {chain.slug === activeChain.slug && <span>✔️</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connect button */}
          <ConnectWallet
            theme="light"
            btnTitle="Connect"
            className="px-6 py-2 rounded-lg font-semibold shadow-md bg-white text-[#213547] border-4 border-[#213547]"
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

