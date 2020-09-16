import React from "react";
import Router from "./Router";
import { Header } from "./components/Header";
import "./assets/styles/vendors/style.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  );
}

export default App;
