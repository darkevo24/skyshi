import { configureStore } from '@reduxjs/toolkit'
import listSlice from './listSlice'

export const store = configureStore({
  reducer: {
    list : listSlice
  },
})