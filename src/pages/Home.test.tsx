import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Home } from "./Home";
import { useWeather } from "../hooks/useWeather";

// Aqui fazemos um "mock" do hook useWeather, para controlar o que ele retorna nos testes
vi.mock("../hooks/useWeather", () => ({
  useWeather: vi.fn(),
}));

// Agrupamos os testes da página Home
describe("Home Page", () => {

  // Teste 1: verifica se o título principal é exibido
  it("renderiza o título corretamente", () => {
    // Mockamos o retorno do hook como se não houvesse dados ainda
    vi.mocked(useWeather).mockReturnValue({
      weather: null,
      loading: false,
      error: null,
      fetchWeather: vi.fn(),
    });

    render(<Home />);
    // Procuramos no DOM o texto do título
    expect(
      screen.getByText(/veja a temperatura da sua cidade/i)
    ).toBeInTheDocument();
  });

  // Teste 2: verifica se os dados do clima aparecem corretamente
  it("exibe informações do clima quando disponíveis", () => {
    // Mockamos o hook com dados de exemplo
    vi.mocked(useWeather).mockReturnValue({
      weather: {
        cidade: "São Paulo",
        temperatura: 25,
      },
      loading: false,
      error: null,
      fetchWeather: vi.fn(),
    });

    render(<Home />);
    // Verificamos se a cidade e a temperatura estão no DOM
    expect(screen.getByText(/São Paulo/i)).toBeInTheDocument();
    expect(screen.getByText(/25/i)).toBeInTheDocument();
  });

  // Teste 3: garante que a página não quebre se não houver dados de clima
  it("não quebra mesmo sem dados de clima", () => {
    vi.mocked(useWeather).mockReturnValue({
      weather: null,
      loading: false,
      error: null,
      fetchWeather: vi.fn(),
    });

    render(<Home />);
    // O texto "clima não disponível" deve aparecer
    expect(screen.getByText(/clima não disponível/i)).toBeInTheDocument();
  });

  // Teste 4: verifica se a mensagem de erro é exibida corretamente
  it("exibe mensagem de erro quando houver erro", () => {
    vi.mocked(useWeather).mockReturnValue({
      weather: null,
      loading: false,
      error: "Erro ao buscar clima",
      fetchWeather: vi.fn(),
    });

    render(<Home />);
    expect(
      screen.getByText(/erro ao buscar clima/i)
    ).toBeInTheDocument();
  });

  // Teste 5: verifica se a mensagem de loading aparece durante a busca de dados
  it("exibe mensagem de loading quando estiver carregando", () => {
    vi.mocked(useWeather).mockReturnValue({
      weather: null,
      loading: true,
      error: null,
      fetchWeather: vi.fn(),
    });

    render(<Home />);
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });
});
