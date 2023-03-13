import About from "./About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import ProductPage from "./ProductPage";
import Search from "./Search";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product" element={<ProductPage />} />
    <Route path="/about" element={<About />} />
    <Route path="/search/:id" element={<Search />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
