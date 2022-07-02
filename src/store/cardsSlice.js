import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    items: JSON.parse(localStorage.getItem("cards")) || [
      { id: 1, title: "Card 1", description: "Jgbcfybt 1", boardId: 3 },
      { id: 2, title: "Card 2", description: "sdfsdf",  boardId: 3 },
      { id: 3, title: "Card 3", description: "sfsdfsf", boardId: 1 },
      { id: 4, title: "Card 4", description: "dsf", boardId: 2 },
    ],
  },
  reducers: {
    updateCards(state, action) {
      state.items = action.payload;
      localStorage.setItem("cards", JSON.stringify([...state.items]));
    },
    removeAllCards(state) {
      state.items = [];
      localStorage.setItem("cards", JSON.stringify([]));
    },
    addCard(state, action) {
      const { title, boardId } = action.payload;
      const newCard = {
        id: uuid(),
        title: title,
        description: "",
        boardId: boardId,
        tasks: [],
      };
      state.items.push(newCard);
      localStorage.setItem("cards", JSON.stringify([...state.items]));
    },
    removeCard(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cards", JSON.stringify(state.items));
    },
    removeCardsByBoard(state, action) {
      state.items = state.items.filter((i) => i.boardId !== action.payload);
      localStorage.setItem("cards", JSON.stringify(state.items));
    },
    renameCard(state, action) {
      const { id, title } = action.payload;
      const idx = state.items.findIndex((card) => card.id === id);
      state.items[idx] = { ...state.items[idx], title: title };
      localStorage.setItem("cards", JSON.stringify(state.items));
    },
    renameCardDesc(state, action) {
      const { id, desc } = action.payload;
      const idx = state.items.findIndex((card) => card.id === id);
      state.items[idx] = { ...state.items[idx], description: desc };
      localStorage.setItem("cards", JSON.stringify(state.items));
    },
  },
});

const { actions, reducer } = cardsSlice;
export const {
  updateCards,
  removeAllCards,
  renameCard,
  renameCardDesc,
  removeCardsByBoard,
  addCard,
  removeCard,
} = actions;
export default reducer;
