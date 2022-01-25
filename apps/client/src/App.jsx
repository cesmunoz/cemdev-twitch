import { useState } from "react";
import logo from "./logo.svg";
import "@themesberg/flowbite";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Footer, Header } from "./components/Layout";
import "./App.css";
import { About, Contact, Histories, Home, Requests } from "./components/Pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div class="container mx-auto">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/histories" element={<Histories />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
