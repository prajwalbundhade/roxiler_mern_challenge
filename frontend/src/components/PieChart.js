import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

// Register the necessary components for Pie Chart
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.category),  // Category names
        datasets: [
            {
                label: "Items by Category",
                data: data.map((item) => item.count),  // Item counts in each category
                backgroundColor: [
                    "rgba(75,192,192,0.6)", 
                    "rgba(153,102,255,0.6)", 
                    "rgba(255,159,64,0.6)",
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(255,206,86,0.6)"
                ],
                borderColor: "rgba(0,0,0,0.1)",
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;
