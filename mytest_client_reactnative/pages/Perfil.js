import { StyleSheet, Button, View, SafeAreaView, Text, Image } from 'react-native';
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import md5 from "blueimp-md5";

function Perfil() {

  const [image, setImage] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
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
          setResultado(JSON.stringify(response.data));
        }
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: 16,
      alignItems: 'center',
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    text_input: {
      padding: '10px',
    },
    image: {
      justifyContent: 'center',
      width: '250px',
      height: '250px',
      
    },
    main_view: {
      width: '320px',      
    }
  });
  
  const renderPerfil = (
    <SafeAreaView style={styles.container}>
      <View style={styles.main_vew}>
        <View style={styles.fixToText}>
          <Image
            style={styles.image}
            source={image}
          />
        </View>
        <View style={styles.fixToText}>
          <Text>{usuario}</Text>
        </View>
        <View style={styles.fixToText}>
          <Text>{nome}</Text>
        </View>
        <View style={styles.fixToText}>
          <Text>{email}</Text>
        </View>
        <View name="resultado_perfil" style={styles.fixToText}>
          <Text>{resultado}</Text>
        </View>
      </View>
    </SafeAreaView>
  );

  return renderPerfil;
}

export default Perfil;
