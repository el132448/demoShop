import React, { useContext } from 'react'
import Title from "./Title"
import {Link} from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import { CartContext } from './CartContext'

export default function Checkout() {

  let { cartItems, setCartItems } = useContext(CartContext)
  let cartEmpty = cartItems.length <= 0 ? true : false

  let grandTotal = cartItems.reduce((total, product)=>{
    return total += product.price*product.quantity
  },0)
  const freeShippingPrice = 100
  const { API_BASE } = useContext(CartContext);

  return (
    <>
      <Title mainTitle="Your Cart"/>
      {
        cartEmpty &&
        <div className="nothingInCart">
          Nothing in cart<br/><br/>
            <Link className="backToGoodsListBtn" to="/">Back to Homepage</Link>
        </div>
      }

      {
        !cartEmpty &&
        <div className="container">
          <div id="cartSection">
            <table className="checkoutTable">
              <tbody>
                {
                  /* product list */
                  cartItems.map(product=>(
                    <tr key={product.id}>
                      <td>
                        <Link to={'/product/'+product.id}>
                          <img src={product.image} alt={product.name}/>
                        </Link>
                      </td>
                      <td>
                        <p>Name : {product.name}</p>
                        <p>Price : ${product.price}</p>
                        <p>Stock : {product.stock}</p>
                        <p>Description:<br/>{product.description}</p>
                        
                      </td>
                      <td width="200">
                        <QuantityBtn productInfo={product} />
                      </td>
                      <td>
                        <div className="productSubTotal">
                            ${product.price*product.quantity}
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          <div className="checkoutSection">
            <div>Order total</div>
            <div className="grandTotal">${grandTotal}</div>
            {
              // price sum + free delivery
              grandTotal >= freeShippingPrice ?
              <div className="freeShipping">Free Shipping for ≥${freeShippingPrice}!</div> :
              <div className="noShipping">Free shpping for ≥${freeShippingPrice}
              <br/>
              ${freeShippingPrice-grandTotal} remains</div>
            }
            <button onClick={handleCheckout}>Place your order</button>
          </div>
        </div>
      }
    </>
  )

  function handleCheckout() {
    const csrfToken = document.cookie
      .split("; ")
      .find(row => row.startsWith("csrf_token="))
      ?.split("=")[1];

    const payload = {
      user_id: 1,   // fix user_id be 1 for testing version
      items: cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity
      }))
    };

    fetch(`${API_BASE}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      credentials: "include",  // 🔒 Important: include cookies
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unknown error");
      }

      console.log("Checkout success:", data);
      alert("Order placed successfully!");
      setCartItems([]);
    })
    .catch((err) => {
      console.error("Checkout error:", err);
      alert("Something went wrong.\n" + err.message);
    });
  }
}
