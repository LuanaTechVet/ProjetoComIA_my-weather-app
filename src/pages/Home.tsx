import React from 'react';
import { InputCity } from '../components/InputCity';
import { useWeather } from '../hooks/useWeather';

export const Home: React.FC = () => {
  const { weather, loading, error, fetchWeather } = useWeather();

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Veja a temperatura da sua Cidade!</h1>
      <InputCity onSubmit={fetchWeather} />
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <p className="mt-4 text-xl">
          Temperatura atual: <span className="font-bold">{weather.temperatura}°C</span>
        </p>
      )}
    </div>
  );
};
