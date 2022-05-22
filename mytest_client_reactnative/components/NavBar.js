import { Text, View, Button } from 'react-native';
import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () =>{

  const styles = {
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "darkblue",
    },
    button: {
    },
    link: {
      margin: '2px',
      textDecorationLine: 'none'
    }
  }

  return (
    <View style={styles.row}>
      <Link to="/" style={styles.link}><Button title="Home" style={styles.button}></Button></Link>
      <Link to="/criarconta" style={styles.link}><Button title="Criar Conta" style={styles.button}></Button></Link>
      <Link to="/entrar" style={styles.link}><Button title="Entrar" style={styles.button}></Button></Link>
      <Link to="/perfil" style={styles.link}><Button title="Perfil" style={styles.button}></Button></Link>
    </View>
  );
}
export default NavBar;
