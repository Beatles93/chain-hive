import Header from './components/Header';
import type { Chain } from "@thirdweb-dev/chains";

interface AppProps {
  chains: Chain[];
}

function App({ chains }: AppProps) {
  return (
    <div>
      <Header chains={chains} />
    </div>
  );
}

export default App;

