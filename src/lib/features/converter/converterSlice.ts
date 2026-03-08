import { ExchangeRates } from "@/types/currency";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConversionState {
  rates: ExchangeRates;
  base: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  lastUpdated: number | null;
}

const initialState: ConversionState = {
  rates: {},
  base: "USD",
  status: "idle",
  error: null,
  lastUpdated: null,
};

export const fetchRates = createAsyncThunk(
  "currency/fetchRates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://api.frankfurter.app/latest?from=USD",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch rates from Frankfurter");
      }

      const data = await response.json();

      return {
        ...data.rates,
        USD: 1,
      };
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An unknown error occurred");
    }
  },
);

const currencySlice = createSlice({
  name: "converter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRates.fulfilled,
        (state, action: PayloadAction<ExchangeRates>) => {
          state.status = "succeeded";
          state.rates = action.payload;
          state.lastUpdated = Date.now();
        },
      )
      .addCase(fetchRates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default currencySlice.reducer;
