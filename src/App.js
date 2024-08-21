import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../src/Components/layout/Layout";
import Login from "./Components/login/Login";
import PurchaseView from "./Components/purchase/PurchaseView";
import PurchaseCreate from "./Components/purchasecreate/PurchaseCreate";
import AfterAddProduct from "./Components/atfter-add-product/AfterAddProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/purchase-view" element={ <Layout><PurchaseView /></Layout>} />
        <Route path="/purchase-create" element={ <Layout><PurchaseCreate /></Layout>} />
        <Route path="/after-add-product" element={ <Layout><AfterAddProduct /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
