import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//  TELA PRONCIPAL QUE LISTA OS POKEMONS
import UserList from './Componentes/UserList'
//   TELA DE DETALHES DOS POKEMONS
import UserForm from './Componentes/UserForm'

const Stack = createStackNavigator()
 
export default props => {

//
//      Menu de Navegação da Tela princial "Pokemons" 
//                 com a Tela de Detalhes
//
return(
    
    <NavigationContainer>
        <Stack.Navigator
         initialRouteName="Pokemons"
         screenOpions={screenOptions}
         >
            
            <Stack.Screen 
            name="Pokemons"
            
            component={ UserList}
                options =  
                {{ 
                    title: "Relação dos Pokemons" 
                }}                
            />
            <Stack.Screen 
            name="Details"
            component={ UserForm } 
            options = {{ 
                title: "Detalhes do Pokemon"
            }}           
            /> 
        </Stack.Navigator>
    </NavigationContainer>
) 
}
//
//      DEF. ESTILOS
//                 
//
const screenOptions =  {
    headerStyle: {
        backgroundColor: '#6688aa'
    },
hearderTintColor: '#fff',
hearderTitleStyle: {
    fontWeight: 'bold'
}

}