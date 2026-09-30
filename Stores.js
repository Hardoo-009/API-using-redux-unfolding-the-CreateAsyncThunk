import { configureStore } from '@reduxjs/toolkit';
import githubReducer from './Slicer1';

const store = configureStore({
  reducer: {
    github: githubReducer,
  },
});

export default store;
