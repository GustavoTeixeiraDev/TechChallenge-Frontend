import API_BASES from "./apiConfig";

export const getUsers = async () => {
  const response = await fetch(`${API_BASES.USERS}`);
  return response.json();
};

export const createUser = async (data) => {
  const response = await fetch(`${API_BASES.USERS}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return response.json();
};
