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

const Account = () => {
  // States
  const [accountData, setAccountData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [addAccount, setAddAccount] = useState({
    totalAmount: "",
    amountToPay: "",
    amountToRecieve: "",
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
  const accountRecords = accountData.slice(firstIndex, lastIndex);
  const onPageChange = (page) => setCurrentPage(page);
  const npages = Math.ceil(accountData.length / recordsPerPage);

  // Functionality to fetch all Account data from backend
  useEffect(() => {
    fetch("http://localhost:5000/all-account")
      .then((response) => response.json())
      .then((data) => setAccountData((data.data).reverse()))
      .catch((err) => console.log(err));
  }, []);

  // Functionality to add account
  const handleInput = async (e) => {
    const { id, value } = e.target;
    setAddAccount({ ...addAccount, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAlert(null);
      const res = await fetch("http://localhost:5000/add-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addAccount),
      });
      const newAccount = await res.json();
      if (!res.ok) {
        return setAlert("Failed to Add Account Amount");
      }
      setAlert("Account amount Added Successfully");
      window.location.reload();
    } catch (error) {
      setAlert("Internal Server Error", error.message);
    }
  };

  // Functionality to delete account
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/all-account/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete Account amount");
      }
      const updatedAcountData = accountData.filter(
        (account) => account._id !== id
      );
      setAccountData(updatedAcountData);
      setAlert("Account amount Deleted Successfully");
    } catch (error) {
      setAlert("Failed to Delete Account amount", error.message);
    }
  };

  return (
    <>
      <div className="m-8">
        <h1 className="flex justify-center text-6xl font-extrabold">ACCOUNT</h1>
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <Label value="Total Amount" />
            <TextInput
              id="totalAmount"
              type="text"
              placeholder="Enter the total amount present..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Amount to pay" />
            <TextInput
              id="amountToPay"
              type="text"
              placeholder="Enter the total amount pending to pay..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Amount to Recieve" />
            <TextInput
              id="amountToRecieve"
              type="text"
              placeholder="Enter the amount you have to recieve from someone..."
              required
              onChange={handleInput}
            />
          </div>
          <Button outline gradientDuoTone="purpleToBlue" type="submit">
            Add Balance
          </Button>
          {alert && <Alert>{alert}</Alert>}
        </form>
      </div>
      <h1 className="flex justify-center text-4xl font-bold mb-6">
        ALL ACCOUNT DATA
      </h1>

      <div className="overflow-x-auto">
        <div ref={pdfRef}>
          <Table hoverable className="">
            <Table.Head>
              <Table.HeadCell>Total Amount</Table.HeadCell>
              <Table.HeadCell>Amount To Pay</Table.HeadCell>
              <Table.HeadCell>Amount To Recieve</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
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
                    <Table.Cell>
                      <Button onClick={() => handleDelete(account._id)}>
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

export default Account;
