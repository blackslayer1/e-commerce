import About from "./About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import ProductPage from "./ProductPage";
import Search from "./Search";
import { useState } from "react";
import ProductIT from "./Interface";

function App() {
  const [cart, setCart] = useState<ProductIT[]>([]);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home cart={cart} setCart={setCart} setNumberOfItems={setNumberOfItems} numberOfItems={numberOfItems} total={total} setTotal={setTotal} />} />
    <Route path="/product" element={<ProductPage />} />
    <Route path="/about" element={<About />} />
    <Route path="/search/:id" element={<Search cart={cart} setCart={setCart} numberOfItems={numberOfItems} setNumberOfItems={setNumberOfItems} total={total} setTotal={setTotal} />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
