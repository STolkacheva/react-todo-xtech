import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    items: JSON.parse(localStorage.getItem("boards")) || [
      { id: 1, title: "Group 1" },
      { id: 2, title: "Group 2" },
      { id: 3, title: "Group 3" },
    ],
  },
  reducers: {
    updateBoards(state, action) {
      state.items = action.payload;
      localStorage.setItem("boards", JSON.stringify([...state.items]));
    },
    removeAllBoards(state) {
      state.items = [];
      localStorage.setItem("boards", JSON.stringify([]));
    },
    addItems(state, action) {
      const newBoard = {
        id: uuid(),
        title: action.payload,
      };
      state.items.push(newBoard);
      localStorage.setItem("boards", JSON.stringify([...state.items]));
    },
    removeBoard(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("boards", JSON.stringify(state.items));
    },
    renameBoard(state, action) {
      const { id, title } = action.payload;
      const idx = state.items.findIndex((board) => board.id === id);
      state.items[idx] = { ...state.items[idx], title: title };
      localStorage.setItem("boards", JSON.stringify(state.items));
    },
  },
});

const { actions, reducer } = boardsSlice;
export const {
  updateBoards,
  removeAllBoards,
  addItems,
  dropBoard,
  removeBoard,
  renameBoard,
} = actions;
export default reducer;
