import MortgageSimulator from "./components/MortgageSimulator";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Simulador Hipotecario 🏠
        </h1>
        <MortgageSimulator />
      </div>
    </main>
  );
}
