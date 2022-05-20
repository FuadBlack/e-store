import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = { value: items };

export const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const duplicate = state.value.filter(
        (e) =>
          e.slug === newItem.slug &&
          e.color === newItem.color &&
          e.size === newItem.size
      );

      if (duplicate.length > 0) {
        state.value = state.value.filter(
          (e) =>
            e.slug !== newItem.slug ||
            e.color !== newItem.color ||
            e.size !== newItem.size
        );

        state.value = [
          ...state.value,
          {
            ...newItem,
            id: duplicate[0].id,
            amount: newItem.amount,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...newItem,
            amount: newItem.amount,
            id:
              state.value.length > 0
                ? state.value[state.value.length - 1].id + 1
                : 1,
          },
        ];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
    },
    removeItem: (state, action) => {
      const item = action.payload;

      state.value = state.value.filter(
        (e) =>
          e.slug !== item.slug || e.color !== item.color || e.size !== item.size
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
    },
    increaseItem: (state, action) => {
      const item = action.payload;
      const itemExist = state.value.filter(
        (e) =>
          e.slug === item.slug && e.color === item.color && e.size === item.size
      );
      if (itemExist.amount === 0) {
        state.value = [
          ...state.value.filter(
            (e) =>
              e.slug !== item.slug ||
              e.color !== item.color ||
              e.size !== item.size
          ),
        ];
      } else {
        state.value = [
          ...state.value.filter(
            (e) =>
              e.slug !== item.slug ||
              e.color !== item.color ||
              e.size !== item.size
          ),
          itemExist,
        ];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
    },
    removeAll: (state) => {
      state.value = [];
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
    },
  },
});

// const findItem = (arr, item) =>
//   arr.filter(
//     (e) =>
//       e.slug === item.slug && e.color === item.color && e.size === item.size
//   );

// const delItem = (arr, item) =>
//   arr.filter(
//     (e) =>
//       e.slug !== item.slug || e.color !== item.color || e.size !== item.size
//   );

// const sortItems = (arr) =>
//   arr.sort((a, b) => (a.d > b.id ? 1 : a.id < b.id ? -1 : 0));

export const { addItem, removeItem, removeAll, increaseItem } =
  cartItemSlice.actions;
export default cartItemSlice.reducer;
