import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi"; // 🔄 NOVO
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert
} from "@mui/material";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await registerUser({ username, password });
      setSuccess(response.message || "Usuário registrado com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Erro ao registrar o usuário.");
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Registrar
        </Typography>
        <form onSubmit={handleRegister}>
          {error && (
            <Box mb={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
          {success && (
            <Box mb={2}>
              <Alert severity="success">{success}</Alert>
            </Box>
          )}
          <TextField
            label="Usuário"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Registrar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
