import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://todo.crudful.com/tasks', {
      method: 'GET',
      headers: {cfAccessKey: process.env.CFACCESSKEY},
    })
      .then((response) => response.json())
      .then((json) => setTasks(json.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({item}) => (
          <View style={styles.containerViewStyle}>
            <CheckBox value={item.isCompleted} />
            <Text style={styles.textStyle}>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerViewStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 16,
  },
  textStyle: {
    fontSize: 24,
  },
});

export default App;
