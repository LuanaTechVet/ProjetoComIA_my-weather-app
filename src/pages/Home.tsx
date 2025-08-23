// src/pages/Home.tsx
import { useState } from "react";
import { useWeather } from "../hooks/useWeather";

// 🔹 Exportação nomeada do componente, para poder importar com { Home }
export function Home() {
  const [cityInput, setCityInput] = useState("");
  
  // 🔹 Pegando dados do hook customizado
  const { weather, loading, error, fetchWeather } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(cityInput); // 🔹 Busca o clima da cidade digitada
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* 🔹 Título */}
      <h1 className="text-2xl font-bold mb-4">
        Veja a temperatura da sua Cidade!
      </h1>

      {/* 🔹 Formulário de busca */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Digite a cidade"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Buscar
        </button>
      </form>

      {/* 🔹 Área de exibição do clima */}
      <div className="mt-4 text-xl text-black">
        {loading && <p>Carregando...</p>} {/* Loading */}
        {error && <p>Erro ao buscar clima</p>} {/* Mensagem de erro */}
        {weather ? (
          <div>
            <p>Temperatura atual: {weather ? `${weather.temperatura}°C` : "..."}</p>
          </div>
        ) : (
          !loading && !error && <p>Clima não disponível</p> // Fallback
        )}
      </div>
    </div>
  );
}
