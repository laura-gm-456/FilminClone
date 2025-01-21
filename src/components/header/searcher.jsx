import React, { useState } from 'react';
import { searchContent } from '../../services/TmbServices';
// import './searcher.css';

/* INTENTO 1
 function Searcher() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }
    try {
      const searchResults = await searchContent(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder="Buscar por título, género, director o reparto..."
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      {isFocused && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            width: '100%',
            maxHeight: '300px',
            overflowY: 'auto',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
          }}
        >
          {results.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #444',
              }}
            >
              {item.poster_path || item.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path || item.profile_path}`}
                  alt={item.title || item.name}
                  style={{ borderRadius: '4px', marginRight: '10px' }}
                />
              ) : (
                <div
                  style={{
                    width: '46px',
                    height: '68px',
                    background: '#666',
                    borderRadius: '4px',
                    marginRight: '10px',
                  }}
                />
              )}
              <div>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                  {item.title || item.name}
                </h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#bbb' }}>
                  {item.media_type === 'movie' ? 'Película' : item.media_type === 'tv' ? 'Serie' : 'Persona'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 
*/

/* INTENTO 2 
function Searcher() {
    const [query, setQuery] = useState(''); // Almacena la consulta de búsqueda
    const [results, setResults] = useState([]); // Almacena los resultados de la búsqueda
    const [searched, setSearched] = useState(false); // Indica si ya se realizó una búsqueda
  
    const handleSearch = async () => {
      if (query.trim() === '') {
        setResults([]);
        setSearched(false);
        return;
      }
  
      try {
        const searchResults = await searchContent(query);
        setResults(searchResults);
        setSearched(true);
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
      }
    };
  
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título, género, director o reparto..."
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }} />
        <button onClick={handleSearch}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: 'white',
            cursor: 'pointer',
          }} >
          Buscar
        </button>

        {searched && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              width: '100%',
              maxHeight: '300px',
              overflowY: 'auto',
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              zIndex: '1000',
              padding: '10px',
            }} >

            {results.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#fff', fontSize: '14px' }}>
                No hay resultados para esta búsqueda. </p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '15px',
                }} >
                {results.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      textAlign: 'center',
                      background: '#333',
                      padding: '10px',
                      borderRadius: '4px',
                    }} >

                    {item.poster_path || item.profile_path ? (
                      <img src={`https://image.tmdb.org/t/p/w154${item.poster_path || item.profile_path}`}
                        alt={item.title || item.name}
                        style={{
                          width: '100%',
                          borderRadius: '4px',
                          marginBottom: '8px',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '150px',
                          background: '#666',
                          borderRadius: '4px',
                          marginBottom: '8px',
                        }}
                      />
                    )}

                    <h4
                      style={{
                        margin: '0',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                    >
                      {item.title || item.name}
                    </h4>
                    <p
                      style={{
                        margin: '0',
                        fontSize: '12px',
                        color: '#bbb',
                      }}
                    > {item.media_type === 'movie' ? 'Película'
                        : item.media_type === 'tv' ? 'Serie'
                        : 'Persona'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
*/

// INTENTO 3 (Sin estilos)
function Searcher() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }
    try {
      const searchResults = await searchContent(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder="Buscar por título, género, director o reparto..." />

      {isFocused && results.length > 0 && (
        <div>
          {results.map((item) => (
            <div key={item.id} >
              {item.poster_path || item.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path || item.profile_path}`}
                  alt={item.title || item.name} />
              ) : (
                <div/>
              )}
              <div>
                <h4>
                  {item.title || item.name}
                </h4>
                <p>
                  {item.media_type === 'movie' ? 'Película' : item.media_type === 'tv' ? 'Serie' : 'Persona'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 


export default Searcher;