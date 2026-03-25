import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/properties', { params })
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/properties/${id}`)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const submitInquiry = createAsyncThunk(
  'properties/submitInquiry',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/inquiries', data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const submitSellerProperty = createAsyncThunk(
  'properties/submitSeller',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/sellers', data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

const initialState = {
  properties: [],
  currentProperty: null,
  isLoading: false,
  error: null,
}

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.isLoading = false
        state.properties = action.payload
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchPropertyById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentProperty = action.payload
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = propertySlice.actions
export default propertySlice.reducer