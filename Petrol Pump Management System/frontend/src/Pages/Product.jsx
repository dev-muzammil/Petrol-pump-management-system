import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Label, Pagination, Table, TextInput } from "flowbite-react";
import { useReactToPrint } from "react-to-print";

const Product = () => {
  // States
  const [productData, setProductData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [addProduct, setAddProduct] = useState({
    name: "",
    category: "",
    stock: "",
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
  const productRecords = productData.slice(firstIndex, lastIndex);
  const onPageChange = (page) => setCurrentPage(page);
  const npages = Math.ceil(productData.length / recordsPerPage)

  // Functionality to fetch all products data from backend
  useEffect(() => {
    fetch("http://localhost:5000/all-product")
      .then((response) => response.json())
      .then((data) => setProductData((data.data).reverse()))
      .catch((err) => console.log(err));
  }, []);

  // Functionality to add product
  const handleInput = async (e) => {
    const { id, value } = e.target;
    setAddProduct({ ...addProduct, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAlert(null);
      const res = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addProduct),
      });
      const newProduct = await res.json();
      if (!res.ok) {
        return setAlert("Failed to Add Product");
      }
      setAlert("Product Added Successfully");
      window.location.reload()
    } catch (error) {
      setAlert("Internal Server Error", error.message);
    }
  };

  // Functionality to delete products
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/all-product/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete Product");
      }
      const updatedProductData = productData.filter((product) => product._id !== id);
      setProductData(updatedProductData);
      setAlert("Product Deleted Successfully");
    } catch (error) {
      setAlert("Failed to Delete Product", error.message);
    }
  };

  return (
    <>
      <div className="m-8">
        <h1 className="flex justify-center text-6xl font-extrabold">PRODUCTS</h1>
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <Label value="Product Name" />
            <TextInput
              id="name"
              type="text"
              placeholder="Enter the Product name..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Product Category" />
            <TextInput
              id="category"
              type="text"
              placeholder="Enter the category of product..."
              required
              onChange={handleInput}
            />
          </div>
          <div>
            <Label value="Stock" />
            <TextInput
              id="stock"
              type="text"
              placeholder="Enter how much stock is available..."
              required
              onChange={handleInput}
            />
          </div>
          <Button outline gradientDuoTone="purpleToBlue" type="submit">
            Add Product
          </Button>
          {alert && <Alert>{alert}</Alert>}
        </form>
      </div>
      <h1 className="flex justify-center text-4xl font-bold mb-6">ALL PRODUCTS</h1>

      <div className="overflow-x-auto">
        <div ref={pdfRef}>
        <Table hoverable className="">
          <Table.Head>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Product Category</Table.HeadCell>
            <Table.HeadCell>Product Stock</Table.HeadCell>
            <Table.HeadCell>Created At</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          {productData.length > 0 && (
            <Table.Body>
              {productRecords.map((product) => (
                <Table.Row
                  key={product._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 font-bold"
                >
                  <Table.Cell
                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                  >
                    {product.name}
                  </Table.Cell>
                  <Table.Cell>{product.category}</Table.Cell>
                  <Table.Cell>{product.stock}</Table.Cell>
                  <Table.Cell>{(product.createdAt).toString().split("T",).join("  ")}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => handleDelete(product._id)}>Delete</Button>
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
            totalPages = {npages} 
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
}

export default Product
