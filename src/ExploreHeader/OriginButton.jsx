// OriginButton.js
import React, { useState, useContext, useEffect, useRef } from 'react';
import { FiltersContext } from '../FiltersContext';
import { LocationContext } from '../LocationContext';
import MapboxClient from '@mapbox/mapbox-sdk/services/geocoding';

const mapboxClient = MapboxClient({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
});

const OriginButton = () => {
  const { setOrigin } = useContext(FiltersContext);
  const { userLocation } = useContext(LocationContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
        try {
          const response = await mapboxClient.forwardGeocode({
            query: searchTerm,
            limit: 5,
            countries: ['us'],
            types: ['address', 'locality', 'poi', 'place', 'postcode', 'neighborhood'],
            proximity: userLocation ? [userLocation.long, userLocation.lat] : undefined,
          }).send();
  
          const formattedResults = response.body.features.map((feature) => {
             
            let formattedName = '';
            let address = '';
            let city = '';
            let state = '';
  
            if (feature.place_type[0] === 'address') {
              address = feature.place_name.split(',')[0].trim();
              city = feature.context.find((ctx) => ctx.id.includes('place'))?.text || '';
              state = feature.context.find((ctx) => ctx.id.includes('region'))?.short_code.slice(-2) || '';
            } else if (feature.place_type[0] === 'locality') {
              address = feature.text;
              state = feature.context.find((ctx) => ctx.id.includes('region'))?.short_code.slice(-2) || '';
            } else if (feature.place_type[0] === 'poi') {
              address = feature.text;
              city = feature.context.find((ctx) => ctx.id.includes('place'))?.text || '';
              state = feature.context.find((ctx) => ctx.id.includes('region'))?.short_code.slice(-2) || '';
            } else if (feature.place_type[0] === 'place') {
              address = feature.text;
              city = feature.context.find((ctx) => ctx.id.includes('place'))?.text || '';
              state = feature.context.find((ctx) => ctx.id.includes('region'))?.short_code.slice(-2) || '';
            } else if (feature.place_type[0] === 'postcode') {
              address = feature.text;
              city = feature.context.find((ctx) => ctx.id.includes('place'))?.text || '';
              state = feature.context.find((ctx) => ctx.id.includes('region'))?.short_code.slice(-2) || '';
            } else if (feature.place_type[0] === 'neighborhood') {
              address = feature.text;
              city = feature.context.find((ctx) => ctx.id.includes('place'))?.text || '';
              state = feature.context.find((ctx) => ctx.id.includes('region'))?.short_code.slice(-2) || '';
            }
  
            formattedName = `${address}${city ? `, ${city}` : ''}${state ? `, ${state}` : ''}`;
            console.log('feature = ',feature, 'formattedname :', formattedName)
  
            return {
              ...feature,
              place_name: formattedName,
            };
          });
  
          setSearchResults(formattedResults);
        } catch (error) {
          console.error('Error searching for location:', error);
        }
      } else {
        setSearchResults([]);
      }
    };
  
    fetchResults();
  }, [searchTerm]);

  const handleSelect = (result) => {
    setOrigin(result);
    setSearchTerm(result.place_name);
    setShowResults(false);
  };

  const handleInputFocus = () => {
    setShowResults(true);
  };

  const handleInputBlur = () => {
    if (!inputRef.current.contains(document.activeElement)) {
      setShowResults(false);
    }
  };

  return (
    <div ref={inputRef} onBlur={handleInputBlur}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleInputFocus}
        placeholder="Enter city/state"
      />

      {showResults && (
        <ul>
          {searchResults.map((result) => (
            <li
              key={result.id}
              onClick={() => handleSelect(result)}
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {result.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OriginButton;