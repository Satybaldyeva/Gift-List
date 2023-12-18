import { createSlice } from '@reduxjs/toolkit'
import { getCharitiesByUserId } from './chaririesThunk'

const initialState = {
   isLoading: false,
   error: null,
   charities: [],
}

export const charitySlice = createSlice({
   name: 'charity',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getCharitiesByUserId.pending, (state) => {
            return { ...state, isLoading: true, error: null }
         })
         .addCase(getCharitiesByUserId.fulfilled, (state, action) => {
            return {
               ...state,
               charities: action.payload,
               isLoading: false,
               error: null,
            }
         })
         .addCase(getCharitiesByUserId.rejected, (state, action) => {
            return { ...state, isLoading: false, error: action.payload }
         })
   },
})
