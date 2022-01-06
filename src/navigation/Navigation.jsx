import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import VueListePersonnes from "../components/ListePersonnes"
import VueListeFavoris from "../components/ListeFavoris"
import VuePersonne from '../components/DetailsPersonne';

import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';


const VueListePersonnesNavigation = createStackNavigator();
const VueListeFavorisNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

// Affiche la Vue 1
function VueListePersonnesScreen() {
  return (
    <VueListePersonnesNavigation.Navigator
      initialRouteName="ListePersonnes"
    >
      <VueListePersonnesNavigation.Screen
        name="ListePersonnes"
        component={VueListePersonnes}
      />
      <VueListePersonnesNavigation.Screen
        name="ViewPersonne"
        component={VuePersonne}
        options={{ title: 'Personne' }}
      />
    </VueListePersonnesNavigation.Navigator>
  )
};

// Affiche la Vue 2
function VueListeFavorisScreen() {
  return (
    <VueListeFavorisNavigation.Navigator
      initialRouteName="ListeFavoris"
    >
      <VueListeFavorisNavigation.Screen
        name="ListeFavoris"
        component={VueListeFavoris}
      />
      <VueListeFavorisNavigation.Screen
        name="ViewPersonne"
        component={VuePersonne}
        options={{ title: 'Personne' }}
      />
    </VueListeFavorisNavigation.Navigator>
  )
};

// Main Barre de navigation
function AppNavigator() {
    return (
        <TabNavigation.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.mainGreen,
          headerShown: false
        }}>
        <TabNavigation.Screen
          name="Recherche"
          component={VueListePersonnesScreen}
          options={() => ({
            tabBarIcon: ({ color }) => {
              return <Image source={Assets.icons.search} style={{ tintColor: color }} />;
            }
          })}
        />
        <TabNavigation.Screen
          name="Favoris"
          component={VueListeFavorisScreen}
          options={() => ({
            tabBarIcon: ({ color }) => {
              return <Image source={Assets.icons.favFull} style={{ tintColor: color }} />;
            }
          })}
        />
      </TabNavigation.Navigator>
    );
  }
  
  export default AppNavigator;