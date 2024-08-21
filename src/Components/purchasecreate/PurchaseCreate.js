import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, ListItemIcon, ListItemButton } from "@mui/material";
import "../purchasecreate/purchasecreate.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PurchaseCreate = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    customerName: "",
    mobileNumber: "",
    location: "",
    description: "",
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleToggle = (value) => () => {
    const currentIndex = selectedProducts.indexOf(value);
    const newChecked = [...selectedProducts];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedProducts(newChecked);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (selectedProducts.length === 0) {
      toast.warn("Select the Product first", {
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: true,
      });
    }
    setFormData({ ...formData, [name]: value });
  };

  const nav = useNavigate();

  const goToPurchaseView = () => {
    nav("/purchase-view");
  };

  const afterProductAdded = () => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    nav("/after-add-product");
  };

  const productList = () => (
    <div role="presentation" style={{ width: 350, padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography style={{ textAlign: "start" }} variant="h6">
          Add Product
        </Typography>
        <CloseIcon onClick={toggleDrawer(false)} />
      </Box>
      <List>
        {[
          "School Bag",
          "Saddles",
          "Umbrella",
          "Tiffin Box",
          "Water Bottle",
        ].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleToggle(text)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedProducts.indexOf(text) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <div
        className="pop-up-btn"
        style={{ 
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "200px",
        }}
      >
        <Button variant="outlined" onClick={toggleDrawer(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={selectedProducts.length === 0}
          onClick={afterProductAdded}
        >
          Submit
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="create-table-header">
        <div className="table-title">
          <span className="icon" onClick={goToPurchaseView}>
            <ArrowBackIcon />
          </span>
          <span className="title-text">Create New Purchase</span>
        </div>
      </div>
      <div className="create-container">
        <div className="create-right">
          <form className="create-form">
            <div className="form-row">
              <label htmlFor="date">Date:</label>
              <input type="date" name="date" onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <label htmlFor="customer-name">Customer Name:</label>
              <input
                type="text"
                name="customerName"
                placeholder="Name"
                maxLength={1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="mobile-number">Mobile Number:</label>
              <input
                type="number"
                name="mobileNumber"
                placeholder="Number"
                disabled
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                disabled
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row description">
              <label htmlFor="description">Description:</label>
              <textarea
                type="text"
                name="description"
                placeholder="Enter here..."
                maxLength={0}
              />
            </div>
            <span className="char-counter">
              {formData.description.length}/100
            </span>
          </form>
        </div>
        <div className="create-left">
          <div className="add-product-img">
            <img
              src={require("../../Images/empty.png")}
              alt="empty-image"
              width={200}
              height={120}
              onClick={toggleDrawer(true)}
            />
            <button
              variant="contained"
              className="add-btn-product"
              onClick={toggleDrawer(true)}
            >
              <span className="add-icon">
                <AddOutlinedIcon />
              </span>
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="btn">
        <Button variant="outlined" onClick={goToPurchaseView}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" disabled>
          Save
        </Button>
      </div>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {productList()}
      </Drawer>
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

export default PurchaseCreate;
