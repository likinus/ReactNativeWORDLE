import React, {useEffect, useState} from 'react';

import {Alert, Pressable, Text, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StatisticNumbers from '../StatisticNumbers';
import GuessDistribution from '../GuessDistribution';
import {colorsToEmoji} from '../../constants';

import styles from './EndScreenStyles';

const EndScreen = ({won, rows, getCellBGColor}) => {
  console.log(1);
  const [secondsTillTomorrow, setSecondsTillTomorrow] = useState(0);
  const [played, setPlayed] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [distribution, setDistribution] = useState(null);

  useEffect(() => {
    readState();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );

      setSecondsTillTomorrow((tomorrow - now) / 1000);
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatSeconds = () => {
    const hours = Math.floor(secondsTillTomorrow / (60 * 60));
    const minutes = Math.floor((secondsTillTomorrow % (60 * 60)) / 60);
    const seconds = Math.floor(secondsTillTomorrow % 60);

    return `${hours}: ${minutes}: ${seconds} `;
  };

  const readState = async () => {
    const dataString = await AsyncStorage.getItem('@game');

    let data;

    try {
      data = JSON.parse(dataString);
    } catch (e) {
      console.log("Couldn't parse the state");
    }

    const keys = Object.keys(data);
    const values = Object.values(data);
    const numberOfWIns = values.filter(game => game.gameState === 'won').length;
    let currentStreak = 0;
    let prevDay = 0;
    let maxStreak = 0;

    keys.forEach(key => {
      const day = parseInt(key.split('-')[1]);
      if (data[key].gameState === 'won' && currentStreak === 0) {
        currentStreak += 1;
      } else if (data[key].gameState === 'won' && prevDay + 1 === day) {
        currentStreak += 1;
      } else {
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
        currentStreak = data[key].gameState === 'won' ? 1 : 0;
      }
      prevDay = day;
    });

    setMaxStreak(maxStreak);
    setCurrentStreak(currentStreak);
    setWinRate(Math.floor(100 * (numberOfWIns / keys.length)));
    setPlayed(keys.length);

    const dist = [0, 0, 0, 0, 0, 0];

    values.map(game => {
      if (game.gameState === 'won') {
        const tries = game.rows.filter(row => row[0]).length - 1;
        dist[tries] = dist[tries] + 1;
      }
    });
    setDistribution(dist);
  };

  const shareScore = () => {
    const textShare = rows
      .map((row, i) =>
        row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join(''),
      )
      .filter(row => row)
      .join('\n');

    Clipboard.setString(textShare);
    Alert.alert('Copied successfully', 'Share your score on your social');
  };

  const sum = distribution?.reduce((total, dist) => {
    return dist + total;
  }, 0);

  return (
    <View style={styles.endScreenContainer}>
      <Text style={styles.title}>
        {won ? 'Congrats' : 'Try again tomorrow :('}
      </Text>
      <Text style={styles.subtitle}>Statistics</Text>
      <View style={styles.rowContainer}>
        <StatisticNumbers number={played} label={'Played'} />
        <StatisticNumbers number={winRate} label={'Win %'} />
        <StatisticNumbers number={currentStreak} label={'Cur Streak'} />
        <StatisticNumbers number={maxStreak} label={'Max streak'} />
      </View>
      {distribution ? (
        <>
          <Text style={styles.subtitle}>Guess Distribution</Text>
          <View style={styles.guessDistributionContainer}>
            {distribution.map((dist, index) => (
              <GuessDistribution
                key={index}
                position={index + 1}
                amount={dist}
                percentage={(100 * dist) / sum}
              />
            ))}
          </View>
        </>
      ) : null}
      <View style={styles.shareContainer}>
        <View style={styles.timingContainer}>
          <Text style={styles.timingTitle}>Next Wordle</Text>
          <Text style={styles.time}>{formatSeconds()}</Text>
        </View>
        <Pressable style={styles.shareButton} onPress={shareScore}>
          <Text style={styles.textShare}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EndScreen;
