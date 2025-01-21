// Obtiene las listas de las peliculas y series populares de la Api

import { getProductsByTrendy, getProductById } from './TmbServices'; 


// Obtener detalles adicionales según el tipo de media
/**Ene ste fecht estoy recibiendo un objeto que representa una pelicula o una serie  y en dependecia del tipo realiza tareas diferentes, devolviendo un objeto
 *  mas enriquecido con eld irector o el numero de temporadas*/
export const fetchMediaDetails = async (media) => {
  if (media.media_type === 'movie') {
    const details = await getProductById('movie', media.id, 'credits');
    return {
      ...media,
      director: details.credits.crew.find((person) => person.job === 'Director')?.name,
    };
  } else if (media.media_type === 'tv') {
    const details = await getProductById('tv', media.id);
    return {
      ...media,
      seasons: details.number_of_seasons,
    };
  }
  return media;
};



//Funcion para mezclar  dos listas intercalandolas
/**Aqui estoy mezclando dos arreglos y los mezclo alternandolos y si uno es mas largo que el otro añado
 * lso restantes del mas largo al final */
const interleaveArrays = (array1, array2) => {
  
  const maxLength = Math.max(array1.length, array2.length);
  const interleaved = [];

  for (let i = 0; i < maxLength; i++) {
    if (i < array1.length) interleaved.push(array1[i]);
    if (i < array2.length) interleaved.push(array2[i]);
  }
  return interleaved;
};

// Combina películas y programas de TV en un solo array con detalles

export const fetchMedia = async () => {
  const movies = await getProductsByTrendy('movie');
  const tvShows = await getProductsByTrendy('tv');

//Proceso las  peliculas  y las series  para añadir detalles
  const movieDetails = await Promise.all(movies.results.map(fetchMediaDetails));
  const tvShowDetails = await Promise.all(tvShows.results.map(fetchMediaDetails));

  //Mezclar los detalles de las peliculas y las series

  return interleaveArrays(movieDetails, tvShowDetails);

  //return Promise.all(combinedMedia.map(fetchMediaDetails));
  //const combinedMedia = [...movies.results, ...tvShows.results];
};






/*


export const fetchMedia = async () => {

  const movies = await getProductsByTrendy('movie');
  const tvShows = await getProductsByTrendy('tv');

  
  const enrichMedia = async (media) => {
    if (media.media_type === 'movie') {
      const details = await getProductById('movie', media.id, 'credits');
      return {
        ...media,
        director: details.credits.crew.find((person) => person.job === 'Director')?.name,
      };
    } else if (media.media_type === 'tv') {
      const details = await getProductById('tv', media.id);
      const trendySeason = media.season_number || 'Temporada desconocida';
      return {
        ...media,
        trendySeason,
      };
    }
    return media;
  };


  const enricheddMovies = await Promise.all(movies.results.map(enrichMedia));
  const enrichedTvShows = await Promise.all(tvShows.results.map(enrichMedia));

 
  const interleaveArrays = (array1, array2) => {
    const maxLength = Math.max(array1.length, array2.length);
    const interleaved = [];
    for (let i = 0; i < maxLength; i++) {
      if (i < array1.length) interleaved.push(array1[i]);
      if (i < array2.length) interleaved.push(array2[i]);
    }
    return interleaved;
  };

  return interleaveArrays(enrichedMovies, enrichedTvShows);
};
*/