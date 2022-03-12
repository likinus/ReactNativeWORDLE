import {StyleSheet} from 'react-native';

import {colors} from '../../constants';

const styles = StyleSheet.create({
  map: {
    alignSelf: 'stretch',
    marginVertical: 20,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    maxWidth: 70,
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: colors.darkgrey,
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: 'bold',
    fontSize: 28,
  },
});

export default styles;
