import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import HeroList from "./components/HeroList";
import { AppBar, Button, CircularProgress, Container, IconButton, Typography, Toolbar } from "@mui/material";


function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Typography>Menu</Typography>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dota 2 API Project
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Suspense fallback={<CircularProgress/>}>
          <HeroList/>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
