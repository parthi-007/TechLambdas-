import React, { useEffect, useState } from "react";
import "../atfter-add-product/afteraddproduct.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AfterAddProduct = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    customerName: "",
    mobileNumber: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    setSelectedProducts(products);
  }, []);

  const nav = useNavigate();

  const goToCreatePurchase = () => {
    nav("/purchase-create");
  };

  const handleSubmit = () => {
    const { date, customerName, mobileNumber, location, description } =
      formData;

    if (!date || !customerName || !mobileNumber || !location || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    const existingData = JSON.parse(localStorage.getItem("purchaseData")) || [];
    const newEntry = { ...formData, selectedProducts };

    existingData.push(newEntry);
    localStorage.setItem("purchaseData", JSON.stringify(existingData));

    toast.success("Purchase saved successfully!");

    setTimeout(() => {
      nav("/purchase-view");
    }, 1500);

    setFormData({
      date: "",
      customerName: "",
      mobileNumber: "",
      location: "",
      description: "",
    });
    setSelectedProducts([]);
  };

  return (
    <>
      <div className="added-product-table-header">
        <div className="table-title">
          <span className="icon" onClick={goToCreatePurchase}>
            <ArrowBackIcon />
          </span>
          <span className="title-text">Create New Purchase</span>
        </div>
      </div>
      <div className="added-product-container">
        <div className="added-product-right">
          <form className="added-product-form">
            <div className="form-row">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="customer-name">Customer Name:</label>
              <input
                type="text"
                name="customerName"
                placeholder="Name"
                value={formData.customerName}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="mobile-number">Mobile Number:</label>
              <input
                type="text"
                name="mobileNumber"
                placeholder="Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                maxLength={10}
              />
            </div>
            <div className="form-row">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-row description">
              <label htmlFor="description">Description:</label>
              <textarea
                type="text"
                name="description"
                placeholder="Enter here..."
                value={formData.description}  
                onChange={handleChange}
                maxLength={100}
              />
            </div>
            <span className="char-counter">
              {formData.description.length}/100
            </span>
          </form>
        </div>
        <div className="added-product-left">
          <div className="product-list">
            <h2>Selected Products</h2>
            {selectedProducts.map((product, index) => (
              <input key={index} type="text" value={product} readOnly />
            ))}
          </div>
        </div>
      </div>

      <div className="btn">
        <Button variant="outlined" onClick={goToCreatePurchase}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Slide}
        transitionDuration={550}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        style={{ width: "400px" }}
      />
    </>
  );
};

export default AfterAddProduct;
