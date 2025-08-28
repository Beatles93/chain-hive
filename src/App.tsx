import Header from './components/Header';
import type { Chain } from "@thirdweb-dev/chains";

interface AppProps {
  chains: Chain[];
  activeChain: Chain;
  setActiveChain: (chain: Chain) => void;
}

function App({ chains, activeChain, setActiveChain }: AppProps) {
  return (
    <div>
      <Header chains={chains} activeChain={activeChain} setActiveChain={setActiveChain} />
    </div>
  );
}

export default App;

