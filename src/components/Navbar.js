import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  textTransform: "none",
  margin: theme.spacing(1),
}));

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo ou título */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BlogApp
        </Typography>

        {/* Links de navegação */}
        <Box>
          <NavButton component={Link} to="/">
            Home
          </NavButton>
          {token ? (
            <>
              <NavButton component={Link} to="/admin">
                Admin
              </NavButton>
              <NavButton component={Link} to="/create">
                Create Post
              </NavButton>
              <NavButton onClick={handleLogout}>Logout</NavButton>
            </>
          ) : (
            <>
              <NavButton component={Link} to="/login">
                Login
              </NavButton>
              <NavButton component={Link} to="/register">
                Register
              </NavButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
