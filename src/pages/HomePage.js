import { useState, useEffect } from "react";
import api from "../services/api";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Busca todos os posts na API
  useEffect(() => {
    api.get("/posts")
      .then((response) => {
        setPosts(response.data);
        setFilteredPosts(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filtra os posts conforme o termo digitado
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

        {/* Campo de busca */}
        <TextField
          label="Search posts"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Lista de posts */}
        <Grid container spacing={5}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    By {post.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content.substring(0, 100)}...
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/post/${post._id}`}>
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {filteredPosts.length === 0 && (
            <Typography variant="body1" color="text.secondary" align="center" style={{ width: "100%", marginTop: "20px" }}>
              No posts found.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
