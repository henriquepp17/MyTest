import React from 'react';
import { Link } from "react-router-dom";
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () =>{

  const styles = {
    navbar: {
      marginBottom: '20px'
    },
    buttons: {
      marginRight: '10px'
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={styles.navbar}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">MyTest</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" style={styles.buttons}>
              <Link to="/"><button className="btn btn-light nav-link active" aria-current="page">Home</button></Link>
            </li>
            <li className="nav-item" style={styles.buttons}>
              <Link to="/criarconta"><button className="btn btn-light nav-link">Criar Conta</button></Link>
            </li>
            <li className="nav-item" style={styles.buttons}>
              <Link to="/entrar"><button className="btn btn-light nav-link">Entrar</button></Link>
            </li>
            <li className="nav-item" style={styles.buttons}>
              <Link to="/perfil"><button className="btn btn-light nav-link">Perfil</button></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>    
  );
}
export default NavBar;
