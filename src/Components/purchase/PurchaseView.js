import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../purchase/purchaseView.css";

function Row(props) {
  const { row, index, onDelete } = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    onDelete(index);
    handleMenuClose();
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <AddBoxOutlinedIcon sx={{ transform: "rotate(45deg)" }} />
            ) : (
              <AddBoxOutlinedIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell sx={{ width: "10%" }}>{index + 1}</TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell>{row.customerName}</TableCell>
        <TableCell>{row.mobileNumber}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell sx={{width: "20%"}}>{row.description}</TableCell>
        <TableCell>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon sx={{ cursor: "pointer" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDeleteClick}>
              <DeleteIcon /> Delete
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table
                size="small"
                aria-label="selected-products"
                sx={{ marginLeft: "65px", width: "95%" }}
                className="table-product-header"
              >
                <TableHead sx={{ backgroundColor: "#0000000F" }}>
                  <TableRow>
                    <TableCell
                      sx={{ width: "10%", borderLeft: "1px solid grey" }}
                    >
                      S.No
                    </TableCell>
                    <TableCell
                      sx={{ width: "80%", borderLeft: "1px solid grey" }}
                    >
                      Product Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.selectedProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ width: "10%" }}>{index + 1}</TableCell>
                      <TableCell sx={{ width: "80%" }}>{product}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    date: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    mobileNumber: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    selectedProducts: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// CollapsibleTable Component
export default function CollapsibleTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("purchaseData")) || [];
    setData(storedData);
    setFilteredData(storedData); 
  }, []);

  const toAddProduct = () => {
    navigate("/purchase-create");
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, ind) => ind !== index);
    setData(updatedData);
    setFilteredData(updatedData); 
    localStorage.setItem("purchaseData", JSON.stringify(updatedData));
  };

  const handleSearch = () => {
    const results = data.filter(
      (item) =>
        item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobileNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="table-header">
        <div className="table-title">
          <span>All Purchase</span>
        </div>
        <div className="table-search">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-icon-btn" onClick={handleSearch}>
              <SearchOutlinedIcon />
            </button>
          </div>
          <button className="add-btn" onClick={toAddProduct}>
            <span className="icon">
              <AddOutlinedIcon />
            </span>
            Add New
          </button>
        </div>
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="collapsible table">
          <TableHead sx={{ backgroundColor: "#0000000F" }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ width: "10%", borderLeft: "1px solid grey" }}>
                S.No
              </TableCell>
              <TableCell sx={{ borderLeft: "1px solid grey" }}>
                Invoice Date
              </TableCell>
              <TableCell sx={{ borderLeft: "1px solid grey" }}>
                Customer Name
              </TableCell>
              <TableCell sx={{ borderLeft: "1px solid grey" }}>
                Mobile Number
              </TableCell>
              <TableCell sx={{ borderLeft: "1px solid grey" }}>
                Location
              </TableCell>
              <TableCell sx={{width: "20%", borderLeft: "1px solid grey" }}>
                Description
              </TableCell>
              <TableCell sx={{ borderLeft: "1px solid grey" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <Row
                key={index}
                row={row}
                index={index}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
