import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, fetchProducts } from "../redux/ProductSlice";

const ProductForm = () => {
    const [formData, setFormData] = useState({ title: "", price: "", category: "", image: "" });
    const dispatch = useDispatch();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(addProduct(formData));
    //     setFormData({ title: "", price: "", category: "", image: "" });
    // };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addProduct(formData));
        dispatch(fetchProducts()); // Re-fetch updated products
        setFormData({ title: "", price: "", category: "", image: "" });
    };

    
    return (
        <div className="container mt-4">
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="form-control mb-2"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="form-control mb-2"
                />
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
