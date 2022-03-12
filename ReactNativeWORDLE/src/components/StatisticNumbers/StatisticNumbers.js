import React from 'react';

import {Text, View} from 'react-native';

import styles from './StatisticNumbersStyles';

const StatisticNumbers = ({number, label}) => {
  return (
    <View style={styles.statisticsContainer}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default StatisticNumbers;
