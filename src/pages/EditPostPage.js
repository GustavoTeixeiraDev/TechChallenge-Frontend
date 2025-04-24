import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../services/postApi";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box
} from "@mui/material";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getPostById(id)
      .then((post) => {
        setTitle(post.title);
        setContent(post.content);
        setAuthor(post.author);
      })
      .catch((err) => console.error("Erro ao carregar post:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Você precisa estar logado.");
    try {
      await updatePost(id, { title, content, author }, token);
      alert("Post atualizado com sucesso!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar post.");
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Editar Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Título" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField label="Conteúdo" multiline rows={4} fullWidth margin="normal" value={content} onChange={(e) => setContent(e.target.value)} />
          <TextField label="Autor" fullWidth margin="normal" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Salvar Alterações
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EditPostPage;
