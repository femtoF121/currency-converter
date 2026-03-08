import { HISTORY_SIZE } from "@/constants/history";
import { HistoryItem } from "@/types/history";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoryState {
  items: HistoryItem[];
}

const initialState: HistoryState = {
  items: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistoryItem: (
      state,
      action: PayloadAction<Omit<HistoryItem, "id" | "timestamp">>,
    ) => {
      const newItem: HistoryItem = {
        ...action.payload,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };

      state.items = [newItem, ...state.items].slice(0, HISTORY_SIZE);
    },
    clearHistory: (state) => {
      state.items = [];
    },
  },
});

export const { addHistoryItem, clearHistory } = historySlice.actions;
export default historySlice.reducer;
