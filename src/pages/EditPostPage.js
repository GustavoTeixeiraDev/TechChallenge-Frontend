import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then((response) => {
        const { title, content, author } = response.data;
        setTitle(title);
        setContent(content);
        setAuthor(author);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/posts/${id}`, { title, content, author })
      .then(() => {
        alert("Post updated successfully!");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Edit Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Content"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            label="Author"
            fullWidth
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EditPostPage;
