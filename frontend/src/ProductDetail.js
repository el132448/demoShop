import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import Title from "./Title"
import QuantityBtn from "./QuantityBtn"
import { CartContext } from "./CartContext";

export default function ProductDetail() {
  const { API_BASE } = useContext(CartContext);
  let params = useParams()
  let [productDetail, setProductDetail] = useState(null)

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`${API_BASE}/products/${params.id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProductDetail(data);
      } catch (error) {
        console.error("Fetch product detail failed:", error);
        setProductDetail(null);  // 可選：顯示「找不到商品」畫面
      }
    };
    fetchProductDetail();
  }, [params.id, API_BASE]);

  return (
    <div>
      {
        productDetail &&
        <div className="ProductDetail">
          <Title mainTitle={'Product Detail'}/>
          <table width="100%">
            <tbody>
              <tr>
                <td align="right">
                  <img src={productDetail.image} alt={productDetail.name} width="400"/>
                </td>
                <td width="45%" padding="10">
                  <p>Name : {productDetail.name}</p>
                  <p>Price : {productDetail.price}</p>
                  <p>Stock : {productDetail.stock}</p>
                  <p>Description :<br/>{productDetail.description}</p>
                  <QuantityBtn productInfo={productDetail}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }

      <Link to="/">
        <div className="backToGoodsListBtn">
          Back to Homepage
        </div>
      </Link>
    </div>
  )
}
