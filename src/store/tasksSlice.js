import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: JSON.parse(localStorage.getItem("tasks")) || [
      {
        id: 1,
        title: "task1",
        cardId: 1,
        items: [
          { title: "item1", check: false },
          { title: "item2", check: true },
        ],
      },
      {
        id: 2,
        title: "task2",
        cardId: 2,
        items: [
          { title: "item1", check: false },
          { title: "item2", check: true },
        ],
      },
      {
        id: 3,
        title: "task3",
        cardId: 3,
        items: [
          { title: "item1", check: false },
          { title: "item2", check: true },
        ],
      },
      {
        id: 4,
        title: "task4",
        cardId: 4,
        items: [
          { title: "item1", check: false },
          { title: "item2", check: true },
        ],
      },
    ],
  },
  reducers: {
    removeAllTask(state) {
      state.items = [];
      localStorage.setItem("tasks", JSON.stringify([]));
    },
    addTask(state, action) {
      const { title, cardId } = action.payload;
      const newTask = {
        id: uuid(),
        title: title,
        cardId: cardId,
        items: [],
      };
      state.items.push(newTask);
      localStorage.setItem("tasks", JSON.stringify([...state.items]));
    },
    removeTask(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
    renameTask(state, action) {
      const { id, title } = action.payload;
      const idx = state.items.findIndex((task) => task.id === id);
      state.items[idx] = { ...state.items[idx], title: title };
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
    addTaskItem(state, action) {
      const { id, title } = action.payload;
      const idx = state.items.findIndex((task) => task.id === id);
      state.items[idx].items.push({
        title: title,
        check: false,
      });
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
    changeTaskItem(state, action) {
      const { id, taskItems } = action.payload;
      const idx = state.items.findIndex((task) => task.id === id);
      state.items[idx] = {
        ...state.items[idx],
        items: taskItems,
      };
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
  },
});

const { actions, reducer } = tasksSlice;
export const { removeAllTask, renameTask, addTask, removeTask, addTaskItem, changeTaskItem } =
  actions;
export default reducer;
