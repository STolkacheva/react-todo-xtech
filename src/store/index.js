import {configureStore} from "@reduxjs/toolkit"
import boardsSlice from "./boardsSlice"
import cardsSlice from "./cardsSlice"
import tasksSlice from "./tasksSlice"

const store = configureStore({
    reducer: {
        boards: boardsSlice,
        cards: cardsSlice,
        tasks: tasksSlice,
    }
});
  
  export default store;