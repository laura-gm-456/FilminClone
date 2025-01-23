import { getProductsByTrendy, getProductById } from './TmbServices'; 

export async function fetchMedia() {
  // Obtiene tendencias de películas y series
  const [movies, tvShows] = await Promise.all([
    getProductsByTrendy('movie'),
    getProductsByTrendy('tv'),
  ]);

  // Combina películas y series en un solo arreglo
  const combinedMedia = [...movies.results, ...tvShows.results];

  // Obtiene detalles adicionales de cada medio
  const detailedMedia = await Promise.all(
    combinedMedia.map(async (media) => {
      let additionalData = {};

      if (media.media_type === 'movie') {
        const details = await getProductById('movie', media.id, 'credits');
        additionalData.director = details.credits.crew.find(
          (person) => person.job === 'Director'
        )?.name;
      } else if (media.media_type === 'tv') {
        const details = await getProductById('tv', media.id);
        additionalData.seasons = details.number_of_seasons;
      }

      return {
        ...media,
        ...additionalData,
      };
    })
  );

  // Intercala películas y series en un solo arreglo
  return interleaveArrays(
    detailedMedia.filter((item) => item.media_type === 'movie'),
    detailedMedia.filter((item) => item.media_type === 'tv')
  );
}

// Función para intercalar dos arreglos
function interleaveArrays(array1, array2) {
  const maxLength = Math.max(array1.length, array2.length);
  const interleaved = [];

  for (let i = 0; i < maxLength; i++) {
    if (i < array1.length) interleaved.push(array1[i]);
    if (i < array2.length) interleaved.push(array2[i]);
  }

  return interleaved;
}
