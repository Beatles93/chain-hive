export default function WalletPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      {/* Заголовок с градиентом */}
      <h1
        className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(90deg, #FF8A00, #7A3AFF)"
        }}
      >
        My Wallet
      </h1>

      {/* Подзаголовок */}
      <p className="text-lg text-gray-700 mb-6">
        Здесь будет твой кошелёк 🚀
      </p>

      {/* Кнопка в стиле Header */}
      <button
        className="px-6 py-3 rounded-md font-semibold shadow-md text-[#213547]"
        style={{
          border: "2px solid transparent",
          background:
            "linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF8A00, #7A3AFF) border-box"
        }}
      >
        Open Wallet
      </button>
    </div>
  );
}
