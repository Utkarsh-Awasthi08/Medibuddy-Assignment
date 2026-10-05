import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MedicineDetail from "./pages/MedicineDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicine/:id" element={<MedicineDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;