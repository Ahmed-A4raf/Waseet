import React from "react";
import OrderSummary from "./OrderSummary";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/features/cart/cartSlice";

const Cart = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handelQuantity = (type, id) => {
    const payload = { type, id };
    dispatch(updateQuantity(payload));
  };

  const handleRemoveFromCart = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart({ id }));
  }

  return (
    <div
      className={`fixed inset-0 z-[1000] bg-black bg-opacity-80
      ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-3xl font-semibold">Your Cart</h4>
            <button
              onClick={() => onClose()}
              className="text-gray-600 hover:text-gray-900"
            >
              <i className="ri-xrp-line bg-primary p-1 text-white rounded-md"></i>
            </button>
          </div>

          {/* Cart details */}
          <div className="mt-8">
            {products.length === 0 ? (
              <div className="bg-primary-light p-5 font-semibold text-xl mt-8 rounded-md shadow-sm text-center">
                Your Cart is <span className="text-primary">Empty</span> <br />
                 <i className="ri-emotion-sad-line text-primary text-4xl"></i>
              </div>
            ) : (
              products.map((item, index) => (
                <div
                  className="flex flex-col md:flex-row md:items-center md:justify-between shadow-sm bg-primary-light rounded-md md:p-5 p-2 mb-2"
                  key={index}
                >
                  <div className="flex items-center">
                    <span className="mr-4 px-1 bg-primary text-white rounded-md">
                      {index + 1}
                    </span>
                    <img
                      src={item.imageURL}
                      alt="=Item Image"
                      className="size-12 object-cover rounded-md mr-4"
                    />
                    <div className="">
                      <h5 className="text-lg font-medium">{item.name}</h5>
                      <p className="text-gray-600 text-sm">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    </div>
                    <div className="flex flex-row md:justify-start justify-end items-center">
                      <button
                        onClick={() => handelQuantity("decrement", item.id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-8"
                      >
                        -
                      </button>
                      <span className="px-2 text-center mx-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handelQuantity("increment", item.id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                      >
                        +
                      </button>

                      <div className="ml-2">
                      <button onClick={(e) => handleRemoveFromCart(e, item.id)} className="size-6 flex items-center justify-center px-1.5 text-lg rounded-full bg-gray-200 text-primary hover:bg-primary hover:text-white ml-8">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                    </div>
                   
                  
                </div>
              ))
            )}
          </div>

          {/* clalculation */}
          {products.length > 0 && <OrderSummary products={products} />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
