import React from 'react';

import {Text, View} from 'react-native';

import styles from './GuessDistributionStyles';

const GuessDistribution = ({position, amount, percentage}) => {
  return (
    <View style={styles.guessDistributionContainer}>
      <Text style={styles.position}>{position}</Text>

      <View style={[styles.guessLine, {width: `${percentage}%`}]}>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </View>
  );
};

export default GuessDistribution;
