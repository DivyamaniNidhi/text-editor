import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TextEditor from "./TextEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
