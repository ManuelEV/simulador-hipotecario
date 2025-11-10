import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Colores para el gráfico
const COLORS = ["#16a34a", "#3b82f6", "#f59e0b", "#ef4444"];

const PaymentBreakdown = ({ dividend }: { dividend: number }) => {
  // Ejemplo de desglose (puedes ajustar los porcentajes según tu fórmula real)
  const breakdown = [
    { name: "Amortización (capital)", value: dividend * 0.45 },
    { name: "Interés", value: dividend * 0.35 },
    { name: "Seguro de desgravamen", value: dividend * 0.10 },
    { name: "Seguro incendio + sismo", value: dividend * 0.10 },
  ];

  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Desglose del pago mensual
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Gráfico circular */}
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={breakdown}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                labelLine={false}
                label={({ name }) => name.split(" ")[0]} // etiqueta simple
              >
                {breakdown.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) =>
                  `$${value.toLocaleString("es-CL", { maximumFractionDigits: 0 })} CLP`
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Resumen textual */}
        <div className="w-full md:w-1/2 space-y-2">
          {breakdown.map((item, i) => (
            <div key={i} className="flex justify-between border-b py-1 text-gray-700">
              <span>{item.name}</span>
              <span className="font-semibold">
                $
                {item.value.toLocaleString("es-CL", {
                  maximumFractionDigits: 0,
                })}{" "}
                CLP
              </span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-2 text-gray-800">
            <span>Total</span>
            <span>
              ${dividend.toLocaleString("es-CL", { maximumFractionDigits: 0 })} CLP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentBreakdown;