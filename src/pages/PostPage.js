import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getPostById,
  getPostComments,
  addCommentToPost
} from "../services/postApi";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Divider
} from "@mui/material";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getPostById(id)
      .then(setPost)
      .catch((err) => console.error(err));

    getPostComments(id)
      .then(setComments)
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const comment = await addCommentToPost(id, { content: newComment });
      setComments([...comments, comment]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      {post && (
        <Box mt={5}>
          <Typography variant="h3" gutterBottom>{post.title}</Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Por {post.author}
          </Typography>
          <Typography variant="body1" mt={2}>{post.content}</Typography>

          <Divider sx={{ marginY: 4 }} />

          <Typography variant="h5" gutterBottom>Comentários</Typography>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Box key={index} mb={2}>
                <Typography variant="body2" color="text.secondary">
                  {comment.content}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nenhum comentário ainda.
            </Typography>
          )}

          <Box mt={3}>
            <TextField
              label="Adicionar comentário"
              multiline
              rows={2}
              fullWidth
              margin="normal"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddComment}>
              Enviar
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PostPage;
