

import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 


const ApiClient = axios.create({
  baseURL: BASE_URL, 
  params: {
    api_key: API_KEY,
    language: 'es-ES', 
  },
});


async function getData(endpoint, params = {}){
  try {
    const response = await ApiClient.get(endpoint, { params }); 
    return response.data; 
  } catch (error) {
    console.error('Error getData:', error);
    throw error; 
  }
};

function getProductById(productType, productId, params={}) {  
  return getData(`/${productType}/${productId}`, {append_to_response:params});
}

function getProductsByList(productType, productList) {
  return getData(`/${productType}/${productList}`);
}

function getProductsByTrendy(productType = 'all', time='week'){
  return getData(`/trending/${productType}/${time}`);}


function getImageUrl(path, size = "w500") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "url_de_imagen_predeterminada";
} 
function getFilterCarrusel(filterParams = {}, type = 'movie') {
  const defaultParams = {
    sort_by: 'popularity.desc', 
    page: 1,
  };
  const finalParams = { ...defaultParams, ...filterParams };
  return getData(`/discover/${type}`, finalParams);
}
export { getData, getProductById, getProductsByList, getProductsByTrendy, getImageUrl, getFilterCarrusel};