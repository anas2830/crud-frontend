import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap-jquery/dist/css/bootstrap.min.css';  

import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import GuestRoute from './Components/GuestRoute';
import AuthRoute from './Components/AuthRoute';
import Layout from './Components/Layout';
import ProductList from './Components/Product/ListData';
import EditProduct from './Components/Product/EditProduct';
import AddProduct from './Components/Product/AddProduct';



function App() {
  return (
    <Router>
      <Layout>
        <div className="bg-color">
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <AuthRoute path="/profile" component={Profile} />
          <AuthRoute path="/product" component={ProductList} />
          <AuthRoute path="/edit/:id" component={EditProduct} />
          <AuthRoute path="/addProduct" component={AddProduct} />
        </div>
      </Layout>
    </Router>
  );
}

export default App;
