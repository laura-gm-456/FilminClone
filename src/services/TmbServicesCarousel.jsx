import { getFilterCarrusel } from './TmbServices'; 
const filters = {
  familyFriendly: { 
    certification_country: 'US', 
    certification: 'G', 
    with_genres: '16,10751' 
  },
  animated: { 
    with_genres: '16' 
  },
  romantic: { 
    with_genres: '10749' 
  },
  
  darkComedy: { 
    with_keywords: 'satire,dark-comedy'
  },
};
  
  function getFamilyFriendly(params = {}) {
    return getFilterCarrusel({ ...filters.familyFriendly, ...params });
  }
  
  function getAnimated(params = {}) {
    return getFilterCarrusel({ ...filters.animated, ...params });
  }
  function getRomantic(params = {}) {
    return getFilterCarrusel({ ...filters.romantic, ...params });
  }
  
  function getDarkComedy(params = {}) {
    return getFilterCarrusel({ ...filters.darkComedy, ...params });
  }
  export {
    getFamilyFriendly,
    getAnimated,
    getRomantic,
    getDarkComedy,
  }