import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define types for your API responses
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: number;
  success: boolean;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  meta?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
  };
}

export interface ListParams {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  [key: string]: any; // for additional filters
}

// Create axios instance with defaults
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // increased timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can transform the response here if needed
    return response;
  },
  (error: AxiosError) => {
    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with a status code
      switch (error.response.status) {
        case 401:
          // Handle unauthorized (e.g., redirect to login)
          console.error('Unauthorized access - please login again');
          break;
        case 403:
          console.error("Forbidden - you don't have permission");
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error - please try again later');
          break;
        default:
          console.error('An error occurred');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server');
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request', error.message);
    }

    return Promise.reject(error);
  }
);

// CRUD Service Factory
export function createCrudService<T = any, C = any, U = any>(endpoint: string) {
  return {
    /**
     * Get a list of items with pagination
     * @param params Query parameters
     */
    list(params?: ListParams): Promise<PaginatedResponse<T[]>> {
      return api.get<PaginatedResponse<T[]>>(endpoint, { params });
    },

    /**
     * Get a single item by ID
     * @param id Item ID
     */
    get(id: string | number): Promise<ApiResponse<T>> {
      return api.get<ApiResponse<T>>(`${endpoint}/${id}`);
    },

    /**
     * Create a new item
     * @param data Item data to create
     */
    create(data: C): Promise<ApiResponse<T>> {
      return api.post<ApiResponse<T>>(endpoint, data);
    },

    /**
     * Update an existing item
     * @param id Item ID
     * @param data Item data to update
     */
    update(id: string | number, data: U): Promise<ApiResponse<T>> {
      return api.put<ApiResponse<T>>(`${endpoint}/${id}`, data);
    },

    /**
     * Partially update an existing item
     * @param id Item ID
     * @param data Partial item data to update
     */
    patch(id: string | number, data: Partial<U>): Promise<ApiResponse<T>> {
      return api.patch<ApiResponse<T>>(`${endpoint}/${id}`, data);
    },

    /**
     * Delete an item
     * @param id Item ID
     */
    delete(id: string | number): Promise<ApiResponse<void>> {
      return api.delete<ApiResponse<void>>(`${endpoint}/${id}`);
    },
  };
}

// Example usage:
// const userService = createCrudService<User>('/users');
// userService.list().then(response => {...});

// Additional utility functions
export const apiService = {
  /**
   * Make a custom GET request
   */
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return api.get<ApiResponse<T>>(url, config);
  },

  /**
   * Make a custom POST request
   */
  post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return api.post<ApiResponse<T>>(url, data, config);
  },

  /**
   * Make a custom PUT request
   */
  put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return api.put<ApiResponse<T>>(url, data, config);
  },

  /**
   * Make a custom PATCH request
   */
  patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return api.patch<ApiResponse<T>>(url, data, config);
  },

  /**
   * Make a custom DELETE request
   */
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return api.delete<ApiResponse<T>>(url, config);
  },

  /**
   * Make a custom request
   */
  request<T = any>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return api.request<ApiResponse<T>>(config);
  },
};

export default api;
