import React, { useEffect, useRef, useState } from "react";
import { Button, Table } from "flowbite-react";
import { useReactToPrint } from "react-to-print";

const ReportOneDay = () => {
  const [tankData, setTankData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pdfRef = useRef();
  const generatePDF = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: "report",
    onAfterPrint: () => alert("PDF SAVED"),
  });

  // Functionality to show 3 fields
  const [recordsPerPage] = useState(1);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const tankRecords = tankData.slice(firstIndex, lastIndex);
  const stockRecords = stockData.slice(firstIndex, lastIndex);
  const accountRecords = accountData.slice(firstIndex, lastIndex);
  const transactionRecords = transactionData.slice(firstIndex, lastIndex);
  const productRecords = productData.slice(firstIndex, lastIndex);

  useEffect(() => {
    fetch("http://localhost:5000/all-tank")
      .then((response) => response.json())
      .then((data) => setTankData((data.data).reverse()))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/all-stock")
      .then((response) => response.json())
      .then((data) => setStockData((data.data).reverse()))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/all-account")
      .then((response) => response.json())
      .then((data) => setAccountData((data.data).reverse()))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/all-transaction")
      .then((response) => response.json())
      .then((data) => setTransactionData((data.data).reverse()))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/all-product")
      .then((response) => response.json())
      .then((data) => setProductData((data.data).reverse()))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div ref={pdfRef}>
        <div className="overflow-x-auto">
          <h1 className="font-semibold text-2xl justify-center flex">TANKS</h1>
          <Table hoverable className="mb-8">
            <Table.Head>
              <Table.HeadCell>Tank Name</Table.HeadCell>
              <Table.HeadCell>Tank Quantity</Table.HeadCell>
              <Table.HeadCell>Tank Description</Table.HeadCell>
              <Table.HeadCell>Product Name</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
            </Table.Head>
            {tankData.length > 0 && (
              <Table.Body>
                {tankRecords.map((tank) => (
                  <Table.Row
                    key={tank._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 font-bold"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {tank.tankName}
                    </Table.Cell>
                    <Table.Cell>{tank.tankQuantity}</Table.Cell>
                    <Table.Cell>{tank.tankDescription}</Table.Cell>
                    <Table.Cell>{tank.productName}</Table.Cell>
                    <Table.Cell>
                      {tank.createdAt.toString().split("T").join("  ")}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            )}
          </Table>
        </div>

        <div className="overflow-x-auto">
          <h1 className="font-semibold text-2xl justify-center flex">
            ACCOUNT
          </h1>

          <Table hoverable className="mb-8">
            <Table.Head>
              <Table.HeadCell>Total Amount</Table.HeadCell>
              <Table.HeadCell>Amount To Pay</Table.HeadCell>
              <Table.HeadCell>Amount To Recieve</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
            </Table.Head>
            {accountData.length > 0 && (
              <Table.Body>
                {accountRecords.map((account) => (
                  <Table.Row
                    key={account._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 font-bold"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {account.totalAmount}
                    </Table.Cell>
                    <Table.Cell>{account.amountToPay}</Table.Cell>
                    <Table.Cell>{account.amountToRecieve}</Table.Cell>
                    <Table.Cell>
                      {account.createdAt.toString().split("T").join("  ")}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            )}
          </Table>
        </div>

        <div className="overflow-x-auto">
          <h1 className="font-semibold text-2xl justify-center flex">
            PRODUCTS
          </h1>

          <Table hoverable className="mb-8">
            <Table.Head>
              <Table.HeadCell>Product Name</Table.HeadCell>
              <Table.HeadCell>Product Category</Table.HeadCell>
              <Table.HeadCell>Product Stock</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
            </Table.Head>
            {productData.length > 0 && (
              <Table.Body>
                {productRecords.map((product) => (
                  <Table.Row
                    key={product._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 font-bold"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </Table.Cell>
                    <Table.Cell>{product.category}</Table.Cell>
                    <Table.Cell>{product.stock}</Table.Cell>
                    <Table.Cell>
                      {product.createdAt.toString().split("T").join("  ")}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            )}
          </Table>
        </div>

        <div className="overflow-x-auto">
          <h1 className="font-semibold text-2xl justify-center flex">STOCK</h1>

          <Table hoverable className="mb-8">
            <Table.Head>
              <Table.HeadCell>Current Stock</Table.HeadCell>
              <Table.HeadCell>Stock Needed</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
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
                  </Table.Row>
                ))}
              </Table.Body>
            )}
          </Table>
        </div>

        <div className="overflow-x-auto">
          <h1 className="font-semibold text-2xl justify-center flex">
            TRANSACTIONS
          </h1>

          <Table hoverable className="mb-8">
            <Table.Head>
              <Table.HeadCell>Purchase</Table.HeadCell>
              <Table.HeadCell>Sale</Table.HeadCell>
              <Table.HeadCell>Expense</Table.HeadCell>
              <Table.HeadCell>Profit</Table.HeadCell>
              <Table.HeadCell>Cash Payments</Table.HeadCell>
              <Table.HeadCell>Cash Recieved</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
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
                  </Table.Row>
                ))}
              </Table.Body>
            )}
          </Table>
        </div>
      </div>
      <div className="flex justify-center mb-2">
        <Button outline onClick={generatePDF} gradientDuoTone="purpleToBlue">
          Download PDF
        </Button>
      </div>
    </>
  );
};

export default ReportOneDay;
