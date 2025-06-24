import React, { useContext, useState, useEffect} from "react" //React Hook
import {Link} from "react-router-dom"
import Title from "./Title"
import QuantityBtn from './QuantityBtn'
import { CartContext } from "./CartContext";

export default function ProductList() {
    const { API_BASE } = useContext(CartContext);
    let [productList, setProductList] = useState([])

    //useEffect hook
    useEffect(()=>{
        //Situation 1: if without 2nd variable: will active the component for every render
        //Situation 2: if Dependency Array is empty array: only active once when the page 1st render
        //Situation 3: if Dependency Array is variable: active when 1st page render + destinated variable change
        fetch(`${API_BASE}/products`)
        .then(response => response.json())
        .then(data => setProductList(data))
    },[API_BASE])

    // //button showing or hiding product list(unwanted)
    // const [showProduct, setShowProduct] = useState(false)

    return (
        //React Fragment: empty tag
        <>
            <Title mainTitle="Online Fruit Store"/>

            <div className="container">
                {
                    productList.map(product=>
                    <React.Fragment  key={product.id}>
                        <div className="containerItem">
                            <Link to={'/product/'+product.id}>
                            <img width="200px" src={product.image} alt="product"/>
                            </Link>
                            <div className="productName">
                                {product.name}  ${product.price}
                            </div>                    
                            <QuantityBtn productInfo={product} />
                        </div>
                    </React.Fragment>
                    )
                }
            </div>
        </>
    )
}
