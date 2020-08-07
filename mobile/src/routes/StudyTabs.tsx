import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons'

import TeacherList from 'pages/TeacherList'
import Favorites from 'pages/Favorites'

const { Navigator, Screen } = createBottomTabNavigator()

function StudyTabs() {
  const insets = useSafeAreaInsets()

  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 80 + insets.bottom,
          marginBottom: -insets.bottom,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 15,
          paddingBottom: insets.bottom,
        },
        iconStyle: {
          flex: 0,
          width: 24,
          height: 24,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 14,
          marginLeft: 16,
        },
        //inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="ios-easel"
                size={size}
                color={focused ? '#8257e5' : color}
              />
            )
          },
        }}
      />

      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="ios-heart"
                size={size}
                color={focused ? '#8257e5' : color}
              />
            )
          },
        }}
      />
    </Navigator>
  )
}

export default StudyTabs
