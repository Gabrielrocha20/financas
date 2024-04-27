import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MotiView, MotiText } from 'moti';
import { AntDesign } from '@expo/vector-icons';

const statusbarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header({ name, navigation }) {
  return (
    <View style={styles.container}>
      <MotiView
        style={styles.content}
        from={{ translateY: -150, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: "timing", duration: 800, delay: 300 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={ navigation ? styles.buttonBack : styles.displayNone}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        
        <MotiText
          style={styles.username}
          from={{ translateX: -300 }}
          animate={{ translateX: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 300 }}
        >
          {name}
        </MotiText>

        <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
          <Feather name="user" size={27} color="#FFF" />
        </TouchableOpacity>
      </MotiView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8000ff',
    paddingTop: statusbarHeight,
    flexDirection: 'row',
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 44
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonBack: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonUser: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 44 / 2
  },
  displayNone: {
    display: 'none'
  }
});
