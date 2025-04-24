import { useState, useEffect } from "react";
import { getAllPosts } from "../services/postApi";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Box,
  Container
} from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch((err) => console.error("Erro ao buscar posts:", err));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term)
    );
    setFilteredPosts(filtered);
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Blog Posts
        </Typography>

        <TextField
          label="Buscar posts"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearch}
        />

        <Grid container spacing={5}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Por {post.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content.substring(0, 100)}...
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/post/${post._id}`}>
                    Ler mais
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {filteredPosts.length === 0 && (
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Nenhum post encontrado.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
