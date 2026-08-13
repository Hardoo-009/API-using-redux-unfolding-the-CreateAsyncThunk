import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './Slicer1';

const stores = configureStore({
  reducer: {
    slice1: sliceReducer,
  },
});

export default stores;
