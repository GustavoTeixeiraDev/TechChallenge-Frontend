import API_BASES from "./apiConfig";

export const getAllPosts = async () => {
    const res = await fetch("http://localhost:8002/api/posts");
    return res.json();
  };


export const createPost = async (data, token) => {
    const res = await fetch("http://localhost:8002/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Erro ao criar post.");
    return res.json();
  };


  export const deletePost = async (id, token) => {
    const res = await fetch(`http://localhost:8002/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Erro ao deletar post.");
    return res.json();
  };

  export const getPostById = async (id) => {
    const res = await fetch(`http://localhost:8002/api/posts/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar post.");
    return res.json();
  };

  export const updatePost = async (id, data, token) => {
    const res = await fetch(`http://localhost:8002/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Erro ao atualizar post.");
    return res.json();
  };

  export const getPostComments = async (id) => {
    const res = await fetch(`http://localhost:8002/api/posts/${id}/comments`);
    if (!res.ok) throw new Error("Erro ao buscar comentários.");
    return res.json();
  };

  export const addCommentToPost = async (id, commentData) => {
    const res = await fetch(`http://localhost:8002/api/posts/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData)
    });
    if (!res.ok) throw new Error("Erro ao adicionar comentário.");
    return res.json();
  };

