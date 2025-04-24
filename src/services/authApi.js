import API_BASES from "./apiConfig";

export const login = async (credentials) => {
  const res = await fetch(`${API_BASES.AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao fazer login.");
  }

  return res.json();
};

export const register = async (data) => {
  const res = await fetch(`${API_BASES.AUTH}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao registrar.");
  }

  return res.json();
};
