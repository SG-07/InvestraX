import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PortfolioAPI } from "../services/api"; 

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await PortfolioAPI.breakdown(); 
        const holdings = res.data.breakdown || [];

        if (holdings.length === 0) {
          setData(null); // no holdings
        } else {
          const labels = holdings.map(h => h.symbol);
          const values = holdings.map(h => h.value);

          setData({
            labels,
            datasets: [
              {
                label: "Holdings Value",
                data: values,
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                  "#FF9F40"
                ],
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (err) {
        console.error("❌ Failed to fetch holdings chart data:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500">Loading chart...</p>;
  if (!data) return <p className="text-gray-600 italic">📌 You have not invested yet.</p>;

  return <Doughnut data={data} />;
}
