import React, { useEffect } from "react";
import "./App.css";
import logo from "./logo.svg";

function App() {
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/api");
      const body = await response.json();
      console.log(body);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
