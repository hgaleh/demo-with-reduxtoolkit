import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export type AlphabetType = {
    letter: string;
    letter_index: number;
    index: number;
} | null;


const initialState: AlphabetType[] = [];

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    selectOrDeselect: (state, action: PayloadAction<{ index: number, isActive: boolean }>) => {
        if (action.payload.isActive) {
            state.push({
                letter: '',
                letter_index: 0,
                index: action.payload.index
            })
        } else {
            const indexToBeRemoved = state.findIndex(alph => alph?.index === action.payload.index);
            state.splice(indexToBeRemoved, 1);
        }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlphabet.fulfilled, (state, action) => {
        const indexToBeModified = state.findIndex(alph => alph?.index === action.payload.index);
        state[indexToBeModified] = {...action.payload.alphabet, index: action.payload.index} as AlphabetType;
    });
  }
});

export const fetchAlphabet = createAsyncThunk<{index: number, alphabet: AlphabetType}, number>(
  'root/fetchAlphabet',
  async (index, { rejectWithValue }) => {
    const response = await fetch(`https://enlist-task-frontend.gigatechspace.net/letters/${index}`)
    const alphabet = await response.json()
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(alphabet)
    }
    return { index, alphabet }
  }
)

// Action creators are generated for each case reducer function
export const { selectOrDeselect } = rootSlice.actions;

export const {reducer: rootReducer} = rootSlice;