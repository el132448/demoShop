import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Checkout from './Checkout';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import { CartContext } from './CartContext';
import { useState, useEffect } from 'react';

function App() {
  const API_BASE = process.env.REACT_APP_API_BASE_URL || "/api";
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/init_csrf`, {
      credentials: "include",  // 這樣瀏覽器才會存和帶 cookie
    })
      .then(res => {
        if (!res.ok) {
          console.warn("CSRF token init failed");
        }
      })
      .catch(err => {
        console.error("CSRF token init error:", err);
      });
  }, [API_BASE]);
    /*
    API_BASE 是你從 Context 取得的值，理論上可能會變動。
    如果不加，eslint 覺得依賴不完整，可能會導致 state 不更新或有非預期行為。
    這是 React Hooks 規則，保證 useEffect 行為正確。
    */
   
  return (
    <BrowserRouter>
      <CartContext.Provider value={{cartItems, setCartItems, API_BASE}}>
        {/* <a href="/checkout">Shopping Cart(a tag)</a> */}
        <nav>
          <Link to="/">Homepage </Link>
          <Link to="/checkout">Shopping Cart</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<ProductList/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="/product" element={<ProductDetail/>}>
            <Route path=":id" element={<ProductDetail/>}/>
          </Route>

          <Route path="*" element={<p>404 Not Found</p>}/>
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
