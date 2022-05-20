import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { ProductViewModal } from "./Components/ProductViewModal";
import { ScrollTop } from "./Components/ScrollTop";
import { Cart } from "./Pages/Cart";
import { Catalog } from "./Pages/Catalog";
import { Home } from "./Pages/Home";
import { Product } from "./Pages/Product";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/catalog/:slug" element={<Product />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <ScrollTop />
      <Footer />
      <ProductViewModal />
    </div>
  );
}

export default App;
