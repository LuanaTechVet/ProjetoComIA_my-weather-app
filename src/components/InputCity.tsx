import { useState } from 'react';

interface InputCityProps {
  onSubmit: (city: string) => void;
}

export const InputCity: React.FC<InputCityProps> = ({ onSubmit }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSubmit(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Digite a cidade"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">
        Buscar
      </button>
    </form>
  );
};
