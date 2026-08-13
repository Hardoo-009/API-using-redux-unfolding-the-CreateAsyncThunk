import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// we will be making a funtion actually , because the dispatch of this not a plain action which will be having the type and payload field , beacuse with AsyncThunk when we dispatch it is a function not an action so without going directly to the store it goes to slicer file and calls the fucntion "FetchData" which we make and this FetchData createAsyncThunk makes the dispatch call in a order . there are three dispatch it makes , which are nothing but the states of a promise which are pending , fulfilled and rejected , after this this goes to the main store and since there is no use of slice in this , so the message is broadcasted to all the slices in the store

/*
the real type of dispatch fn the asyncThunk function will be making in the backend
action: {type:github/fetchData/pending , payload : undefined }
action: {type:github/fetchData/fulfilled , payload : the data returned by the try block the real data }
action: {type:github/fetchData/rejected , payload :the message returned from the catch block of the function }
these goes to the store and then broadcasted to each and every store and in the store in the extra reducers it has the instructions of what to do actually
*/
const FetchData = createAsyncThunk(
  'github/fetchData', // action
  async (args, ThunkAPI) => {
    try {
      const request = await fetch(
        `https://api.github.com/users?since=${args[1]}&per_page=${args[0]}`,
      );
      const data = await request.json();
      return data;
    } catch (error) {
      return RejectWithValue(error.message);
    }
  },
);
// fetch has a similar kind of state , having a loding , data and an error one as fixed
const slice1 = createSlice({
  name: 'slice1',
  initialState: { loading: false, data: [], error: null, count: 10 },
  reducers: {
    Setcount: (state, action) => {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchData.pending, (state) => {
        // FetchData.pending -> github/fetchData/pending
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(FetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default slice1.reducer;
export { FetchData };
export const { Setcount } = slice1.actions;
