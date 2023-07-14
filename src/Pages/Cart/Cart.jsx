import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProductsCartList } from "../../Reducers/cartSlice";
import { removeProductFromCart } from "../../Reducers/cartSlice";
function Cart() {
  const dispatch = useDispatch();
  const productsInCart = useSelector(selectProductsCartList);

  const handleRemoveProduct = (productId) =>
    dispatch(removeProductFromCart(productId));

  return (
    <div className="col-md-10 m-auto">
      <h2 className="text-center mt-4">Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productsInCart.map((product) => {
            return (
              <tr key={product.id}>
                <th>{product.id}</th>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Cart;
