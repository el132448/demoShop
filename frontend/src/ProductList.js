import React, { useContext, useState, useEffect} from "react" //React Hook
import {Link} from "react-router-dom"
import Title from "./Title"
import QuantityBtn from './QuantityBtn'
import { CartContext } from "./CartContext";

export default function ProductList() {
    const { API_BASE } = useContext(CartContext);
    let [productList, setProductList] = useState([])

    useEffect(() => {
    const fetchProductList = async () => {
        try {
        const response = await fetch(`${API_BASE}/products`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProductList(data);
        } catch (error) {
        console.error("Fetch product list failed:", error);
        setProductList([]);  // 顯示空列表
        }
    };
    fetchProductList();
    }, [API_BASE]);

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
