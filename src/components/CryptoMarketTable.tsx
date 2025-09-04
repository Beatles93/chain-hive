import { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, Area, Tooltip, CartesianGrid } from "recharts";
import axios from "axios";
import { useFavoritesStore } from "./store/favorites";

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

type SortKey =
  | "name"
  | "current_price"
  | "price_change_percentage_1h_in_currency"
  | "price_change_percentage_24h_in_currency"
  | "price_change_percentage_7d_in_currency"
  | "total_volume"
  | "market_cap";

interface AllCoinsTableProps {
  showFavoritesOnly: boolean;
}

export default function AllCoinsTable({ showFavoritesOnly }: AllCoinsTableProps) {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [hoveredKey, setHoveredKey] = useState<SortKey | null>(null);
  const perPage = 50;

  const { toggleFavorite, favorites, isFavorite } = useFavoritesStore();

  useEffect(() => {
    fetchCoins(page);
  }, [page]);

  const fetchCoins = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: perPage,
            page,
            sparkline: true,
            price_change_percentage: "1h,24h,7d",
          },
        }
      );
      setCoins(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load coins");
    } finally {
      setLoading(false);
    }
  };

  const coinsToDisplay = showFavoritesOnly
    ? coins.filter(c => favorites.includes(c.id))
    : coins;

  const getColor = (value: number) => (value >= 0 ? "text-green-600" : "text-red-600");

  const handleSort = (key: SortKey) => {
    let direction: "asc" | "desc" = "desc";
    if (sortKey === key) direction = sortDirection === "asc" ? "desc" : "asc";

    setSortKey(key);
    setSortDirection(direction);

    setCoins(prev =>
      [...prev].sort((a: any, b: any) => {
        const aVal = a[key] ?? 0;
        const bVal = b[key] ?? 0;
        return direction === "asc" ? aVal - bVal : bVal - aVal;
      })
    );
  };

  const renderSortArrow = (key: SortKey) => {
    if (hoveredKey === key) return sortDirection === "asc" ? "▲" : "▼";
    return null;
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div
        className="bg-white rounded-xl p-6 shadow-lg"
        style={{
          border: "2px solid transparent",
          background:
            "linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF8A00, #7A3AFF) border-box",
        }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {showFavoritesOnly ? "Favorites" : "Top Cryptocurrencies"}
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-center">⭐</th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onMouseEnter={() => setHoveredKey("name")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => handleSort("name")}
                >
                  Coin {renderSortArrow("name")}
                </th>
                <th
                  className="p-3 text-right cursor-pointer"
                  onMouseEnter={() => setHoveredKey("current_price")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => handleSort("current_price")}
                >
                  Price {renderSortArrow("current_price")}
                </th>
                <th
                  className="p-3 text-right cursor-pointer"
                  onMouseEnter={() => setHoveredKey("price_change_percentage_1h_in_currency")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => handleSort("price_change_percentage_1h_in_currency")}
                >
                  1h {renderSortArrow("price_change_percentage_1h_in_currency")}
                </th>
                <th
                  className="p-3 text-right cursor-pointer"
                  onMouseEnter={() => setHoveredKey("price_change_percentage_24h_in_currency")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => handleSort("price_change_percentage_24h_in_currency")}
                >
                  24h {renderSortArrow("price_change_percentage_24h_in_currency")}
                </th>
                <th
                  className="p-3 text-right cursor-pointer"
                  onMouseEnter={() => setHoveredKey("price_change_percentage_7d_in_currency")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => handleSort("price_change_percentage_7d_in_currency")}
                >
                  7d {renderSortArrow("price_change_percentage_7d_in_currency")}
                </th>
                <th
                  className="p-3 text-right cursor-pointer"
                  onMouseEnter={() => setHoveredKey("total_volume")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => handleSort("total_volume")}
                >
                  24h Volume {renderSortArrow("total_volume")}
                </th>
                <th
                  className="p-3 text-right cursor-pointer"
                  onMouseEnter={() => setHoveredKey("market_cap")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => handleSort("market_cap")}
                >
                  Market Cap {renderSortArrow("market_cap")}
                </th>
                <th className="p-3 text-center">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {coinsToDisplay.map((coin) => {
                const chartData = coin.sparkline_in_7d.price.map((price, i) => ({
                  date: `Day ${i + 1}`,
                  price,
                }));

                return (
                  <tr key={coin.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-center">
                      <button onClick={() => toggleFavorite(coin.id)} className="text-xl">
                        {isFavorite(coin.id) ? "⭐" : "☆"}
                      </button>
                    </td>
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
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} horizontal={false} />
                          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]} />
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
{/* Pagination */}
<div className="flex justify-center items-center mt-4 gap-2 max-w-6xl mx-auto">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className={`relative px-4 py-2 font-medium text-gray-700 rounded-lg overflow-hidden transition-all duration-200
      bg-white
      before:absolute before:-inset-1 before:bg-gradient-to-r before:from-[#FF8A00] before:to-[#7A3AFF]
      before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100
      disabled:opacity-50 disabled:cursor-not-allowed`}
    style={{
      border: "2px solid transparent",
      backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #FF8A00, #7A3AFF)",
      backgroundOrigin: "padding-box, border-box",
      backgroundClip: "padding-box, border-box",
    }}
  >
    <span className="relative z-10">Previous</span>
  </button>

  <span className="px-3 py-2 text-gray-700 font-medium">{page}</span>

  <button
    onClick={() => setPage((prev) => prev + 1)}
    className={`relative px-4 py-2 font-medium text-gray-700 rounded-lg overflow-hidden transition-all duration-200
      bg-white
      before:absolute before:-inset-1 before:bg-gradient-to-r before:from-[#FF8A00] before:to-[#7A3AFF]
      before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100`}
    style={{
      border: "2px solid transparent",
      backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #FF8A00, #7A3AFF)",
      backgroundOrigin: "padding-box, border-box",
      backgroundClip: "padding-box, border-box",
    }}
  >
    <span className="relative z-10">Next</span>
  </button>
</div>
      </div>
    </div>
  );
}
