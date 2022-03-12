import {StyleSheet} from 'react-native';

import {colors} from '../../constants';

const styles = StyleSheet.create({
  endScreenContainer: {
    width: '100%',
    alignItems: 'center',
  },
  guessDistributionContainer: {
    width: '100%',
    padding: 20,
  },
  title: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
  },
  subtitle: {
    marginVertical: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 20,
    color: colors.lightgrey,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  shareContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  timingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  timingTitle: {
    color: colors.lightgrey,
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.lightgrey,
  },
  shareButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textShare: {
    color: colors.lightgrey,
    fontWeight: 'bold',
  },
});

export default styles;
