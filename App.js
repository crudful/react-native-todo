import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {getTasks} from './src/utils/todoService';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      setTasks(await getTasks());
    };

    fetchTasks();
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
