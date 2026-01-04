import axios from 'axios';

/**
 * Axios instance configured for the Recipes API
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

/**
 * Request interceptor for logging (development only)
 */
api.interceptors.request.use(
    (config) => {
        if (import.meta.env.DEV) {
            console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor for error handling
 */
api.interceptors.response.use(
    (response) => {
        if (import.meta.env.DEV) {
            console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        }
        return response;
    },
    (error) => {
        if (import.meta.env.DEV) {
            console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.response?.data || error.message);
        }
        return Promise.reject(error);
    }
);

/**
 * Recipe API Service
 */
const recipeService = {
    /**
     * Get all recipes
     * @returns {Promise} Array of recipes
     */
    getAllRecipes: async () => {
        try {
            const response = await api.get('/recipes');
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    /**
     * Get single recipe by ID
     * @param {string} id - Recipe ID
     * @returns {Promise} Recipe object
     */
    getRecipeById: async (id) => {
        try {
            const response = await api.get(`/recipes/${id}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    /**
     * Create a new recipe
     * @param {Object} recipeData - Recipe data
     * @returns {Promise} Created recipe
     */
    createRecipe: async (recipeData) => {
        try {
            const response = await api.post('/recipes', recipeData);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    /**
     * Update an existing recipe
     * @param {string} id - Recipe ID
     * @param {Object} recipeData - Updated recipe data
     * @returns {Promise} Updated recipe
     */
    updateRecipe: async (id, recipeData) => {
        try {
            const response = await api.put(`/recipes/${id}`, recipeData);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    /**
     * Delete a recipe
     * @param {string} id - Recipe ID
     * @returns {Promise} Deleted recipe
     */
    deleteRecipe: async (id) => {
        try {
            const response = await api.delete(`/recipes/${id}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },
};

/**
 * Error handler utility
 * @param {Error} error - Axios error object
 * @returns {Error} Formatted error
 */
const handleError = (error) => {
    if (error.response) {
        // Server responded with error
        const message = error.response.data?.message || 'An error occurred';
        const errors = error.response.data?.errors || [];
        return new Error(errors.length > 0 ? errors.join(', ') : message);
    } else if (error.request) {
        // Request made but no response
        return new Error('Unable to connect to server. Please check your connection.');
    } else {
        // Something else happened
        return new Error(error.message || 'An unexpected error occurred');
    }
};

export default recipeService;
