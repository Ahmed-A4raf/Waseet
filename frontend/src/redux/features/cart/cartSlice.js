import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find((p) => p.id === action.payload.id);
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        isExist.quantity += 1;
      }
      recalculate(state);
    },
    updateQuantity: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          if (action.payload.type === "increment") {
            product.quantity += 1;
          } else if (action.payload.type === "decrement" && product.quantity > 1) {
            product.quantity -= 1;
          }
        }
        return product;
      });
      recalculate(state);
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload.id);
      recalculate(state);
    },
    clearCart: (state) => {
      state.products = [];
      recalculate(state);
    },
    syncCartWithServer: (state, action) => {
      state.products = action.payload.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        imageURL: item.imageUrl,
        quantity: item.quantity,
      }));
      recalculate(state);
    },
  },
});

// إعادة حساب كل القيم
const recalculate = (state) => {
  state.selectedItems = state.products.reduce((total, p) => total + p.quantity, 0);
  state.totalPrice = state.products.reduce((total, p) => total + p.quantity * p.price, 0);
  state.tax = state.totalPrice * state.taxRate;
  state.grandTotal = state.totalPrice + state.tax;
};

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  syncCartWithServer,
} = cartSlice.actions;

export default cartSlice.reducer;
