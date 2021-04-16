import React , {useState, useEffect} from 'react'
import {  View, SafeAreaView,   Text,  ScrollView,  Image,  TouchableOpacity,  StyleSheet, Button, TextInput,} from 'react-native';

 
export default ({route, navigation}) => {
 //
 //   USE STATE 
 //
    const [pokemons, setPokemons] = useState([])
    const [searchfeild, setSearchfeild] = useState('')
    const [lInf, setNumeroInf] = useState(1)
    

//CONTROLA PAGINAÇÃO DOS POKEMONS  PARA FRENTE 
    const PaginaSobe = () => {

      setNumeroInf(lInf + 6)
      fetchPokemons()
      if(lInf >= 1115) {
        setNumeroInf(1115)

      }
     
   }
//CONTROLA PAGINAÇÃO DOS POKEMONS  PARA TRAS
   const PaginaDesce = () => {

    setNumeroInf(lInf - 6)
      fetchPokemons()
      if(lInf <= 1) {
        setNumeroInf(1)
      }
   }
//
// VIA API POKEMON - PEGA DADOS FAZENDO A PAGINAÇÃO ATRAVES DOS CAMPOS OFFSET E LIMIT
//  
    useEffect(() => {
        fetchPokemons();
      }, []);
      const fetchPokemons = () => {


       fetch(`https://pokeapi.co/api/v2/pokemon?offset=${ lInf }&limit=6}`)
          .then(response => response.json())
          .then(pokemons => setPokemons(pokemons.results));
      };

    
    //
    //   TELA COM A LISTA DOS POKEMOS COM
    //   BOTOES DE AVANÇO DE RETORNO SENDO PAGINADOS 
    //    FILTRO DE PESQUISA AOS NOMES DOS POKEMONS   
    return (
    
        <SafeAreaView>
          <View style={{justifyContent: 'space-between',flexDirection:'row'}}>
                <View style={{ width:70 , height: 45}}>
                  <Button  title="<<" onPress={PaginaDesce} />
                </View>

                <View style={{ width:150 , height: 45}}>
                <View style={styles.filtro}>
                  <TextInput
                    style={styles.boxfiltro}
                    placeholder="Filtrar Pokemons"
                    onChangeText={value => setSearchfeild(value)}
                    value={searchfeild}
                  />
                </View>
                </View>

                <View style={{width:70, height: 45}}>
                <Button  title=">>" onPress={PaginaSobe}  />
                </View>
          </View>


          <ScrollView>
            <View style={styles.container}>
              {pokemons
                .filter(pokemon =>
                  pokemon.name.toLowerCase().includes(searchfeild.toLowerCase())
                )
                .map((pokemon, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      key={index}
                      style={styles.card}
                      onPress={() => {
    
                      navigation.navigate('Details', {
                          pokemon: pokemon.name,
                        })}
                      }>
                      <Image
                        style={{width: 130, height: 130}}
                        source={{
                          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${
                            pokemon.name
                          }.png`,
                        }}
                      />
                      <Text>{pokemon.name}</Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }

    //
    //   ESTILOS DE FORMATAÇÃO
    //

    const styles = StyleSheet.create({
        container: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 30,
        },
        card: {
          display: 'flex',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          marginHorizontal: 20,
          marginVertical: 10,
        },
        filtro: {
          position: 'absolute',
          right: -45,
          zIndex: 1,
          marginTop: 10,
        },
        boxfiltro: {
          height: 40,
          borderWidth: 1,
          borderColor: '#000',
          textAlign: 'center',
          width: 250,
          borderRadius: 50,
        },

      });
      