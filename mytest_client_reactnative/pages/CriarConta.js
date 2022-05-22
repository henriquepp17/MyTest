import { StyleSheet, Button, View, SafeAreaView, Text, TextInput } from 'react-native';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

function Entrar() {
  let navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [e_mail, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [resultado, setResultado] = useState("");
 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (senha.length < 6) {
      setResultado(JSON.stringify('Senha deve conter no mínimo 6 caracteres'));
    }
    else if (!/\d/.test(senha)){
      setResultado(JSON.stringify('Senha deve conter números'));
    }
    else if ((senha.match(/\d/g) || []).length <= 1) {
      setResultado(JSON.stringify('Senha deve conter pelo menos 2 números'));
    }
    else if (!/[a-z]/.test(senha)){
      setResultado(JSON.stringify('Senha deve conter pelo menos uma letra minúscula'));
    }
    else if (!/[A-Z]/.test(senha)){
      setResultado(JSON.stringify('Senha deve conter pelo menos uma letra maiúscula'));
    }
    else if (!validator.isEmail(e_mail)){
      setResultado(JSON.stringify('E-mail inválido'));
    }
    else {
      var data = new URLSearchParams();
      data.append('tipo', 'criarconta');
      data.append('nome', nome);
      data.append('e_mail', e_mail);
      data.append('usuario', usuario);
      data.append('senha', senha);
      
      axios.post('http://localhost/mytest_server_php/index.php', data)
      //axios.post('http://localhost:8089', data)
        .then(function (response) {
          //console.log(response);
          if (typeof response.data !== 'string') {
            setResultado('');
            navigate('/entrar');
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
      padding: '10px',
      width: '100%',
    }
  });
  
  const renderForm = (
    <SafeAreaView style={styles.container}>
      <View style={{width:'280px'}}>
        <View style={styles.fixToText}>
          <TextInput 
            name="nome"
            label="Nome"
            placeholder="Nome Completo" 
            onChangeText={(nome) => setNome(nome)}
            style={styles.text_input}/>
        </View>
        <View style={styles.fixToText}>
          <TextInput 
            name="email"
            label="E-mail"
            placeholder="E-maiil" 
            onChangeText={(e_mail) => setEmail(e_mail)}
            style={styles.text_input}/>
        </View>
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
            title="Criar Conta"
            onPress={handleSubmit}>
          </Button>
        </View>
        <View name="resultado_criarconta" style={styles.fixToText}>
          <Text>{resultado}</Text>
        </View>
      </View>
    </SafeAreaView>
  );

  return renderForm;
}

export default Entrar;