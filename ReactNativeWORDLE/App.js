import React from 'react';
import {Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';

import {colors} from './src/constants';
import {Game} from './src/components';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>WORDLE</Text>
      <Game />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 7,
  },
});

export default App;
