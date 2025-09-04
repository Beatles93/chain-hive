import { useState } from "react";
import Header from './components/Header';
import TokenChart from './components/TokenChart';
import type { Chain } from "@thirdweb-dev/chains";
import { Routes, Route } from "react-router-dom";
import WalletPage from './components/pages/WalletPage';    
import AllCoinsTable from './components/CryptoMarketTable';
import { useFavoritesStore } from "./components/store/favorites";

interface AppProps {
  chains: Chain[];
}

function App({ chains }: AppProps) {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites } = useFavoritesStore();

  const toggleFavorites = () => setShowFavoritesOnly(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        chains={chains}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={toggleFavorites}
      />
      <main className="pt-8">
        <Routes>
          <Route path="/" element={<TokenChart />} />
          <Route path="/wallet" element={<WalletPage />} />
        </Routes>
        <AllCoinsTable showFavoritesOnly={showFavoritesOnly} />
      </main>
    </div>
  );
}

export default App;

