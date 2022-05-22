import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {

  const style = {
    width: '150px',
    margin: "10px"
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card">
        <div className="card-body">
            <p>
              <Link to="criarconta"><button className="btn btn-info" style={style}>Criar Conta</button></Link>
            </p>
            <p>
              <Link to="entrar"><button className="btn btn-info" style={style}>Entrar</button></Link>
            </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
