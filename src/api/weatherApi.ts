// Função para buscar coordenadas da cidade usando a API de geocoding do Open-Meteo
export const getCoordinates = async (city: string) => {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error('Cidade não encontrada');
  }
  return {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude
  };
};

// Função para buscar dados meteorológicos
export const getWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  const data = await response.json();
  return {
    temperatura: data.current_weather.temperature
  };
};
