import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Configurações globais */
  body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    background: #f4f4f9; /* Cor suave para fundo */
    color: #333; /* Texto padrão em cinza escuro */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Estilo do container principal */
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Navegação */
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #1e90ff; /* Azul claro */
    color: #fff;
    padding: 15px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  nav a {
    color: #f8f8f8;
    margin-right: 15px;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  nav a:hover {
    color: #ff6347; /* Destaque ao passar o mouse */
  }

  nav .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  /* Botão padrão */
  button {
    background: #1e90ff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background: #ff6347; /* Muda a cor ao passar o mouse */
  }

  /* Links */
  a {
    color: #1e90ff;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #ff6347;
  }

  /* Responsividade */
  @media (max-width: 768px) {
    nav {
      flex-direction: column;
      align-items: flex-start;
    }

    nav a {
      margin-bottom: 10px;
    }
  }

  /* Inputs e formulários */
  input, textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }

  input:focus, textarea:focus {
    border-color: #1e90ff;
    outline: none;
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
  }

  /* Cards */
  .card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px 0;
  }

  .card h2 {
    margin-bottom: 10px;
  }

  .card p {
    color: #666;
  }
`;

export default GlobalStyle;