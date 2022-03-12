import {StyleSheet} from 'react-native';

import {colors} from '../../constants';

const styles = StyleSheet.create({
  number: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.lightgrey,
  },
  label: {
    fontSize: 16,
    color: colors.lightgrey,
  },
  statisticsContainer: {
    margin: 10,
    alignItems: 'center',
  },
});

export default styles;
