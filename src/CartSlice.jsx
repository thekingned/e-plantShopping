import { createSlice } from '@reduxjs/toolkit';


export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const {name, image, cost} = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // If it exists, update the quantity
        existingItem.quantity ++;
      } else {
        // If it doesn't exist, add it to the cart
        state.items.push({ name, image, cost, quantity: 1});
      }
    
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      // Filter out the item with the specified id
      state.items = state.items.filter(item => item.name !== itemId);
      // If you want to reset the quantity to 0 instead of removing, you can do that here
      // const existingItem = state.items.find(item => item.id === itemId);
      // if (existingItem) {
      //   existingItem.quantity = 0;
      // }
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      // Find the item in the cart
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity = quantity;
      } else {
        // If the item doesn't exist, you might want to handle it differently
        console.warn(`Item with id ${name} not found in cart.`);
      }

    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
