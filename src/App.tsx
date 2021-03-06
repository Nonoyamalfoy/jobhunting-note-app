import React from "react";
import Router from "./Router";
import { Header } from "./components/Header";
import "./assets/styles/style.css";
import { Loading } from "./components/Uikit";

const App: React.FC = () => {
  return (
    <>
      <Loading>
        <Header />
        <main>
          <Router />
        </main>
      </Loading>
    </>
  );
};

export default App;
