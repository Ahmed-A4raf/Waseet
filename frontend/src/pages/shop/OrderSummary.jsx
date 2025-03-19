import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();

  const products = useSelector((store) => store.cart.products);
  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector(
    (store) => store.cart
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="bg-primary-light mt-8 rounded-md text-base dark:bg-zinc-800">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-2xl font-semibold text-text-dark text-center bg-white p-1 rounded-md dark:bg-zinc-900 dark:text-zinc-50">
          Order Summary
        </h2>

          <p className="text-text-dark mt-2 dark:text-zinc-50">
            <span className="text-lg font-medium">Selected Items:</span>
            {selectedItems}
          </p>
          <p>
            <span className="text-lg font-medium">TaotalPrice: </span>$
            {totalPrice.toFixed(2)}
          </p>

          <div className="flex justify-between items-center">
            <p className="text-primary">
              <span className="text-lg font-medium">Tax</span>
              <span className="text-sm p-1 h-4 w-4 text-primary rounded-full">
                ({taxRate * 100}%)
              </span>
              : ${tax.toFixed(2)}
            </p>
            <h3 className="bg-white p-1.5 rounded-md w-fit text-lg font-bold text-center dark:bg-zinc-900">
              GrandTotal: ${grandTotal.toFixed(2)}
            </h3>
          </div>

        <div className="flex justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className="bg-primary text-white py-1.5 px-3 mt-2 rounded-md mb-4 hover:bg-primary-dark"
          >
            Clear Cart
          </button>
          <button className="bg-black text-white py-1.5 px-3 mt-2 rounded-md mb-4 hover:bg-black/90">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
