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

const Transaction = () => {
  // States
  const [transactionData, setTransactionData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [addTransaction, setAddTransaction] = useState({
    purchase: "",
    sale: "",
    expense: "",
    profit: "",
    cash_payments: "",
    cash_recieve: "",
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
  const transactionRecords = transactionData.slice(firstIndex, lastIndex);
  const onPageChange = (page) => setCurrentPage(page);
  const npages = Math.ceil(transactionData.length / recordsPerPage);

  // Functionality to fetch all transactions data from backend
  useEffect(() => {
    fetch("http://localhost:5000/all-transaction")
      .then((response) => response.json())
      .then((data) => setTransactionData((data.data).reverse()))
      .catch((err) => console.log(err));
  }, []);

  // Functionality to add transaction
  const handleInput = async (e) => {
    const { id, value } = e.target;
    setAddTransaction({ ...addTransaction, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAlert(null);
      const res = await fetch("http://localhost:5000/add-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addTransaction),
      });
      const newTransaction = await res.json();
      if (!res.ok) {
        return setAlert("Failed to Add Transaction");
      }
      setAlert("Transaction Added Successfully");
      window.location.reload();
    } catch (error) {
      setAlert("Internal Server Error", error.message);
    }
  };

  // Functionality to delete transaction
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/all-transaction/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete Transaction");
      }
      const updatedTransactionData = transactionData.filter(
        (transaction) => transaction._id !== id
      );
      setTransactionData(updatedTransactionData);
      setAlert("Transaction Deleted Successfully");
    } catch (error) {
      setAlert("Failed to Delete Transaction", error.message);
    }
  };

  return (
    <>
      <div className="m-8">
        <h1 className="flex justify-center text-6xl font-extrabold">
          TRANSACTIONS
        </h1>
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <Label value="Purchase" />
            <TextInput
              id="purchase"
              type="text"
              placeholder="Enter the amount you have spent today in purchasing..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Sale" />
            <TextInput
              id="sale"
              type="text"
              placeholder="Enter today's sale..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Expenses" />
            <TextInput
              id="expense"
              type="text"
              placeholder="Enter the amount of extra expenses..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Profit" />
            <TextInput
              id="profit"
              type="text"
              placeholder="Enter today's Profit..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Cash Payments" />
            <TextInput
              id="cash_payments"
              type="text"
              placeholder="Enter how much cash you spent today..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Cash Recieved" />
            <TextInput
              id="cash_recieve"
              type="text"
              placeholder="Enter cash recieved today..."
              required
              onChange={handleInput}
            />
          </div>
          <Button outline gradientDuoTone="purpleToBlue" type="submit">
            Add Transaction
          </Button>
          {alert && <Alert>{alert}</Alert>}
        </form>
      </div>
      <h1 className="flex justify-center text-4xl font-bold mb-6">
        ALL TRANSACTIONS
      </h1>
      <div className="overflow-x-auto">
        <div ref={pdfRef}>
          <Table hoverable className="">
            <Table.Head>
              <Table.HeadCell>Purchase</Table.HeadCell>
              <Table.HeadCell>Sale</Table.HeadCell>
              <Table.HeadCell>Expense</Table.HeadCell>
              <Table.HeadCell>Profit</Table.HeadCell>
              <Table.HeadCell>Cash Payments</Table.HeadCell>
              <Table.HeadCell>Cash Recieved</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            {transactionData.length > 0 && (
              <Table.Body>
                {transactionRecords.map((transaction) => (
                  <Table.Row
                    key={transaction._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 font-bold"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {transaction.purchase}
                    </Table.Cell>
                    <Table.Cell>{transaction.sale}</Table.Cell>
                    <Table.Cell>{transaction.expense}</Table.Cell>
                    <Table.Cell>{transaction.profit}</Table.Cell>
                    <Table.Cell>{transaction.cash_payments}</Table.Cell>
                    <Table.Cell>{transaction.cash_recieve}</Table.Cell>
                    <Table.Cell>
                      {transaction.createdAt.toString().split("T").join("  ")}
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => handleDelete(transaction._id)}>
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

export default Transaction;
