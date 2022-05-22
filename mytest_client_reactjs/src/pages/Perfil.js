import React, { useState } from 'react';
import axios from 'axios';
import md5 from "blueimp-md5";

function Perfil() {
  const [image, setImage] = useState("");
  const [nome, setNome] = useState("");
  const [e_mail, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [resultado, setResultado] = useState("");

  const params = new URLSearchParams(window.location.search);
  const usuario_get = params.get('usuario');
  var data = new URLSearchParams();
  data.append('tipo', 'perfil');
  data.append('usuario', usuario_get);
  
  if (usuario_get && usuario_get !== null) {
    axios.post('http://localhost/mytest_server_php/index.php', data)
    //axios.post('http://localhost:8089', data)
      .then(function (response) {
        //console.log(response.data);
        if (response.data && response.data !== null) {
          setImage('https://s.gravatar.com/avatar/'+md5(response.data.e_mail.trim().toLowerCase())+'?s=80');
          setNome(response.data.nome);
          setEmail(response.data.e_mail);
          setUsuario(response.data.usuario);
        }
        else {
          setResultado('Erro na Busca');      
        }
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  const renderPerfil = (
    <div className="d-flex justify-content-center">
      <div className="card">
        <div className="card-body">
          <img className="img-thumbnail" id="image" src={image} alt=""/>
          <div className="card-body">
            <p className="card-text" id="usuario">{usuario}</p>
            <p className="card-text" id="nome">{nome}</p>
            <p className="card-text" id="e_mail">{e_mail}</p>
          </div>
        </div>
        <span id="resultado_perfil">{resultado}</span>
      </div>
    </div>
  );

  return renderPerfil;
}

export default Perfil;
