import React, { useState, useEffect } from "react";
import api from "../services/api";
import Dropdown from "../components/Dropdown";
import Statistics from "../components/Statistics";
import BarChart from "../components/BarChart";
import Table from "../components/Table";
import PieChart from "../components/PieChart";  // Import PieChart
import { Container, Row, Col, Card, Button } from "react-bootstrap";  // Import Bootstrap components

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState("March");
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barData, setBarData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Fetch data for transactions, statistics, bar chart, and pie chart
        const fetchData = async () => {
            const [transactionResponse, statisticsResponse, barResponse, pieResponse] = await Promise.all([
                api.get("/transactions", { params: { page: currentPage, month: selectedMonth } }),
                api.get("/statistics", { params: { month: selectedMonth } }),
                api.get("/bar-chart", { params: { month: selectedMonth } }),
                api.get("/pie-chart", { params: { month: selectedMonth } }),
            ]);
            setTransactions(transactionResponse.data.transactions);
            setStatistics(statisticsResponse.data || {});
            setBarData(barResponse.data);
            setPieData(pieResponse.data || []);
        };

        fetchData();
    }, [selectedMonth, currentPage]);

    return (
        <Container>
            <h1 className="my-4 text-center">Dashboard</h1>
            <Row>
                {/* Month Dropdown */}
                <Col md={3}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Dropdown selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                        </Card.Body>
                    </Card>
                </Col>

                {/* Statistics Section */}
                <Col md={9}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Statistics stats={statistics} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Row>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <h4>Bar Chart</h4>
                            <BarChart data={barData} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <h4>Pie Chart</h4>
                            <PieChart data={pieData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Table Section */}
            <Row>
                <Col>
                    <Card className="mb-4">
                        <Card.Body>
                            <h4>Transactions</h4>
                            <Table
                                transactions={transactions}
                                handlePageChange={(direction) => setCurrentPage(currentPage + direction)}
                                currentPage={currentPage}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
