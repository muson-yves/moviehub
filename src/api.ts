// API configuration
const API_BASE_URL = (import.meta.env as any).VITE_API_URL || 'http://localhost:5000/api';

// Movie API endpoints
export const movieAPI = {
  getAll: async (limit: number = 50, offset: number = 0) => {
    const response = await fetch(`${API_BASE_URL}/movies?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return response.json();
  },

  getByCategory: async (category: string, limit: number = 20, offset: number = 0) => {
    const response = await fetch(`${API_BASE_URL}/movies?category=${category}&limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`);
    if (!response.ok) throw new Error('Failed to fetch movie');
    return response.json();
  },

  search: async (query: string, limit: number = 20) => {
    const response = await fetch(`${API_BASE_URL}/movies/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to search movies');
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/movies/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  create: async (movieData: any) => {
    const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData)
    });
    if (!response.ok) throw new Error('Failed to create movie');
    return response.json();
  },

  update: async (id: string, movieData: any) => {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData)
    });
    if (!response.ok) throw new Error('Failed to update movie');
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete movie');
    return response.json();
  }
};

// Season API endpoints
export const seasonAPI = {
  getAll: async (limit: number = 50, offset: number = 0) => {
    const response = await fetch(`${API_BASE_URL}/seasons?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Failed to fetch seasons');
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/seasons/${id}`);
    if (!response.ok) throw new Error('Failed to fetch season');
    return response.json();
  },

  search: async (query: string, limit: number = 20) => {
    const response = await fetch(`${API_BASE_URL}/seasons/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to search seasons');
    return response.json();
  },

  create: async (seasonData: any) => {
    const response = await fetch(`${API_BASE_URL}/seasons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(seasonData)
    });
    if (!response.ok) throw new Error('Failed to create season');
    return response.json();
  },

  update: async (id: string, seasonData: any) => {
    const response = await fetch(`${API_BASE_URL}/seasons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(seasonData)
    });
    if (!response.ok) throw new Error('Failed to update season');
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/seasons/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete season');
    return response.json();
  }
};

// Contact API endpoints
export const contactAPI = {
  submit: async (name: string, email: string, message: string) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    if (!response.ok) throw new Error('Failed to submit contact form');
    return response.json();
  },

  getAll: async (limit: number = 50, offset: number = 0) => {
    const response = await fetch(`${API_BASE_URL}/contact?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/contact/${id}`);
    if (!response.ok) throw new Error('Failed to fetch message');
    return response.json();
  },

  updateStatus: async (id: string, status: 'unread' | 'read' | 'replied') => {
    const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update message status');
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete message');
    return response.json();
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/contact/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  }
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
    if (!response.ok) throw new Error('API is not available');
    return response.json();
  }
};

export default {
  movieAPI,
  seasonAPI,
  contactAPI,
  healthAPI,
  API_BASE_URL
};
