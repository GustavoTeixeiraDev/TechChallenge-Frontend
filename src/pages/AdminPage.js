import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, deletePost } from "../services/postApi";
import { AuthContext } from "../context/AuthContext";
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  Button, Box, Modal
} from "@mui/material";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch((err) => console.error("Erro ao carregar posts:", err));
  }, []);

  const handleOpen = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const handleDelete = async () => {
    if (!selectedPost || !token) return;

    try {
      await deletePost(selectedPost._id, token);
      setPosts(posts.filter((post) => post._id !== selectedPost._id));
      alert("Post deletado com sucesso!");
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar o post.");
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Painel Administrativo
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      component={Link}
                      to={`/edit/${post._id}`}
                      style={{ marginRight: "10px" }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleOpen(post)}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            Confirmar exclusão
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Tem certeza que deseja excluir o post "{selectedPost?.title}"?
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
              style={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Excluir
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminPage;
