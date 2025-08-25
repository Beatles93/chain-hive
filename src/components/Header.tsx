import React from 'react'

const brand = {
  navy: '#0F2A4A',
  orange: '#FF8A00',
  purple: '#7A3AFF',
}

export default function Header(): React.ReactElement {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-white"
      style={{ 
        height: 65,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderBottom: '2px solid #e5e7eb'
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
        {/* Centered logo */}
        <div className="flex items-center justify-center">
          <a href="/" className="flex items-center justify-center" aria-label="Chain Hive home">
            <img
              src="/assets/logo.svg"
              alt="Chain Hive logo"
              className="block shrink-0"
              style={{ width: 70, height: 70, objectFit: 'contain', margin: 'auto' }}
            />
          </a>
        </div>
      </div>
      <div
        className="h-0.5 w-full"
        style={{ backgroundImage: `linear-gradient(90deg, ${brand.orange}, ${brand.purple})` }}
      />
    </header>
  )
} 