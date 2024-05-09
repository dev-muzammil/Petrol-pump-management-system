import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Label,
  Table,
  TextInput,
  Pagination,
} from "flowbite-react";
import { useReactToPrint } from "react-to-print";

const Tank = () => {
  // States
  const [tankData, setTankData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [addTank, setAddTank] = useState({
    tankName: "",
    tankQuantity: "",
    tankDescription: "",
    productName: "",
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
  const tankRecords = tankData.slice(firstIndex, lastIndex);
  const onPageChange = (page) => setCurrentPage(page);
  const npages = Math.ceil(tankData.length / recordsPerPage);

  // Functionality to fetch all tank data from backend
  useEffect(() => {
    fetch("http://localhost:5000/all-tank")
      .then((response) => response.json())
      .then((data) => setTankData((data.data).reverse()))
      .catch((err) => console.log(err));
  }, []);

  // Functionality to add tank
  const handleInput = async (e) => {
    const { id, value } = e.target;
    setAddTank({ ...addTank, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAlert(null);
      const res = await fetch("http://localhost:5000/add-tank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addTank),
      });
      const newTank = await res.json();
      if (!res.ok) {
        return setAlert("Failed to Add Tank");
      }
      setAlert("Tank Added Successfully");
      window.location.reload();
    } catch (error) {
      setAlert("Internal Server Error", error.message);
    }
  };

  // Functionality to delete tank
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/all-tank/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete tank");
      }
      const updatedTankData = tankData.filter((tank) => tank._id !== id);
      setTankData(updatedTankData);
      setAlert("Tank Deleted Successfully");
    } catch (error) {
      setAlert("Failed to Delete Tank", error.message);
    }
  };

  return (
    <>
      <div className="m-8">
        <h1 className="flex justify-center text-6xl font-extrabold">TANKS</h1>
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <Label value="Tank Name" />
            <TextInput
              id="tankName"
              type="text"
              placeholder="Enter the tank name..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Tank Quantity" />
            <TextInput
              id="tankQuantity"
              type="text"
              placeholder="Enter the quantity..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Tank Description" />
            <TextInput
              id="tankDescription"
              type="text"
              placeholder="Enter the description of tank..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Product Name" />
            <TextInput
              id="productName"
              type="text"
              placeholder="Enter the name of product in Tank..."
              required
              onChange={handleInput}
            />
          </div>
          <Button outline gradientDuoTone="purpleToBlue" type="submit">
            Add Tank
          </Button>
          {alert && <Alert>{alert}</Alert>}
        </form>
      </div>
      <h1 className="flex justify-center text-4xl font-bold mb-6">ALL TANKS</h1>

      <div className="overflow-x-auto">
        <div ref={pdfRef}>
          <Table hoverable className="">
            <Table.Head>
              <Table.HeadCell>Tank Name</Table.HeadCell>
              <Table.HeadCell>Tank Quantity</Table.HeadCell>
              <Table.HeadCell>Tank Description</Table.HeadCell>
              <Table.HeadCell>Product Name</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
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
                    <Table.Cell>
                      <Button onClick={() => handleDelete(tank._id)}>
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

export default Tank;
