import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getHoldingsChartData } from "../services/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Holdings Value" },
  },
};

export function VerticalGraph() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHoldingsChartData();
        const holdings = res.data || [];

        const labels = holdings.map(h => h.symbol);
        const values = holdings.map(h => h.value);

        setData({
          labels,
          datasets: [
            {
              label: "Value",
              data: values,
              backgroundColor: "#36A2EB",
            },
          ],
        });
      } catch (err) {
        console.error("❌ Failed to fetch holdings graph data:", err);
      }
    };
    fetchData();
  }, []);

  return <Bar options={options} data={data} />;
}
