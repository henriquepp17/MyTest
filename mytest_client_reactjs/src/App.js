import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CriarConta from "./pages/CriarConta";
import Entrar from "./pages/Entrar";
import Perfil from "./pages/Perfil";
import Ativacao from "./pages/Ativacao";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="criarconta" element={ <CriarConta/> } />
          <Route path="entrar" element={ <Entrar/> } />
          <Route path="perfil" element={ <Perfil/> } />
          <Route path="ativacao" element={ <Ativacao/> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App