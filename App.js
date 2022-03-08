/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {TailwindFn} from 'tailwind-react-native-classnames/dist/types';
import tw from 'twrnc';
import RNFetchBlob from 'rn-fetch-blob';
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
  createDBTables,
  addColumnToArticlesDatabase,
  addColumnToPreviewArticlesDatabase,
} from './helpers/dbConnection';
// let db = SQLite.openDatabase({name: 'todo.db'});
const App = () => {
  const [data, setData] = useState([]);
  const dirs = RNFetchBlob.fs.dirs;

  const test = () => {
    addColumnToPreviewArticlesDatabase('TESTCOLUMN2', 'VARCHAR');
  };
  useEffect(() => {
    // console.log(JSON.stringify(dirs.DocumentDir));
    // try {
    //   // createDBTables();
    // createDBTables();
    // createTable('Test');
    // addUser(30, 30);
    //   // // makeQuery('DELETE FROM testtable;');
    //   // getRows();
    //   addUser(5, 5);
    //   // // const res = await getData();
    //   // const res = await getDataByQuery('SELECT * FROM testtable ');
    //   // const filter = res.filter(v => v.age === 3);
    //   // // setData(res.reverse());
    //   // setData(filter);
    //   // makeQuery('CREATE TABLE IF NOT EXISTS testtable (name INT, age INT);');
    //   // createTable();
    // } catch (error) {
    //   alert(`Error :${error}`);
    // }
    // return () => null;
  }, []);
  return (
    <SafeAreaView>
      {data.map(v => (
        <View>
          <Text onPress={() => alert(v.age)}>{v.age}</Text>
          <Text style={tw`bg-red-500`}>{v.name}</Text>
        </View>
      ))}
      <Text style={tw`bg-red-500 self-start p-2 `} onPress={() => test()}>
        Hello
      </Text>
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
