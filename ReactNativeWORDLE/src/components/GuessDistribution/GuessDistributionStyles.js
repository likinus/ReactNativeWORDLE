import {StyleSheet} from 'react-native';

import {colors} from '../../constants';

const styles = StyleSheet.create({
  position: {
    color: colors.lightgrey,
  },
  amount: {
    color: colors.lightgrey,
  },
  guessLine: {
    margin: 5,
    padding: 5,
    backgroundColor: 'gray',
  },
  guessDistributionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
});

export default styles;
