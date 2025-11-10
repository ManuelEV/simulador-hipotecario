"use client";

import { useState, useEffect } from "react";
import PaymentBreakdown from "./PaymentBreakdown";

export default function MortgageSimulator() {
  const [price, setPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<"CLP" | "UF">("CLP");
  const [rate, setRate] = useState<number>(4.5);
  const [years, setYears] = useState<number>(20);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [dividend, setDividend] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const UF_VALUE = 37000; // Valor referencial en CLP

  const calculate = () => {
    if (!price || price <= 0) {
      setDividend(null);
      return;
    }

    let loanAmount = price;
    if (currency === "UF") loanAmount *= UF_VALUE;

    const downPayment = (downPaymentPercent / 100) * loanAmount;
    const financedAmount = loanAmount - downPayment;

    const monthlyRate = rate / 100 / 12;
    const totalPayments = years * 12;

    const result =
      (financedAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -totalPayments));

    setDividend(result);
    setHasCalculated(true);
  };

  // 👇 Si ya se calculó una vez, actualiza automáticamente al cambiar algo
  useEffect(() => {
    if (hasCalculated) {
      calculate();
    }
  }, [price, currency, rate, years, downPaymentPercent]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            Precio de la vivienda
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: 40000000"
          />
        </div>

        {/* Moneda */}
        <div>
          <label className="block text-sm font-medium text-gray-800">Moneda</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as "CLP" | "UF")}
            className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="CLP">CLP</option>
            <option value="UF">UF</option>
          </select>
        </div>
      </div>

      {/* Pie */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Porcentaje del pie ({downPaymentPercent}%)
        </label>
        <input
          type="range"
          min={10}
          max={90}
          step={5}
          value={downPaymentPercent}
          onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="relative w-full flex justify-between text-xs text-gray-600 mt-1">
          {[10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90].map(
            (value) => (
              <span key={value} className="text-[10px]">
                |
              </span>
            )
          )}
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>10%</span>
          <span>90%</span>
        </div>
      </div>

      {/* Tasa de interés */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Tasa de interés anual ({rate.toFixed(2)}%)
        </label>
        <input
          type="range"
          min={1.5}
          max={7}
          step={0.1}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>1.5%</span>
          <span>7%</span>
        </div>
      </div>

      {/* Plazo */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Plazo del crédito (años)
        </label>
        <select
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="mt-1 w-full border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {Array.from({ length: 8 }, (_, i) => (i + 1) * 5).map((y) => (
            <option key={y} value={y}>
              {y} años
            </option>
          ))}
        </select>
      </div>

      {/* Botón de cálculo inicial */}
      {!hasCalculated && (
        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Calcular dividendo
        </button>
      )}

      {/* Resultado */}
{dividend && (
  <div className="mt-6 text-center space-y-4">
    <div>
  <p className="text-gray-700">Dividendo mensual estimado:</p>
  <p className="text-3xl font-bold text-green-600">
    ${dividend.toLocaleString("es-CL", { maximumFractionDigits: 0 })} CLP
  </p>

  {/* Monto financiado */}
  <p className="text-sm text-gray-600 mt-1">
    Monto financiado:{" "}
    <span className="font-semibold">
      $
      {(
        price *
        (currency === "UF" ? UF_VALUE : 1) *
        (1 - downPaymentPercent / 100)
      ).toLocaleString("es-CL", { maximumFractionDigits: 0 })}{" "}
      CLP
    </span>
  </p>

  {/* Valor del pie */}
  <p className="text-sm text-gray-600">
    Pie ({downPaymentPercent}%):{" "}
    <span className="font-semibold">
      $
      {(
        price *
        (currency === "UF" ? UF_VALUE : 1) *
        (downPaymentPercent / 100)
      ).toLocaleString("es-CL", { maximumFractionDigits: 0 })}{" "}
      CLP
    </span>
  </p>

  {currency === "UF" && (
    <p className="text-xs text-gray-500 mt-1">
      (Basado en valor UF ≈ ${UF_VALUE.toLocaleString("es-CL")})
    </p>
  )}
</div>

    {/* Detalle de seguros */}
    <div className="mt-8 border-t pt-4 text-left max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        🛡️ Seguros asociados
      </h3>

      {(() => {
        const loanAmount =
          price * (currency === "UF" ? UF_VALUE : 1) * (1 - downPaymentPercent / 100);

        const seguroDesgravamen = loanAmount * 0.0003; // 0.03% mensual
        const seguroIncendio = price * (currency === "UF" ? UF_VALUE : 1) * 0.00015; // 0.015% mensual
        const totalMensual = dividend + seguroDesgravamen + seguroIncendio;

        return (
          <div className="space-y-1 text-gray-700 text-sm">
            <p>
              • Seguro de desgravamen:{" "}
              <span className="font-medium text-gray-900">
                ${seguroDesgravamen.toLocaleString("es-CL", { maximumFractionDigits: 0 })}
              </span>{" "}
              / mes
            </p>
            <p>
              • Seguro de incendio y sismo:{" "}
              <span className="font-medium text-gray-900">
                ${seguroIncendio.toLocaleString("es-CL", { maximumFractionDigits: 0 })}
              </span>{" "}
              / mes
            </p>

            <hr className="my-3" />

            <p className="text-base font-semibold text-gray-800">
              💰 Dividendo total estimado:{" "}
              <span className="text-green-600">
                ${totalMensual.toLocaleString("es-CL", { maximumFractionDigits: 0 })} CLP
              </span>
            </p>
          </div>
        );
      })()}
    </div>
    <PaymentBreakdown dividend={dividend}/>
  </div>
)}
    </div>
  );
}
