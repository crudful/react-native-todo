import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList} from 'react-native';

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
          <Text style={styles.textStyle}>{item.title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 24,
    fontSize: 24,
  },
});

export default App;
