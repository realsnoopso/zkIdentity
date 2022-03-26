import { createSlice } from '@reduxjs/toolkit'

export const addVoca = createSlice({
  name: 'voca',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
})

export const { increment } = addVoca.actions
export default addVoca.reducer