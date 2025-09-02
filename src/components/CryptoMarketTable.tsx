import { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, CartesianGrid } from 'recharts';
import axios from 'axios';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  sparkline_in_7d: { price: number[] };
}

export default function AllCoinsTable() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 50;

  useEffect(() => {
    fetchCoins(page);
  }, [page]);

  const fetchCoins = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: perPage,
            page: page,
            sparkline: true,
            price_change_percentage: '1h,24h,7d'
          },
        }
      );
      setCoins(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load coins');
    } finally {
      setLoading(false);
    }
  };

  const getColor = (value: number) => value >= 0 ? 'text-green-600' : 'text-red-600';

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div 
        className="bg-white rounded-xl p-6 shadow-lg"
        style={{
          border: '2px solid transparent',
          background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF8A00, #7A3AFF) border-box'
        }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Cryptocurrencies</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Coin</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-right">1h</th>
                <th className="p-3 text-right">24h</th>
                <th className="p-3 text-right">7d</th>
                <th className="p-3 text-right">24h Volume</th>
                <th className="p-3 text-right">Market Cap</th>
                <th className="p-3 text-center">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => {
                const chartData = coin.sparkline_in_7d.price.map((price, idx) => ({
                  date: `Day ${idx + 1}`,
                  price
                }));

                return (
                  <tr key={coin.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </td>
                    <td className="p-3 text-right">${coin.current_price.toLocaleString()}</td>
                    <td className={`p-3 text-right ${getColor(coin.price_change_percentage_1h_in_currency)}`}>
                      {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                    </td>
                    <td className={`p-3 text-right ${getColor(coin.price_change_percentage_24h_in_currency)}`}>
                      {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
                    </td>
                    <td className={`p-3 text-right ${getColor(coin.price_change_percentage_7d_in_currency)}`}>
                      {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                    </td>
                    <td className="p-3 text-right">${coin.total_volume.toLocaleString()}</td>
                    <td className="p-3 text-right">${coin.market_cap.toLocaleString()}</td>
                    <td className="p-3 w-40 h-16">
                      <ResponsiveContainer width="100%" height={50}>
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id={`grad-${coin.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} horizontal={false}/>
                          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']} />
                          <Area type="monotone" dataKey="price" stroke="#4f46e5" fill={`url(#grad-${coin.id})`} strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

<div className="flex justify-center items-center mt-4 gap-2 max-w-6xl mx-auto">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300
               disabled:opacity-50 disabled:cursor-not-allowed
               transition-all duration-200 rounded-lg hover:text-white"
    style={{
      background: 'white',
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLButtonElement).style.background =
        'linear-gradient(90deg, #FF8A00, #7A3AFF)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLButtonElement).style.background = 'white';
    }}
  >
    Previous
  </button>

  <span className="px-3 py-2 text-gray-700 font-medium">{page}</span>

  <button
    onClick={() => setPage((prev) => prev + 1)}
    className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300
               transition-all duration-200 rounded-lg hover:text-white"
    style={{
      background: 'white',
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLButtonElement).style.background =
        'linear-gradient(90deg, #FF8A00, #7A3AFF)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLButtonElement).style.background = 'white';
    }}
  >
    Next
  </button>
</div>


        </div>
      </div>
  );
}
