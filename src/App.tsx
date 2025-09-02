import Header from './components/Header';
import TokenChart from './components/TokenChart';
import type { Chain } from "@thirdweb-dev/chains";
import { Routes, Route } from "react-router-dom";
import WalletPage from './components/pages/WalletPage';    

interface AppProps {
  chains: Chain[];
}

function App({ chains }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header chains={chains} />
      <main className="pt-8">
        <Routes>
          <Route path="/" element={<TokenChart />} />
          <Route path="/wallet" element={<WalletPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

