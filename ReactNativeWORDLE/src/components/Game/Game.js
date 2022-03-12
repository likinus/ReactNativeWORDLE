import React, {useEffect, useState} from 'react';

import {Text, View, ScrollView, Alert, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Keyboard from '../Keyboard';
import {colors, CLEAR, ENTER, NUMBERS_OF_TRIES} from '../../constants';
import utils from '../../utils';
import words from '../../words';
import EndScreen from '../EndScreen';

import styles from './GameStyles';

const Game = () => {
  const word = words.split(' ')[utils.getDayOfTheYear()].toLowerCase();
  const letters = word.split('');
  const [rows, setRows] = useState(
    new Array(NUMBERS_OF_TRIES).fill(new Array(letters.length).fill('')),
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [gameState, setGameState] = useState('playing');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    readState();
  }, []);

  useEffect(() => {
    if (loaded) {
      persistState();
    }
  }, [rows, currentRow, currentColumn, gameState]);

  useEffect(() => {
    if (currentRow > 0) {
      checkGameState();
    }
  }, [currentRow]);

  const persistState = async () => {
    const dataForToday = {
      rows,
      currentRow,
      currentColumn,
      gameState,
    };

    try {
      const existingStateString = await AsyncStorage.getItem('@game');
      let existingState = existingStateString
        ? JSON.parse(existingStateString)
        : {};
      existingState[utils.getDayKey()] = dataForToday;

      const dataString = JSON.stringify(existingState);
      await AsyncStorage.setItem('@game', dataString);
    } catch (e) {
      console.log('Failed to write data');
    }
  };

  const readState = async () => {
    const dataString = await AsyncStorage.getItem('@game');

    try {
      const data = JSON.parse(dataString);
      const day = data[utils.getDayKey()];

      setRows(day.rows);
      setCurrentColumn(day.currentColumn);
      setCurrentRow(day.currentRow);
      setGameState(day.gameState);
    } catch (e) {
      console.log("Couldn't parse the state");
    }

    setLoaded(true);
  };

  const checkGameState = () => {
    if (checkIfWon() && gameState !== 'won') {
      setGameState('won');
    } else if (checkIfLost() && gameState !== 'lost') {
      setGameState('lost');
    }
  };

  const checkIfWon = () => {
    const row = rows[currentRow - 1];

    return row.join('') === word;
  };

  const checkIfLost = () => {
    return !checkIfWon() && currentRow === rows.length;
  };

  const onKeyPressed = key => {
    if (gameState !== 'playing') {
      return;
    }

    const updatedRows = utils.copyArray(rows);

    if (key === CLEAR) {
      const prevColumn = currentColumn - 1;

      if (prevColumn >= 0) {
        updatedRows[currentRow][prevColumn] = '';
        setRows(updatedRows);
        setCurrentColumn(prevColumn);
      }

      return;
    }

    if (key === ENTER) {
      if (currentColumn === rows[0].length) {
        setCurrentRow(currentRow + 1);
        setCurrentColumn(0);
      }

      return;
    }

    if (currentColumn < rows[0].length) {
      updatedRows[currentRow][currentColumn] = key;
      setRows(updatedRows);
      setCurrentColumn(currentColumn + 1);
    }
  };

  const isCellActive = (row, col) => {
    return row === currentRow && col === currentColumn;
  };

  const getCellBGColor = (row, col) => {
    const letter = rows[row][col];
    if (row >= currentRow) {
      return colors.black;
    }

    if (letter === letters[col]) {
      return colors.primary;
    }

    if (letters.includes(letter)) {
      return colors.secondary;
    }

    return colors.darkgrey;
  };

  const getAllLetersWithColor = color => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color),
    );
  };

  const greenCaps = getAllLetersWithColor(colors.primary);
  const yellowCaps = getAllLetersWithColor(colors.secondary);
  const greyCaps = getAllLetersWithColor(colors.darkgrey);

  if (!loaded) {
    return <ActivityIndicator />;
  }
  if (gameState !== 'playing') {
    return (
      <EndScreen
        won={gameState === 'won'}
        rows={rows}
        getCellBGColor={getCellBGColor}
      />
    );
  }

  return (
    <>
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((cell, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.lightgrey
                      : colors.darkgrey,
                    backgroundColor: getCellBGColor(i, j),
                  },
                ]}>
                <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Keyboard
        onKeyPressed={onKeyPressed}
        greenCaps={greenCaps}
        yellowCaps={yellowCaps}
        greyCaps={greyCaps}
      />
    </>
  );
};

export default Game;
