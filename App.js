import React from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList} from 'react-native';

const tasks = [
  {
    id: 'c2804999-299e-4f46-8bd8-59d4e741467e',
    createdAt: '2020-09-26T11:40:13.504112Z',
    title: 'Learn Flutter',
    description: 'Read the documentation at https://flutter.dev/docs',
    due: '2020-10-04T11:40:13.504060Z',
    isCompleted: false,
    list: null,
  },
  {
    id: '543eb8fd-bb8a-4891-b95a-5706a4685d68',
    createdAt: '2020-09-26T11:40:13.503289Z',
    title: 'Learn React Native',
    description:
      'Read the documentation at https://reactnative.dev/docs/getting-started',
    due: '2020-10-02T11:40:13.503237Z',
    isCompleted: false,
    list: null,
  },
  {
    id: 'b42fddd8-d3a3-45df-9f7a-b4fb1ca3e9de',
    createdAt: '2020-09-26T11:40:13.502461Z',
    title: 'Learn Vue.js',
    description: 'Read the guide at https://vuejs.org/v2/guide/',
    due: '2020-09-30T11:40:13.502409Z',
    isCompleted: false,
    list: null,
  },
  {
    id: 'e596fd97-780f-4b5b-bc0c-41eb91cfc700',
    createdAt: '2020-09-26T11:40:13.501403Z',
    title: 'Learn React',
    description:
      'Read the documentation at https://reactjs.org/docs/getting-started.html',
    due: '2020-09-28T11:40:13.501347Z',
    isCompleted: false,
    list: null,
  },
];

const App = () => (
  <SafeAreaView>
    <FlatList
      data={tasks}
      keyExtractor={(task) => task.id}
      renderItem={({item}) => (
        <Text style={styles.textStyle}>{item.title}</Text>
      )}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 24,
    fontSize: 24,
  },
});

export default App;
