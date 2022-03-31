import React from "react";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import Logout from "./Logout";

const App = () => {
  const { state } = useAuth();

  const showComponent = () => {
    if (state?.user) {
      return <Logout />;
    } else {
      return <Login />;
    }
  };

  return (
    <div className="App">
      {state?.user === undefined ? <div>Loading</div> : showComponent()}
    </div>
  );
};

export default App;
