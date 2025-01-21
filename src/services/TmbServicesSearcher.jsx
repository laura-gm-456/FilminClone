import { getProductsBySearch } from "./TmbServices";

// Cambiar el apiClient por getProductsBySearch
export const searchContent = async (query) => {
    try {
      const response = await ApiClient.get('/search/multi', {
        params: {
          query,
        },
      });
      return response.data.results; 
    } catch (error) {
      console.error('Error al buscar contenido:', error);
      throw error;
    }
  };
    