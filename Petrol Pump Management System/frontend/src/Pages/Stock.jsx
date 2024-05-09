import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Label,
  Pagination,
  Table,
  TextInput,
} from "flowbite-react";
import { useReactToPrint } from "react-to-print";

const Stock = () => {
  // States
  const [stockData, setStockData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [addStock, setAddStock] = useState({
    currentStock: "",
    neededStock: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const pdfRef = useRef();
  const generatePDF = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: "report",
    onAfterPrint: () => alert("PDF SAVED"),
  });

  // Functionality for Pagination
  const [recordsPerPage] = useState(15);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const stockRecords = stockData.slice(firstIndex, lastIndex);
  const onPageChange = (page) => setCurrentPage(page);
  const npages = Math.ceil(stockData.length / recordsPerPage);

  // Functionality to fetch all stock data from backend
  useEffect(() => {
    fetch("http://localhost:5000/all-stock")
      .then((response) => response.json())
      .then((data) => setStockData((data.data).reverse()))
      .catch((err) => console.log(err));
  }, []);

  // Functionality to add stock
  const handleInput = async (e) => {
    const { id, value } = e.target;
    setAddStock({ ...addStock, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAlert(null);
      const res = await fetch("http://localhost:5000/add-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addStock),
      });
      const newStock = await res.json();
      if (!res.ok) {
        return setAlert("Failed to Add Stock");
      }
      setAlert("Stock Added Successfully");
      window.location.reload();
    } catch (error) {
      setAlert("Internal Server Error", error.message);
    }
  };

  // Functionality to delete stock
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/all-stock/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete Stock");
      }
      const updatedStockData = stockData.filter((stock) => stock._id !== id);
      setStockData(updatedStockData);
      setAlert("Stock Deleted Successfully");
    } catch (error) {
      setAlert("Failed to Delete Stock", error.message);
    }
  };

  return (
    <>
      <div className="m-8">
        <h1 className="flex justify-center text-6xl font-extrabold">STOCK</h1>
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <Label value="Current Stock" />
            <TextInput
              id="currentStock"
              type="text"
              placeholder="Enter the stock you have..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Stock Needed" />
            <TextInput
              id="neededStock"
              type="text"
              placeholder="Enter the amount of stock you need..."
              required
              onChange={handleInput}
            />
          </div>

          <Button outline gradientDuoTone="purpleToBlue" type="submit">
            Add Stock
          </Button>
          {alert && <Alert>{alert}</Alert>}
        </form>
      </div>
      <h1 className="flex justify-center text-4xl font-bold mb-6">
        ALL STOCKS
      </h1>
      <div className="overflow-x-auto">
        <div ref={pdfRef}>
          <Table hoverable className="">
            <Table.Head>
              <Table.HeadCell>Current Stock</Table.HeadCell>
              <Table.HeadCell>Stock Needed</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            {stockData.length > 0 && (
              <Table.Body>
                {stockRecords.map((stock) => (
                  <Table.Row
                    key={stock._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 font-bold"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {stock.currentStock}
                    </Table.Cell>
                    <Table.Cell>{stock.neededStock}</Table.Cell>
                    <Table.Cell>
                      {stock.createdAt.toString().split("T").join("  ")}
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => handleDelete(stock._id)}>
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            )}
          </Table>
        </div>
        <div className="flex overflow-x-auto sm:justify-center my-4">
          <Pagination
            currentPage={currentPage}
            totalPages={npages}
            onPageChange={onPageChange}
          />
        </div>
        <div className="flex justify-center mb-2">
          <Button outline onClick={generatePDF} gradientDuoTone="purpleToBlue">
            Download PDF
          </Button>
        </div>
      </div>
    </>
  );
};

export default Stock;
