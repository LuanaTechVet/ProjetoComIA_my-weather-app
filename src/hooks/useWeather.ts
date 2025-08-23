import { useState } from 'react';
import { getCoordinates, getWeather } from '../api/weatherApi';
import type { WeatherData } from '../models/Weather';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      // 🔹 Obtém latitude e longitude da cidade
      const { latitude, longitude } = await getCoordinates(city);

      // 🔹 Chama a API para obter dados do clima
      const data = await getWeather(latitude, longitude);

      // 🔹 Cria objeto completo do tipo WeatherData
      const weatherData: WeatherData = {
        cidade: city,                 // Nome da cidade
        temperatura: data.temperatura, // Temperatura retornada pela API    // Descrição retornada pela API
      };

      // 🔹 Atualiza o estado com o objeto completo
      setWeather(weatherData);

    } catch (err: any) {
      setError(err.message);
      setWeather(null); // fallback caso dê erro
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather };
};
