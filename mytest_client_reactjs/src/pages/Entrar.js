import React, { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Entrar() {
  let navigate = useNavigate();
  const [resultado, setResultado] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setResultado('');
    var { usuario, senha } = document.forms[0];
    if (usuario.value !== '' && senha.value !== '') {
      var data = new URLSearchParams();
      data.append('tipo', 'entrar');
      data.append('usuario', usuario.value);
      data.append('senha', senha.value);
      
      axios.post('http://localhost/mytest_server_php/index.php', data)
      //axios.post('http://localhost:8089', data)
        .then(function (response) {
          //console.log(response);
          if (typeof response.data !== 'string') {
            //setResultado(JSON.stringify(response.data));
            navigate('/perfil?usuario='+usuario.value);
          }
          else {
            setResultado(JSON.stringify(response.data));
          }
        })
        .catch(function (error) {
          //console.log(error);
        });
    }
  };

  const renderForm = (
    <div className="d-flex justify-content-center">
      <div className="form">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <p>Usuário </p>
                <input className="form control" type="text" name="usuario" id="usuario" required />
              </div>
              <div className="mb-3">
                <p>Senha </p>
                <input className="form control" type="password" name="senha" id="senha" required />
              </div>
              <div className="button-container">
                <button className="btn btn-info" type="submit">Entrar</button>
              </div>
              <div>
                <span id="resultado_entrar">{resultado}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return renderForm;
}

export default Entrar;