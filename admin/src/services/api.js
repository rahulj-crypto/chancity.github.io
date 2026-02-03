import axios from 'axios';

/**
 * API Service for Admin Panel
 * Handles all HTTP requests to the backend
 */

// Get API URL from environment or use production URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://chancity-backend.onrender.com';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Could add auth token here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.error || error.message || 'An error occurred';
        console.error('API Error:', message);
        return Promise.reject(new Error(message));
    }
);

/**
 * Admin API Functions
 */
export const adminApi = {
    /**
     * Get all registrations with pagination and filters
     */
    getRegistrations: async (params = {}) => {
        const { page = 1, limit = 10, search = '', status = '' } = params;
        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        queryParams.append('limit', limit);
        if (search) queryParams.append('search', search);
        if (status) queryParams.append('status', status);

        return api.get(`/api/admin/registrations?${queryParams.toString()}`);
    },

    /**
     * Get single registration by ID
     */
    getRegistration: async (id) => {
        return api.get(`/api/admin/registrations/${id}`);
    },

    /**
     * Update registration status
     */
    updateRegistrationStatus: async (id, status) => {
        return api.patch(`/api/admin/registrations/${id}`, { status });
    },

    /**
     * Delete registration
     */
    deleteRegistration: async (id) => {
        return api.delete(`/api/admin/registrations/${id}`);
    },

    /**
     * Get dashboard statistics
     */
    getStats: async () => {
        return api.get('/api/admin/stats');
    },

    /**
     * Get application settings (registration status, etc.)
     */
    getSettings: async () => {
        return api.get('/api/admin/settings');
    },

    /**
     * Update application settings
     */
    updateSettings: async (data) => {
        return api.patch('/api/admin/settings', data);
    }
};

export default api;

