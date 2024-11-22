import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/ProductSlice";
import ProductItem from "./ProductItem";

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    if (products.length === 0) return <p>No products available.</p>;

    return (
        <div className="container mt-4">
            <h1>Product List</h1>
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4" key={product.id}>
                        <ProductItem product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
