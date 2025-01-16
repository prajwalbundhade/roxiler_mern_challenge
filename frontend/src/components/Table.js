import React from "react";
import { Table as BootstrapTable, Button } from "react-bootstrap";

const Table = ({ transactions, handlePageChange, currentPage }) => {
    return (
        <div>
            <BootstrapTable striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Sold</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((item) => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>₹{item.price}</td>
                            <td>{item.description}</td>
                            <td>{item.sold ? "Yes" : "No"}</td>
                            <td>{new Date(item.dateOfSale).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </BootstrapTable>
            <div className="text-center mt-3">
                <Button
                    variant="secondary"
                    onClick={() => handlePageChange(-1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button
                    variant="primary"
                    onClick={() => handlePageChange(1)}
                    className="ml-2"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Table;
