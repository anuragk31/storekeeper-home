import { BrowserRouter, Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import React from "react";
import CustomerPage from 'customerModule/CustomerPage';
import ProductPage from 'productModule/ProductsPage';
import InvoicePage from 'invoiceModule/InvoicePage';
import './app.css';

function Layout() {
  const location = useLocation();

  return (
    <>
      <header>
        <div className="logo"></div>
        <h1>Welcome to Invoice Manager</h1>
      </header>
      <main>
        <aside className="sidebar">
          <ul>
            <li>
              <Link
                to="/customers"
                className={location.pathname === '/customers' || location.pathname.length === 0  ? 'active-link' : ''}
              >
                Customers
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={location.pathname === '/products' ? 'active-link' : ''}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/invoices"
                className={location.pathname === '/invoices' ? 'active-link' : ''}
              >
                Invoices
              </Link>
            </li>
          </ul>
        </aside>
        <section className="content">
          <Outlet />
        </section>
      </main>
    </>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default () => {
  console.log('react router')
  return ( 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CustomerPage />} />
        <Route path="customers" element={<CustomerPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="invoices" element={<InvoicePage />}>
          <Route path="invoices/*" element={<NoMatch />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
};