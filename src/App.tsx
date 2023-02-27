import About from "./About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import ProductPage from "./ProductPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product" element={<ProductPage />} />
    <Route path="/about" element={<About />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
