import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
 
export default ({route, navigation}) => {


const [name, setUser] = useState(route.params ? route.params : {})
const [details, setDetails] = useState([]);
console.log(name.pokemon)
useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = () => {
   
    fetch(`https://pokeapi.co/api/v2/pokemon/${name.pokemon}`)
      .then(res => res.json())
      .then(details => setDetails(details));
  };

  return name ? (
    
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        style={styles.image}
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png`,
        }}
      />
    
      <Text style={styles.text}>Nome: {details.name}</Text>
      <Text style={styles.text}>Altura: {details.height}</Text>
      <Text style={styles.text}>Peso: {details.weight}</Text>


    </View>
  ) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#E63F34" />
    </View>
  );
}
const styles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
    },
    text: {
      fontSize: 22,
      marginBottom: 15,
    },
    indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });