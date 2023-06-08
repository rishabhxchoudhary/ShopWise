import { createSlice } from '@reduxjs/toolkit'

export interface LoadingState {
    value: boolean
}

const initialState: LoadingState = {
    value: true
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    start: state => {
        state.value = true
    },
    stop: state => {
        state.value = false
    }
  }
})

export const { start, stop } = loadingSlice.actions

export default loadingSlice.reducer