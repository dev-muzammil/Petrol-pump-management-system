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

const Lend = () => {
  // States
  const [lendData, setLendData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [addLend, setAddLend] = useState({
    lendedProduct: "",
    lendedQuantity: "",
    lendedAmount: "",
    lendedFrom: "",
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
  const lendRecords = lendData.slice(firstIndex, lastIndex);
  const onPageChange = (page) => setCurrentPage(page);
  const npages = Math.ceil(lendData.length / recordsPerPage);

  // Functionality to fetch all Lended data from backend
  useEffect(() => {
    fetch("http://localhost:5000/all-lend")
      .then((response) => response.json())
      .then((data) => setLendData((data.data).reverse()))
      .catch((err) => console.log(err));
  }, []);

  // Functionality to add Lend
  const handleInput = async (e) => {
    const { id, value } = e.target;
    setAddLend({ ...addLend, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAlert(null);
      const res = await fetch("http://localhost:5000/add-lend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addLend),
      });
      const newLend = await res.json();
      if (!res.ok) {
        return setAlert("Failed to Add Lended Amount");
      }
      setAlert("Lended amount Added Successfully");
      window.location.reload();
    } catch (error) {
      setAlert("Internal Server Error", error.message);
    }
  };

  // Functionality to delete Lend
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/all-lend/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete Lended amount");
      }
      const updatedAcountData = lendData.filter((lend) => lend._id !== id);
      setLendData(updatedAcountData);
      setAlert("Lended amount Deleted Successfully");
    } catch (error) {
      setAlert("Failed to Delete Lended amount", error.message);
    }
  };

  return (
    <>
      <div className="m-8">
        <h1 className="flex justify-center text-6xl font-extrabold">
          LENDS / DEBTS
        </h1>
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <Label value="Lended Product" />
            <TextInput
              id="lendedProduct"
              type="text"
              placeholder="Enter the total product you lended..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Lended Quantity" />
            <TextInput
              id="lendedQuantity"
              type="text"
              placeholder="Enter the amount of the lended Product..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Lended Amount" />
            <TextInput
              id="lendedAmount"
              type="text"
              placeholder="Enter the amount of the lended Product in $..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Lended From" />
            <TextInput
              id="lendedFrom"
              type="text"
              placeholder="Enter the person from you lended the product..."
              required
              onChange={handleInput}
            />
          </div>
          <Button outline gradientDuoTone="purpleToBlue" type="submit">
            Add Lended Product
          </Button>
          {alert && <Alert>{alert}</Alert>}
        </form>
      </div>
      <h1 className="flex justify-center text-4xl font-bold mb-6">
        ALL LENDED GOODS
      </h1>

      <div className="overflow-x-auto">
        <div ref={pdfRef}>
          <Table hoverable className="">
            <Table.Head>
              <Table.HeadCell>Lended Product</Table.HeadCell>
              <Table.HeadCell>Lended Quantity</Table.HeadCell>
              <Table.HeadCell>Lended Amount</Table.HeadCell>
              <Table.HeadCell>Lended From</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            {lendData.length > 0 && (
              <Table.Body>
                {lendRecords.map((lend) => (
                  <Table.Row
                    key={lend._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 font-bold"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {lend.lendedProduct}
                    </Table.Cell>
                    <Table.Cell>{lend.lendedQuantity}</Table.Cell>
                    <Table.Cell>{lend.lendedAmount}</Table.Cell>
                    <Table.Cell>{lend.lendedFrom}</Table.Cell>
                    <Table.Cell>
                      {lend.createdAt.toString().split("T").join("  ")}
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => handleDelete(lend._id)}>
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

export default Lend;
