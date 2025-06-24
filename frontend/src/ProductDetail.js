import {useParams, Link} from "react-router-dom"
import Title from "./Title"
import QuantityBtn from "./QuantityBtn"
import { useEffect, useState } from "react"

export default function ProductDetail() {
  let params = useParams()
  let [productDetail, setProductDetail] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${params.id}`)
      .then(response => response.json())
      .then(data => {
        setProductDetail(data)
      })
  }, [params.id]) //<== Dependency Array

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
