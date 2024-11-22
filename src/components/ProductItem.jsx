import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../redux/ProductSlice";
import { useState } from "react";

const ProductItem = ({ ...product }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(product.id));
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (updatedProduct.title && updatedProduct.price) {
            dispatch(updateProduct(updatedProduct));
            setIsEditing(false);
        } else {
            alert("Please fill in all fields before saving.");
        }
    };

    return (
        <div className="card">
            <img src={product.image} alt={product.title} className="card-img-top" />
            <div className="card-body">
                {isEditing ? (
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            value={updatedProduct.title}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, title: e.target.value })}
                            className="form-control mb-2"
                        />
                        <input
                            type="number"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: +e.target.value })}
                            className="form-control mb-2"
                        />
                        <button type="submit" className="btn btn-success btn-sm">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary btn-sm ms-2">Cancel</button>
                    </form>
                ) : (
                    <>
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">Price: ${product.price}</p>
                        <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-sm">Edit</button>
                        <button onClick={handleDelete} className="btn btn-danger btn-sm ms-2">Delete</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductItem;
