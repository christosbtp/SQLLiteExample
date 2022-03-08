/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  db,
  getRows,
  getData,
  addUser,
  createTable,
  makeQuery,
  getDataByQuery,
} from './helpers/dbConnection';
// let db = SQLite.openDatabase({name: 'todo.db'});
const App = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    try {
      addUser(5, 20);
      getRows();
      // const res = await getData();
      const res = await getDataByQuery('SELECT * FROM testtable where age= 15');
      setData(res);
      // makeQuery('CREATE TABLE IF NOT EXISTS testtable (name INT, age INT);');
      // createTable();
    } catch (error) {
      alert(error);
    }
  }, []);
  return (
    <SafeAreaView>
      {data.map(v => (
        <Text>{v.age}</Text>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
