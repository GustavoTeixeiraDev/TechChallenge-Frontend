import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await api.get(`/posts/${id}`);
        setPost(postResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsResponse = await api.get(`/posts/${id}/comments`);
        setComments(commentsResponse.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await api.post(`/posts/${id}/comments`, {
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      {post && (
        <Box mt={5}>
          <Typography variant="h3" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            By {post.author}
          </Typography>
          <Typography variant="body1" mt={2}>
            {post.content}
          </Typography>

          <Divider sx={{ marginY: 4 }} />

          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>

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
              Nenhum comentário ainda, seja o primeiro a comentar!
            </Typography>
          )}

          <Box mt={3}>
            <TextField
              label="Add a comment"
              multiline
              rows={2}
              fullWidth
              margin="normal"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PostPage;
