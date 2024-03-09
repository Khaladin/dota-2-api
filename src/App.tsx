import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import HeroList from "./components/HeroList";
import { CircularProgress, Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Dota 2 API
        </p>
        <Container>
          <Suspense fallback={<CircularProgress />}>
            <HeroList />
          </Suspense>
        </Container>
      </header>
    </div>
  );
}

export default App;
