import Header from './components/Header';
import TokenChart from './components/TokenChart';
import type { Chain } from "@thirdweb-dev/chains";

interface AppProps {
  chains: Chain[];
}

function App({ chains }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header chains={chains} />
      <main className="pt-8">
        <TokenChart />
      </main>
    </div>
  );
}

export default App;

