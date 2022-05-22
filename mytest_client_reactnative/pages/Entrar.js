import { StyleSheet, Button, View, SafeAreaView, Text, TextInput } from 'react-native';
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Entrar() {
  let navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [resultado, setResultado] = useState("");
 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (usuario !== '' && senha !== '') {
      var data = new URLSearchParams();
      data.append('tipo', 'entrar');
      data.append('usuario', usuario);
      data.append('senha', senha);
      
      axios.post('http://localhost/mytest_server_php/index.php', data)
      //axios.post('http://localhost:8089', data)
        .then(function (response) {
          //console.log(response);
          if (typeof response.data !== 'string') {
            navigate('/perfil?usuario='+usuario);
          }
          else {
            setResultado(response.data);
          }
        })
        .catch(function (error) {
          //console.log(error);
        });
    }
  };
  
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
      justifyContent: 'space-between',
    },
    text_input: {
      width: '100%',
      padding: '10px',
    }
  });

  const renderForm = (
    <SafeAreaView style={styles.container}>
      <View style={{width:'280px'}}>
        <View style={styles.fixToText}>
          <TextInput 
            name="usuario"
            label="Usuário"
            placeholder="Usuário" 
            onChangeText={(usuario) => setUsuario(usuario)}
            style={styles.text_input}/>
        </View>
        <View style={styles.fixToText}>
          <TextInput 
            name="senha"
            label="Senha" 
            placeholder="Senha"
            secureTextEntry={true} 
            onChangeText={(senha) => setSenha(senha)}
            style={styles.text_input}/>
        </View>
        <View>
          <Button 
            title="Entrar"
            onPress={handleSubmit}>
          </Button>
        </View>
        <View name="resultado_entrar" style={styles.fixToText}>
          <Text>{resultado}</Text>
        </View>
      </View>
    </SafeAreaView>
  );

  return renderForm;
}

export default Entrar;