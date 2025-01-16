import React from "react";

const Statistics = ({ stats }) => {
    // Set default values to avoid undefined errors
    const totalSales = stats?.totalSales || 0;
    const totalSold = stats?.totalSold || 0;
    const totalNotSold = stats?.totalNotSold || 0;

    return (
        <div className="statistics">
            <div>Total Sales: ₹{totalSales.toFixed(2)}</div>
            <div>Total Sold Items: {totalSold}</div>
            <div>Total Not Sold Items: {totalNotSold}</div>
        </div>
    );
};

export default Statistics;
