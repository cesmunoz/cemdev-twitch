import { useState } from "react";
import logo from "./logo.svg";
import '@themesberg/flowbite';
import "./App.css";
import { Footer, Header } from "./components/Layout";

function App() {

  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
