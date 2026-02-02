/**
 * API Client for Tournament Registration Backend
 * 
 * Handles communication with the Python FastAPI backend deployed on Render.
 */

// API Configuration
const API_CONFIG = {
    // Update this URL after deploying to Render
    baseURL: 'http://localhost:8000', // Development URL
    // Production URL (uncomment after deployment):
    // baseURL: 'https://your-app-name.onrender.com',

    endpoints: {
        registrations: '/api/v1/registrations',
        health: '/health'
    }
};

/**
 * API Client class for making HTTP requests
 */
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    /**
     * Make a fetch request with error handling
     * @param {string} endpoint - API endpoint
     * @param {object} options - Fetch options
     * @returns {Promise<any>} Response data
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    errorData = { detail: response.statusText || 'Unknown error' };
                }
                const error = new Error(errorData.detail || 'Request failed');
                error.detail = errorData.detail;
                error.status = response.status;
                throw error;
            }

            // Parse response for successful requests
            const data = await response.json();

            return data;
        } catch (error) {
            // Network error or parsing error
            if (error.name === 'TypeError') {
                throw new Error('Network error. Please check your connection.');
            }
            throw error;
        }
    }

    /**
     * Submit a new tournament registration
     * @param {object} formData - Registration form data
     * @returns {Promise<object>} Registration response with ID
     */
    async submitRegistration(formData) {
        return this.request(API_CONFIG.endpoints.registrations, {
            method: 'POST',
            body: JSON.stringify(formData)
        });
    }

    /**
     * Get registration by ID
     * @param {string} registrationId - Registration UUID
     * @returns {Promise<object>} Registration details
     */
    async getRegistration(registrationId) {
        return this.request(`${API_CONFIG.endpoints.registrations}/${registrationId}`, {
            method: 'GET'
        });
    }

    /**
     * Check API health status
     * @returns {Promise<object>} Health status
     */
    async healthCheck() {
        return this.request(API_CONFIG.endpoints.health, {
            method: 'GET'
        });
    }
}

// Create and export API client instance
const apiClient = new APIClient(API_CONFIG.baseURL);

// Make available globally
window.apiClient = apiClient;
