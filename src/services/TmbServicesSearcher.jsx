import { getData } from './TmbServices';

async function getAllGenres() {
  try {
    const movieGenres = await getData('/genre/movie/list');
    const seriesGenres = await getData('/genre/tv/list');

    const combinedGenres = [...movieGenres.genres, ...seriesGenres.genres];
    const uniqueGenres = {};

    combinedGenres.forEach((genre) => {
      uniqueGenres[genre.name.toLowerCase()] = genre.id;
    });
    return uniqueGenres;
  } catch (error) {
    console.error('Error al obtener géneros:', error);
    throw error;
  }
}
async function searchByGenre(genreId, type) {
  try {
    const endpoint = type === 'movie' ? '/discover/movie' : '/discover/tv';
    const data = await getData(endpoint, { with_genres: genreId });
    return data.results;
  } catch (error) {
    console.error(`Error al buscar por género (${type}):`, error);
    throw error;
  }
}
async function searchContent(query) {
  try {
    const data = await getData('/search/multi', { query });
    return data.results;
  } catch (error) {
    console.error('No hay resultados para esta búsqueda', error);
    throw error;
  }
}

export { getAllGenres, searchByGenre, searchContent };