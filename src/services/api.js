import axios from 'axios';

const API_URL = 'https://real-state-backend-xb5z.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ========== PROPERTY APIS ==========
// Public routes - Frontend ke liye (No token needed)
export const getProperties = () => api.get('/properties');
export const getProperty = (id) => api.get(`/properties/${id}`);
export const searchProperties = (params) => api.get('/properties/search', { params });

// ========== AUTH APIS ==========
export const adminLogin = (data) => api.post('/admin/login', data);
export const getProfile = () => api.get('/admin/profile');
export const updatePassword = (data) => api.put('/admin/update-password', data);

// ========== INQUIRY APIS ==========
export const submitInquiry = (data) => api.post('/inquiries', data);
export const getInquiries = () => api.get('/inquiries');

// ========== SELLER APIS ==========
export const submitSeller = (data) => api.post('/sellers', data);
export const getSellers = () => api.get('/sellers');

// ========== ADMIN BUYERS ==========
export const getBuyers = () => api.get('/admin/buyers');
export const deleteBuyer = (id) => api.delete(`/admin/buyers/${id}`);

// ========== ADMIN SELLERS ==========
export const getAdminSellers = () => api.get('/admin/sellers');
export const approveSeller = (id) => api.put(`/admin/sellers/${id}/approve`);
export const rejectSeller = (id) => api.put(`/admin/sellers/${id}/reject`);
export const deleteSeller = (id) => api.delete(`/admin/sellers/${id}`);

// ========== ADMIN PROPERTIES ==========
export const getAdminProperties = () => api.get('/admin/admin-properties');
export const deleteAdminProperty = (id) => api.delete(`/admin/admin-properties/${id}`);

export default api;