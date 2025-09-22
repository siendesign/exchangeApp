// File: store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './redux';

// Configure store
export const store = configureStore({
  reducer: {
    currency: currencyReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store as default
export default store;