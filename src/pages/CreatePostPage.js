import { useState, useContext } from "react";
import { createPost } from "../services/postApi";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Modal
} from "@mui/material";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [open, setOpen] = useState(false);
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Você precisa estar logado para criar posts.");
      return;
    }

    try {
      await createPost({ title, content, author }, token);
      setOpen(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao criar post.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Criar um novo post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Título"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Conteúdo"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            label="Autor"
            fullWidth
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Publicar
          </Button>
        </form>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Post Criado!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sua postagem foi criada com sucesso.
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleClose}>
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default CreatePostPage;
